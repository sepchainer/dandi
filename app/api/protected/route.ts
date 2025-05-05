import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();
    if (error || !data) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 