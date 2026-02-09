import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkVoxel - Os Melhores Grupos de WhatsApp e Telegram",
  description: "Descubra comunidades verificadas de promoções, marketing, tech e amizade. O diretório mais seguro para encontrar grupos de WhatsApp e Telegram.",
  keywords: ["grupos whatsapp", "grupos telegram", "links de grupos", "divulgar grupo", "comunidades", "promoções", "marketing digital"],
  openGraph: {
    title: "LinkVoxel - Os Melhores Grupos do Brasil",
    description: "Encontre ou divulgue sua comunidade. Diretório curado e seguro.",
    type: "website",
    locale: "pt_BR",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased text-slate-900 bg-slate-50`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X5D5373H7K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X5D5373H7K');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
