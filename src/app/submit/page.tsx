'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Link as LinkIcon, CheckCircle, Loader2 } from 'lucide-react'

interface PreviewData {
    title: string | null
    description: string | null
    image: string | null
}

export default function EnviarPage() {
    // Estados do fluxo
    const [step, setStep] = useState<'link' | 'form'>('link')
    const [link, setLink] = useState('')
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState<PreviewData | null>(null)

    // Estados do formulário
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('')
    const [imagemUrl, setImagemUrl] = useState('')

    // Estado das regras
    const [regras, setRegras] = useState({
        adulto: false,
        agressivo: false,
        palavroes: false,
        travaZap: false,
        menorIdade: false,
        spamLinks: false
    })

    // Função para normalizar texto (remove caracteres estilizados Unicode)
    const normalizarTexto = (texto: string): string => {
        return texto
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[ғꜰ]/g, 'f')
            .replace(/ɪ/g, 'i').replace(/ʀ/g, 'r').replace(/ᴏ/g, 'o')
            .replace(/ᴜ/g, 'u').replace(/ʜ/g, 'h').replace(/ɴ/g, 'n')
            .replace(/ᴛ/g, 't').replace(/ᴇ/g, 'e').replace(/ᴘ/g, 'p')
            .replace(/ᴍ/g, 'm').replace(/ᴅ/g, 'd').replace(/ᴀ/g, 'a')
            .replace(/ᴋ/g, 'k').replace(/ᴄ/g, 'c').replace(/ᴊ/g, 'j')
            .replace(/ʟ/g, 'l').replace(/ᴡ/g, 'w').replace(/ʙ/g, 'b')
            .replace(/ᴢ/g, 'z').replace(/ᴠ/g, 'v').replace(/ǫ/g, 'q')
            .replace(/ˢ/g, 's').replace(/ˣ/g, 'x').replace(/ʏ/g, 'y')
            .replace(/ᴳ/g, 'g').replace(/ɢ/g, 'g')
            .toLowerCase()
    }

    // Função para detectar categoria pelo nome
    const detectarCategoria = (nome: string): string => {
        const n = normalizarTexto(nome)

        if (n.includes('figurinha') || n.includes('sticker') || n.includes('meme') || n.includes('gif')) return 'figurinhas'
        if (n.includes('namoro') || n.includes('romance') || n.includes('amor') || n.includes('paquera') || n.includes('solteiro')) return 'namoro'
        if (n.includes('anime') || n.includes('manga') || n.includes('otaku') || n.includes('naruto') || n.includes('dragon ball')) return 'animes'
        if (n.includes('game') || n.includes('jogo') || n.includes('free fire') || n.includes('pubg') || n.includes('minecraft') || n.includes('gamer')) return 'jogos'
        if (n.includes('futebol') || n.includes('flamengo') || n.includes('corinthians') || n.includes('palmeiras')) return 'futebol'
        if (n.includes('filme') || n.includes('série') || n.includes('serie') || n.includes('netflix')) return 'filmes'
        if (n.includes('promo') || n.includes('oferta') || n.includes('desconto') || n.includes('cupom') || n.includes('grátis')) return 'promocoes'
        if (n.includes('afiliado') || n.includes('marketing') || n.includes('renda') || n.includes('dinheiro') || n.includes('ganhar')) return 'dinheiro'
        if (n.includes('emprego') || n.includes('vaga') || n.includes('trabalho') || n.includes('freelancer')) return 'emprego'
        if (n.includes('amizade') || n.includes('bate-papo') || n.includes('chat') || n.includes('conversa') || n.includes('amigo')) return 'amizade'

        return ''
    }

    // Estados de feedback
    const [enviado, setEnviado] = useState(false)
    const [error, setError] = useState('')

    // Validar link e buscar preview
    const handleValidarLink = async () => {
        if (!link.trim()) {
            setError('Cole o link do grupo')
            return
        }

        // Validar formato do link
        if (!link.includes('chat.whatsapp.com') && !link.includes('wa.me') && !link.includes('telegram.me') && !link.includes('t.me')) {
            setError('Link inválido. Use links do WhatsApp ou Telegram.')
            return
        }

        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/validar-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: link })
            })

            const data = await res.json()

            if (data.success) {
                setPreview(data)
                setNome(data.title || '')
                const descGenerica = ['WhatsApp Group Invite', 'Telegram: Contact', 'Join group chat']
                const descValida = data.description && !descGenerica.some(g => data.description?.includes(g))
                setDescricao(descValida ? data.description : '')
                setImagemUrl(data.image || '')

                if (data.title) {
                    const categoriaDetectada = detectarCategoria(data.title)
                    if (categoriaDetectada) {
                        setCategoria(categoriaDetectada)
                    }
                }
            } else {
                setPreview({ title: null, description: null, image: null })
            }

            setStep('form')
        } catch (err) {
            console.error(err)
            setPreview({ title: null, description: null, image: null })
            setStep('form')
        } finally {
            setLoading(false)
        }
    }

    // Enviar grupo
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!nome.trim()) {
            setError('Informe o nome do grupo')
            return
        }
        if (!categoria) {
            setError('Selecione uma categoria')
            return
        }

        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/enviar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: nome.trim(),
                    descricao: descricao.trim(),
                    link: link.trim(),
                    categoria,
                    imagem_url: imagemUrl || null
                })
            })

            if (res.ok) {
                setEnviado(true)
            } else {
                const data = await res.json()
                setError(data.error || 'Erro ao enviar')
            }
        } catch (err) {
            setError('Erro de conexão')
        } finally {
            setLoading(false)
        }
    }

    const categorias = [
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

    // Tela de sucesso
    if (enviado) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">Grupo Enviado!</h1>
                    <p className="text-slate-400 mb-8">
                        Seu grupo está em análise e será publicado em breve.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-600 transition"
                    >
                        Voltar ao Diretório
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0f172a] py-12 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-2 mb-6 transition">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Enviar Novo Grupo</h1>
                    <p className="text-slate-400">Cole o link e verificaremos automaticamente</p>
                </div>

                {/* Mensagem de erro */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {/* STEP 1: Link */}
                {step === 'link' && (
                    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">
                                1
                            </div>
                            <div>
                                <h2 className="font-bold text-white">Cole o Link do Grupo</h2>
                                <p className="text-sm text-slate-400">WhatsApp ou Telegram</p>
                            </div>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LinkIcon className="w-5 h-5 text-slate-500" />
                            </div>
                            <input
                                type="url"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="https://chat.whatsapp.com/..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition"
                                autoFocus
                            />
                        </div>

                        <button
                            onClick={handleValidarLink}
                            disabled={loading}
                            className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verificando...
                                </>
                            ) : (
                                <>
                                    Verificar Link
                                    <span>→</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* STEP 2: Formulário */}
                {step === 'form' && (
                    <div className="space-y-6">

                        {/* Preview Card */}
                        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                            <div className="bg-emerald-500 px-6 py-4">
                                <h2 className="text-white font-bold flex items-center gap-2">
                                    <span className="text-xl">✨</span>
                                    Preview do Grupo
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="flex gap-4">
                                    {/* Imagem */}
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-700 flex-shrink-0 border border-slate-600">
                                        {imagemUrl ? (
                                            <img src={imagemUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-3xl">
                                                {categorias.find(c => c.id === categoria)?.icon || '💬'}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-white text-lg truncate">
                                            {nome || 'Nome do Grupo'}
                                        </h3>
                                        <p className="text-slate-400 text-sm line-clamp-2 mt-1">
                                            {descricao || 'Descrição do grupo...'}
                                        </p>
                                        <span className="inline-block mt-2 text-xs font-bold uppercase text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded">
                                            {categorias.find(c => c.id === categoria)?.label || 'categoria'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulário Editável */}
                        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">
                                    2
                                </div>
                                <div>
                                    <h2 className="font-bold text-white">Confirme os Dados</h2>
                                    <p className="text-sm text-slate-400">Edite se necessário</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {/* Nome */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Nome do Grupo *
                                    </label>
                                    <input
                                        type="text"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Ex: Promoções Brasil Oficial"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition"
                                        required
                                    />
                                </div>

                                {/* Descrição */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Descrição
                                    </label>
                                    <textarea
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        placeholder="Descreva o propósito da comunidade..."
                                        rows={3}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition resize-none"
                                    />
                                </div>

                                {/* Categoria */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Categoria *
                                    </label>
                                    <select
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition appearance-none"
                                        required
                                    >
                                        <option value="">Selecione uma categoria...</option>
                                        {categorias.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Link (readonly) */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Link do Grupo
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            value={link}
                                            readOnly
                                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setStep('link')
                                                setPreview(null)
                                                setNome('')
                                                setDescricao('')
                                                setImagemUrl('')
                                            }}
                                            className="px-4 py-3 bg-slate-700 rounded-xl text-slate-300 hover:bg-slate-600 transition font-medium"
                                        >
                                            Trocar
                                        </button>
                                    </div>
                                </div>

                                {/* Regras do Grupo */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-3">
                                        Regras do seu Grupo
                                    </label>
                                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            { key: 'adulto', label: 'Conteúdo adulto' },
                                            { key: 'agressivo', label: 'Conteúdo agressivo' },
                                            { key: 'palavroes', label: 'Uso de palavrões' },
                                            { key: 'travaZap', label: 'Trava zap' },
                                            { key: 'menorIdade', label: 'Menor de idade' },
                                            { key: 'spamLinks', label: 'Links/Spam' }
                                        ].map(regra => (
                                            <label key={regra.key} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded-lg transition">
                                                <input
                                                    type="checkbox"
                                                    checked={regras[regra.key as keyof typeof regras]}
                                                    onChange={(e) => setRegras({ ...regras, [regra.key]: e.target.checked })}
                                                    className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
                                                />
                                                <span className="text-slate-300 text-sm">Proibido {regra.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Marque as regras que se aplicam ao seu grupo.</p>
                                </div>

                                {/* Dica VIP */}
                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3">
                                    <div className="text-xl">🚀</div>
                                    <div>
                                        <h4 className="font-bold text-emerald-400 text-sm mb-1">Dica VIP:</h4>
                                        <p className="text-emerald-300/80 text-sm leading-relaxed">
                                            Após a aprovação, você poderá <span className="font-bold">destacar seu grupo</span> para receber até 3x mais acessos!
                                        </p>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        'Publicar Grupo'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    )
}
