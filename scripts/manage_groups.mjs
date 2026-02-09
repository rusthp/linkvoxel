import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Configuração de ambiente manual (sem dotenv)
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

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Erro: Variáveis de ambiente não encontradas em .env.local')
    process.exit(1)
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const args = process.argv.slice(2)
const command = args[0]

async function listar() {
    console.log('🔄 Buscando grupos...')
    const { data, error } = await supabase
        .from('grupos')
        .select('id, nome, status, destaque, created_at')
        .order('created_at', { ascending: false })

    if (error) return console.error('❌ Erro:', error.message)
    console.table(data)
}

async function aprovar(id) {
    console.log(`🔄 Aprovando grupo ${id}...`)
    const { error } = await supabase
        .from('grupos')
        .update({ status: 'aprovado' })
        .eq('id', id)

    if (error) return console.error('❌ Erro:', error.message)
    console.log(`✅ Grupo ${id} aprovado com sucesso!`)
}

async function deletar(id) {
    console.log(`🔄 Deletando grupo ${id}...`)
    const { error } = await supabase
        .from('grupos')
        .delete()
        .eq('id', id)

    if (error) return console.error('❌ Erro:', error.message)
    console.log(`🗑️ Grupo ${id} deletado!`)
}

switch (command) {
    case 'listar':
        listar()
        break
    case 'aprovar':
        if (!args[1]) console.error('❌ Informe o ID do grupo')
        else aprovar(args[1])
        break
    case 'deletar':
        if (!args[1]) console.error('❌ Informe o ID do grupo')
        else deletar(args[1])
        break
    default:
        console.log(`
🛠️  Gerenciador de Grupos LinkVoxel

Uso:
  node scripts/manage_groups.mjs listar
  node scripts/manage_groups.mjs aprovar <ID>
  node scripts/manage_groups.mjs deletar <ID>
`)
}
