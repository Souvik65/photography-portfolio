import { createAdminSupabaseClient } from '@/lib/supabase';
import type { BookingSubmission, ContactSubmission, SubmissionStatus } from '@/lib/types';

// =========================================
// Bookings
// =========================================

export async function getBookings(status?: SubmissionStatus): Promise<BookingSubmission[]> {
  const supabase = createAdminSupabaseClient();
  let query = supabase
    .from('booking_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getBookingById(id: string): Promise<BookingSubmission | null> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('booking_submissions')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

export async function createBooking(input: Partial<BookingSubmission>): Promise<BookingSubmission> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('booking_submissions')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateBooking(
  id: string,
  input: { status?: SubmissionStatus; admin_notes?: string }
): Promise<BookingSubmission> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('booking_submissions')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteBooking(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from('booking_submissions')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function countNewBookings(): Promise<number> {
  const supabase = createAdminSupabaseClient();
  const { count, error } = await supabase
    .from('booking_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');
  if (error) return 0;
  return count ?? 0;
}

// =========================================
// Contacts
// =========================================

export async function getContacts(status?: SubmissionStatus): Promise<ContactSubmission[]> {
  const supabase = createAdminSupabaseClient();
  let query = supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getContactById(id: string): Promise<ContactSubmission | null> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

export async function createContact(input: Partial<ContactSubmission>): Promise<ContactSubmission> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateContact(
  id: string,
  input: { status?: SubmissionStatus; admin_notes?: string }
): Promise<ContactSubmission> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('contact_submissions')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteContact(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function countNewContacts(): Promise<number> {
  const supabase = createAdminSupabaseClient();
  const { count, error } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');
  if (error) return 0;
  return count ?? 0;
}
