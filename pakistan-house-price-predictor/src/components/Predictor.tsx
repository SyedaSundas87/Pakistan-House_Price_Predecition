import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Loader2, Home, CheckCircle2, TrendingUp, AlertCircle, Building, MapPin, Grid, Bath, BedDouble, Car, Calendar, ShieldCheck } from 'lucide-react';
import { FormData, PredictionResponse } from '../types';

export function Predictor() {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    stories: '',
    parkingSpaces: '',
    propertyType: '',
    purpose: '',
    condition: '',
    yearBuilt: '',
    nearbySchools: false,
    nearbyHospital: false,
    nearbyMarket: false,
    nearbyMosque: false,
    nearbyPark: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    // Real API Call
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: formData.location,
          area: Number(formData.area) || 0,
          bedrooms: Number(formData.bedrooms) || 0,
          bathrooms: Number(formData.bathrooms) || 0,
          propertyType: formData.propertyType,
          purpose: formData.purpose || 'For Sale',
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server error: ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
      
      // Scroll to result on mobile
      setTimeout(() => {
        const resultEl = document.getElementById('prediction-result');
        if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
      
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Prediction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="predict" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Form Column */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ShieldCheck className="text-blue-500 w-6 h-6" />
                  Property Details
                </h2>
                <p className="text-slate-500 text-sm">Fill in the specifications to get an accurate market value estimate.</p>
              </div>

              <form onSubmit={handlePredict} className="space-y-8">
                
                {/* Primary Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" /> City / Location
                    </label>
                    <select
                      required
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="">Select City</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Bahawalpur">Bahawalpur</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400" /> Property Type
                    </label>
                    <select
                      required
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="">Select Type</option>
                      <option value="House">House</option>
                      <option value="Upper Portion">Upper Portion</option>
                      <option value="Lower Portion">Lower Portion</option>
                      <option value="Flat">Flat</option>
                      <option value="Farm House">Farm House</option>
                    </select>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Grid className="w-4 h-4 text-slate-400" /> Area (Sq.Ft)
                    </label>
                    <input
                      required
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. 2250"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-slate-400" /> Beds
                    </label>
                    <input
                      required
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      placeholder="3"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Bath className="w-4 h-4 text-slate-400" /> Baths
                    </label>
                    <input
                      required
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      placeholder="3"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Additional Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Stories</label>
                    <input
                      type="number"
                      name="stories"
                      value={formData.stories}
                      onChange={handleInputChange}
                      placeholder="2"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Car className="w-4 h-4 text-slate-400 hidden sm:block"/> Parking
                    </label>
                    <input
                      type="number"
                      name="parkingSpaces"
                      value={formData.parkingSpaces}
                      onChange={handleInputChange}
                      placeholder="1"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Condition</label>
                    <select
                      required
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="">Select</option>
                      <option value="New">New</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Average">Average</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 hidden sm:block" /> Year
                    </label>
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleInputChange}
                      placeholder="2022"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Purpose</label>
                    <select
                      required
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all block"
                    >
                      <option value="For Sale">For Sale</option>
                    </select>
                </div>

                {/* Amenities */}
                <div className="pt-6 border-t border-slate-100">
                  <label className="text-sm font-medium text-slate-700 block mb-4">Nearby Amenities</label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { id: 'nearbySchools', label: 'Schools' },
                      { id: 'nearbyHospital', label: 'Hospital' },
                      { id: 'nearbyMarket', label: 'Market' },
                      { id: 'nearbyMosque', label: 'Mosque' },
                      { id: 'nearbyPark', label: 'Park' },
                    ].map((amenity) => (
                      <label key={amenity.id} className="relative flex items-start cursor-pointer group">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            name={amenity.id}
                            checked={formData[amenity.id as keyof FormData] as boolean}
                            onChange={handleInputChange}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 focus:ring-2 bg-slate-50"
                          />
                        </div>
                        <div className="ml-2 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                          {amenity.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Analyzing Market Data...
                      </>
                    ) : (
                      'Predict House Price'
                    )}
                  </motion.button>
                </div>

              </form>
            </motion.div>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-4" id="prediction-result">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800 h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-6 relative z-10" />
                  <h3 className="text-xl font-bold text-white mb-2 relative z-10">Processing Data...</h3>
                  <p className="text-slate-400 text-sm max-w-[200px] relative z-10">
                    Running XGBoost regression tree paths to estimate value.
                  </p>
                </motion.div>
              )}

              {result && !isLoading && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(59,130,246,0.15)] border-2 border-blue-100 h-auto relative overflow-hidden group"
                >
                  {/* Decorative background glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl group-hover:bg-blue-200 transition-colors duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Home className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-slate-500 font-medium text-sm">Estimated Value</h3>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">Prediction Complete</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
                      >
                        {result.price}
                      </motion.div>
                    </div>

                    <div className="space-y-4 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-sm flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Confidence</span>
                        <span className="text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded text-sm">{result.confidence}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mb-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="bg-blue-500 h-1.5 rounded-full"
                        ></motion.div>
                      </div>
                      
                      <div className="pt-2 border-t border-slate-200/60">
                        <span className="text-slate-500 text-sm block mb-1">Expected Price Range</span>
                        <div className="flex justify-between items-center text-slate-900 font-medium">
                          <span>{result.rangeLow}</span>
                          <span className="text-slate-400">—</span>
                          <span>{result.rangeHigh}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-xs text-slate-400 text-center flex items-center justify-center gap-2">
                      <TrendingUp className="w-3 h-3" /> Based on current market conditions
                    </div>
                  </div>
                </motion.div>
              )}

              {!result && !isLoading && (
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 border-dashed h-[400px] flex flex-col items-center justify-center text-center text-slate-400">
                  <Home className="w-16 h-16 text-slate-300 mb-4" strokeWidth={1} />
                  <p>Enter property details and click predict to see the estimated valuation here.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
