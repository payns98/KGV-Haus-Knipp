import React, {useEffect, useState} from 'react'
import { supabase } from '../../App'

export default function Meters({session}){
  const [meters, setMeters] = useState([])
  useEffect(()=>{
    const load = async ()=>{
      const { data } = await supabase.from('meter_readings').select('*').eq('auth_id', session.user.id)
      setMeters(data || [])
    }
    load()
  },[])
  return (
    <div style={{background:'#fff',padding:12,borderRadius:8}}>
      <h4>Zählerstände</h4>
      <div className="list">
        {meters.map(m=>(
          <div className="row" key={m.id}>
            <div>{m.type}</div>
            <div>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
