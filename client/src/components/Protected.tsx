import React, {ReactNode} from 'react'
import {useJwt} from "react-jwt"
import {Navigate} from "react-router-dom"

interface ProtectedProps {
    children: ReactNode
}

const Protected:React.FC<ProtectedProps> = ({children}) => {
    const token:any = localStorage.getItem("token")

    const {isExpired}:any = useJwt(token)

    if(!token || isExpired) return <Navigate to={'/admin/signin'}/>
  return <>{children}</>
}

export default Protected