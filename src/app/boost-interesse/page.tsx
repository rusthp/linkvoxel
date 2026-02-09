'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BoostInteressePage() {
    const [enviado, setEnviado] = useState(false)
    const [email, setEmail] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // Aqui você pode salvar no Supabase ou só logar para validar interesse
        console.log('Interesse em boost:', email)
        setEnviado(true)
    }

    if (enviado) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50 p-4">
                <div className="bg-white p-10 rounded-2xl shadow-xl border border-violet-100 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                        🎉
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-slate-900">Você está na lista!</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Assim que o destaque estiver disponível, você será um dos primeiros a saber.
                    </p>
                    <Link
                        href="/"
                        className="inline-block w-full bg-slate-900 text-white px-6 py-4 rounded-full hover:bg-slate-800 transition font-bold"
                    >
                        Voltar para Grupos
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 py-16 px-4">
            <div className="max-w-lg mx-auto">
                <Link href="/" className="text-slate-600 mb-8 inline-flex items-center hover:text-slate-900 font-medium">
                    ← Voltar
                </Link>

                <div className="bg-white p-10 rounded-2xl shadow-xl border border-violet-100">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-bold px-4 py-2 rounded-full mb-6">
                            🚀 EM BREVE
                        </div>
                        <h1 className="text-3xl font-bold mb-4 text-slate-900">
                            Destaque seu Grupo
                        </h1>
                        <p className="text-slate-600 leading-relaxed">
                            Grupos em destaque aparecem primeiro e recebem o badge exclusivo
                            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mx-1">🔥 EM ALTA</span>
                            — atraindo mais membros.
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-3">O que você ganha:</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2">
                                <span className="text-violet-600">✓</span> Posição prioritária no topo
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-violet-600">✓</span> Badge "Em Alta" exclusivo
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-violet-600">✓</span> Até 3x mais visibilidade
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-violet-600">✓</span> Destaque visual na listagem
                            </li>
                        </ul>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Link do grupo que quer destacar
                            </label>
                            <input
                                type="url"
                                placeholder="https://chat.whatsapp.com/..."
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-violet-200 focus:border-violet-500 outline-none transition mb-4"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Seu e-mail (para avisarmos quando lançar)
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-violet-200 focus:border-violet-500 outline-none transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-full font-bold hover:from-violet-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
                        >
                            Entrar na Lista de Espera
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-500 mt-6">
                        Sem spam. Só avisamos quando o destaque estiver disponível.
                    </p>
                </div>
            </div>
        </div>
    )
}
