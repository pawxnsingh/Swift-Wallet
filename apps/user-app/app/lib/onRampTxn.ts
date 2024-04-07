"use server";
// this is the server action that will be invoke by client
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

// this is the server action
export async function createOnRampTxn(amount: number, providers: string) {
    // firstly authenticate this route by sending the right credential
    // the credential can be extracted out by the decrypting the session token
    // then make the db call to the user

    const session = await getServerSession(authOptions);
    if (!session.user || !session.user.id) {
        return {
            msg: "unauthenticated user",
        };
    }

    // here call the hdfc bank server to give us token so that we can give that token to the
    // and we can use that token to create the onRampTxn and redirect the user to the hdfc banking portal with that token
    // so that hdfcbank can verify that it is that user
    // now i have checked that if the user is authenticated or not
    // const token = axios.post("")

    const token = (Math.random() * 10000000).toString();

    // make a database call
    await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            token: token,
            provider: providers,
            amount: amount * 100,
            startTime: new Date(),
            userId: Number(session.user.id),
        },
    });

    return {
        msg: "txn added",
    };
}
