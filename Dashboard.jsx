import React from 'react'
import Members from './parts/Members'
import Invoices from './parts/Invoices'
import Bookings from './parts/Bookings'
import Meters from './parts/Meters'
import Documents from './parts/Documents'
import { supabase } from '../App'

export default function Dashboard({session}){
  const user = session.user
  return (
    <div>
      <div className="header"><strong>Kleingartenverwaltung</strong> — angemeldet als {user.email}</div>
      <div className="container">
        <h3>Übersicht</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <Members session={session}/>
          <Invoices session={session}/>
          <Bookings session={session}/>
          <Meters session={session}/>
          <Documents session={session}/>
        </div>
      </div>
    </div>
  )
}
