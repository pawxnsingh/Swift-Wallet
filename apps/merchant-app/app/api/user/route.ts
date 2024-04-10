import { NextResponse } from "next/server"
import prisma from "@repo/db/client"

export const GET = async () => {
    const a = await prisma.user.create({
        data: {
            number:"rewr",
            email: "asd",
            name: "adsads",
            password:"reqr"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}