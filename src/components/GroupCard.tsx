'use client'

import { Group } from '@/types/group'
import { Users, ExternalLink, MessageCircle } from 'lucide-react'

// Ícones simples para as plataformas
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
)

const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
)

const DiscordIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.5328-9.7135-3.5283-13.6338a.0618.0618 0 00-.032-.0277zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
)

interface GroupCardProps {
    grupo: Group
}

export default function GroupCard({ grupo }: GroupCardProps) {
    const categoryIcons: Record<string, string> = {
        amizade: '👋',
        amor: '💕',
        animes: '🎌',
        carros: '🚗',
        compravenda: '🛒',
        dinheiro: '💰',
        educacao: '📚',
        emagrecimento: '⚖️',
        esportes: '🏃',
        figurinhas: '🎭',
        filmes: '🎬',
        frases: '💬',
        futebol: '⚽',
        jogos: '🎮',
        profissional: '💼',
        promocoes: '🏷️',
    }
    const categoryIcon = categoryIcons[grupo.categoria] || '💬'

    // Detectar plataforma
    const getPlatformIcon = (link: string) => {
        if (link.includes('whatsapp.com') || link.includes('wa.me')) {
            return { icon: <WhatsAppIcon />, label: 'WhatsApp', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' }
        }
        if (link.includes('telegram.me') || link.includes('t.me')) {
            return { icon: <TelegramIcon />, label: 'Telegram', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' }
        }
        if (link.includes('discord.gg') || link.includes('discord.com')) {
            return { icon: <DiscordIcon />, label: 'Discord', color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' }
        }
        return { icon: <ExternalLink className="w-3 h-3" />, label: 'Link', color: 'text-slate-400 bg-slate-700/50 border-slate-600' }
    }

    const platform = getPlatformIcon(grupo.link)

    return (
        <div
            className={`bg-slate-800 rounded-xl border ${grupo.destaque ? 'border-emerald-500/50 shadow-emerald-500/10 shadow-lg' : 'border-slate-700'} hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full group overflow-hidden`}
        >
            {/* Badge de Destaque */}
            {grupo.destaque && (
                <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2 flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        🔥 DESTAQUE
                    </span>
                </div>
            )}

            {/* Imagem do Grupo */}
            {grupo.imagem_url ? (
                <div className="w-full h-32 overflow-hidden bg-slate-700 relative">
                    <img
                        src={grupo.imagem_url}
                        alt={grupo.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const fallback = (e.target as HTMLImageElement).nextElementSibling;
                            if (fallback) (fallback as HTMLElement).style.display = 'flex';
                        }}
                    />
                    {/* Fallback se imagem quebrar */}
                    <div className="hidden w-full h-full absolute inset-0 bg-slate-700 items-center justify-center text-4xl">
                        {categoryIcon}
                    </div>

                    {/* Badge de Plataforma sobre a imagem */}
                    <div className="absolute top-2 right-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase backdrop-blur-md border ${platform.color.replace('bg-', 'bg-black/50 ')}`}>
                            {platform.icon}
                            {platform.label}
                        </span>
                    </div>
                </div>
            ) : null}

            <div className="p-5 flex-1 relative">
                {/* Header: Icon + Categoria (só mostra se não tem imagem) */}
                {!grupo.imagem_url && (
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-slate-700 border border-slate-600 rounded-lg flex items-center justify-center text-xl shadow-inner">
                            {categoryIcon}
                        </div>
                        {/* Badge de Plataforma */}
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${platform.color}`}>
                            {platform.icon}
                            {platform.label}
                        </span>
                    </div>
                )}

                {/* Tag de categoria */}
                <div className="mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full">
                        {grupo.categoria}
                    </span>
                </div>

                {/* Nome e descrição */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-emerald-400 transition-colors">
                    {grupo.nome}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {grupo.descricao || 'Comunidade verificada e ativa. Clique para entrar e participar!'}
                </p>

                {/* Stats */}
                {grupo.cliques !== undefined && grupo.cliques > 0 && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users className="w-3 h-3" />
                        {grupo.cliques} acessos
                    </div>
                )}
            </div>

            {/* Botão */}
            <div className="p-5 pt-0">
                <a
                    href={grupo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        fetch('/api/click', {
                            method: 'POST',
                            body: JSON.stringify({ id: grupo.id }),
                            headers: { 'Content-Type': 'application/json' },
                            keepalive: true
                        }).catch(console.error)
                    }}
                    className={`flex w-full items-center justify-center gap-2 text-sm font-bold py-3 rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 ${platform.label === 'WhatsApp' ? 'bg-emerald-600 hover:bg-emerald-500' :
                            platform.label === 'Telegram' ? 'bg-blue-600 hover:bg-blue-500' :
                                platform.label === 'Discord' ? 'bg-indigo-600 hover:bg-indigo-500' :
                                    'bg-slate-700 hover:bg-slate-600'
                        }`}
                >
                    Entrar no {platform.label}
                    {/* <ExternalLink className="w-4 h-4" /> */}
                </a>
            </div>
        </div>
    )
}
