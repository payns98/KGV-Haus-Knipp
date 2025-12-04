import React, {useEffect, useState} from 'react'
import { createClient } from '@supabase/supabase-js'
import Dashboard from './views/Dashboard'
import Login from './views/Login'

// Replace these values in .env before building / deploy
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)

export default function App(){
  const [session, setSession] = useState(null)

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=> setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return ()=> listener.subscription.unsubscribe()
  },[])

  if(!session) return <Login supabase={supabase} />
  return <Dashboard supabase={supabase} session={session} />
}
