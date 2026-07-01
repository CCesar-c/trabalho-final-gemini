import '../style/.css'

export default function PageError({ error = "Pagina nao encontrada" }) {
    return (
        <div>
            <text>Error: </text>
            <text style={{ color:"red" }} >{error}</text>
        </div>
    )
}