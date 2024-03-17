'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CustomerIndex = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    console.log(router)
    return (
        <div className="container">
            <div className="card">
                <div className="paths">
                    <span>Dashboard</span>
                </div>
                <br />
                <br />
                Welcome, {session?.user?.name}
                <br />
                <br />
                {session?.user?.email}, anda sebagai admin
                <br />
                <br />
                <div className="gap">
                    <button type="button" onClick={() => router.push('/dashboard/settings')} className="btn btn-primary">Settings</button>
                    <button type="button" onClick={() => signOut()} className="btn btn-danger">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default CustomerIndex;