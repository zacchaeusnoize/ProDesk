import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProDesk — Everything clicks.',
  description:
    'The all-in-one operations dashboard for small businesses. CRM, docs, invoicing and inbox in one tab.',
  icons: { icon: '/assets/mark-click.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300..800;1,300..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=Caveat:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
