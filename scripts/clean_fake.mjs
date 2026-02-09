import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Configuração de ambiente manual
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../.env.local')

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8')
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=')
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/"/g, '')
        }
    })
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function clean() {
    console.log('🧹 Limpando grupos de exemplo...')
    const { count, error } = await supabase
        .from('grupos')
        .delete({ count: 'exact' })
        .ilike('link', '%Exemplo%')

    if (error) console.error('❌ Erro:', error.message)
    else console.log(`✅ Lixeira limpa! Grupos removidos.`)
}

clean()
