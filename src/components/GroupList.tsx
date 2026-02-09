'use client'

import { useState } from 'react'
import { Group } from '@/types/group'
import GroupCard from '@/components/GroupCard'

interface GroupListProps {
    initialGroups: Group[]
}

const CATEGORIAS = [
    { id: 'todos', label: 'Todos', icon: '🌍' },
    { id: 'amizade', label: 'Amizade', icon: '👋' },
    { id: 'figurinhas', label: 'Figurinhas', icon: '🎭' },
    { id: 'namoro', label: 'Amor/Romance', icon: '💕' },
    { id: 'jogos', label: 'Games', icon: '🎮' },
    { id: 'futebol', label: 'Futebol', icon: '⚽' },
    { id: 'animes', label: 'Animes', icon: '🎌' },
    { id: 'filmes', label: 'Filmes & Séries', icon: '🎬' },
    { id: 'promocoes', label: 'Promoções', icon: '🏷️' },
    { id: 'dinheiro', label: 'Dinheiro', icon: '💰' },
    { id: 'emprego', label: 'Vagas', icon: '💼' },
    { id: 'outros', label: 'Outros', icon: '📌' }
]

export default function GroupList({ initialGroups }: GroupListProps) {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('todos')

    // Filtragem local
    const filteredGroups = initialGroups.filter(grupo => {
        const matchesSearch = grupo.nome.toLowerCase().includes(search.toLowerCase()) ||
            (grupo.descricao || '').toLowerCase().includes(search.toLowerCase())

        const matchesCategory = category === 'todos' || grupo.categoria === category

        return matchesSearch && matchesCategory
    })

    return (
        <div id="directory">
            {/* Barra de Busca e Filtros */}
            <div className="mb-12 space-y-6">

                {/* Busca */}
                <div className="relative max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Busque por grupos, interesses ou palavras-chave..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-100 rounded-full text-lg shadow-sm focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none transition"
                    />
                    <svg className="w-6 h-6 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Categorias (Scroll Horizontal) */}
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 justify-start md:justify-center">
                    {CATEGORIAS.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition border ${category === cat.id
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            <span>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contador */}
            <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">
                        {category === 'todos' ? 'Comunidades em Alta' : CATEGORIAS.find(c => c.id === category)?.label}
                    </h2>
                    <p className="text-slate-500 mt-1">
                        {filteredGroups.length} resultado{filteredGroups.length !== 1 && 's'} encontrado{filteredGroups.length !== 1 && 's'}
                    </p>
                </div>
            </div>

            {/* Grid de Grupos */}
            {filteredGroups.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum grupo encontrado</h3>
                    <p className="text-slate-500">
                        Tente buscar por outro termo ou categoria.
                    </p>
                    <button
                        onClick={() => { setSearch(''); setCategory('todos') }}
                        className="mt-6 text-violet-600 font-bold hover:underline"
                    >
                        Limpar filtros
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGroups.map((grupo) => (
                        <GroupCard key={grupo.id} grupo={grupo} />
                    ))}
                </div>
            )}
        </div>
    )
}
