import { NextResponse } from 'next/server'
import ogs from 'open-graph-scraper'

export async function POST(request: Request) {
    try {
        const { url } = await request.json()

        if (!url) {
            return NextResponse.json({ error: 'URL não fornecida' }, { status: 400 })
        }

        // Tentar extrair metadados Open Graph do link
        const { result, error } = await ogs({ url, timeout: 10000 })

        if (error || !result.success) {
            return NextResponse.json({
                success: false,
                message: 'Não foi possível carregar informações do link'
            })
        }

        // Extrair dados relevantes
        const data = {
            success: true,
            title: result.ogTitle || result.twitterTitle || null,
            description: result.ogDescription || result.twitterDescription || null,
            image: result.ogImage && result.ogImage.length > 0
                ? result.ogImage[0].url
                : null,
            siteName: result.ogSiteName || null
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Erro ao validar link:', error)
        return NextResponse.json({
            success: false,
            message: 'Erro ao processar link'
        }, { status: 500 })
    }
}
