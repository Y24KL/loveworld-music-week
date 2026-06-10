"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Download, Music, Video, FileText, Image as ImageIcon, Search, Loader2 } from "lucide-react";

// 1. FIXED INTERFACE: Mapped exactly to your database columns
interface Resource {
  id: string;
  title: string;
  category: string;
  download_url: string; // Changed from file_url
  download_count: number;
  description?: string;
  size?: string;        // Changed from file_size
  created_at: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Assets");

  useEffect(() => {
    async function fetchLiveResources() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("resources")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setResources(data || []);
      } catch (err) {
        console.error("Error standardizing live resource ingestion stream:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveResources();
  }, []);

  // 2. FIXED DOWNLOAD LOGIC: Forces hard download instead of opening a tab
  const handleDownload = async (id: string, downloadUrl: string, currentCount: number) => {
    if (!downloadUrl) return; // Failsafe if URL is missing
    
    try {
      // Appending ?download= forces the browser to save the file
      // Using "_self" prevents a useless blank tab from popping up
      window.open(`${downloadUrl}?download=`, "_self");

      setResources((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, download_count: item.download_count + 1 } : item
        )
      );

      await supabase
        .from("resources")
        .update({ download_count: currentCount + 1 })
        .eq("id", id);
    } catch (err) {
      console.error("Failed syncing download engagement count:", err);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Audio Track": return <Music size={18} className="text-amber-500" />;
      case "Video Clip": return <Video size={18} className="text-blue-400" />;
      case "PDF Document": return <FileText size={18} className="text-emerald-400" />;
      default: return <ImageIcon size={18} className="text-purple-400" />;
    }
  };

  const matchesTabFilter = (item: Resource, tab: string) => {
    if (tab === "All Assets") return true;
    if (tab === "Audio Assets" && item.category === "Audio Track") return true;
    if (tab === "Video Assets" && item.category === "Video Clip") return true;
    if (tab === "Documents" && item.category === "PDF Document") return true;
    if (tab === "Graphics" && item.category === "Graphic Asset") return true;
    return false;
  };

  const filteredResources = resources.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = matchesTabFilter(item, activeTab);
    return matchesSearch && matchesTab;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-neutral-950 text-white gap-4">
        <Loader2 className="animate-spin text-amber-500" size={36} />
        <p className="text-xs uppercase tracking-widest text-gray-500 animate-pulse">Syncing Content Repository...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {["All Assets", "Audio Assets", "Video Assets", "Graphics", "Documents"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all tracking-wide ${
                  activeTab === tab
                    ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search live assets or guidelines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/60 border border-white/5 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/30 transition-all"
            />
          </div>
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
            <p className="text-sm text-gray-500">No active uploads found matching your selection rules.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl">
                      {getCategoryIcon(resource.category)}
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      {resource.category === "Audio Track" ? "WAV / MP3" : 
                       resource.category === "Video Clip" ? "MP4 (4K)" : 
                       resource.category === "PDF Document" ? "PDF" : "Asset Link"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-gray-100 group-hover:text-white line-clamp-2 leading-snug">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {resource.description || "Official digital operational material released for site visitors and platform deployment."}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <div className="space-y-0.5 text-gray-500">
                    {/* 3. FIXED MAPPING: Now reads resource.size instead of resource.file_size */}
                    <div>Size: <span className="text-gray-400 font-medium">{resource.size || "Variable Size"}</span></div>
                    <div>Clicks: <span className="text-gray-400 font-medium">{resource.download_count?.toLocaleString() || "0"}</span></div>
                  </div>

                  <button
                    onClick={() => handleDownload(resource.id, resource.download_url, resource.download_count || 0)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-white/10 hover:border-amber-500/30 hover:bg-amber-500 hover:text-black font-bold rounded-xl text-gray-300 transition-all active:scale-95"
                  >
                    <Download size={12} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}