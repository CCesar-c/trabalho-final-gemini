import { createContext, useState, useContext } from "react"

export const estudanteContext = createContext(null)

export default function EstudanteProvider({ children }) {

    const [estudante, setEstudante] = useState(null)

    const [progresso, setProgresso] = useState([])

    return (
        <estudanteContext.Provider value={{ estudante, setEstudante, progresso, setProgresso }}>
            {children}
        </estudanteContext.Provider>
    )
}

export function useEstudante() {
    return useContext(estudanteContext)
}