'use client'
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function page() {
    const { key } = useParams()
    const router = useRouter()
    const [mensseges, setMessages] = useState([])
    useEffect(() =>{
        async function fetchMessages() {
            const res = await fetch(`/api/contact/GetMessages/`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${key}`
                }
            })
            
            
            if (res.status === 401) {
                router.push("/")
            }
            const data = await res.json()
            setMessages(data)
        }
        fetchMessages()
    },[])
  return (
    <div>
      {mensseges.length > 0 ? (
        mensseges.map((menssege) => (
          <div key={menssege._id} className="border p-4 mb-4 text-white">
            <h2 className="text-lg font-bold ">{menssege.name}</h2>
            <p className="text-gray-600">{menssege.email}</p>
            <p className="mt-2">{menssege.message}</p>
            <p className="text-sm text-gray-500">{new Date(menssege.data).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p className="text-white font-bold h-screen mx-auto">401</p>
      )}0
    </div>
  )
}


