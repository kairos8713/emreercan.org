import type { Metadata } from 'next';
import { Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Emre Ercan — Builder & Developer',
    template: '%s | Emre Ercan',
  },
  description:
    'Personal portfolio and technical blog for Emre Ercan — builder of automation systems, ML experiments, and content pipelines.',
  metadataBase: new URL('https://emreercan.org'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://emreercan.org',
    siteName: 'Emre Ercan',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
