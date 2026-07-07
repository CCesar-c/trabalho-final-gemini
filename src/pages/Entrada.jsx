import { useEffect, useState } from "react"
import { api } from "../data/api"
import '../style/.css'  
import { useEstudante } from "../contexts/EstudanteContext"

export default function Entrada() {
    const [list, setList] = useState([])
    const { estudante, setEstudante, progresso, setProgresso} = useEstudante()
    
     useEffect(() => {
        const ObterResposta = async () => {
            const response = await api.get("/trilhas")
            console.log(response.data);
            setList(response.data)
        }
        ObterResposta()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

    }
    return (
        <div >
            <form  onSubmit={handleSubmit}>
            </form>
        </div>
    )
}