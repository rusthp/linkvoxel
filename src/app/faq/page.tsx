
import Link from 'next/link'

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <nav className="border-b border-slate-100 py-4 px-6 md:px-8">
                <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
                    ← Voltar para LinkVoxel
                </Link>
            </nav>

            <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Perguntas Frequentes (FAQ)</h1>

                <div className="space-y-8">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">1. Como divulgar meu grupo?</h3>
                        <p className="text-slate-600">Basta clicar no botão "Enviar Grupo" no topo do site, preencher o formulário com o link e aguardar a aprovação da nossa equipe.</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">2. É grátis divulgar?</h3>
                        <p className="text-slate-600">Sim! A listagem básica é 100% gratuita. Em breve teremos opções de destaque pago para quem quer crescer mais rápido.</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">3. Quanto tempo demora para aprovar?</h3>
                        <p className="text-slate-600">Geralmente revisamos novos grupos em até 24 horas. Verificamos se o link funciona e se o conteúdo é adequado.</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">4. Como funcionam os grupos em destaque?</h3>
                        <p className="text-slate-600">Grupos com o selo "EM ALTA" aparecem no topo da lista e recebem até 3x mais cliques. Essa funcionalidade está em fase de testes e será liberada para todos em breve.</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">5. Encontrei um grupo ofensivo ou golpe. O que fazer?</h3>
                        <p className="text-slate-600">O LinkVoxel é apenas um indexador de links. Não controlamos o que acontece dentro do WhatsApp. Recomendamos que você saia do grupo e denuncie diretamente no aplicativo de mensagens.</p>
                    </div>
                </div>
            </main>

            <footer className="border-t border-slate-100 py-8 text-center text-slate-500 text-sm">
                LinkVoxel © {new Date().getFullYear()}
            </footer>
        </div>
    )
}
