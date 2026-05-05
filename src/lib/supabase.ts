import { createClient } from '@supabase/supabase-js'

function requiredEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

const supabaseUrl = requiredEnv('VITE_SUPABASE_URL', import.meta.env.VITE_SUPABASE_URL)
const supabasePublishableKey = requiredEnv(
  'VITE_SUPABASE_PUBLISHABLE_KEY',
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
