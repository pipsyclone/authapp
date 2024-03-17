import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import md5 from "md5";

export const options = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "mail@example.com" },
                password: { label: "Password", type: "password", placeholder: "Masukkan Password" },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials
                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })

                if (email === user.email && md5(password) === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 2 * 24 * 60 * 60 // 2 Days Expire
    },
    pages: {
        signIn: "/auth/signin",
        signUp: "/auth/signup",
        signOut: "/auth/signin"
    },
    callbacks: {
        jwt(params) {
            // Update Token
            if (params.user?.role) {
                params.token.role = params.user.role
            }

            // Return Final Token
            return params.token
        }
    }
}