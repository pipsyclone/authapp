import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginControllers() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const HandleSubmit = async (e) => {
        e.preventDefault()
        signIn('credentials', { email, password, redirect: false })
            .then(async (res) => {
                if (res.error) {
                    setError("Invalid email or password!")
                } else return router.push('/')

                console.log(res.error)
            })
    }

    return {
        email, setEmail, password, setPassword, error, HandleSubmit
    }
}