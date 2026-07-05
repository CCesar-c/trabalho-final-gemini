import { useEffect, useState } from "react"
import { api } from "../data/api"
import '../style/.css'

export default function Entrada() {
    var [list, setList] = useState([])
    useEffect(() => {
        const ObterResposta = async () => {
            const response = await api.get("/trilhas")
            console.log(response.data);
            setList(response.data)
        }
        ObterResposta()
    }, [])
    return (
        <div>
            {list.map((obj) =>{
                return(
                    <div key={obj.id } >
                        ID: {obj.id} Titulo: {obj.titulo} Descripção: {obj.descricao}
                    </div>
                )
            })}
        </div>
    )
}