'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Grupo {
    id: number
    nome: string
    descricao: string
    link: string
    categoria: string
    status: string
    destaque: boolean
    imagem_url: string | null
    created_at: string
}

export default function AdminPage() {
    const [grupos, setGrupos] = useState<Grupo[]>([])
    const [loading, setLoading] = useState(true)
    const [filtro, setFiltro] = useState<'pendente' | 'aprovado' | 'todos'>('pendente')
    const [senha, setSenha] = useState('')
    const [autenticado, setAutenticado] = useState(false)

    // Senha simples para proteção básica (em produção, use auth real)
    const ADMIN_SENHA = 'linkvoxel2024'

    const autenticar = () => {
        if (senha === ADMIN_SENHA) {
            setAutenticado(true)
            localStorage.setItem('admin_auth', 'true')
        } else {
            alert('Senha incorreta!')
        }
    }

    useEffect(() => {
        // Verificar se já está autenticado
        if (localStorage.getItem('admin_auth') === 'true') {
            setAutenticado(true)
        }
    }, [])

    useEffect(() => {
        if (!autenticado) return

        const fetchGrupos = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/admin/grupos?status=${filtro}`)
                const data = await res.json()
                setGrupos(data.grupos || [])
            } catch (error) {
                console.error('Erro ao buscar grupos:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchGrupos()
    }, [autenticado, filtro])

    const atualizarStatus = async (id: number, novoStatus: string) => {
        try {
            const res = await fetch('/api/admin/grupos', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: novoStatus })
            })
            if (res.ok) {
                setGrupos(grupos.filter(g => g.id !== id))
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error)
        }
    }

    const excluirGrupo = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este grupo?')) return
        try {
            const res = await fetch('/api/admin/grupos', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            if (res.ok) {
                setGrupos(grupos.filter(g => g.id !== id))
            }
        } catch (error) {
            console.error('Erro ao excluir:', error)
        }
    }

    // Tela de login
    if (!autenticado) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">🔐 Admin</h1>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha de administrador"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-violet-200 outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && autenticar()}
                    />
                    <button
                        onClick={autenticar}
                        className="w-full bg-violet-600 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-slate-500 hover:text-slate-900">← Voltar</Link>
                        <h1 className="font-bold text-xl text-slate-900">Painel Admin</h1>
                    </div>
                    <button
                        onClick={() => { localStorage.removeItem('admin_auth'); setAutenticado(false) }}
                        className="text-sm text-slate-500 hover:text-red-600"
                    >
                        Sair
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Filtros */}
                <div className="flex gap-2 mb-8">
                    {(['pendente', 'aprovado', 'todos'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFiltro(f)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filtro === f
                                ? 'bg-violet-600 text-white'
                                : 'bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {f === 'pendente' ? '⏳ Pendentes' : f === 'aprovado' ? '✅ Aprovados' : '📋 Todos'}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-slate-200">
                    <p className="text-slate-600">
                        <span className="font-bold text-slate-900">{grupos.length}</span> grupos {filtro === 'todos' ? 'no total' : filtro === 'pendente' ? 'aguardando aprovação' : 'aprovados'}
                    </p>
                </div>

                {/* Lista de Grupos */}
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Carregando...</div>
                ) : grupos.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        Nenhum grupo {filtro === 'pendente' ? 'pendente' : filtro === 'aprovado' ? 'aprovado' : ''} encontrado.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {grupos.map((grupo) => (
                            <div key={grupo.id} className="bg-white rounded-xl border border-slate-200 p-6">
                                <div className="flex gap-4">
                                    {/* Imagem */}
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                                        {grupo.imagem_url ? (
                                            <>
                                                <img
                                                    src={grupo.imagem_url}
                                                    alt={grupo.nome}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement
                                                        target.style.display = 'none'
                                                        const fallback = target.nextElementSibling as HTMLElement
                                                        if (fallback) fallback.style.display = 'flex'
                                                    }}
                                                />
                                                <div className="w-full h-full hidden items-center justify-center text-2xl absolute inset-0 bg-slate-100">💬</div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-2xl">💬</div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900">{grupo.nome}</h3>
                                                <p className="text-slate-500 text-sm line-clamp-2">{grupo.descricao || 'Sem descrição'}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <span className="text-xs bg-slate-100 px-2 py-1 rounded">{grupo.categoria}</span>
                                                    <span className={`text-xs px-2 py-1 rounded ${grupo.status === 'aprovado' ? 'bg-green-100 text-green-700' :
                                                        grupo.status === 'pendente' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {grupo.status}
                                                    </span>
                                                    {grupo.destaque && <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">⭐ Destaque</span>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Link */}
                                        <a
                                            href={grupo.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline mt-2 block truncate"
                                        >
                                            {grupo.link}
                                        </a>

                                        {/* Data */}
                                        <p className="text-xs text-slate-400 mt-2">
                                            Enviado em: {new Date(grupo.created_at).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                                    {grupo.status === 'pendente' && (
                                        <>
                                            <button
                                                onClick={() => atualizarStatus(grupo.id, 'aprovado')}
                                                className="flex-1 bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition"
                                            >
                                                ✅ Aprovar
                                            </button>
                                            <button
                                                onClick={() => atualizarStatus(grupo.id, 'rejeitado')}
                                                className="flex-1 bg-red-600 text-white font-medium py-2 rounded-lg hover:bg-red-700 transition"
                                            >
                                                ❌ Rejeitar
                                            </button>
                                        </>
                                    )}
                                    {grupo.status === 'aprovado' && (
                                        <button
                                            onClick={() => atualizarStatus(grupo.id, 'pendente')}
                                            className="flex-1 bg-yellow-600 text-white font-medium py-2 rounded-lg hover:bg-yellow-700 transition"
                                        >
                                            ⏳ Voltar para Pendente
                                        </button>
                                    )}
                                    <button
                                        onClick={() => excluirGrupo(grupo.id)}
                                        className="bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg hover:bg-slate-300 transition"
                                    >
                                        🗑️ Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
