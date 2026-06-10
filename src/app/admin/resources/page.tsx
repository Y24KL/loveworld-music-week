"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminUploadPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Audio Track");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setStatus({ type: "error", message: "Please select a file payload package to deploy." });
      return;
    }

    try {
      setIsUploading(true);
      setStatus(null);

      const fileExtension = file.name.split(".").pop();
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
      const safeCategoryName = category.toLowerCase().replace(/\s+/g, "-");
      const filePath = `${safeCategoryName}/${uniqueFileName}`;

      // Convert to ArrayBuffer to prevent HTTP/2 streaming crashes
      const fileBuffer = await file.arrayBuffer();

      // Upload the raw buffer
      const { error: storageError } = await supabase.storage
        .from("resource_vault")
        .upload(filePath, fileBuffer, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage
        .from("resource_vault")
        .getPublicUrl(filePath);

     // 4. Update database (FIXED COLUMN MAPPING)
      const calculatedSize = formatFileSize(file.size);
      const { error: dbError } = await supabase
        .from("resources")
        .insert([
          {
            title: title,
            category: category,
            description: description || null,
            download_url: publicUrl, // Must match your 'download_url' column
            size: calculatedSize,    // Must match your 'size' column
            type: category,          // Ensure this matches your 'type' column
            download_count: 0,
          },
        ]);

      if (dbError) throw dbError;

      setStatus({ type: "success", message: `"${title}" has been broadcast and deployed successfully!` });
      setTitle("");
      setDescription("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (err: any) {
      console.error("Critical Upload Pipeline Breakdown:", err);
      setStatus({ type: "error", message: err.message || "An unexpected storage injection error occurred." });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase tracking-widest">
          <ArrowLeft size={14} /> Back to Controller Overview
        </Link>
        
        <form onSubmit={handleFormSubmit} className="space-y-6 bg-white/[0.02] border border-white/5 rounded-2xl p-8">
          {status && (
            <div className={`p-4 rounded-xl border ${status.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"}`}>
              {status.message}
            </div>
          )}
          
          <input type="text" placeholder="Resource Title *" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-neutral-900 border border-white/10 rounded-xl p-3" />
          
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-neutral-900 border border-white/10 rounded-xl p-3">
            <option value="Audio Track">Audio Track</option>
            <option value="Video Clip">Video Clip</option>
            <option value="PDF Document">PDF Document</option>
            <option value="Graphic Asset">Graphic Asset</option>
          </select>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-amber-500/50">
            {file ? file.name : "Click to select file"}
          </div>

          <button type="submit" disabled={isUploading} className="w-full py-3.5 bg-amber-500 text-black font-bold rounded-xl">
            {isUploading ? "Deploying..." : "Deploy Broadcast Resource"}
          </button>
        </form>
      </div>
    </div>
  );
}