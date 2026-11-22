import { createClient } from '@supabase/supabase-js';
import type { Memory } from '../types';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://pmfaciqfffvnbbuoglvm.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_x-tW9AiFL7VEwH_zeg8Yeg_2b-0gh_h';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Fallback curated scrapbook memories matching Aryan & Susti's heartfelt story
export const DEFAULT_MEMORIES: Memory[] = [
  {
    id: 'mem-1',
    category: 'school_days',
    title: 'School Ke Woh Do Saal',
    caption:
      'The two years in school when I realized what having a real best friend actually feels like. Baki sab friends toh the, but with you, it was different.',
    photo_url:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    date_label: 'Golden School Days',
    order_index: 1,
  },
  {
    id: 'mem-2',
    category: 'her_photos',
    title: 'The Prettiest Birthday Girl',
    caption:
      'Meri pyaari Susti. Someone jiski smile solves half the problems in a room, even if she forgets to reply to my messages on time! 😂💗',
    photo_url:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    date_label: 'Susti Aesthetic',
    order_index: 2,
  },
  {
    id: 'mem-3',
    category: 'both_of_us',
    title: 'Comfort Zone & Bakbak Partner',
    caption:
      'With you, I never have to find the right words. I can be dramatic, silly, or completely quiet, and somehow you still understand me.',
    photo_url:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    date_label: 'Endless Debriefs',
    order_index: 3,
  },
  {
    id: 'mem-4',
    category: 'both_of_us',
    title: 'Reels Debrief & Gossip Session',
    caption:
      'Pending night-outs, chai dates, and all the conversations that no text or voice note can ever capture. Jaldi milna hai madam!',
    photo_url:
      'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    date_label: 'Long Distance Bond',
    order_index: 4,
  },
  {
    id: 'mem-5',
    category: 'her_photos',
    title: 'Future Storage-Full Moments',
    caption:
      'Agli baar milenge na, toh photos aur reels ki baarish hogi. Itni pictures click karenge ki phone storage full ho jayegi!',
    photo_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    date_label: 'The Next Reunion',
    order_index: 5,
  },
  {
    id: 'mem-6',
    category: 'school_days',
    title: 'My Forever Bestie',
    caption:
      'If I could go back to those school days and choose my best friend all over again, I would still choose you every single time. 🫶🏻',
    photo_url:
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
    date_label: 'Unbreakable',
    order_index: 6,
  },
];

export async function fetchMemories(
  category?: string
): Promise<{ memories: Memory[]; fromSupabase: boolean; error?: string }> {
  try {
    let query = supabase
      .from('memories')
      .select('*')
      .order('order_index', { ascending: true });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      const filteredDefaults =
        category && category !== 'all'
          ? DEFAULT_MEMORIES.filter((m) => m.category === category)
          : DEFAULT_MEMORIES;

      return {
        memories: filteredDefaults,
        fromSupabase: false,
        error: error?.message,
      };
    }

    return {
      memories: data as Memory[],
      fromSupabase: true,
    };
  } catch (err: any) {
    const filteredDefaults =
      category && category !== 'all'
        ? DEFAULT_MEMORIES.filter((m) => m.category === category)
        : DEFAULT_MEMORIES;

    return {
      memories: filteredDefaults,
      fromSupabase: false,
      error: err?.message || 'Failed to connect to Supabase',
    };
  }
}

export async function uploadMemoryPhoto(
  file: File,
  category: Memory['category'],
  title: string,
  caption: string
): Promise<{ success: boolean; memory?: Memory; error?: string }> {
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${category}_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}.${fileExt}`;
    const filePath = `${category}/${fileName}`;

    // Upload to 'photos' or 'memories' bucket
    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    let photoUrl = '';
    if (uploadError) {
      // Try 'memories' bucket as secondary
      const { error: secondUploadError } = await supabase.storage
        .from('memories')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (secondUploadError) {
        throw new Error(
          `Storage upload failed: ${uploadError.message}. Make sure a public bucket named 'photos' exists in Supabase.`
        );
      } else {
        const { data } = supabase.storage.from('memories').getPublicUrl(filePath);
        photoUrl = data.publicUrl;
      }
    } else {
      const { data } = supabase.storage.from('photos').getPublicUrl(filePath);
      photoUrl = data.publicUrl;
    }

    // Insert record into memories table
    const { data: inserted, error: dbError } = await supabase
      .from('memories')
      .insert([
        {
          category,
          title,
          caption,
          photo_url: photoUrl,
          date_label: 'New Memory',
          order_index: Date.now(),
        },
      ])
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database insert failed: ${dbError.message}`);
    }

    return {
      success: true,
      memory: inserted as Memory,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Unknown upload error',
    };
  }
}

export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor (supabase.com/dashboard/project/pmfaciqfffvnbbuoglvm/sql)

-- 1. Create memories table
create table if not exists public.memories (
  id uuid default gen_random_uuid() primary key,
  category text not null check (category in ('her_photos', 'both_of_us', 'school_days', 'favorites')),
  title text not null,
  caption text not null,
  photo_url text not null,
  date_label text default 'Timeless',
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security
alter table public.memories enable row level security;

-- 3. Public read policy (anyone with anon key can view memories)
create policy "Allow public read on memories"
  on public.memories
  for select
  using (true);

-- 4. Public insert policy (allows uploading memories from the app or dashboard)
create policy "Allow public insert on memories"
  on public.memories
  for insert
  with check (true);

-- 5. Create storage bucket named 'photos' (or run in Storage dashboard)
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

-- 6. Storage bucket policy: allow public reads & uploads
create policy "Public Access to Photos Bucket"
  on storage.objects for select
  using ( bucket_id = 'photos' );

create policy "Allow uploads to Photos Bucket"
  on storage.objects for insert
  with check ( bucket_id = 'photos' );
`;
