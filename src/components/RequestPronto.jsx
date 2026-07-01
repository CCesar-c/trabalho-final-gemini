import { api } from "../data/api";
export default function RequestPronto(Typo, url, resultado = null) {
    async function request() {
        var response = null
        switch (Typo.trim().toLowerCase()) {
            case "get":
                response = await api.get(url)
                break;
            case "post":
                response = await api.post(url)
                break;
            case "put":
                response = await api.put(url)
                break;
            case "del":
                response = await api.delete(url)
                break;
            default:
                console.error("Error no tipo de requisição")
                break;
        }
        console.log(response)
        resultado = response.data;
        console.log(resultado)
    }
    request()
    console.log(resultado)
    return resultado
}
