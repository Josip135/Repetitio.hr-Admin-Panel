import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { InstruktorContext } from '../context/InstruktorContext'


function Login() {

  const [state, setState] = useState('Admin')

  const [email_admin, setEmail] = useState('')
  const [lozinka_admin, setLozinka] = useState('')

  const { setAdminToken, backendUrl } = useContext(AdminContext)
  const { setInstruktorToken } = useContext(InstruktorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login_admin', { email_admin, lozinka_admin })

        if (data.success) {
          localStorage.setItem('adminToken', data.token)
          setAdminToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(backendUrl + '/api/instruktor/login', { email: email_admin, lozinka: lozinka_admin })

        if (data.success) {
          localStorage.setItem('instrtoken', data.instrtoken)
          setInstruktorToken(data.instrtoken)
          console.log(data.instrtoken)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTQwNTM0YjM3NmY3MmY5NDc5YTdkZCIsImlhdCI6MTc0MzAxNjk3N30.FuyreJHJNu46lrCAOrGpga3kRweYzD0qZgwtjFbJ3X4
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTQwNTM0YjM3NmY3MmY5NDc5YTdkZCIsImlhdCI6MTc0MzAxNjk3N30.FuyreJHJNu46lrCAOrGpga3kRweYzD0qZgwtjFbJ3X4

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-cyan-400'>{state}</span> Login</p>

        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email_admin} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>

        <div className='w-full'>
          <p>Lozinka</p>
          <input onChange={(e) => setLozinka(e.target.value)} value={lozinka_admin} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>

        <button className='bg-cyan-400 text-white w-full py-2 rounded-md text-base hover:bg-cyan-600'>Prijavite se</button>

        {state === 'Admin' ? <p><span className='text-cyan-600 underline cursor-pointer hover:text-cyan-900' onClick={() => setState('Instruktor')}>Prijava za instruktora</span></p> :
          <p><span className='text-cyan-600 underline cursor-pointer hover:text-cyan-900' onClick={() => setState('Admin')}>Prijava za admina</span></p>}
      </div>
    </form>
  )
}

export default Login