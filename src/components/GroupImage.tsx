'use client'

interface GroupImageProps {
    src: string | null | undefined
    alt: string
    categoria: string
    destaque: boolean
}

export default function GroupImage({ src, alt, categoria, destaque }: GroupImageProps) {
    if (!src) {
        // Fallback: Ícone baseado na categoria
        const icon = categoria === 'promocoes' ? '🏷️' :
            categoria === 'amizade' ? '👋' :
                categoria === 'profissional' ? '🚀' :
                    categoria === 'afiliados' ? '💎' :
                        categoria === 'estudos' ? '📚' : '💬'

        return (
            <div className={`w-12 h-12 rounded-xl ${destaque ? 'bg-gradient-to-br from-violet-50 to-purple-50' : 'bg-gradient-to-br from-blue-50 to-violet-50'} border border-slate-100 flex items-center justify-center text-2xl`}>
                {icon}
            </div>
        )
    }

    return (
        <div className="mb-5 rounded-xl overflow-hidden h-32 w-full relative">
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                    // Se a imagem falhar, esconde e mostra fallback
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                }}
            />
            {/* Fallback (escondido por padrão) */}
            <div
                className={`hidden w-full h-full absolute inset-0 ${destaque ? 'bg-gradient-to-br from-violet-50 to-purple-50' : 'bg-gradient-to-br from-blue-50 to-violet-50'} items-center justify-center text-4xl`}
            >
                {categoria === 'promocoes' ? '🏷️' :
                    categoria === 'amizade' ? '👋' :
                        categoria === 'profissional' ? '🚀' :
                            categoria === 'afiliados' ? '💎' :
                                categoria === 'estudos' ? '📚' : '💬'}
            </div>
        </div>
    )
}
