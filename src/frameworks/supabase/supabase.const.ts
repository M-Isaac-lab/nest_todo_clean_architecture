import { createClient } from '@supabase/supabase-js';
import * as process from 'node:process';

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
)

export const supabasebucket = process.env.SUPABASE_BUCKET as string;