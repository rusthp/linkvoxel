const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function listarGrupos() {
    const { data, error } = await supabase
        .from('grupos')
        .select('id, nome, status, destaque, created_at')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Erro:', error)
        return
    }

    console.log('Total de grupos:', data.length)
    console.table(data)
}

listarGrupos()
