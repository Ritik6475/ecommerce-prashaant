'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, Phone, ChevronDown, Mail, MapPin, Smartphone } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (section) => setOpen(open === section ? null : section);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-10 border-t border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP SECTION */}
        <div className="hidden md:grid grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-900 font-bold text-lg">V</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase">VOGUE</h2>
            </div>
            <p className="text-sm mt-4 text-gray-400 leading-relaxed">
              Premium fashion for everyday comfort and style. Designed with love.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  {/* <Image src="/social/instagram.svg" alt="Instagram" width={16} height={16} />
               */}
                </div>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  {/* <Image src="/social/facebook.svg" alt="Facebook" width={16} height={16} />
               */}
                </div>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  {/* <Image src="/social/twitter.svg" alt="Twitter" width={16} height={16} />
               */}
                </div>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  {/* <Image src="/social/youtube.svg" alt="YouTube" width={16} height={16} />
               */}
                </div>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm tracking-wider uppercase font-semibold mb-5 text-white">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/men" className="hover:text-white transition">Men</Link></li>
              <li><Link href="/women" className="hover:text-white transition">Women</Link></li>
              <li><Link href="/new" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link href="/sale" className="hover:text-white transition">Sale</Link></li>
            </ul>
          </div>

          {/* Support */}

          
          <div>
            <h3 className="text-sm tracking-wider uppercase font-semibold mb-5 text-white">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Returns & Refunds</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={14} className="text-gray-500"/> +91 9300104104
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm tracking-wider uppercase font-semibold mb-5 text-white">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">Be the first to know about new drops and exclusive deals.</p>
            <div className="flex items-center bg-gray-800 px-3 py-2 rounded">
              <Mail size={16} className="text-gray-500 mr-2" />
              <input type="email" placeholder="Enter your email" className="bg-transparent outline-none w-full text-sm text-gray-300 placeholder-gray-500"/>
              <button className="text-sm text-gray-300 hover:text-white transition">Subscribe</button>
            </div>
          </div>
        </div>

        {/* MOBILE ACCORDION SECTION */}
        <div className="md:hidden space-y-6 mb-10">
          {["Shop", "Support"].map(section => (
            <div key={section}>
              <button onClick={() => toggle(section)} className="w-full flex justify-between items-center py-2 text-sm uppercase tracking-wide text-white">
                {section} <ChevronDown className={`${open===section && "rotate-180"} transition text-gray-400`} size={18}/>
              </button>
              {open === section && (
                <ul className="pl-2 space-y-3 text-sm text-gray-400">
                  {section === "Shop" && ["Men","Women","New Arrivals","Sale"].map((item,i)=>(
                    <li key={i}><Link href="/" className="block hover:text-white transition">{item}</Link></li>
                  ))}
                  {section === "Support" && ["Contact Us","Returns & Refunds","FAQ"].map((item,i)=>(
                    <li key={i}><Link href="/" className="block hover:text-white transition">{item}</Link></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* STORE LOCATOR + APP DOWNLOAD */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-12">
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4 text-white flex items-center">
              <MapPin size={16} className="mr-2 text-gray-500" /> Store Locator
            </h4>
            <p className="text-sm text-gray-400 mb-2">Find a VOGUE store near you.</p>
            <Link href="/stores" className="text-sm underline hover:text-white transition text-gray-400">Locate Stores</Link>
          </div>

                </div>

        {/* PAYMENT ICONS */}
        <div className="flex flex-wrap items-center gap-4 text-gray-400 pb-8 border-b border-gray-800">
          <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
            <Image src="https://icon2.cleanpng.com/20180330/qzq/avc3fqk7p.webp" alt="UPI" width={30} height={20} />
          </div>
      
      
         
          <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
            <Image src="https://newcastlepartysales.com/wp-content/uploads/2025/02/png-transparent-razorpay-logo-tech-companies-thumbnail.png" alt="Razorpay" width={40} height={20} />
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-gray-400">
          <p>© 2024 Vogue Clothing. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>

        {/* SCROLL BUTTON */}
        <button onClick={scrollToTop} className="absolute right-6 bottom-6 w-12 h-12 bg-white text-gray-900 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-200 transition">
          <ArrowUp size={20}/>
        </button>
      </div>
    </footer>
  );
}