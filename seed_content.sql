-- Limpar grupos existentes (OPCIONAL - Remova se quiser manter os atuais)
-- DELETE FROM grupos;

-- Inserir 25 grupos variados para popular o diretório (Seed Inicial)
INSERT INTO grupos (nome, descricao, link, categoria, status, destaque) VALUES
-- PROMOÇÕES (Categoria Quente)
('Achadinhos da Shopee 🛍️', 'As melhores ofertas da Shopee garimpadas manualente todo dia. Cupom e frete grátis.', 'https://chat.whatsapp.com/seed1', 'promocoes', 'aprovado', true),
('Promo China Oficial 🇨🇳', 'Importação do AliExpress com taxas baixas. Dicas de como não ser taxado.', 'https://telegram.me/seed2', 'promocoes', 'aprovado', false),
('Bug das Milhas ✈️', 'Passagens aéreas com preços errados e promoções relâmpago.', 'https://chat.whatsapp.com/seed3', 'promocoes', 'aprovado', true),
('Descontos Tech 💻', 'Hardware, notebooks e periféricos com desconto real.', 'https://chat.whatsapp.com/seed4', 'promocoes', 'aprovado', false),
('Amazon Ofertas VIP', 'Grupo exclusivo para ofertas Prime e Lightning Deals.', 'https://telegram.me/seed5', 'promocoes', 'aprovado', false),

-- MARKETING / AFILIADOS (Público que paga boost)
('Afiliados Iniciantes 🚀', 'Dicas para fazer a primeira venda na Hotmart e Eduzz.', 'https://chat.whatsapp.com/seed6', 'afiliados', 'aprovado', true),
('Tráfego Pago Elite', 'Estratégias de Facebook Ads e Google Ads para escalar.', 'https://telegram.me/seed7', 'afiliados', 'aprovado', true),
('Networking Digital BR', 'Conexão entre copys, designers e gestores de tráfego.', 'https://discord.gg/seed8', 'afiliados', 'aprovado', false),
('Viver de YouTube 📹', 'Crescimento de canal, SEO para vídeos e monetização.', 'https://chat.whatsapp.com/seed9', 'afiliados', 'aprovado', false),
('Dropshipping na Prática', 'Fornecedores nacionais e mineração de produtos.', 'https://chat.whatsapp.com/seed10', 'afiliados', 'aprovado', false),

-- ESTUDOS (Alto volume de busca)
('Devs Frontend Junior', 'Ajuda com React, CSS e JavaScript para quem está começando.', 'https://discord.gg/seed11', 'estudos', 'aprovado', false),
('Inglês na Prática 🇺🇸', 'Conversação diária em inglês. Proibido falar português.', 'https://chat.whatsapp.com/seed12', 'estudos', 'aprovado', false),
('Foco ENEM 2026 📚', 'Materiais de estudo, redações nota 1000 e cronogramas.', 'https://telegram.me/seed13', 'estudos', 'aprovado', false),
('Concursos Públicos TI', 'Vagas e editais para área de tecnologia no setor público.', 'https://telegram.me/seed14', 'estudos', 'aprovado', false),
('Python Brasil', 'Dúvidas e projetos em Python e Data Science.', 'https://discord.gg/seed15', 'estudos', 'aprovado', false),

-- AMIZADE / SOCIAL (Engajamento)
('Resenha Futebol ⚽', 'Debate sobre rodada do Brasileirão e Liberta. Sem briga.', 'https://chat.whatsapp.com/seed16', 'amizade', 'aprovado', false),
('Gamers Unite 🎮', 'Procure duo para jogar valorant, lol e cs.', 'https://discord.gg/seed17', 'amizade', 'aprovado', false),
('Gatos e Gatinhos 🐱', 'Compartilhe fotos dos seus pets. Dicas de cuidados.', 'https://chat.whatsapp.com/seed18', 'amizade', 'aprovado', false),
('Filmes e Séries 🎬', 'Comentários sobre lançamentos Netflix e HBO.', 'https://telegram.me/seed19', 'amizade', 'aprovado', false),
('Livros e Café ☕', 'Clube do livro virtual. Leitura do mês: Duna.', 'https://chat.whatsapp.com/seed20', 'amizade', 'aprovado', false),

-- PROFISSIONAL
('Vagas Home Office 🏠', 'Vagas remotas reais para todo o Brasil.', 'https://linkedin.com/seed21', 'profissional', 'aprovado', true),
('Designers Freelancer', 'Dicas de precificação e portfólio para designers.', 'https://chat.whatsapp.com/seed22', 'profissional', 'aprovado', false),
('Advogados Online ⚖️', 'Networking jurídico e correspondentes.', 'https://chat.whatsapp.com/seed23', 'profissional', 'aprovado', false),
('Startup Founders', 'Discussão sobre investimentos, pitch e mvp.', 'https://chat.whatsapp.com/seed24', 'profissional', 'aprovado', false),
('Crypto News 📈', 'Notícias do mercado cripto e web3.', 'https://telegram.me/seed25', 'profissional', 'aprovado', false);
