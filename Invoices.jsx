import React, {useEffect, useState} from 'react'
import { supabase } from '../../App'

export default function Invoices({session}){
  const [invoices, setInvoices] = useState([])
  useEffect(()=>{
    const load = async ()=>{
      const { data } = await supabase.from('invoices').select('*').eq('auth_id', session.user.id)
      setInvoices(data || [])
    }
    load()
  },[])
  return (
    <div style={{background:'#fff',padding:12,borderRadius:8}}>
      <h4>Meine Rechnungen</h4>
      <div className="list">
        {invoices.length===0 && <div className="row">Keine offenen Rechnungen</div>}
        {invoices.map(inv=>(
          <div className="row" key={inv.id}>
            <div>{inv.description}</div>
            <div>{inv.amount} € <button className="button" onClick={()=>window.alert('Zahlung initiiert (siehe README)')}>Bezahlen</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
