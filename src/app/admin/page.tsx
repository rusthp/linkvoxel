'use client'
import { useEffect, useState } from 'react'
import { Clock, CheckCircle, List, ExternalLink, Trash2, RotateCcw, Check, X } from 'lucide-react'

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

    useEffect(() => {
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
    }, [filtro])

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

    const filtros = [
        { id: 'pendente', label: 'Pendentes', icon: Clock, color: 'text-amber-400' },
        { id: 'aprovado', label: 'Aprovados', icon: CheckCircle, color: 'text-emerald-400' },
        { id: 'todos', label: 'Todos', icon: List, color: 'text-slate-400' },
    ] as const

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-white mb-6">Gerenciar Grupos</h1>

            {/* Filtros */}
            <div className="flex gap-2 mb-8">
                {filtros.map((f) => {
                    const Icon = f.icon
                    return (
                        <button
                            key={f.id}
                            onClick={() => setFiltro(f.id)}
                            className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-2 ${filtro === f.id
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {f.label}
                        </button>
                    )
                })}
            </div>

            {/* Stats */}
            <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
                <p className="text-slate-400">
                    <span className="font-bold text-white text-xl">{grupos.length}</span>
                    <span className="ml-2">
                        {filtro === 'todos' ? 'grupos no total' : filtro === 'pendente' ? 'aguardando aprovação' : 'aprovados'}
                    </span>
                </p>
            </div>

            {/* Lista */}
            {loading ? (
                <div className="text-center py-12 text-slate-500">Carregando...</div>
            ) : grupos.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="text-4xl mb-4">📭</div>
                    Nenhum grupo {filtro === 'pendente' ? 'pendente' : filtro === 'aprovado' ? 'aprovado' : ''} encontrado.
                </div>
            ) : (
                <div className="space-y-4">
                    {grupos.map((grupo) => (
                        <div key={grupo.id} className="bg-slate-800 rounded-xl border border-slate-700 p-5 hover:border-slate-600 transition">
                            <div className="flex gap-4">
                                {/* Imagem */}
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                                    {grupo.imagem_url ? (
                                        <img
                                            src={grupo.imagem_url}
                                            alt={grupo.nome}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none'
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-2xl">💬</div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{grupo.nome}</h3>
                                            <p className="text-slate-400 text-sm line-clamp-1">{grupo.descricao || 'Sem descrição'}</p>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded capitalize">{grupo.categoria}</span>
                                            {grupo.destaque && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-bold">⭐ Destaque</span>}
                                        </div>
                                    </div>
                                    <a href={grupo.link} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-400 hover:underline mt-2 flex items-center gap-1">
                                        <ExternalLink className="w-3 h-3" />
                                        <span className="truncate max-w-xs">{grupo.link}</span>
                                    </a>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700">
                                {grupo.status === 'pendente' && (
                                    <>
                                        <button onClick={() => atualizarStatus(grupo.id, 'aprovado')} className="flex-1 bg-emerald-500 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                                            <Check className="w-4 h-4" />
                                            Aprovar
                                        </button>
                                        <button onClick={() => atualizarStatus(grupo.id, 'rejeitado')} className="flex-1 bg-red-500 text-white font-bold py-2.5 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2">
                                            <X className="w-4 h-4" />
                                            Rejeitar
                                        </button>
                                    </>
                                )}
                                {grupo.status === 'aprovado' && (
                                    <button onClick={() => atualizarStatus(grupo.id, 'pendente')} className="flex-1 bg-amber-500 text-white font-bold py-2.5 rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2">
                                        <RotateCcw className="w-4 h-4" />
                                        Voltar para Pendente
                                    </button>
                                )}
                                <button onClick={() => excluirGrupo(grupo.id)} className="bg-slate-700 text-slate-300 font-bold px-4 py-2.5 rounded-lg hover:bg-slate-600 transition flex items-center gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
