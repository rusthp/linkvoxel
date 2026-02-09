import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Group } from '@/types/group'
import GroupList from '@/components/GroupList'
import SocialProofBanner from '@/components/SocialProofBanner'
import { Users, MessageCircle, Grid3X3, Search, ArrowRight, Plus, CheckCircle, Zap } from 'lucide-react'

export const revalidate = 0

export default async function Home() {
  const supabase = await createClient()

  // Filtro de 7 dias
  const dataLimite = new Date()
  dataLimite.setDate(dataLimite.getDate() - 7)

  const { data: grupos, error } = await supabase
    .from('grupos')
    .select('*')
    .eq('status', 'aprovado')
    .gte('created_at', dataLimite.toISOString())
    .order('destaque', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) console.error('Error:', error)

  // Filtra duplicados
  const uniqueGroupsMap = new Map()
  grupos?.forEach((g: Group) => {
    if (g.link && !uniqueGroupsMap.has(g.link)) {
      uniqueGroupsMap.set(g.link, g)
    }
  })

  const listaGrupos = Array.from(uniqueGroupsMap.values()) as Group[]

  // Stats
  const totalGrupos = listaGrupos.length
  const totalCliques = listaGrupos.reduce((sum, g) => sum + (g.cliques || 0), 0)

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              LV
            </div>
            <span className="text-white">Link<span className="text-emerald-400">Voxel</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#categorias" className="hover:text-white transition">Categorias</a>
            <a href="#grupos" className="hover:text-white transition">Grupos</a>
            <a href="#como-funciona" className="hover:text-white transition">Como funciona</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-sm text-slate-400 hover:text-white transition hidden sm:block">
              Entrar
            </Link>
            <Link
              href="/submit"
              className="bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-emerald-600 transition flex items-center gap-2"
            >
              Cadastrar grupo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),transparent_50%)]"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            +{totalGrupos > 0 ? totalGrupos : 500} grupos disponíveis
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Encontre seu <span className="text-gradient">grupo</span><br />
            perfeito
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            O maior diretório de grupos do WhatsApp. Descubra comunidades incríveis, conecte-se com pessoas e compartilhe seus interesses.
          </p>

          {/* Search Bar no Hero */}
          <form action="#grupos" className="max-w-xl mx-auto mb-12">
            <div className="flex bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="flex items-center pl-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Buscar grupos por nome ou categoria..."
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-slate-500 outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-500 text-white font-bold px-6 hover:bg-emerald-600 transition flex items-center gap-2"
              >
                Buscar
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-bold text-white">{totalGrupos > 0 ? totalGrupos : '500'}+</span>
                <span className="text-slate-400 ml-1">Grupos ativos</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-bold text-white">{totalCliques > 0 ? totalCliques : '50'}k+</span>
                <span className="text-slate-400 ml-1">Acessos</span>
              </div>
            </div>
            <div className="flex items-center gap-2 hidden sm:flex">
              <Grid3X3 className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-bold text-white">20+</span>
                <span className="text-slate-400 ml-1">Categorias</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Diretório de Grupos */}
      <main id="grupos" className="max-w-7xl mx-auto px-4 py-16">
        <GroupList initialGroups={listaGrupos} />
      </main>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Como <span className="text-emerald-400">funciona</span>
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Em poucos passos você encontra e entra nos melhores grupos
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Search, title: 'Busque', desc: 'Pesquise por nome, categoria ou tema' },
              { icon: Grid3X3, title: 'Escolha', desc: 'Explore os grupos disponíveis' },
              { icon: MessageCircle, title: 'Entre', desc: 'Clique no link e entre direto' },
              { icon: Zap, title: 'Aproveite', desc: 'Conecte-se com pessoas incríveis' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full text-xs font-bold flex items-center justify-center text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-1">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent"></div>
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Plus className="w-6 h-6 text-emerald-400" />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Tem um grupo? <span className="text-emerald-400">Divulgue aqui!</span>
          </h2>
          <p className="text-slate-400 mb-8">
            Cadastre seu grupo gratuitamente e alcance milhares de pessoas interessadas no seu conteúdo
          </p>

          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-600 transition"
          >
            Cadastrar meu grupo
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex justify-center gap-6 mt-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Aprovação manual
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              100% gratuito
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-white text-xs font-bold">LV</div>
            <span className="text-sm text-slate-400">LinkVoxel</span>
          </div>

          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/termos" className="hover:text-white transition">Termos</Link>
            <Link href="/privacidade" className="hover:text-white transition">Privacidade</Link>
            <Link href="/faq" className="hover:text-white transition">Contato</Link>
          </div>

          <span className="text-sm text-slate-500">Feito com 💚 LinkVoxel © 2026</span>
        </div>
      </footer>

      <SocialProofBanner />
    </div>
  )
}
