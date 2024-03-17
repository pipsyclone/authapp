'use client'
import LoginControllers from "@/controllers/loginControllers"
export default function () {
    const {
        email, setEmail, password, setPassword, error, HandleSubmit
    } = LoginControllers()

    return (
        <>
            <h3 className="auth-title">MASUK</h3>
            <hr />
            <p className={error === "" ? "" : "error"}>{error}</p>
            <form onSubmit={HandleSubmit}>
                <input type="email" placeholder="joe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="btn btn-primary">LOGIN</button>
                <span>Tidak mempunyai akun? <a href="/auth/signup">Daftar</a></span>
            </form>
        </>
    )
}