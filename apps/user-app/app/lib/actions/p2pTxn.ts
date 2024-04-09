"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

// this is basically a sever action called when we have to send money to the user via wallet to wallet
export async function p2pTxn(to: string, amount: number) {
    // first check the user who want to send is authenticated or not
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            msg: "some error while sending",
        };
    }

    // first check if user exist or not
    const toUser = await prisma.user.findFirst({
        where: {
            number: to,
        },
    });

    if (!toUser) {
        return {
            msg: "User not found",
        };
    }

    await prisma.$transaction(async (txn) => {
        // check wheather sender has enough balance or not

        // this  will basically lock the sender/from balance the row making the database to handle concurrent request
        await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        const fromBalance = await txn.balance.findUnique({
            where: {
                userId: Number(from),
            },
        });

        console.log("before call");

        await new Promise((r) => setTimeout(r, 4000));

        console.log("after call ");

        if (!fromBalance || fromBalance?.amount < amount) {
            throw new Error("insufficient Balance");
        }

        // decrement from the sender
        await txn.balance.update({
            where: {
                userId: Number(from),
            },
            data: {
                amount: {
                    decrement: amount,
                },
            },
        });

        // increase the reciever balance

        await txn.balance.update({
            where: {
                userId: toUser.id,
            },
            data: {
                amount: {
                    increment: amount,
                },
            },
        });

        // add one more to add the db p2p txn
        await txn.p2pTransfer.create({
            data: {
                amount: amount,
                StartTime: new Date(),
                toUserId: toUser.id,
                fromUserId: Number(from),
            },
        });
    });
}
