import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

export const GET = async () => {
    await prisma.user.create({
        data: {
            number: (Math.random() * 100000000).toString(),
            email: (Math.random() * 1000000).toString(),
            name: "adsads",
            password: "reqr",
        },
    });
    return NextResponse.json({
        message: "hi there",
    });
};
