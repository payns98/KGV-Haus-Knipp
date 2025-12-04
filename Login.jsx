import React, {useState} from 'react'

export default function Login({supabase}){
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({email})
    if (error) alert(error.message)
    else alert('E-Mail zum Login wurde gesendet (Magic Link).')
    setLoading(false)
  }

  return (
    <div style={{maxWidth:420, margin:'40px auto'}}>
      <h2>Login</h2>
      <form onSubmit={signIn}>
        <label>Email</label><br/>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={{width:'100%',padding:8,marginTop:6}}/>
        <div style={{marginTop:12}}>
          <button className="button" disabled={loading}>{loading? 'Sende...':'Login / Magic Link'}</button>
        </div>
      </form>
    </div>
  )
}
