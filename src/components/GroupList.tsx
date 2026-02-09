'use client'

import { useState, useRef, useEffect } from 'react'
import { Group } from '@/types/group'
import GroupCard from '@/components/GroupCard'
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

interface GroupListProps {
    initialGroups: Group[]
}

const CATEGORIAS = [
    { id: 'todos', label: 'Todos', icon: '🌍' },
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

// Função para normalizar texto
function normalizeText(text: string): string {
    let normalized = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Mapeamento de caracteres Unicode estilizados para letras normais
    // Bold Serif
    const boldSerifUpper = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'
    const boldSerifLower = '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'
    // Italic Serif
    const italicSerifUpper = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍'
    const italicSerifLower = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔𝒉𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'
    // Bold Italic Serif
    const boldItalicUpper = '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁'
    const boldItalicLower = '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'
    // Script
    const scriptUpper = '𝒜𝒝𝒞𝒟𝒠𝒡𝒢𝒣𝒤𝒥𝒦𝒧𝒨𝒩𝒪𝒫𝒬𝒭𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'
    const scriptLower = '𝒶𝒷𝒸𝒹𝒺𝒻𝒼𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝓄𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'
    // Bold Script
    const boldScriptUpper = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'
    const boldScriptLower = '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'
    // Fraktur
    const frakturUpper = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ'
    const frakturLower = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'
    // Double-struck
    const doubleStruckUpper = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'
    const doubleStruckLower = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'
    // Sans-Serif
    const sansSerifUpper = '𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹'
    const sansSerifLower = '𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓'
    // Sans-Serif Bold
    const sansSerifBoldUpper = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭'
    const sansSerifBoldLower = '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'
    // Monospace
    const monospaceUpper = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉'
    const monospaceLower = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣'

    const normalUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const normalLower = 'abcdefghijklmnopqrstuvwxyz'

    const allFancyArrays = [
        boldSerifUpper, boldSerifLower,
        italicSerifUpper, italicSerifLower,
        boldItalicUpper, boldItalicLower,
        scriptUpper, scriptLower,
        boldScriptUpper, boldScriptLower,
        frakturUpper, frakturLower,
        doubleStruckUpper, doubleStruckLower,
        sansSerifUpper, sansSerifLower,
        sansSerifBoldUpper, sansSerifBoldLower,
        monospaceUpper, monospaceLower
    ]

    for (const fancyChars of allFancyArrays) {
        const chars = [...fancyChars]
        const isUpper = allFancyArrays.indexOf(fancyChars) % 2 === 0
        const normalChars = isUpper ? normalUpper : normalLower

        for (let i = 0; i < chars.length; i++) {
            normalized = normalized.split(chars[i]).join(normalChars[i])
        }
    }

    normalized = normalized.replace(/[^\w\s]/g, '')
    return normalized.toLowerCase().trim()
}

export default function GroupList({ initialGroups }: GroupListProps) {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('todos')
    const [visibleCount, setVisibleCount] = useState(42) // Começa mostrando 42 grupos
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Reseta paginação ao mudar categoria ou busca
    useEffect(() => {
        setVisibleCount(42)
    }, [search, category])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            })
        }
    }

    const filteredGroups = initialGroups.filter(grupo => {
        const normalizedSearch = normalizeText(search)
        const normalizedName = normalizeText(grupo.nome)
        const normalizedDesc = normalizeText(grupo.descricao || '')

        const matchesSearch = normalizedSearch === '' ||
            normalizedName.includes(normalizedSearch) ||
            normalizedDesc.includes(normalizedSearch)

        const matchesCategory = category === 'todos' || grupo.categoria === category

        return matchesSearch && matchesCategory
    })

    const visibleGroups = filteredGroups.slice(0, visibleCount)

    return (
        <div id="directory">
            {/* Busca e Filtros */}
            <div className="mb-10 space-y-6">

                {/* Busca */}
                <div className="relative max-w-xl mx-auto">
                    <div className="flex items-center pl-4 absolute inset-y-0 left-0 text-slate-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar grupos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none transition"
                    />
                </div>

                {/* Categorias - Com setas e scroll suave */}
                <div className="relative max-w-4xl mx-auto group px-2 md:px-12">
                    {/* Botão Esquerda */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-slate-900 border border-slate-700 rounded-full shadow-xl text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition hidden md:flex items-center justify-center transform hover:scale-110"
                        aria-label="Rolar para esquerda"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Container Scrollável */}
                    <div
                        ref={scrollContainerRef}
                        id="categorias"
                        className="flex gap-2 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {CATEGORIAS.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`snap-start flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-bold transition border select-none ${category === cat.id
                                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600 hover:bg-slate-750'
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Botão Direita */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-slate-900 border border-slate-700 rounded-full shadow-xl text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition hidden md:flex items-center justify-center transform hover:scale-110"
                        aria-label="Rolar para direita"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Gradientes laterais */}
                    <div className="absolute left-10 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0f172a] to-transparent pointer-events-none md:block hidden" />
                    <div className="absolute right-10 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0f172a] to-transparent pointer-events-none md:block hidden" />
                </div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        {category === 'todos' ? 'Grupos em Alta' : CATEGORIAS.find(c => c.id === category)?.label}
                    </h2>
                    <p className="text-slate-400 mt-1 text-sm">
                        Exibindo {visibleGroups.length} de {filteredGroups.length} resultado{filteredGroups.length !== 1 && 's'}
                    </p>
                </div>
            </div>

            {/* Grid */}
            {filteredGroups.length === 0 ? (
                <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-lg font-bold text-white mb-2">Nenhum grupo encontrado</h3>
                    <p className="text-slate-400 text-sm mb-4">
                        Tente buscar por outro termo ou categoria.
                    </p>
                    <button
                        onClick={() => { setSearch(''); setCategory('todos') }}
                        className="text-emerald-400 font-bold text-sm hover:underline"
                    >
                        Limpar filtros
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visibleGroups.map((grupo) => (
                            <GroupCard key={grupo.id} grupo={grupo} />
                        ))}
                    </div>

                    {/* Botão Ver Mais */}
                    {visibleCount < filteredGroups.length && (
                        <div className="flex justify-center mt-12 pb-8">
                            <button
                                onClick={() => setVisibleCount(prev => prev + 21)}
                                className="group flex flex-col items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                            >
                                <span className="text-sm font-bold uppercase tracking-wider">Ver mais grupos</span>
                                <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-all shadow-lg">
                                    <ChevronDown className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
                                </div>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
