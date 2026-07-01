import { useEffect } from "react"
import { api } from "../data/api"
import RequestPronto from "../components/RequestPronto"
import '../style/.css'
import axios from "axios"


export default function Entrada() {
    useEffect(() => {
        var resposta_final = null
        RequestPronto("get", "/trilhas", resposta_final)
        console.log(resposta_final)
    }, [])
    return (
        <div>
            <text>Hello World</text>

        </div>
    )
}