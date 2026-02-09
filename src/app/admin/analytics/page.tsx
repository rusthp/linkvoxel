'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Group } from '@/types/group'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { TrendingUp, Users, Award, RefreshCw } from 'lucide-react'

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

export default function AnalyticsPage() {
    const [topGroups, setTopGroups] = useState<Group[]>([])
    const [totalClicks, setTotalClicks] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        setLoading(true)
        const supabase = createClient()

        const { data: groups } = await supabase
            .from('grupos')
            .select('*')
            .order('cliques', { ascending: false })
            .limit(50)

        if (groups) {
            setTopGroups(groups)
            const total = groups.reduce((sum, group) => sum + (group.cliques || 0), 0)
            setTotalClicks(total)
        }
        setLoading(false)
    }

    // Dados para gráfico de barras (Top 10)
    const barChartData = topGroups.slice(0, 10).map(g => ({
        name: g.nome.length > 15 ? g.nome.slice(0, 15) + '...' : g.nome,
        cliques: g.cliques || 0
    }))

    // Dados para gráfico de pizza (por categoria)
    const categoryData = topGroups.reduce((acc, g) => {
        const cat = g.categoria || 'outros'
        acc[cat] = (acc[cat] || 0) + (g.cliques || 0)
        return acc
    }, {} as Record<string, number>)

    const pieChartData = Object.entries(categoryData)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8)

    // Dados para status
    const statusData = {
        aprovado: topGroups.filter(g => g.status === 'aprovado').length,
        pendente: topGroups.filter(g => g.status === 'pendente').length,
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-slate-500 flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Carregando métricas...
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Métricas de Engajamento</h1>
                <button onClick={fetchData} className="text-sm text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Atualizar
                </button>
            </div>

            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase">Total Cliques</span>
                    </div>
                    <p className="text-3xl font-black text-white">{totalClicks}</p>
                </div>
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase">Grupos Listados</span>
                    </div>
                    <p className="text-3xl font-black text-white">{topGroups.length}</p>
                </div>
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                            <Award className="w-5 h-5 text-amber-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-400 uppercase">Mais Popular</span>
                    </div>
                    <p className="text-lg font-bold text-white truncate">{topGroups[0]?.nome || '-'}</p>
                    <p className="text-sm text-emerald-400 font-bold">{topGroups[0]?.cliques || 0} cliques</p>
                </div>
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-bold text-slate-400 uppercase">Status</span>
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <p className="text-2xl font-black text-emerald-400">{statusData.aprovado}</p>
                            <p className="text-xs text-slate-500">Aprovados</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-400">{statusData.pendente}</p>
                            <p className="text-xs text-slate-500">Pendentes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Gráfico de Barras - Top 10 Grupos */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h2 className="font-bold text-white mb-4">📊 Top 10 Grupos por Cliques</h2>
                    <div className="h-72" style={{ minHeight: 288 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barChartData} layout="vertical" margin={{ left: 0, right: 20 }}>
                                <XAxis type="number" stroke="#64748b" fontSize={12} />
                                <YAxis dataKey="name" type="category" width={100} stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                    itemStyle={{ color: '#10b981' }}
                                />
                                <Bar dataKey="cliques" fill="#10b981" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Gráfico de Pizza - Por Categoria */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h2 className="font-bold text-white mb-4">🎯 Cliques por Categoria</h2>
                    <div className="h-72" style={{ minHeight: 288 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                                    labelLine={false}
                                >
                                    {pieChartData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                />
                                <Legend
                                    wrapperStyle={{ fontSize: '12px' }}
                                    formatter={(value) => <span style={{ color: '#94a3b8' }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Tabela de Ranking */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-5 border-b border-slate-700">
                    <h2 className="font-bold text-white">🏆 Ranking de Grupos</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900 text-xs uppercase font-bold text-slate-500">
                            <tr>
                                <th className="px-5 py-4">#</th>
                                <th className="px-5 py-4">Grupo</th>
                                <th className="px-5 py-4">Categoria</th>
                                <th className="px-5 py-4 text-right">Cliques</th>
                                <th className="px-5 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {topGroups.map((group, index) => (
                                <tr key={group.id} className="hover:bg-slate-700/50 transition-colors text-slate-300">
                                    <td className="px-5 py-4 font-bold text-slate-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-5 py-4 font-medium text-white flex items-center gap-3">
                                        {group.imagem_url ? (
                                            <img src={group.imagem_url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-sm">💬</div>
                                        )}
                                        <span className="truncate max-w-[180px]">{group.nome}</span>
                                        {group.destaque && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">PRO</span>}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="capitalize px-2 py-1 bg-slate-700 rounded text-xs font-bold">
                                            {group.categoria}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right font-bold text-emerald-400">
                                        {group.cliques || 0}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${group.status === 'aprovado' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                                            }`}>
                                            {group.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
