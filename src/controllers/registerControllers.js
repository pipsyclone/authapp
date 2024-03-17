import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterControllers = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/api/users/register', {
            name: name,
            email: email,
            password: password
        })
            .then((res) => {
                if (res.data.status === 200) {
                    router.push('/auth/signin')
                } else {
                    setError(res.data.message)
                }
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return {
        name, setName, email, setEmail, password, setPassword, error, handleSubmit
    }
}

export default RegisterControllers;