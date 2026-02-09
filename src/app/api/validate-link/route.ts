import { NextResponse } from 'next/server'

interface ValidationResult {
    valid: boolean
    type: 'whatsapp' | 'telegram' | 'unknown'
    isActive: boolean | null
    message: string
}

// Padrões de links válidos
const WHATSAPP_PATTERNS = [
    /^https?:\/\/(chat\.whatsapp\.com|wa\.me)\/[a-zA-Z0-9]+$/,
    /^https?:\/\/api\.whatsapp\.com\/send\?phone=\d+/,
]

const TELEGRAM_PATTERNS = [
    /^https?:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]+$/,
    /^https?:\/\/(t\.me|telegram\.me)\/joinchat\/[a-zA-Z0-9_-]+$/,
]

function validateLinkFormat(link: string): { valid: boolean; type: 'whatsapp' | 'telegram' | 'unknown' } {
    // WhatsApp
    for (const pattern of WHATSAPP_PATTERNS) {
        if (pattern.test(link)) {
            return { valid: true, type: 'whatsapp' }
        }
    }

    // Telegram
    for (const pattern of TELEGRAM_PATTERNS) {
        if (pattern.test(link)) {
            return { valid: true, type: 'telegram' }
        }
    }

    // Verifica se pelo menos contém os domínios (mais permissivo)
    if (link.includes('chat.whatsapp.com') || link.includes('wa.me')) {
        return { valid: true, type: 'whatsapp' }
    }
    if (link.includes('t.me') || link.includes('telegram.me')) {
        return { valid: true, type: 'telegram' }
    }

    return { valid: false, type: 'unknown' }
}

async function checkLinkIsActive(link: string): Promise<boolean> {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

        const response = await fetch(link, {
            method: 'HEAD',
            signal: controller.signal,
            redirect: 'follow',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        })

        clearTimeout(timeoutId)

        // 200, 301, 302 são considerados ativos
        return response.status < 400
    } catch (error) {
        // Se der erro de rede/timeout, considera como possivelmente ativo
        // (pode ser bloqueio de CORS, mas o link ainda pode funcionar no navegador)
        return true
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { link, checkActive = false } = body

        if (!link) {
            return NextResponse.json({ error: 'Link é obrigatório' }, { status: 400 })
        }

        // Validar formato
        const formatResult = validateLinkFormat(link.trim())

        if (!formatResult.valid) {
            const result: ValidationResult = {
                valid: false,
                type: 'unknown',
                isActive: null,
                message: 'Link inválido. Use um link de grupo do WhatsApp ou Telegram.'
            }
            return NextResponse.json(result)
        }

        // Verificar se link está ativo (opcional, mais lento)
        let isActive: boolean | null = null
        if (checkActive) {
            isActive = await checkLinkIsActive(link.trim())
        }

        const result: ValidationResult = {
            valid: true,
            type: formatResult.type,
            isActive,
            message: isActive === false
                ? `Link de ${formatResult.type === 'whatsapp' ? 'WhatsApp' : 'Telegram'} pode estar inativo ou expirado.`
                : `Link de ${formatResult.type === 'whatsapp' ? 'WhatsApp' : 'Telegram'} válido!`
        }

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao validar link' }, { status: 500 })
    }
}
