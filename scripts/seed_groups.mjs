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

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Erro: Variáveis de ambiente não encontradas em .env.local')
    process.exit(1)
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const GRUPOS_TESTE = [
    {
        nome: 'Figurinhas Zueira Total 🤣',
        descricao: 'O melhor grupo de figurinhas e memes atualizados todo dia! Entre e divirta-se.',
        categoria: 'figurinhas',
        link: 'https://chat.whatsapp.com/ExemploFigurinhas01',
        status: 'aprovado',
        destaque: true
    },
    {
        nome: 'Promoções e Bugs 🛍️',
        descricao: 'Achadinhos da Shopee, Amazon e AliExpress. Só as melhores ofertas.',
        categoria: 'promocoes',
        link: 'https://chat.whatsapp.com/ExemploPromocoes01',
        status: 'aprovado',
        destaque: true
    },
    {
        nome: 'Free Fire Squad 🎮',
        descricao: 'Grupo para fechar squad, pegar mestre e participar de campeonatos diários.',
        categoria: 'jogos',
        link: 'https://chat.whatsapp.com/ExemploGames01',
        status: 'aprovado',
        destaque: false
    },
    {
        nome: 'Amizade Sincera BR 🇧🇷',
        descricao: 'Grupo para fazer amigos de todo o Brasil. Respeito acima de tudo!',
        categoria: 'amizade',
        link: 'https://chat.whatsapp.com/ExemploAmizade01',
        status: 'aprovado',
        destaque: false
    },
    {
        nome: 'Animes & Mangás Otaku',
        descricao: 'Discussões sobre One Piece, Naruto, Jujutsu Kaisen e muito mais.',
        categoria: 'animes',
        link: 'https://chat.whatsapp.com/ExemploAnimes01',
        status: 'aprovado',
        destaque: false
    },
    {
        nome: 'Renda Extra Online 💸',
        descricao: 'Dicas de como ganhar dinheiro na internet, marketing digital e afiliados.',
        categoria: 'dinheiro',
        link: 'https://chat.whatsapp.com/ExemploDinheiro01',
        status: 'aprovado',
        destaque: false
    },
    {
        nome: 'Futebol Resenha ⚽',
        descricao: 'Debate sobre o Brasileirão, Libertadores e Champions League.',
        categoria: 'futebol',
        link: 'https://chat.whatsapp.com/ExemploFutebol01',
        status: 'aprovado',
        destaque: false
    },
    {
        nome: 'Citações e Poesias 📜',
        descricao: 'Frases motivacionais, trechos de livros e poesias diárias.',
        categoria: 'frases',
        link: 'https://chat.whatsapp.com/ExemploFrases01',
        status: 'aprovado',
        destaque: false
    },
    {
        nome: 'Receitas Deliciosas 🍳',
        descricao: 'Troca de receitas de bolos, salgados e doces. Tudo testado e aprovado.',
        categoria: 'outros',
        link: 'https://chat.whatsapp.com/ExemploReceitas01',
        status: 'aprovado',
        destaque: false
    },
    {
        nome: 'Filmes e Séries Nerd 🍿',
        descricao: 'Comente sobre os lançamentos da Netflix, Prime Video e cinema.',
        categoria: 'filmes',
        link: 'https://chat.whatsapp.com/ExemploFilmes01',
        status: 'aprovado',
        destaque: false
    },
    {
        nome: 'Vagas de Emprego SP 💼',
        descricao: 'Vagas de emprego e estágio para São Paulo e região. Atualizado diariamente.',
        categoria: 'emprego',
        link: 'https://chat.whatsapp.com/ExemploVagas01',
        status: 'aprovado',
        destaque: false
    },
    {
        nome: 'Carros Rebaixados e Som 🚗',
        descricao: 'Paixão automotiva, som automotivo e eventos.',
        categoria: 'carros',
        link: 'https://chat.whatsapp.com/ExemploCarros01',
        status: 'aprovado',
        destaque: false
    }
]

async function seed() {
    console.log('🌱 Iniciando seed...')

    // Inserir um por um para validar duplicidade
    for (const grupo of GRUPOS_TESTE) {
        // Verificar se existe pelo link
        const { data: existente } = await supabase
            .from('grupos')
            .select('id')
            .eq('link', grupo.link)
            .single()

        if (!existente) {
            const { error } = await supabase.from('grupos').insert([grupo])
            if (error) console.error(`❌ Erro criando ${grupo.nome}:`, error.message)
            else console.log(`✅ Criado: ${grupo.nome}`)
        } else {
            console.log(`⚠️ Já existe: ${grupo.nome}`)
        }
    }
    console.log('🏁 Seed finalizado!')
}

seed()
