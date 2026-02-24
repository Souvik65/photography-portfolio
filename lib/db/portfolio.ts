import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase';
import type { PortfolioItem } from '@/lib/types';

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPortfolioItem(id: string): Promise<PortfolioItem | null> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

export async function createPortfolioItem(input: Partial<PortfolioItem>): Promise<PortfolioItem> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('portfolio_items')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updatePortfolioItem(id: string, input: Partial<PortfolioItem>): Promise<PortfolioItem> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('portfolio_items')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from('portfolio_items')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}
