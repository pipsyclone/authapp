import prisma from "@/libs/prisma";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()
        const cekMail = await prisma.user.findUnique({
            where: { email: body.email } // or: [{email: body.email, name: body.name}]
        })

        if (cekMail) {
            return NextResponse.json({ status: 400, message: "Email sudah digunakan, silahkan gunakan yang lain!" })
        } else {
            await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: md5(body.password),
                    accounts: {
                        create: {
                            type: 'credentials',
                            provider: 'email',
                            providerAccountId: uuidv4()
                        }
                    }
                },
                include: {
                    accounts: true
                }
            })
            return NextResponse.json({ status: 200, message: "Pengguna berhasil ditambahkan!" })
        }
    } catch (err) {
        return NextResponse.json({ status: 500, message: "Error : " + err.message })
    }
}