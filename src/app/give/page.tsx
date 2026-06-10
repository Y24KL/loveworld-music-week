"use client";

import { useState } from "react";
import { Heart, ShieldCheck, Loader2, CreditCard } from "lucide-react";

export default function GivePage() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    try {
      setLoading(true);
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email }), // No redundant currency switches passed out
      });

      const data = await response.json();

      if (response.ok && data.checkoutUrl) {
        // Safe directional route pass directly out to the merchant checkout terminal
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || "Failed to finalize checkout redirect sequence");
      }
    } catch (error: any) {
      console.error("Payment initialization sequence caught error:", error);
      alert(`Gateway Error: ${error.message || "Could not initialize transaction session."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center pt-24 pb-12 px-4 sm:px-8 relative overflow-hidden">
      {/* Subtle Cinematic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative z-10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-500/10 rounded-full border border-amber-500/20">
            <Heart size={32} className="text-amber-500" />
          </div>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">Partner With Us</h1>
          <p className="text-sm text-gray-400">
            Partner with LoveWorld Music Ministry. Your giving fuels our mission to reach the Last Man through our Songs.
          </p>
        </div>

        <form onSubmit={handleGive} className="space-y-5">
          <div className="space-y-4">
            {/* Email Address Field */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">Email Address</label>
              <input
                type="email"
                required
                placeholder="partner@loveworld.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-all"
              />
            </div>

            {/* Amount Input with Fixed Currency Badge Accent */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">Partnership Seed Amount</label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-neutral-900/60 border border-white/10 rounded-xl pl-4 pr-16 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all"
                />
                <div className="absolute right-3 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-semibold text-amber-500 pointer-events-none select-none tracking-wider">
                  ESP
                </div>
              </div>
            </div>
          </div>

          {/* Form Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-neutral-900 disabled:to-neutral-900 text-neutral-950 disabled:text-neutral-600 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/5 disabled:shadow-none active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Initializing Portal...</span>
              </>
            ) : (
              <>
                <CreditCard size={18} />
                <span>Complete Partnership Seed</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-gray-500">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Secured via official KingsPay Espees Wallet Gateway</span>
        </div>
      </div>
    </div>
  );
}