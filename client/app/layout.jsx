import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '../store/ReduxProvider';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RouteLoader from '@/components/ui/RouteLoader';
import GoogleProvider from './providers/GoogleProvider'; // <-- FIXED

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
        <GoogleProvider>
          <ReduxProvider>
            {/* HEADER */}
            <Header />

            {/* Add some margin below the Header */}
            <div className="h-4"></div>

            {/* GLOBAL ROUTE LOADING */}
            <RouteLoader />

            {/* PAGE CONTENT */}
            <main className="min-h-screen pt-[130px]">
              {children}
            </main>

            {/* FOOTER */}
            <Footer />

            {/* TOASTER */}
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
        </GoogleProvider>
      </body>
    </html>
  );
}
