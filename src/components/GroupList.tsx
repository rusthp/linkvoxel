'use client'

import { useState } from 'react'
import { Group } from '@/types/group'
import GroupCard from '@/components/GroupCard'
import { Search } from 'lucide-react'

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

    const filteredGroups = initialGroups.filter(grupo => {
        const matchesSearch = grupo.nome.toLowerCase().includes(search.toLowerCase()) ||
            (grupo.descricao || '').toLowerCase().includes(search.toLowerCase())

        const matchesCategory = category === 'todos' || grupo.categoria === category

        return matchesSearch && matchesCategory
    })

    return (
        <div id="directory">
            {/* Busca e Filtros */}
            <div className="mb-10 space-y-6">

                {/* Busca */}
                <div className="relative max-w-xl mx-auto">
                    <div className="flex items-center pl-4 absolute inset-y-0 left-0 text-slate-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar grupos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition"
                    />
                </div>

                {/* Categorias */}
                <div id="categorias" className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 justify-start md:justify-center">
                    {CATEGORIAS.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-bold transition border ${category === cat.id
                                ? 'bg-emerald-500 text-white border-emerald-500'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            <span>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        {category === 'todos' ? 'Grupos em Alta' : CATEGORIAS.find(c => c.id === category)?.label}
                    </h2>
                    <p className="text-slate-400 mt-1 text-sm">
                        {filteredGroups.length} resultado{filteredGroups.length !== 1 && 's'}
                    </p>
                </div>
            </div>

            {/* Grid */}
            {filteredGroups.length === 0 ? (
                <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-lg font-bold text-white mb-2">Nenhum grupo encontrado</h3>
                    <p className="text-slate-400 text-sm mb-4">
                        Tente buscar por outro termo ou categoria.
                    </p>
                    <button
                        onClick={() => { setSearch(''); setCategory('todos') }}
                        className="text-emerald-400 font-bold text-sm hover:underline"
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
