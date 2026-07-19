import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code2, Database, BrainCircuit, Activity } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-transparent blur-3xl rounded-full mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          Powered by XGBoost
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
        >
          Predict House Prices Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-600">Pakistan</span> Using AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Our sophisticated Machine Learning model estimates house prices instantly using real-world property details and market trends.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#predict"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
          >
            Predict Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium shadow-sm hover:bg-slate-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            Learn More
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="aspect-[16/9] bg-slate-100 rounded-2xl border border-slate-200/60 shadow-2xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Modern House" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function AboutModel() {
  const metrics = [
    { label: 'Algorithm', value: 'XGBoost Regressor', icon: BrainCircuit, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Hyperparameter Tuning', value: 'Random Search CV', icon: Code2, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'R-Squared Score', value: '0.942', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Cross Validation', value: '5-Fold', icon: Database, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <section id="about" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">About the Model</h2>
          <p className="text-lg text-slate-600">
            Our prediction engine uses an Extreme Gradient Boosting (XGBoost) model trained on hundreds of thousands of real estate records across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${metric.bg} ${metric.color} flex items-center justify-center mb-6`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">{metric.label}</h3>
              <p className="text-slate-900 text-xl font-bold">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <Database className="w-12 h-12 text-blue-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Continuous Learning Pipeline</h3>
            <p className="text-slate-300 mb-8 text-lg">
              The model is retrained monthly with the latest property listings to ensure predictions reflect current market dynamics in Lahore, Karachi, and Islamabad.
            </p>
            <div className="flex gap-8 text-center border-t border-slate-700/50 pt-8 w-full justify-center">
              <div>
                <p className="text-3xl font-bold text-blue-400">150K+</p>
                <p className="text-slate-400 text-sm mt-1">Properties Analyzed</p>
              </div>
              <div className="w-px bg-slate-700/50"></div>
              <div>
                <p className="text-3xl font-bold text-blue-400">12+</p>
                <p className="text-slate-400 text-sm mt-1">Cities Covered</p>
              </div>
              <div className="w-px bg-slate-700/50"></div>
              <div>
                <p className="text-3xl font-bold text-blue-400">30+</p>
                <p className="text-slate-400 text-sm mt-1">Features Extracted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
