'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, BarChart3, LogOut, ArrowLeft } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [autenticado, setAutenticado] = useState(false)
    const [senha, setSenha] = useState('')
    const pathname = usePathname()

    const ADMIN_SENHA = 'linkvoxel2024'

    useEffect(() => {
        if (localStorage.getItem('admin_auth') === 'true') {
            setAutenticado(true)
        }
    }, [])

    const autenticar = () => {
        if (senha === ADMIN_SENHA) {
            setAutenticado(true)
            localStorage.setItem('admin_auth', 'true')
        } else {
            alert('Senha incorreta!')
        }
    }

    const sair = () => {
        localStorage.removeItem('admin_auth')
        setAutenticado(false)
    }

    if (!autenticado) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-6">
                        LV
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2 text-center">Admin LinkVoxel</h1>
                    <p className="text-slate-400 text-sm text-center mb-6">Acesso restrito a administradores</p>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha de administrador"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 mb-4 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && autenticar()}
                    />
                    <button
                        onClick={autenticar}
                        className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0f172a]">
            {/* Header / Navbar */}
            <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-slate-400 hover:text-white transition flex items-center gap-2 text-sm font-bold">
                            <ArrowLeft className="w-4 h-4" />
                            Voltar ao Site
                        </Link>
                        <div className="h-6 w-px bg-slate-700"></div>
                        <div className="flex gap-1 bg-slate-900 p-1 rounded-lg">
                            <Link
                                href="/admin"
                                className={`px-4 py-2 rounded-md text-sm font-bold transition flex items-center gap-2 ${pathname === '/admin' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                Grupos
                            </Link>
                            <Link
                                href="/admin/analytics"
                                className={`px-4 py-2 rounded-md text-sm font-bold transition flex items-center gap-2 ${pathname === '/admin/analytics' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <BarChart3 className="w-4 h-4" />
                                Métricas
                            </Link>
                        </div>
                    </div>
                    <button
                        onClick={sair}
                        className="text-sm font-bold text-slate-400 hover:text-red-400 px-3 py-1.5 hover:bg-red-500/10 rounded-lg transition flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </div>
            </nav>

            {/* Conteúdo */}
            {children}
        </div>
    )
}
