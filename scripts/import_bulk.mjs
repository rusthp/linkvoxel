import { createClient } from '@supabase/supabase-js'
import ogs from 'open-graph-scraper'
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

const FILE_PATH = path.resolve(__dirname, '../grupos.txt')

async function importGroups() {
    if (!fs.existsSync(FILE_PATH)) {
        console.error('❌ Arquivo grupos.txt não encontrado na raiz!')
        return
    }

    const content = fs.readFileSync(FILE_PATH, 'utf8')
    const links = content.split('\n')
        .map(l => l.trim())
        .filter(l => l.startsWith('http') && !l.startsWith('#'))

    console.log(`🔍 Encontrados ${links.length} links para importar...`)

    for (const link of links) {
        // Verifica duplicidade
        const { data: existente } = await supabase.from('grupos').select('id').eq('link', link).single()
        if (existente) {
            console.log(`⚠️ Já existe: ${link}`)
            continue
        }

        console.log(`🔄 Processando: ${link}`)

        // Extrai metadados
        let title = 'Grupo WhatsApp'
        let description = 'Clique para entrar no grupo'
        let image = null

        try {
            const { result } = await ogs({ url: link })
            if (result.success) {
                if (result.ogTitle) title = result.ogTitle.replace('Convite para grupo do WhatsApp', '').trim() || title
                if (result.ogDescription) description = result.ogDescription
                if (result.ogImage && result.ogImage.length > 0) image = result.ogImage[0].url
            }
        } catch (e) {
            console.log('   ⚠️ Erro lendo metadados (usando padrão).')
        }

        const grupo = {
            nome: title,
            descricao: description,
            link: link,
            status: 'aprovado',
            imagem_url: image, // Null é aceito
            categoria: 'outros' // Padrão
        }

        const { error } = await supabase.from('grupos').insert([grupo])

        if (error) console.error(`   ❌ Erro BD: ${error.message}`)
        else console.log(`   ✅ Importado: ${title}`)
    }

    console.log('🏁 Importação concluída!')
}

importGroups()
