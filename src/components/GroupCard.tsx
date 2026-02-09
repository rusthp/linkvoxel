'use client'

import Link from 'next/link'
import { Group } from '@/types/group'

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
            className={`bg-white rounded-2xl border ${grupo.destaque ? 'border-violet-300 ring-2 ring-violet-100' : 'border-slate-200'} hover:shadow-xl transition-all duration-300 flex flex-col h-full group overflow-hidden relative`}
        >
            {/* Badge de Destaque */}
            {grupo.destaque && (
                <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                        🔥 EM ALTA
                    </span>
                </div>
            )}

            <div className="p-6 flex-1">
                {grupo.imagem_url ? (
                    <div className="mb-5 rounded-xl overflow-hidden h-32 w-full relative group-hover:shadow-md transition-all">
                        <img
                            src={grupo.imagem_url}
                            alt={grupo.nome}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                // Fallback se a imagem quebrar
                                (e.target as HTMLImageElement).style.display = 'none';
                                const fallback = (e.target as HTMLImageElement).nextElementSibling;
                                if (fallback) (fallback as HTMLElement).style.display = 'flex';
                            }}
                        />
                        {/* Fallback Icon (escondido) */}
                        <div
                            className={`hidden w-full h-full absolute inset-0 ${grupo.destaque ? 'bg-gradient-to-br from-violet-50 to-purple-50' : 'bg-gradient-to-br from-blue-50 to-violet-50'} items-center justify-center text-4xl`}
                        >
                            {categoryIcon}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-start mb-5">
                        <div className={`w-12 h-12 rounded-xl ${grupo.destaque ? 'bg-gradient-to-br from-violet-50 to-purple-50' : 'bg-gradient-to-br from-blue-50 to-violet-50'} border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                            {categoryIcon}
                        </div>
                        {!grupo.destaque && (
                            <span className="text-[10px] font-extrabold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                {grupo.categoria}
                            </span>
                        )}
                    </div>
                )}

                <div className="relative">
                    {grupo.imagem_url && !grupo.destaque && (
                        <div className="absolute -top-16 right-0">
                            <span className="text-[10px] font-extrabold tracking-widest uppercase text-blue-600 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
                                {grupo.categoria}
                            </span>
                        </div>
                    )}
                    <h3 className={`text-lg font-bold mb-3 leading-tight transition-colors line-clamp-2 ${grupo.destaque ? 'text-violet-900 group-hover:text-violet-600' : 'text-slate-900 group-hover:text-blue-600'}`} title={grupo.nome}>
                        {grupo.nome}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                        {grupo.descricao || 'Comunidade verificada e ativa.'}
                    </p>
                </div>
            </div>

            {/* Cliques / Prova Social */}
            {grupo.cliques !== undefined && grupo.cliques > 0 && (
                <div className="px-6 py-2 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {grupo.cliques} acessos hoje
                </div>
            )}

            <div className="p-6 pt-0 mt-auto">
                <a
                    href={grupo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        // Dispara incremento sem bloquear navegação
                        fetch('/api/click', {
                            method: 'POST',
                            body: JSON.stringify({ id: grupo.id }),
                            headers: { 'Content-Type': 'application/json' },
                            keepalive: true // Garante que request termine mesmo saindo da página
                        }).catch(console.error)
                    }}
                    className={`flex w-full items-center justify-center gap-2 text-sm font-bold py-3 rounded-xl transition-all shadow-sm ${grupo.destaque
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-emerald-500 hover:text-white hover:border-transparent hover:shadow-lg'
                        }`}
                >
                    Entrar Agora
                </a>
            </div>
        </div>
    )
}
