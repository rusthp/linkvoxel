'use client'

import { useEffect, useState } from 'react'

export default function SocialProofBanner() {
    const [stats, setStats] = useState({ nome: 'Grupo Exemplo', cliques: 154 })
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Simulação de rotação de "Live Data"
        const interval = setInterval(() => {
            // Aqui poderíamos buscar do backend qual grupo está "bombando"
            // Por enquanto, vou fazer mockup visual para o efeito
            const nomes = ['Amizade Sincera', 'Figurinhas 2024', 'Promoções Hoje', 'Vagas SP', 'Namoro & Crush']
            const nome = nomes[Math.floor(Math.random() * nomes.length)]
            const cliques = Math.floor(Math.random() * 300) + 50

            setStats({ nome, cliques })
            setVisible(true)

            // Esconde depois de 5s
            setTimeout(() => setVisible(false), 5000)

        }, 15000) // A cada 15s mostra um alerta

        return () => clearInterval(interval)
    }, [])

    if (!visible) return null

    return (
        <div className="fixed bottom-6 right-6 md:top-24 md:right-6 md:bottom-auto z-50 animate-slide-up md:animate-slide-left">
            <div className="bg-white/90 backdrop-blur border border-slate-200 shadow-2xl rounded-2xl p-4 flex items-center gap-4 max-w-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0 animate-bounce">
                    🔥
                </div>
                <div>
                    <p className="text-slate-800 text-sm font-medium">
                        O grupo <strong className="text-violet-600">{stats.nome}</strong> está bombando!
                    </p>
                    <p className="text-slate-500 text-xs mt-1 font-bold">
                        +{stats.cliques} pessoas entraram hoje.
                    </p>
                    <p className="text-blue-600 text-[10px] mt-1 font-bold cursor-pointer hover:underline">
                        Envie o seu grupo agora →
                    </p>
                </div>
            </div>
        </div>
    )
}
