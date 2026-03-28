import { useState, useEffect, createContext } from "react"

export async function AuthProvider({}) {

    const [user, setUser] = useState(null)

    const AuthContext = createContext()

    useEffect(() => {
        const response = await fetch("https://localhost:3000/api/me")
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}