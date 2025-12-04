import React, {useEffect, useState} from 'react'
import { supabase } from '../../App'

export default function Members({session}){
  const [profile, setProfile] = useState(null)
  useEffect(()=>{
    const fetchProfile = async ()=>{
      const { data, error } = await supabase.from('profiles').select('*').eq('auth_id', session.user.id).single()
      if(data) setProfile(data)
    }
    fetchProfile()
  },[])
  return (
    <div style={{background:'#fff',padding:12,borderRadius:8}}>
      <h4>Mein Profil</h4>
      {profile ? (
        <div>
          <div><strong>{profile.full_name}</strong></div>
          <div>Parzelle: {profile.plot_label || '—'}</div>
          <div style={{marginTop:8}}><small>ID: {profile.id}</small></div>
        </div>
      ) : <div>Profil wird geladen...</div>}
    </div>
  )
}
