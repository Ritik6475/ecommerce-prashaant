'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, Facebook, Instagram, Twitter, Youtube, Phone, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (section) => setOpen(open === section ? null : section);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-neutral-900 text-neutral-200 pt-16 pb-10 border-t border-neutral-700 relative">


      <div className="container-custom">

        {/* DESKTOP SECTION */}
        <div className="hidden md:grid grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight uppercase">VOGUE</h2>
            <p className="text-sm mt-4 opacity-70 leading-relaxed">
              Premium fashion for everyday comfort and style. Designed with love.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="hover:text-white transition"><Instagram size={18}/></Link>
              <Link href="#" className="hover:text-white transition"><Facebook size={18}/></Link>
              <Link href="#" className="hover:text-white transition"><Twitter size={18}/></Link>
              <Link href="#" className="hover:text-white transition"><Youtube size={18}/></Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm tracking-wider uppercase font-semibold mb-5">Shop</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link href="/men" className="hover:opacity-100 transition">Men</Link></li>
              <li><Link href="/women" className="hover:opacity-100 transition">Women</Link></li>
              <li><Link href="/new" className="hover:opacity-100 transition">New Arrivals</Link></li>
              <li><Link href="/sale" className="hover:opacity-100 transition">Sale</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm tracking-wider uppercase font-semibold mb-5">Support</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link href="/contact" className="hover:opacity-100 transition">Contact Us</Link></li>
              <li><Link href="/returns" className="hover:opacity-100 transition">Returns & Refunds</Link></li>
              <li><Link href="/faq" className="hover:opacity-100 transition">FAQ</Link></li>
              <li className="flex items-center gap-2"><Phone size={14}/> +91 9876543210</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm tracking-wider uppercase font-semibold mb-5">Stay Updated</h3>
            <p className="text-sm opacity-70 mb-4">Be the first to know about new drops and exclusive deals.</p>
            <div className="flex items-center bg-neutral-800 px-3 py-2 rounded">
              <input type="email" placeholder="Enter your email" className="bg-transparent outline-none w-full text-sm"/>
              <button className="text-sm opacity-80 hover:opacity-100 transition">Subscribe</button>
            </div>
          </div>

        </div>

        {/* MOBILE ACCORDION SECTION */}
        <div className="md:hidden space-y-6 mb-10">
          {["Shop", "Support"].map(section => (
            <div key={section}>
              <button onClick={() => toggle(section)} className="w-full flex justify-between items-center py-2 text-sm uppercase tracking-wide">
                {section} <ChevronDown className={`${open===section && "rotate-180"} transition`} size={18}/>
              </button>
              {open === section && (
                <ul className="pl-2 space-y-3 text-sm opacity-80">
                  {section === "Shop" && ["Men","Women","New Arrivals","Sale"].map((item,i)=>(
                    <li key={i}><Link href="/" className="block">{item}</Link></li>
                  ))}
                  {section === "Support" && ["Contact Us","Returns & Refunds","FAQ"].map((item,i)=>(
                    <li key={i}><Link href="/" className="block">{item}</Link></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* STORE LOCATOR + APP DOWNLOAD */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-12">
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">Store Locator</h4>
            <p className="text-sm opacity-70 mb-2">Find a VOGUE store near you.</p>
            <Link href="/stores" className="text-sm underline hover:opacity-100 opacity-80">Locate Stores</Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">Download Our App</h4>
            <div className="flex gap-4">
              <Image src="/google-play.png" alt="Google Play" width={130} height={40}/>
              <Image src="/app-store.png" alt="App Store" width={130} height={40}/>
            </div>
          </div>
        </div>

        {/* PAYMENT ICONS */}
        <div className="flex flex-wrap items-center gap-4 opacity-80 pb-8 border-b border-neutral-700">
          <Image src="/payments/upi.png" alt="UPI" width={45} height={25}/>
          <Image src="/payments/visa.png" alt="Visa" width={45} height={25}/>
          <Image src="/payments/mastercard.png" alt="Mastercard" width={45} height={25}/>
          <Image src="/payments/razorpay.png" alt="Razorpay" width={70} height={25}/>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm opacity-70">
          <p>© 2024 Vogue Clothing. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:opacity-100 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:opacity-100 transition">Terms of Service</Link>
          </div>
        </div>

        {/* SCROLL BUTTON */}
        <button onClick={scrollToTop} className="absolute right-6 bottom-6 w-12 h-12 bg-white text-neutral-900 rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-200 transition">
          <ArrowUp size={20}/>
        </button>
      </div>
    </footer>
  );
}
