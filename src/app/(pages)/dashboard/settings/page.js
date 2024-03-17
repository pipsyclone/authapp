'use client'
import { useRouter } from "next/navigation";

const SettingPage = () => {
    const router = useRouter()
    return (
        <div className="container">
            <div className="card">
                <div className="paths">
                    <spa>Dashboard</spa> / <span>Settings</span>
                </div>
                <br />
                <br />
                <p>This is setting page!</p>
                <br />
                <br />
                <button type="button" onClick={() => router.push('/dashboard')} className="btn btn-danger">Go Back</button>
            </div>
        </div>
    )
}

export default SettingPage;