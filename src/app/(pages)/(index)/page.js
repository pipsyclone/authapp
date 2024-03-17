'use client'
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()
    if (status !== "authenticated") return <div className="container"> <div className="card">Your not signed in! <br /> <br /> <button type="button" onClick={() => window.location.href = '/auth/signin'} className="btn btn-primary">Sign In / Sign Up</button></div> </div>
    return (
        <div className="container">
            <div className="card">
                <span>
                    {router.pathname}
                </span>
                Welcome, {session?.user?.name}
                <br />
                <br />
                {session?.user?.email}, anda sebagai customer
                <br />
                <br />
                <button type="button" onClick={() => signOut()} className="btn btn-danger">Logout</button>
            </div>
        </div>
    )
}