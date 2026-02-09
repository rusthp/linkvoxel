
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Group } from '@/types/group'
import GroupList from '@/components/GroupList'
import SocialProofBanner from '@/components/SocialProofBanner'

export const revalidate = 0

export default async function Home() {
  const supabase = await createClient()

  // Filtro de 7 dias (grupos criados nos últimos 7 dias)
  const dataLimite = new Date()
  dataLimite.setDate(dataLimite.getDate() - 7)

  const { data: grupos, error } = await supabase
    .from('grupos')
    .select('*')
    .eq('status', 'aprovado')
    .gte('created_at', dataLimite.toISOString()) // Apenas grupos recentes
    .order('destaque', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) console.error('Error:', error)

  // Filtra duplicados (mantém apenas o primeiro encontrado para cada link, respeitando a ordem de relevância)
  const uniqueGroupsMap = new Map()
  grupos?.forEach((g: Group) => {
    if (g.link && !uniqueGroupsMap.has(g.link)) {
      uniqueGroupsMap.set(g.link, g)
    }
  })

  const listaGrupos = Array.from(uniqueGroupsMap.values()) as Group[]

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:scale-105 transition-transform">
              L
            </div>
            <span className="hidden sm:inline">LinkVoxel</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/afiliado" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition hidden sm:block">
              💎 Área Premium
            </Link>
            <Link
              href="/submit"
              className="bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-slate-800 transition shadow-sm hover:shadow-md"
            >
              Enviar Grupo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.05),transparent_50%)]"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Comunidades Verificadas
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
            Descubra onde <br />
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">acontece</span> de verdade.
          </h1>

          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Diretório curado de comunidades no WhatsApp e Telegram.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#directory"
              className="group bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Explorar Grupos
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Diretório com Busca e Filtros */}
      <main className="max-w-7xl mx-auto px-4 py-20 bg-white">
        <GroupList initialGroups={listaGrupos} />

        {/* Botão Falso de Boost - Validação de Interesse */}
        <div className="mt-16 p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Quer destacar seu grupo?</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Grupos em destaque recebem até 3x mais visibilidade. Em breve disponível.
          </p>
          <Link
            href="/boost-interesse"
            className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-full font-bold hover:bg-violet-700 transition shadow-lg"
          >
            Quero Destacar Meu Grupo
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-20 py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">L</div>
            <span className="text-sm font-semibold text-slate-700">LinkVoxel © 2026</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center text-sm text-slate-600">
            <Link href="/termos" className="hover:text-slate-900 transition">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-slate-900 transition">Política de Privacidade</Link>
            <Link href="/faq" className="hover:text-slate-900 transition">FAQ</Link>
          </div>

          <div className="flex gap-6 text-sm">
            <Link href="/submit" className="text-slate-600 hover:text-slate-900 font-medium">Enviar</Link>
            <Link href="/afiliado" className="text-slate-600 hover:text-violet-600 font-medium">Premium</Link>
          </div>
        </div>
      </footer>
      <SocialProofBanner />
    </div>
  )
}
