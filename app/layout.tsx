import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Sasthi Boutique — Luxury Indian Fashion',
  description: 'Discover exquisite Indian ethnic wear — Sarees, Lehengas, Salwar Kameez & more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700;800;900&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <WhatsAppFloat />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0D1F15',
              color: '#E8C872',
              border: '1px solid #C9A84C',
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.05em',
              fontSize: '0.85rem',
            },
          }}
        />
      </body>
    </html>
  );
}
