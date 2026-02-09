
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { id } = await request.json()
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

        const supabase = await createClient()

        // Incrementa contador (rpc seria melhor para atomicidade, mas update direto serve para MVP)
        // Para garantir atomicidade sem RPC, precisariamos de uma function no banco, mas vou fazer o get + update "otimista" ou ignorar race conditions leves.
        // O Supabase tem suporte a rpc('increment', { row_id: ... }). Mas precisa criar a function no SQL.
        // Vou fazer fetch + update simples por enquanto.

        const { data: grupo } = await supabase.from('grupos').select('cliques').eq('id', id).single()

        if (grupo) {
            await supabase.from('grupos').update({ cliques: (grupo.cliques || 0) + 1 }).eq('id', id)
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Error' }, { status: 500 })
    }
}
