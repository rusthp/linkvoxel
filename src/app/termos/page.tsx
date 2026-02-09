
import Link from 'next/link'

export default function TermosPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <nav className="border-b border-slate-100 py-4 px-6 md:px-8">
                <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
                    ← Voltar para LinkVoxel
                </Link>
            </nav>

            <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Termos de Uso</h1>

                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="mb-4">Última atualização: {new Date().getFullYear()}</p>

                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Aceitação dos Termos</h3>
                    <p>Ao acessar e utilizar o LinkVoxel, você concorda inteiramente com estes termos de serviço. Se não concordar com algum destes termos, o uso deste site é proibido.</p>

                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Uso do Diretório</h3>
                    <p>O LinkVoxel é um diretório público de grupos de terceiros. Nós não administramos, moderamos ou possuímos vínculos com os grupos listados.</p>
                    <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li>Você é responsável por verificar a segurança e autenticidade de qualquer grupo antes de entrar.</li>
                        <li>Não nos responsabilizamos por golpes, spam ou conteúdo ofensivo dentro dos grupos do WhatsApp/Telegram.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Submissão de Grupos</h3>
                    <p>Ao enviar um grupo para nossa plataforma, você declara que:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li>Tem permissão para divulgar o link de convite.</li>
                        <li>O grupo não contém conteúdo ilegal, adulto (+18 explícito), ódio ou violência.</li>
                        <li>Entende que removemos grupos inativos ou denunciados sem aviso prévio.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Isenção de Responsabilidade</h3>
                    <p>O LinkVoxel não tem afiliação com WhatsApp Inc. ou Telegram FZ-LLC. Todas as marcas registradas pertencem aos seus respectivos proprietários.</p>
                </div>
            </main>

            <footer className="border-t border-slate-100 py-8 text-center text-slate-500 text-sm">
                LinkVoxel © {new Date().getFullYear()}
            </footer>
        </div>
    )
}
