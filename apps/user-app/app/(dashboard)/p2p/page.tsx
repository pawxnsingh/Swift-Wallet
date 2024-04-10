import { P2pTransferCard } from "../../../components/P2PTransfer";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getP2PTransaction() {
    const session = await getServerSession(authOptions);

    // here we can validate the session

    if (!session || !session?.user?.id) {
        return {
            msg: "Unauthenticated User",
        };
    }

    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: session.user.id },
                { toUserId: session.user.id },
            ],
        },
    });  //dasdadadas

    // so basically it will return all the
    return txns.map((t) => ({
        time: t.StartTime,
        amount: t.amount,
        from: t.fromUserId,
        to: t.toUserId,
    }));
}

export default async function P2pTransfer() {
    const transactions = await getP2PTransaction();

    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <P2pTransferCard />
                </div>
            </div>
        </div>
    );
}
