import { useState, useEffect, createContext } from "react"
import { useContext } from "react"

const AuthContext = createContext(null)

export function AuthProvider({children}) {

    const [user, setUser] = useState(null)

    async function getUser() {
        try {
            const response = await fetch("http://localhost:8000/api/auth/me", {
                credentials: "include"    
            })
            if (!response.ok) {
                throw new Error("User is not defined")
            }
            const data = await response.json()
            setUser(data)
        } catch(err) {
            console.error("Error: Server Error")
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, getUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("AuthContext doesn't have provider")
    }
    return context
}