import { motion } from 'motion/react';
import { Home, BarChart2, Info, Github, Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Predict Price', href: '#predict', icon: BarChart2 },
    { name: 'About Model', href: '#about', icon: Info },
    { name: 'GitHub', href: 'https://github.com/SyedaSundas87/Pakistan-House_Price_Predecition', icon: Github },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-sm py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Home className="w-6 h-6" />
            </div>
            <span className="text-slate-900 font-bold text-xl tracking-tight hidden sm:block">
              Pakistan House Price Predictor
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 bg-white/50 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-200 shadow-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white shadow-sm border border-slate-200 text-slate-600"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full top-full left-0"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-3 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-white font-semibold text-lg">PHPP</span>
            </div>
            <p className="text-sm max-w-sm mb-6 leading-relaxed">
              Predicting house prices across Pakistan using advanced Machine Learning algorithms. Empowering buyers, sellers, and real estate professionals.
            </p>
          </div>
          <div>
            <h4 className="text-slate-100 font-medium mb-4">Built With</h4>
            <ul className="space-y-2 text-sm">
              <li>Python & FastAPI</li>
              <li>XGBoost & Scikit-Learn</li>
              <li>React & Tailwind CSS</li>
              <li>Framer Motion</li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-100 font-medium mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
              <li><a href="https://github.com/SyedaSundas87/Pakistan-House_Price_Predecition" className="hover:text-blue-400 transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">About the Author</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Pakistan House Price Predictor. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
