import { useEffect, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { AuthContext as AuthContextProvider, type AuthUser } from './AuthProvider'

function mapSupabaseUser(user: User | null): AuthUser | null {
  if (!user) {
    return null
  }

  const role = user.user_metadata.role === 'recruiter' ? 'recruiter' : 'candidate'

  return {
    email: user.email ?? '',
    id: user.id,
    name: typeof user.user_metadata.name === 'string' ? user.user_metadata.name : '',
    role,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          setError(error.message)
        }

        setSession(data.session)
      })
      .catch((error: unknown) => {
        setError(error instanceof Error ? error.message : 'Could not load auth session.')
      })
      .finally(() => setLoading(false))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setError(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function login(email: string, password: string) {
    setError(null)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      return null
    }

    setSession(data.session)
    return mapSupabaseUser(data.user)
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      setError(error.message)
      return
    }

    setSession(null)
  }

  return (
    <AuthContextProvider.Provider
      value={{ error, loading, login, logout, session, user: mapSupabaseUser(session?.user ?? null) }}
    >
      {children}
    </AuthContextProvider.Provider>
  )
}
