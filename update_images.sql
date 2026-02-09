-- 1. Adicionar coluna imagem_url
ALTER TABLE grupos ADD COLUMN IF NOT EXISTS imagem_url TEXT;

-- 2. Atualizar grupos seed com imagens fictícias (placeholders) para teste visual
-- Nota: Em produção, isso virá do `open-graph-scraper`
UPDATE grupos SET imagem_url = 'https://picsum.photos/seed/' || id || '/400/200' WHERE destaque = true;
