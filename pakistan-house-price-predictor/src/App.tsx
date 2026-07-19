import { Navbar, Footer } from './components/Layout';
import { Hero, AboutModel } from './components/Content';
import { Predictor } from './components/Predictor';
import { Analytics } from './components/Analytics';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <Predictor />
        <Analytics />
        <AboutModel />
      </main>
      <Footer />
    </div>
  );
}
