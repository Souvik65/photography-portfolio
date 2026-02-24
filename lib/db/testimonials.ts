import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase';
import type { Testimonial } from '@/lib/types';

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createTestimonial(input: Partial<Testimonial>): Promise<Testimonial> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('testimonials')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTestimonial(id: string, input: Partial<Testimonial>): Promise<Testimonial> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('testimonials')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}
