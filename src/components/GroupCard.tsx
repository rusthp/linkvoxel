'use client'

import { Group } from '@/types/group'
import { Users, ExternalLink } from 'lucide-react'

interface GroupCardProps {
    grupo: Group
}

export default function GroupCard({ grupo }: GroupCardProps) {
    const categoryIcons: Record<string, string> = {
        amizade: '👋',
        amor: '💕',
        animes: '🎌',
        carros: '🚗',
        compravenda: '🛒',
        dinheiro: '💰',
        educacao: '📚',
        emagrecimento: '⚖️',
        esportes: '🏃',
        figurinhas: '🎭',
        filmes: '🎬',
        frases: '💬',
        futebol: '⚽',
        jogos: '🎮',
        profissional: '💼',
        promocoes: '🏷️',
    }
    const categoryIcon = categoryIcons[grupo.categoria] || '💬'

    return (
        <div
            className={`bg-slate-800 rounded-xl border ${grupo.destaque ? 'border-emerald-500/50' : 'border-slate-700'} hover:border-emerald-500/50 transition-all duration-200 flex flex-col h-full group overflow-hidden`}
        >
            {/* Badge de Destaque */}
            {grupo.destaque && (
                <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        🔥 EM DESTAQUE
                    </span>
                </div>
            )}

            {/* Imagem do Grupo */}
            {grupo.imagem_url ? (
                <div className="w-full h-32 overflow-hidden bg-slate-700 relative">
                    <img
                        src={grupo.imagem_url}
                        alt={grupo.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const fallback = (e.target as HTMLImageElement).nextElementSibling;
                            if (fallback) (fallback as HTMLElement).style.display = 'flex';
                        }}
                    />
                    {/* Fallback se imagem quebrar */}
                    <div className="hidden w-full h-full absolute inset-0 bg-slate-700 items-center justify-center text-4xl">
                        {categoryIcon}
                    </div>
                </div>
            ) : null}

            <div className="p-5 flex-1">
                {/* Header: Icon + Categoria (só mostra se não tem imagem) */}
                {!grupo.imagem_url && (
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-slate-700 border border-slate-600 rounded-lg flex items-center justify-center text-xl">
                            {categoryIcon}
                        </div>
                    </div>
                )}

                {/* Tag de categoria */}
                <div className="mb-3">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                        {grupo.categoria}
                    </span>
                </div>

                {/* Nome e descrição */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {grupo.nome}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {grupo.descricao || 'Comunidade verificada e ativa.'}
                </p>

                {/* Stats */}
                {grupo.cliques !== undefined && grupo.cliques > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                        <Users className="w-4 h-4" />
                        {grupo.cliques} acessos
                    </div>
                )}
            </div>

            {/* Botão */}
            <div className="p-5 pt-0">
                <a
                    href={grupo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        fetch('/api/click', {
                            method: 'POST',
                            body: JSON.stringify({ id: grupo.id }),
                            headers: { 'Content-Type': 'application/json' },
                            keepalive: true
                        }).catch(console.error)
                    }}
                    className="flex w-full items-center justify-center gap-2 text-sm font-bold py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
                >
                    Entrar
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    )
}
