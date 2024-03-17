'use client'
import RegisterControllers from "@/controllers/registerControllers";

const RegisterForm = () => {

    const {
        name, setName, email, setEmail, password, setPassword, error, handleSubmit
    } = RegisterControllers()

    return (
        <div className="container">
            <div className="card">
                <h3 className="auth-title">REGISTER</h3>
                <hr />
                <p className={error === "" ? "" : "error"}>{error}</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Jhon Doe" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="joe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="btn btn-secondary">REGISTER</button>
                    <span>Sudah mempunyai akun ? <a href="/auth/signin">Masuk</a></span>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;