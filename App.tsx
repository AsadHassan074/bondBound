
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  Heart, 
  Info, 
  AlertTriangle, 
  ChevronRight, 
  Lock, 
  PenTool,
  Scale,
  Calendar,
  Zap,
  CheckCircle2,
  Trash2,
  Plus
} from 'lucide-react';
import { ContractFormData, DEFAULT_RULES, DURATIONS } from './types';
import { generateContractPDF } from './services/pdfService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<ContractFormData>({
    partnerAName: '',
    partnerBName: '',
    startDate: new Date().toISOString().split('T')[0],
    duration: 'Lifetime',
    consequenceAmount: '25,000',
    currency: 'PKR',
    rules: [DEFAULT_RULES[0], DEFAULT_RULES[1]],
    customRule: '',
  });

  const [step, setStep] = useState<'landing' | 'form' | 'success'>('landing');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRuleToggle = (rule: string) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.includes(rule)
        ? prev.rules.filter(r => r !== rule)
        : [...prev.rules, rule]
    }));
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    // Simulate generation delay for "official" feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    generateContractPDF(formData);
    setIsGenerating(false);
    setStep('success');
  };

  if (step === 'landing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fcfcf9]">
        <div className="max-w-3xl w-full text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 animate-pulse">
            <ShieldCheck size={12} /> Established 2024 • Strictly Binding*
          </div>
          
          <div className="space-y-6">
            <h1 className="serif text-6xl md:text-8xl font-bold tracking-tight text-black leading-none">
              BondBound
            </h1>
            <p className="serif text-xl md:text-2xl text-gray-600 italic max-w-xl mx-auto leading-relaxed">
              "Turn your promises into paper. Because love is a beautiful liability."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left py-12 border-y border-gray-200">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-lg mb-2">
                <Zap size={18} className="text-black" />
              </div>
              <h4 className="font-bold text-sm uppercase">Instant Issuance</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Generate your official-style contract in under 60 seconds. No legal fees, no waiting.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-lg mb-2">
                <Lock size={18} className="text-black" />
              </div>
              <h4 className="font-bold text-sm uppercase">Privacy First</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Zero data storage. Your relationship details never leave your browser.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-lg mb-2">
                <Scale size={18} className="text-black" />
              </div>
              <h4 className="font-bold text-sm uppercase">Symbolic Weight</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Perfect for Instagram stories, anniversaries, or just clarifying expectations.</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => setStep('form')}
              className="neo-brutalist bg-black text-white px-12 py-5 text-xl font-bold flex items-center gap-3 transition-all"
            >
              Draft Agreement <ChevronRight size={24} />
            </button>
            <p className="text-[10px] text-gray-400 max-w-sm uppercase tracking-widest font-medium">
              *Agreement is symbolic and for entertainment purposes only. Please don't sue your partner in actual court.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] pb-24 selection:bg-black selection:text-white">
      {/* Top Progress / Nav */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={() => setStep('landing')} style={{cursor: 'pointer'}}>
            <div className="bg-black p-1 text-white">
              <FileText size={20} />
            </div>
            <span className="serif font-bold text-xl tracking-tight">Bondpact</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2 text-black">
              <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">1</span>
              Drafting
            </div>
            <div className="w-8 h-[1px] bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">2</span>
              Execution
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-12 px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Input Form Column */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white p-8 md:p-10 paper-shadow rounded-sm border-t-4 border-black">
            <header className="mb-8">
              <h2 className="serif text-3xl font-bold mb-2">Contract Particulars</h2>
              <p className="text-sm text-gray-500">Specify the identities and core terms of the union.</p>
            </header>

            <div className="space-y-8">
              {/* Identity Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest group-focus-within:text-black transition-colors">Party A (Full Name)</label>
                  <input 
                    type="text" 
                    value={formData.partnerAName}
                    onChange={e => setFormData({...formData, partnerAName: e.target.value})}
                    placeholder="Enter Legal Name"
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-lg focus:border-black outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest group-focus-within:text-black transition-colors">Party B (Full Name)</label>
                  <input 
                    type="text" 
                    value={formData.partnerBName}
                    onChange={e => setFormData({...formData, partnerBName: e.target.value})}
                    placeholder="Enter Legal Name"
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-lg focus:border-black outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Timing Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest flex items-center gap-1">
                    <Calendar size={12} /> Commencement Date
                  </label>
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black outline-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest flex items-center gap-1">
                    <Scale size={12} /> Duration of Bond
                  </label>
                  <select 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black outline-none cursor-pointer appearance-none"
                  >
                    {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Rules Selection */}
              <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Mandatory Loyalty Clauses</h3>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold">{formData.rules.length} SELECTED</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {DEFAULT_RULES.map(rule => (
                    <div 
                      key={rule}
                      onClick={() => handleRuleToggle(rule)}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.rules.includes(rule) 
                        ? 'border-black bg-black/5 shadow-inner' 
                        : 'border-gray-100 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.rules.includes(rule) ? 'bg-black border-black text-white' : 'border-gray-300'
                      }`}>
                        {formData.rules.includes(rule) && <CheckCircle2 size={12} />}
                      </div>
                      <span className="text-sm font-medium">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Clause */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <Plus size={14} /> Add Custom Provision
                </div>
                <textarea 
                  value={formData.customRule}
                  onChange={e => setFormData({...formData, customRule: e.target.value})}
                  placeholder="Insert custom rule (e.g. 'Must provide regular emotional support via memes')"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-lg text-sm focus:ring-2 focus:ring-black/5 focus:border-black outline-none h-24 resize-none transition-all"
                />
              </div>

              {/* Consequences */}
              <div className="pt-8 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Penalty for Non-Compliance</h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2 group">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Restitution Amount</label>
                    <input 
                      type="text" 
                      value={formData.consequenceAmount}
                      onChange={e => setFormData({...formData, consequenceAmount: e.target.value})}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-lg font-mono focus:border-black outline-none"
                    />
                  </div>
                  <div className="w-32 space-y-2 group">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Currency</label>
                    <input 
                      type="text" 
                      value={formData.currency}
                      onChange={e => setFormData({...formData, currency: e.target.value})}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-lg font-mono focus:border-black outline-none uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 space-y-8">
            <div className="bg-white paper-shadow p-8 md:p-12 aspect-[1/1.41] relative flex flex-col overflow-hidden group">
              {/* Subtle Document Overlay */}
              <div className="absolute inset-0 pointer-events-none border-[1.5rem] border-white z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]"></div>
              
              <div className="flex-1 flex flex-col items-center relative z-0">
                <div className="text-center mb-10 w-full">
                  <div className="w-12 h-[2px] bg-black mx-auto mb-4"></div>
                  <h3 className="serif text-2xl font-bold uppercase tracking-widest border-y border-black/10 py-2 inline-block px-4">Agreement of Loyalty</h3>
                  <p className="text-[8px] tracking-[0.4em] uppercase text-gray-400 mt-2 font-bold">BondBound Official Instrument • No. {Math.floor(1000 + Math.random() * 9000)}</p>
                </div>

                <div className="w-full space-y-6 text-[10px] leading-relaxed text-justify serif text-gray-800">
                  <p>
                    <strong>PREAMBLE:</strong> This instrument confirms the exclusive emotional and physical partnership between 
                    <span className="font-bold underline decoration-dotted px-1">{formData.partnerAName || "________________"}</span> 
                    (Party A) and 
                    <span className="font-bold underline decoration-dotted px-1">{formData.partnerBName || "________________"}</span> 
                    (Party B), effective from <span className="font-bold">{formData.startDate}</span> for a term of <span className="font-bold">{formData.duration}</span>.
                  </p>

                  <div className="space-y-2">
                    <p className="font-bold uppercase tracking-wider text-[9px]">Article I: Covenants of Fidelity</p>
                    <div className="pl-4 space-y-1">
                      {formData.rules.map((r, i) => (
                        <p key={i} className="flex gap-2">
                          <span className="font-bold italic">1.{i+1}</span>
                          <span>{r}</span>
                        </p>
                      ))}
                      {formData.customRule && (
                        <p className="flex gap-2 font-bold italic">
                          <span>1.{formData.rules.length + 1}</span>
                          <span>{formData.customRule}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold uppercase tracking-wider text-[9px]">Article II: Liquidation of Damages</p>
                    <p>
                      Any material breach of Article I shall result in an immediate restitution payment of 
                      <span className="font-bold"> {formData.consequenceAmount} {formData.currency} </span> 
                      to the aggrieved party, alongside a formal apology.
                    </p>
                  </div>

                  <div className="pt-8 mt-auto flex justify-between items-end gap-8">
                    <div className="flex-1 text-center">
                      <div className="signature-font text-3xl h-10 flex items-center justify-center opacity-80">{formData.partnerAName}</div>
                      <div className="h-[1px] bg-black/20 w-full mb-1"></div>
                      <p className="uppercase font-bold tracking-tighter text-[7px] text-gray-400">Signature of Party A</p>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="signature-font text-3xl h-10 flex items-center justify-center opacity-80">{formData.partnerBName}</div>
                      <div className="h-[1px] bg-black/20 w-full mb-1"></div>
                      <p className="uppercase font-bold tracking-tighter text-[7px] text-gray-400">Signature of Party B</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-black/5 pt-4 w-full text-center">
                  <p className="text-[7px] italic text-gray-400 leading-tight uppercase tracking-widest">
                    This is a symbolic representation. BondBound is not responsible for any broken hearts, 
                    broken dishes, or actual legal consequences.
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleDownload}
              disabled={isGenerating || !formData.partnerAName || !formData.partnerBName}
              className={`w-full py-6 font-bold flex items-center justify-center gap-3 transition-all ${
                isGenerating || !formData.partnerAName || !formData.partnerBName 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'neo-brutalist bg-black text-white'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Sealing Document...
                </>
              ) : (
                <>
                  <Download size={20} /> Generate & Download Official PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {step === 'success' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
          <div className="bg-white max-w-lg w-full p-10 paper-shadow border-t-[10px] border-black text-center relative overflow-hidden">
             {/* Decorative Background Icons */}
             <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12 scale-150">
               <ShieldCheck size={200} />
             </div>
             
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            
            <h3 className="serif text-4xl font-bold mb-3 tracking-tight">Contract Validated</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your symbolic agreement has been finalized and downloaded. <br/>
              A digital copy has been destroyed from our memory (Privacy).
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => setStep('form')}
                className="w-full bg-black text-white py-4 font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} /> New Agreement
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-gray-100 text-gray-600 py-4 font-bold hover:bg-gray-200 transition-colors"
              >
                Return Home
              </button>
            </div>
            
            <p className="mt-8 text-[10px] uppercase font-bold text-gray-400 tracking-[0.3em]">
              Loyalty is the only currency.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
