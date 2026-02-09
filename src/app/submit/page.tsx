'use client'
import { useState } from 'react'
import Link from 'next/link'

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
            .normalize('NFKD') // Decompõe caracteres Unicode
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos combinados
            // Substituir caracteres estilizados comuns (small caps, cyrillic lookalikes)
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

        // Figurinhas
        if (n.includes('figurinha') || n.includes('sticker') || n.includes('meme') || n.includes('gif')) return 'figurinhas'

        // Amor e Romance
        if (n.includes('namoro') || n.includes('romance') || n.includes('amor') || n.includes('paquera') || n.includes('solteiro') || n.includes('relacionamento')) return 'amor'

        // Desenhos e Animes
        if (n.includes('anime') || n.includes('manga') || n.includes('otaku') || n.includes('naruto') || n.includes('dragon ball') || n.includes('one piece') || n.includes('desenho')) return 'animes'

        // Games e Jogos
        if (n.includes('game') || n.includes('jogo') || n.includes('free fire') || n.includes('pubg') || n.includes('minecraft') || n.includes('rpg') || n.includes('guild') || n.includes('clan') || n.includes('gamer') || n.includes('lol') || n.includes('valorant') || n.includes('fortnite')) return 'jogos'

        // Futebol
        if (n.includes('futebol') || n.includes('flamengo') || n.includes('corinthians') || n.includes('palmeiras') || n.includes('são paulo') || n.includes('sao paulo') || n.includes('vasco') || n.includes('sport') || n.includes('time')) return 'futebol'

        // Esportes (outros)
        if (n.includes('esporte') || n.includes('academia') || n.includes('fitness') || n.includes('treino') || n.includes('corrida') || n.includes('musculação')) return 'esportes'

        // Emagrecimento
        if (n.includes('emagrec') || n.includes('dieta') || n.includes('peso') || n.includes('low carb') || n.includes('jejum') || n.includes('nutrição')) return 'emagrecimento'

        // Filmes e Séries
        if (n.includes('filme') || n.includes('série') || n.includes('serie') || n.includes('netflix') || n.includes('cinema') || n.includes('marvel') || n.includes('dc')) return 'filmes'

        // Carros e Motos
        if (n.includes('carro') || n.includes('moto') || n.includes('veículo') || n.includes('veiculo') || n.includes('rebaixado') || n.includes('tuning') || n.includes('automovel')) return 'carros'

        // Promoções
        if (n.includes('promo') || n.includes('oferta') || n.includes('desconto') || n.includes('cupom') || n.includes('grátis') || n.includes('gratis') || n.includes('barato') || n.includes('frete')) return 'promocoes'

        // Ganhar Dinheiro / Afiliados
        if (n.includes('afiliado') || n.includes('marketing') || n.includes('renda') || n.includes('dinheiro') || n.includes('ganhar') || n.includes('investimento') || n.includes('trader') || n.includes('cripto') || n.includes('bitcoin')) return 'dinheiro'

        // Compra e Venda
        if (n.includes('compra') || n.includes('venda') || n.includes('vendo') || n.includes('troca') || n.includes('negoci') || n.includes('loja')) return 'compravenda'

        // Educação / Estudos
        if (n.includes('estudo') || n.includes('curso') || n.includes('concurso') || n.includes('enem') || n.includes('faculdade') || n.includes('escola') || n.includes('educa') || n.includes('aula')) return 'educacao'

        // Emprego / Profissional
        if (n.includes('emprego') || n.includes('vaga') || n.includes('trabalho') || n.includes('profissional') || n.includes('freelancer') || n.includes('dev') || n.includes('tech')) return 'profissional'

        // Frases e Mensagens
        if (n.includes('frase') || n.includes('mensagem') || n.includes('status') || n.includes('reflex') || n.includes('motivação') || n.includes('motivacao')) return 'frases'

        // Recrutamento (genérico)
        if (n.includes('recrutamento') || n.includes('recruta')) return 'jogos'

        // Amizade (padrão)
        if (n.includes('amizade') || n.includes('bate-papo') || n.includes('chat') || n.includes('conversa') || n.includes('amigo') || n.includes('galera')) return 'amizade'

        return '' // Não detectou
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
        if (!link.includes('chat.whatsapp.com') && !link.includes('telegram.me') && !link.includes('t.me') && !link.includes('discord.gg')) {
            setError('Link inválido. Use links do WhatsApp, Telegram ou Discord.')
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
                // Ignorar descrições genéricas do WhatsApp/Telegram
                const descGenerica = ['WhatsApp Group Invite', 'Telegram: Contact', 'Join group chat']
                const descValida = data.description && !descGenerica.some(g => data.description?.includes(g))
                setDescricao(descValida ? data.description : '')
                setImagemUrl(data.image || '')

                // Detectar categoria automaticamente pelo nome
                if (data.title) {
                    const categoriaDetectada = detectarCategoria(data.title)
                    if (categoriaDetectada) {
                        setCategoria(categoriaDetectada)
                    }
                }
            } else {
                // Mesmo sem metadados, permite continuar
                setPreview({ title: null, description: null, image: null })
            }

            setStep('form')
        } catch (err) {
            console.error(err)
            // Continua mesmo com erro
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

    // Tela de sucesso
    if (enviado) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
                    <div className="text-6xl mb-6">🎉</div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-3">Grupo Enviado!</h1>
                    <p className="text-slate-600 mb-8">
                        Seu grupo está em análise e será publicado em breve.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition"
                    >
                        Voltar ao Diretório
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-slate-500 hover:text-slate-900 text-sm font-medium flex items-center gap-2 mb-6">
                        ← Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Enviar Novo Grupo</h1>
                    <p className="text-slate-500">Cole o link e verificaremos automaticamente</p>
                </div>

                {/* Mensagem de erro */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {/* STEP 1: Link */}
                {step === 'link' && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 font-bold">
                                1
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900">Cole o Link do Grupo</h2>
                                <p className="text-sm text-slate-500">WhatsApp, Telegram ou Discord</p>
                            </div>
                        </div>

                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://chat.whatsapp.com/..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-lg focus:ring-2 focus:ring-violet-200 focus:border-violet-500 outline-none transition mb-6"
                            autoFocus
                        />

                        <button
                            onClick={handleValidarLink}
                            disabled={loading}
                            className="w-full bg-violet-600 text-white font-bold py-4 rounded-xl hover:bg-violet-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
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
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4">
                                <h2 className="text-white font-bold flex items-center gap-2">
                                    <span className="text-xl">✨</span>
                                    Preview do Grupo
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="flex gap-4">
                                    {/* Imagem */}
                                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                        {imagemUrl ? (
                                            <img src={imagemUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-3xl">
                                                {{ 'amizade': '👋', 'amor': '💕', 'animes': '🎌', 'carros': '🚗', 'compravenda': '🛒', 'dinheiro': '💰', 'educacao': '📚', 'emagrecimento': '⚖️', 'esportes': '🏃', 'figurinhas': '🎭', 'filmes': '🎬', 'frases': '💬', 'futebol': '⚽', 'jogos': '🎮', 'profissional': '💼', 'promocoes': '🏷️' }[categoria] || '💬'}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-900 text-lg truncate">
                                            {nome || 'Nome do Grupo'}
                                        </h3>
                                        <p className="text-slate-500 text-sm line-clamp-2 mt-1">
                                            {descricao || 'Descrição do grupo...'}
                                        </p>
                                        <span className="inline-block mt-2 text-xs font-bold uppercase text-violet-600 bg-violet-50 px-2 py-1 rounded">
                                            {categoria || 'categoria'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulário Editável */}
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold">
                                    2
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900">Confirme os Dados</h2>
                                    <p className="text-sm text-slate-500">Edite se necessário</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {/* Nome */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        Nome do Grupo *
                                    </label>
                                    <input
                                        type="text"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Ex: Promoções Brasil Oficial"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-200 focus:border-violet-500 outline-none transition"
                                        required
                                    />
                                </div>

                                {/* Descrição */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        Descrição
                                    </label>
                                    <textarea
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        placeholder="Descreva o propósito da comunidade..."
                                        rows={3}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-200 focus:border-violet-500 outline-none transition resize-none"
                                    />
                                </div>

                                {/* Categoria */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        Categoria *
                                    </label>
                                    <select
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-200 focus:border-violet-500 outline-none transition appearance-none"
                                        required
                                    >
                                        <option value="">Selecione uma categoria...</option>
                                        <option value="amizade">👋 Amizade</option>
                                        <option value="amor">💕 Amor e Romance</option>
                                        <option value="animes">🎌 Desenhos e Animes</option>
                                        <option value="carros">🚗 Carros e Motos</option>
                                        <option value="compravenda">🛒 Compra e Venda</option>
                                        <option value="dinheiro">💰 Ganhar Dinheiro</option>
                                        <option value="educacao">📚 Educação</option>
                                        <option value="emagrecimento">⚖️ Emagrecimento</option>
                                        <option value="esportes">🏃 Esportes</option>
                                        <option value="figurinhas">🎭 Figurinhas e Stickers</option>
                                        <option value="filmes">🎬 Filmes e Séries</option>
                                        <option value="frases">💬 Frases e Mensagens</option>
                                        <option value="futebol">⚽ Futebol</option>
                                        <option value="jogos">🎮 Games e Jogos</option>
                                        <option value="profissional">💼 Profissional</option>
                                        <option value="promocoes">🏷️ Promoções</option>
                                    </select>
                                </div>

                                {/* Link (readonly) */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        Link do Grupo
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            value={link}
                                            readOnly
                                            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
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
                                            className="px-4 py-3 bg-slate-200 rounded-xl text-slate-700 hover:bg-slate-300 transition font-medium"
                                        >
                                            Trocar
                                        </button>
                                    </div>
                                </div>

                                {/* Regras do Grupo (opcional) */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">
                                        Regras do seu Grupo
                                    </label>
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={regras.adulto}
                                                onChange={(e) => setRegras({ ...regras, adulto: e.target.checked })}
                                                className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                            />
                                            <span className="text-slate-700">Proibido conteúdo adulto</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={regras.agressivo}
                                                onChange={(e) => setRegras({ ...regras, agressivo: e.target.checked })}
                                                className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                            />
                                            <span className="text-slate-700">Proibido conteúdo agressivo</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={regras.palavroes}
                                                onChange={(e) => setRegras({ ...regras, palavroes: e.target.checked })}
                                                className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                            />
                                            <span className="text-slate-700">Proibido uso de palavrões</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={regras.travaZap}
                                                onChange={(e) => setRegras({ ...regras, travaZap: e.target.checked })}
                                                className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                            />
                                            <span className="text-slate-700">Proibido trava zap</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={regras.menorIdade}
                                                onChange={(e) => setRegras({ ...regras, menorIdade: e.target.checked })}
                                                className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                            />
                                            <span className="text-slate-700">Proibido menor de idade</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={regras.spamLinks}
                                                onChange={(e) => setRegras({ ...regras, spamLinks: e.target.checked })}
                                                className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                            />
                                            <span className="text-slate-700">Proibido enviar links/spam</span>
                                        </label>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Marque as regras que se aplicam ao seu grupo.</p>
                                </div>

                                {/* Dica VIP */}
                                <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-xl p-4 flex gap-3">
                                    <div className="text-xl">🚀</div>
                                    <div>
                                        <h4 className="font-bold text-violet-800 text-sm mb-1">Dica VIP:</h4>
                                        <p className="text-violet-600 text-sm leading-relaxed">
                                            Após a aprovação, você poderá <span className="font-bold">destacar seu grupo</span> para receber até 3x mais acessos!
                                        </p>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? 'Enviando...' : 'Publicar Grupo'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    )
}
