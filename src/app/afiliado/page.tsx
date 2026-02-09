import Link from 'next/link'

export default function AfiliadoPage() {
    return (
        <div className="min-h-screen bg-brand-bg font-sans text-brand-dark">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-brand-dark font-semibold hover:text-brand-blue transition flex items-center gap-2">
                        <span>←</span> Voltar para o Diretório
                    </Link>
                    <span className="text-xs font-bold bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full uppercase tracking-wide border border-brand-purple/20">
                        Área de Membros
                    </span>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark tracking-tight">
                        Sua Comunidade, <br />
                        <span className="text-brand-purple">Sua Renda.</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Guia prático para transformar grupos de WhatsApp e Telegram em ativos digitais lucrativos.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-8 mb-12 shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 text-brand-dark">Como funciona?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Você não precisa criar produtos. Apenas recomende ferramentas que você já usa e confia para sua comunidade.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                            <span className="text-2xl mb-3 block">1️⃣</span>
                            <h3 className="font-bold text-sm mb-2">Escolha</h3>
                            <p className="text-xs text-slate-500">Selecione produtos relevantes para seu grupo.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                            <span className="text-2xl mb-3 block">2️⃣</span>
                            <h3 className="font-bold text-sm mb-2">Recomende</h3>
                            <p className="text-xs text-slate-500">Compartilhe seu link exclusivo.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                            <span className="text-2xl mb-3 block">3️⃣</span>
                            <h3 className="font-bold text-sm mb-2">Lucre</h3>
                            <p className="text-xs text-slate-500">Ganhe comissão por cada venda.</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-8 text-brand-dark">Ferramentas Recomendadas</h2>

                <div className="grid gap-6 mb-16">
                    {/* Card 1 */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-brand-purple/50 hover:shadow-md transition group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold">H</div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-purple transition-colors">Hotmart</h3>
                                    <span className="text-xs text-slate-500">Infoprodutos & Cursos</span>
                                </div>
                            </div>
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">
                                Comissão Alta
                            </span>
                        </div>
                        <p className="text-slate-600 mb-6 text-sm">
                            Maior plataforma de cursos do Brasil. Ideal para grupos de estudo, desenvolvimento pessoal e profissional.
                        </p>
                        <a
                            href="https://www.hotmart.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-slate-900 text-white px-4 py-3 rounded-lg font-semibold hover:bg-brand-purple transition"
                        >
                            Criar Conta Grátis
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-brand-purple/50 hover:shadow-md transition group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">H</div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-purple transition-colors">Hostinger</h3>
                                    <span className="text-xs text-slate-500">Hospedagem de Sites</span>
                                </div>
                            </div>
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">
                                Até 60%
                            </span>
                        </div>
                        <p className="text-slate-600 mb-6 text-sm">
                            Programa essencial. Todo dono de grupo ou negócio precisa de um site. Indique hospedagem e ganhe por venda.
                        </p>
                        <a
                            href="https://www.hostinger.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-slate-900 text-white px-4 py-3 rounded-lg font-semibold hover:bg-brand-purple transition"
                        >
                            Ver Programa de Afiliados
                        </a>
                    </div>
                </div>

                <div className="bg-slate-100 rounded-2xl p-8 text-center border border-slate-200">
                    <h2 className="text-xl font-bold mb-2 text-brand-dark">Pronto para começar?</h2>
                    <p className="mb-6 text-slate-600 text-sm max-w-sm mx-auto">
                        Volte para o diretório, observe o que as pessoas precisam e comece a testar.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-white border border-slate-300 text-brand-dark px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition"
                    >
                        Voltar para Grupos
                    </Link>
                </div>
            </main>
        </div>
    )
}
