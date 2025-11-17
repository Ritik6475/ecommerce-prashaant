import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '../store/ReduxProvider';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Elegant Vogue - Premium Clothing Store',
  description: 'Discover the latest in fashion with Elegant Vogue. Shop premium clothing for men, women, and kids.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>

          <Header />

          {/* FIXED padding based on your header height */}
          <main className="min-h-screen pt-[130px]">
            {children}
          </main>

          <Footer />

          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          
        </ReduxProvider>
      </body>
    </html>
  );
}
