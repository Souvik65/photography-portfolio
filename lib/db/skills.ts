import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase';
import type { Skill, Equipment, Award } from '@/lib/types';

// =========================================
// Skills
// =========================================

export async function getSkills(): Promise<Skill[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createSkill(input: Partial<Skill>): Promise<Skill> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('skills')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateSkill(id: string, input: Partial<Skill>): Promise<Skill> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('skills')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSkill(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}

// =========================================
// Equipment
// =========================================

export async function getEquipment(): Promise<Equipment[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('equipment')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createEquipment(input: Partial<Equipment>): Promise<Equipment> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('equipment')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateEquipment(id: string, input: Partial<Equipment>): Promise<Equipment> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('equipment')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteEquipment(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from('equipment')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}

// =========================================
// Awards
// =========================================

export async function getAwards(): Promise<Award[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('awards')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createAward(input: Partial<Award>): Promise<Award> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('awards')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateAward(id: string, input: Partial<Award>): Promise<Award> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('awards')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteAward(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from('awards')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}
