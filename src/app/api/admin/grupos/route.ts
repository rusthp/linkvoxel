import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Listar grupos
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pendente'

    const supabase = await createClient()

    let query = supabase
        .from('grupos')
        .select('*')
        .order('created_at', { ascending: false })

    if (status !== 'todos') {
        query = query.eq('status', status)
    }

    const { data: grupos, error } = await query

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ grupos })
}

// PATCH - Atualizar status do grupo
export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const { id, status, destaque } = body

        const supabase = await createClient()

        const updateData: Record<string, unknown> = {}
        if (status !== undefined) updateData.status = status
        if (destaque !== undefined) updateData.destaque = destaque

        const { error } = await supabase
            .from('grupos')
            .update(updateData)
            .eq('id', id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 })
    }
}

// DELETE - Excluir grupo
export async function DELETE(request: Request) {
    try {
        const body = await request.json()
        const { id } = body

        const supabase = await createClient()

        const { error } = await supabase
            .from('grupos')
            .delete()
            .eq('id', id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao excluir' }, { status: 500 })
    }
}
