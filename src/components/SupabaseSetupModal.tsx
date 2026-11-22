import React, { useState } from 'react';
import {
  X,
  Upload,
  Copy,
  Check,
  Database,
  ExternalLink,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { SUPABASE_SETUP_SQL, uploadMemoryPhoto } from '../lib/supabase';
import type { Memory } from '../types';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoUploaded?: () => void;
}

export const SupabaseSetupModal: React.FC<SupabaseSetupModalProps> = ({
  isOpen,
  onClose,
  onPhotoUploaded,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'sql' | 'vercel'>('upload');
  const [copied, setCopied] = useState(false);

  // Upload form states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [category, setCategory] = useState<Memory['category']>('both_of_us');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCopySql = async () => {
    await navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setStatusMessage(null);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatusMessage({ type: 'error', text: 'Please select an image file to upload.' });
      return;
    }
    if (!title.trim()) {
      setStatusMessage({ type: 'error', text: 'Please give your memory a title.' });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);

    const res = await uploadMemoryPhoto(selectedFile, category, title, caption);

    setIsUploading(false);
    if (res.success) {
      setStatusMessage({
        type: 'success',
        text: 'Photo uploaded and synced with Supabase! Refresh or switch category to see it.',
      });
      setSelectedFile(null);
      setPreviewUrl('');
      setTitle('');
      setCaption('');
      if (onPhotoUploaded) onPhotoUploaded();
    } else {
      setStatusMessage({
        type: 'error',
        text: res.error || 'Failed to upload photo. Check if the "photos" bucket exists in Supabase.',
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-full bg-[#150725] border-2 border-slate-300/30 rounded-3xl p-6 md:p-8 shadow-2xl relative my-8 text-slate-100 silver-metallic-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#270e44] hover:bg-[#381462] text-slate-200 transition-colors border border-slate-400/20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2 text-amber-400">
          <Database className="w-5 h-5" />
          <h3 className="text-xl font-serif font-bold text-white">
            Photo & Database Cloud Manager
          </h3>
        </div>
        <p className="text-xs text-slate-300/70 mb-6">
          Directly upload photos of Susti and both of you, or configure your database
          schema for Vercel deployment.
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-2 p-1 bg-[#220c3a] rounded-xl mb-6 border border-slate-400/20 text-xs">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
              activeTab === 'upload'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Direct Photo Upload
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
              activeTab === 'sql'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Supabase SQL Setup
          </button>
          <button
            onClick={() => setActiveTab('vercel')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
              activeTab === 'vercel'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-rose-200/70 hover:text-white'
            }`}
          >
            Vercel Deployment
          </button>
        </div>

        {/* Tab 1: Direct Upload */}
        {activeTab === 'upload' && (
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1.5">
                Select Photo from Device
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-rose-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-500 file:text-white hover:file:bg-rose-600 cursor-pointer bg-purple-950/40 p-2 rounded-xl border border-purple-500/30"
              />
            </div>

            {previewUrl && (
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-amber-300/40 relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-rose-200 mb-1.5">
                  Category Tag
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-purple-950/60 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="both_of_us">Both of Us (Memories)</option>
                  <option value="her_photos">Her Photos (Susti Solo)</option>
                  <option value="school_days">School Days (Do Saal)</option>
                  <option value="favorites">Favorites / Shenanigans</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 mb-1.5">
                  Memory Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. School Farewell Shenanigans"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-purple-950/60 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1.5">
                Heartfelt Caption
              </label>
              <textarea
                rows={2}
                placeholder="Write the story behind this photo..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-purple-950/60 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {statusMessage && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading to Supabase...' : 'Upload & Add to Scrapbook'}</span>
            </button>
          </form>
        )}

        {/* Tab 2: SQL Setup */}
        {activeTab === 'sql' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-rose-200/80">
                Run once in Supabase SQL Editor:
              </span>
              <button
                onClick={handleCopySql}
                className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied SQL!' : 'Copy SQL Script'}</span>
              </button>
            </div>

            <pre className="bg-black/60 p-3.5 rounded-xl border border-purple-500/20 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-56">
              {SUPABASE_SETUP_SQL}
            </pre>

            <p className="text-[11px] text-rose-300/60">
              Go to Supabase Dashboard &gt; SQL Editor &gt; New Query &gt; Paste and click Run.
              This creates the <code className="text-amber-200 font-mono">memories</code> table
              and public storage bucket <code className="text-amber-200 font-mono">photos</code>.
            </p>
          </div>
        )}

        {/* Tab 3: Vercel Deployment */}
        {activeTab === 'vercel' && (
          <div className="space-y-4 text-xs text-rose-100/90 leading-relaxed">
            <div className="bg-purple-950/60 p-4 rounded-xl border border-purple-500/20 space-y-2">
              <h4 className="font-semibold text-white text-sm">
                How to Host on Vercel:
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-rose-200/80">
                <li>Push this repository to your GitHub account.</li>
                <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-amber-300 underline">vercel.com</a> and click "Add New Project".</li>
                <li>Import your repository. Framework preset: <b>Vite</b>.</li>
                <li>Under <b>Environment Variables</b>, add:</li>
              </ol>
            </div>

            <div className="bg-black/60 p-3 rounded-xl border border-purple-500/20 font-mono text-[11px] space-y-1 text-amber-200">
              <div>VITE_SUPABASE_URL=https://pmfaciqfffvnbbuoglvm.supabase.co</div>
              <div>VITE_SUPABASE_ANON_KEY=sb_publishable_x-tW9AiFL7VEwH_zeg8Yeg_2b-0gh_h</div>
              <div>VITE_SECRET_ENTRY_KEY=virat kohli</div>
              <div>VITE_YOUTUBE_VIDEO_ID=dIVpJEKYNq4</div>
            </div>

            <p className="text-[11px] text-rose-300/60">
              Click <b>Deploy</b> on Vercel. Once deployed, share the clean Vercel link with Susti!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
