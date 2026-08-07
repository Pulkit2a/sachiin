import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Bot,
  Activity,
  Upload,
  Send,
  Star,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Clock,
  Zap,
} from 'lucide-react';
import { sampleAIDiagnostics, sampleHeroes } from '../../data/mockData';

interface AIFeaturesProps {
  initialScreen: 'identifier' | 'diagnostics' | 'chat' | 'matching';
  onBookService: (serviceId: string) => void;
  onBack: () => void;
}

export const AIFeatures: React.FC<AIFeaturesProps> = ({
  initialScreen,
  onBookService,
  onBack,
}) => {
  const [activeScreen, setActiveScreen] = useState(initialScreen);

  // AI Identifier State
  const [issueDescription, setIssueDescription] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [identifierResult, setIdentifierResult] = useState<{
    detectedService: string;
    issueType: string;
    estimatedCost: string;
    urgency: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // AI Diagnostics Report Modal
  const [showFullReportModal, setShowFullReportModal] = useState(false);

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm Hero AI Assistant 👋. Ask me anything about home maintenance, repair quotes, or book a service directly!",
      time: '09:41 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleRunAIIdentifier = () => {
    if (!issueDescription && !uploadedPhoto) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      setIdentifierResult({
        detectedService: 'Split AC Deep Foam Cleaning & Gas Top-Up',
        issueType: 'Low Gas Pressure & Dust Clogged Cooling Coil',
        estimatedCost: '₹1,200 - ₹1,650',
        urgency: 'Medium (Schedule within 48 hrs to prevent compressor overheating)',
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput, time: '09:42 AM' };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      let aiResponse = "I can schedule a verified Hero for you in HSR Layout right away! Would you like to book for Today at 02:30 PM?";
      if (chatInput.toLowerCase().includes('ac') || chatInput.toLowerCase().includes('cool')) {
        aiResponse = "Based on summer weather trends, a Split AC Deep Foam Clean (₹699) + R32 gas check will restore 100% cooling. Shall I reserve a slot?";
      } else if (chatInput.toLowerCase().includes('clean') || chatInput.toLowerCase().includes('house')) {
        aiResponse = "Full Home Deep Cleaning (2 BHK) is currently on 30% discount at ₹2,999 with a 3-hero team using steam sanitization!";
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiResponse, time: '09:42 AM' },
      ]);
    }, 800);
  };

  return (
    <div className="flex-1 bg-[#F6F7F9] text-[#0D182A] flex flex-col h-full pb-6">
      {/* AI Features Header & Tabs */}
      <div className="bg-[#0D182A] text-white pt-4 pb-4 px-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F5C542]" />
            <h2 className="font-heading font-bold text-base text-white">Hero AI Intelligence</h2>
          </div>

          <button onClick={onBack} className="text-xs text-slate-400 hover:text-white font-bold">
            Back to Home
          </button>
        </div>

        {/* Inner Feature Selector Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-[10px]">
          <button
            onClick={() => setActiveScreen('identifier')}
            className={`py-1.5 rounded-xl font-bold transition-all text-center ${
              activeScreen === 'identifier' ? 'bg-[#F5C542] text-[#0D182A]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Identifier
          </button>
          <button
            onClick={() => setActiveScreen('diagnostics')}
            className={`py-1.5 rounded-xl font-bold transition-all text-center ${
              activeScreen === 'diagnostics' ? 'bg-[#F5C542] text-[#0D182A]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Diagnostics
          </button>
          <button
            onClick={() => setActiveScreen('chat')}
            className={`py-1.5 rounded-xl font-bold transition-all text-center ${
              activeScreen === 'chat' ? 'bg-[#F5C542] text-[#0D182A]' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Chat
          </button>
          <button
            onClick={() => setActiveScreen('matching')}
            className={`py-1.5 rounded-xl font-bold transition-all text-center ${
              activeScreen === 'matching' ? 'bg-[#F5C542] text-[#0D182A]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Matching
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {/* SCREEN 1: AI SERVICE IDENTIFIER */}
        {activeScreen === 'identifier' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-heading font-bold text-sm text-[#0D182A] flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#F5C542]" />
                AI Issue Detector & Cost Estimator
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload a photo or describe the home problem. AI instantly identifies the service & price.
              </p>

              {/* Photo Upload Simulation */}
              <div
                onClick={() => setUploadedPhoto('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80')}
                className="mt-3 border-2 border-dashed border-slate-300 hover:border-[#F5C542] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50"
              >
                {uploadedPhoto ? (
                  <div className="relative group">
                    <img src={uploadedPhoto} alt="Issue" className="w-full h-32 object-cover rounded-xl" />
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                      Photo Attached ✓
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <div className="text-xs font-bold text-[#0D182A]">Tap to upload photo of issue</div>
                    <div className="text-[10px] text-slate-400">e.g. AC leaking water, broken tap, burnt socket</div>
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div className="mt-3">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Or describe the problem in words:
                </label>
                <textarea
                  rows={3}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="e.g., My Split AC is making a rattling noise and water is dripping from the indoor unit..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#F5C542]"
                />
              </div>

              <button
                onClick={handleRunAIIdentifier}
                disabled={isAnalyzing}
                className="w-full mt-3 bg-[#F5C542] text-[#0D182A] py-2.5 rounded-xl font-extrabold text-xs hover:bg-amber-300 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isAnalyzing ? 'Analyzing Issue with AI...' : 'Analyze Issue & Estimate Cost'}
              </button>
            </div>

            {/* Result Card */}
            {identifierResult && (
              <div className="bg-[#0D182A] text-white p-4 rounded-2xl border border-slate-800 shadow-xl space-y-3 animate-in fade-in slide-in-from-bottom duration-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] uppercase font-bold text-[#F5C542]">
                    AI Detection Result
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    96% Confidence
                  </span>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    {identifierResult.detectedService}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    <strong>Diagnosis:</strong> {identifierResult.issueType}
                  </p>
                </div>

                <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Estimated Price</span>
                    <span className="font-bold text-[#F5C542]">{identifierResult.estimatedCost}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Urgency</span>
                    <span className="text-amber-400 font-medium text-[11px]">{identifierResult.urgency}</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookService('ac_deep_clean')}
                  className="w-full bg-[#F5C542] text-[#0D182A] py-2.5 rounded-xl font-bold text-xs hover:bg-amber-300 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  Book Instant Repair <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* SCREEN 2: AI DIAGNOSTICS & HOME WELLNESS SCORE */}
        {activeScreen === 'diagnostics' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                AI Home Diagnostic Scanner
              </span>

              {/* Circular Gauge Score */}
              <div className="my-4 relative w-36 h-36 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="60" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#22C55E"
                    strokeWidth="12"
                    strokeDasharray="377"
                    strokeDashoffset="22"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="font-heading font-extrabold text-3xl text-[#0D182A]">
                    {sampleAIDiagnostics.overallScore}%
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Wellness</span>
                </div>
              </div>

              <h3 className="font-heading font-bold text-sm text-[#0D182A]">
                Your Home Wellness Status is Great!
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Last scanned: {sampleAIDiagnostics.lastScannedDate}
              </p>

              <button
                onClick={() => setShowFullReportModal(true)}
                className="mt-3 bg-[#0D182A] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
              >
                View Full Diagnostic Report
              </button>
            </div>

            {/* Suggestions List */}
            <div>
              <h4 className="font-heading font-bold text-xs text-[#0D182A] mb-2">
                AI Actionable Maintenance Suggestions
              </h4>

              <div className="space-y-2.5">
                {sampleAIDiagnostics.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3"
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        item.status === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.status === 'warning' ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#0D182A]">{item.title}</span>
                        <span className="text-[10px] font-mono font-bold text-slate-500">{item.score}% Score</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">{item.recommendation}</p>

                      {item.serviceIdToBook && (
                        <button
                          onClick={() => onBookService(item.serviceIdToBook!)}
                          className="mt-2 text-[11px] font-bold text-[#0D182A] bg-[#F5C542] px-2.5 py-1 rounded-lg hover:bg-amber-300 transition-colors"
                        >
                          Book Preventive Fix →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3: AI ASSISTANT CHATBOT */}
        {activeScreen === 'chat' && (
          <div className="flex flex-col h-[520px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Chat Messages List */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-[#0D182A] text-[#F5C542] flex items-center justify-center font-bold text-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0D182A] text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Ask Hero AI (e.g. How much is AC gas topup?)..."
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#F5C542]"
              />
              <button
                onClick={handleSendChatMessage}
                className="bg-[#F5C542] text-[#0D182A] p-2 rounded-xl hover:bg-amber-300 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: SMART MATCHING RESULTS */}
        {activeScreen === 'matching' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-[#0D182A]">
                Smart Matched Professionals Near You
              </h3>
              <span className="text-xs text-[#0D182A] bg-amber-100 font-bold px-2 py-0.5 rounded-full">
                AI Match Matrix
              </span>
            </div>

            {sampleHeroes.map((hero) => (
              <div
                key={hero.id}
                className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={hero.avatar}
                    alt={hero.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xs text-[#0D182A]">{hero.name}</span>
                      <span className="text-xs font-extrabold text-[#0D182A] bg-[#F5C542] px-2 py-0.5 rounded-full">
                        {hero.aiMatchScore}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{hero.category} • {hero.locationName}</p>
                    <div className="flex items-center gap-2 text-xs text-amber-500 font-bold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {hero.rating} ({hero.jobsCompleted} jobs)
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100 text-[10px]">
                  {hero.skills.map((skill, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onBookService('ac_deep_clean')}
                  className="w-full bg-[#0D182A] text-white py-2 rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Instant Book {hero.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide-Over Modal for Full Diagnostic Report */}
      {showFullReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F5C542]" />
                <h3 className="font-heading font-bold text-base text-[#0D182A]">Full Diagnostic Report</h3>
              </div>
              <button onClick={() => setShowFullReportModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 space-y-2 text-xs text-slate-700">
              <p>
                <strong>Property:</strong> #402, Sunshine Apartments, HSR Layout
              </p>
              <p>
                <strong>Scan Hardware:</strong> Hero AI Sensor Audit & Manual Image Recognition
              </p>
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-emerald-900">
                ✅ Overall home infrastructure safety index is 94%. Next recommended maintenance in 45 days.
              </div>
            </div>

            <button
              onClick={() => setShowFullReportModal(false)}
              className="w-full bg-[#F5C542] text-[#0D182A] py-2.5 rounded-xl font-bold text-xs"
            >
              Close Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
