import { useEffect } from "react"
import { api } from "../data/api"
import '../style/.css'


export default function Home() {
    useEffect(() => {
        async () =>{
            const respons = await api.get("/trilha")
            console.log(respons.data)
        }
    }, [])
    return (
        <div>
            <text>Hello World</text>

        </div>
    )
}