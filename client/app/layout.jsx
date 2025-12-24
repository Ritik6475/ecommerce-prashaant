import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RouteLoader from '@/components/ui/RouteLoader';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });
 
export const metadata = {
  title: 'Elegant Vogue - Premium Clothing Store',
  description:
    'Discover the latest in fashion with Elegant Vogue. Shop premium clothing for men, women, and kids.',
};

export default function RootLayout({ children }) {
  return (
  
  <html lang="en">
    
      <body className={inter.className}>

        <Providers>

            <Header />
            <RouteLoader />    
            <div className="h-4"></div>
            <main className="min-h-screen pt-[130px]">
              {children}
            </main>

            <Footer />
          </Providers>

          </body>
          </html>

  );
}
