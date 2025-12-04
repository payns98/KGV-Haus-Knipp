import React, {useEffect, useState} from 'react'
import { supabase } from '../../App'

export default function Bookings({session}){
  const [bookings, setBookings] = useState([])
  useEffect(()=>{
    const load = async ()=>{
      const { data } = await supabase.from('bookings').select('*').order('date', {ascending:false})
      setBookings(data || [])
    }
    load()
  },[])
  return (
    <div style={{background:'#fff',padding:12,borderRadius:8}}>
      <h4>Vereinshaus</h4>
      <div><small>Kalender & Buchungen</small></div>
      <div className="list">
        {bookings.map(b=>(
          <div className="row" key={b.id}>
            <div>{b.date} — {b.requested_by_name}</div>
            <div>{b.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
