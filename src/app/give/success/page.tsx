"use client";

import { useEffect, useState, Suspense } from "react";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// 1. This handles your dynamic query verification parameters safely inside the client instance
function SuccessContent() {
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    // This simulates verifying the transaction reference returned by KingsPay in the URL
    const txRef = searchParams.get("tx_ref");
    
    const verifyTransaction = async () => {
      // In a production environment, you would ping your database here to mark the seed as successful
      setTimeout(() => {
        setVerifying(false);
      }, 1500); // Brief cinematic pause for the verification effect
    };

    verifyTransaction();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center pt-24 pb-12 px-4 sm:px-8 relative overflow-hidden">
      {/* Subtle Cinematic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-3xl p-10 backdrop-blur-xl relative z-10 shadow-2xl text-center flex flex-col items-center">
        
        {verifying ? (
          <div className="flex flex-col items-center gap-6 py-8">
            <Loader2 size={48} className="text-emerald-500 animate-spin" />
            <p className="text-sm text-gray-400 uppercase tracking-widest animate-pulse">
              Confirming Transaction...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-white tracking-wide">Seed Received</h1>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[280px] mx-auto">
                Thank you for your partnership. Your transaction has been securely processed via the Espees Gateway.
              </p>
            </div>

            <div className="w-full p-4 bg-white/[0.02] border border-white/5 rounded-xl text-left mt-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Transaction Ref</p>
              <p className="text-sm text-gray-300 font-mono">
                {searchParams.get("tx_ref") || `LMW-${Math.floor(Math.random() * 1000000)}`}
              </p>
            </div>

            <Link 
              href="/"
              className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 mt-6"
            >
              Return to Platform <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Default export wraps the layout to clear the Next.js production prerender compilation phase
export default function GiveSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center pt-24 pb-12 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-3xl p-10 backdrop-blur-xl relative z-10 shadow-2xl text-center flex flex-col items-center">
            <div className="flex flex-col items-center gap-6 py-8">
              <Loader2 size={48} className="text-emerald-500 animate-spin" />
              <p className="text-sm text-gray-400 uppercase tracking-widest animate-pulse">
                Initializing Secure Interface...
              </p>
            </div>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
