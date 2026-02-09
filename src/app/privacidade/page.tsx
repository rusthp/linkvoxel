
import Link from 'next/link'

export default function PrivacidadePage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <nav className="border-b border-slate-100 py-4 px-6 md:px-8">
                <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
                    ← Voltar para LinkVoxel
                </Link>
            </nav>

            <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidade</h1>

                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="mb-4">Sua privacidade é importante para nós. É política do LinkVoxel respeitar a sua privacidade em relação a qualquer informação que possamos coletar.</p>

                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Coleta de Dados</h3>
                    <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço (ex: enviar newsletter ou notificações de boost).</p>
                    <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li>Páginas visitadas e tempo de permanência (Analytics anônimo).</li>
                        <li>E-mail (apenas se você se cadastrar voluntariamente).</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Uso de Cookies</h3>
                    <p>Utilizamos cookies apenas para melhorar a funcionalidade do site e coletar estatísticas de uso anônimas para melhorar nosso diretório.</p>

                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Links Externos</h3>
                    <p>Nosso site contém links para sites externos (grupos de WhatsApp/Telegram) que não são operados por nós. Não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>

                    <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Contato</h3>
                    <p>Se você tiver dúvidas sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.</p>
                </div>
            </main>

            <footer className="border-t border-slate-100 py-8 text-center text-slate-500 text-sm">
                LinkVoxel © {new Date().getFullYear()}
            </footer>
        </div>
    )
}
