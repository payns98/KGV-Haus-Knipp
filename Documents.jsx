import React, {useEffect, useState} from 'react'
import { supabase } from '../../App'

export default function Documents({session}){
  const [docs, setDocs] = useState([])
  useEffect(()=>{
    const load = async ()=>{
      const { data } = await supabase.from('documents').select('*').eq('auth_id', session.user.id)
      setDocs(data || [])
    }
    load()
  },[])
  return (
    <div style={{background:'#fff',padding:12,borderRadius:8}}>
      <h4>Dokumente</h4>
      <div className="list">
        {docs.map(d=>(
          <div className="row" key={d.id}>
            <div>{d.name}</div>
            <div><a href="#">Herunterladen</a></div>
          </div>
        ))}
      </div>
    </div>
  )
}
