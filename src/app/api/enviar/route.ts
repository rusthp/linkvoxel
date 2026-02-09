import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import ogs from 'open-graph-scraper'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log('📩 Body recebido:', JSON.stringify(body, null, 2))

        const supabase = await createClient()

        // Verificar se link já existe
        const { data: existente } = await supabase
            .from('grupos')
            .select('id')
            .eq('link', body.link)
            .single()

        if (existente) {
            return NextResponse.json(
                { error: 'Este link de grupo já foi cadastrado anteriormente.' },
                { status: 409 } // Conflict
            )
        }

        // Tentar extrair imagem do link (Open Graph)
        let imagemUrl = null
        try {
            const { result } = await ogs({ url: body.link })
            if (result.success && result.ogImage && result.ogImage.length > 0) {
                imagemUrl = result.ogImage[0].url
            }
        } catch (e) {
            console.log('Erro ao extrair imagem OG:', e)
            // Não falha o envio se não conseguir imagem
        }

        const dadosGrupo = {
            nome: body.nome,
            descricao: body.descricao,
            link: body.link,
            categoria: body.categoria,
            status: 'pendente',
            imagem_url: imagemUrl
        }

        console.log('📤 Tentando inserir grupo:', JSON.stringify(dadosGrupo, null, 2))

        const { data, error } = await supabase
            .from('grupos')
            .insert([dadosGrupo])
            .select()

        if (error) {
            console.error('❌ Erro Supabase:', JSON.stringify(error, null, 2))
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        console.log('✅ Grupo inserido com sucesso:', data)
        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Erro API:', error)
        return NextResponse.json({ error: 'Erro interno ao enviar' }, { status: 500 })
    }
}
