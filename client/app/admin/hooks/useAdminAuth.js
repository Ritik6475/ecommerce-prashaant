import { useEffect, useState } from "react"
import api from "@/lib/axios"

export function useAdminAuth() {
  const [secretOk, setSecretOk] = useState(false)

  useEffect(() => {
    const s = localStorage.getItem("adminSecret")
    if (s) setSecretOk(true)
  }, [])

  const verify = async (secret) => {
    await api.get("/admin/verify-secret", {
      headers: { "x-admin-secret": secret },
    })
    localStorage.setItem("adminSecret", secret)
    setSecretOk(true)
  }

  const logout = () => {
    localStorage.removeItem("adminSecret")
    setSecretOk(false)
  }

  return { secretOk, verify, logout }
}
