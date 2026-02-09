'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function SocialProofBanner() {
    const [stats, setStats] = useState({ nome: 'Grupo Exemplo', cliques: 154 })
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            const nomes = ['Amizade Sincera', 'Figurinhas 2024', 'Promoções Hoje', 'Vagas SP', 'Namoro & Crush']
            const nome = nomes[Math.floor(Math.random() * nomes.length)]
            const cliques = Math.floor(Math.random() * 300) + 50

            setStats({ nome, cliques })
            setVisible(true)

            setTimeout(() => setVisible(false), 5000)

        }, 20000) // A cada 20s

        return () => clearInterval(interval)
    }, [])

    if (!visible) return null

    return (
        <div className="fixed bottom-6 left-6 z-50 animate-slide-up">
            <div className="bg-slate-800 border border-slate-700 shadow-2xl rounded-xl p-4 flex items-center gap-4 max-w-sm">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-white text-sm font-medium">
                        <strong className="text-emerald-400">{stats.nome}</strong> está bombando!
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                        +{stats.cliques} acessos hoje
                    </p>
                </div>
            </div>
        </div>
    )
}
