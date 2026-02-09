export interface Group {
    id: string
    nome: string
    descricao: string | null
    link: string
    categoria: string
    status: 'pendente' | 'aprovado' | 'rejeitado'
    destaque?: boolean
    cliques?: number
    imagem_url?: string | null
    created_at: string
}
