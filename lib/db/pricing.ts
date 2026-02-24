import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase';
import type { PricingPackage } from '@/lib/types';

export async function getPricingPackages(): Promise<PricingPackage[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('pricing_packages')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createPricingPackage(input: Partial<PricingPackage>): Promise<PricingPackage> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('pricing_packages')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updatePricingPackage(id: string, input: Partial<PricingPackage>): Promise<PricingPackage> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('pricing_packages')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deletePricingPackage(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from('pricing_packages')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}
