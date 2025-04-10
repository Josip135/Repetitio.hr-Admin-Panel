import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { InstruktorContext } from '../context/InstruktorContext'

function Navbar() {

  const { adminToken, setAdminToken } = useContext(AdminContext)
  const { instrtoken, setInstruktorToken } = useContext(InstruktorContext)

  const navigiraj = useNavigate()

  const odjava = () => {
    navigiraj("/")
    adminToken && setAdminToken("")
    instrtoken && setInstruktorToken("")

    adminToken && localStorage.removeItem("adminToken")
    instrtoken && localStorage.removeItem("instrtoken")
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className='flex items-center gap-2 text-xs'>
        <p className='w-50 text-cyan-400 font-bold cursor-pointers md:text-3xl lg:text-4xl mb-2'>Repetitio.hr</p>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{adminToken ? 'Admin' : 'Instruktor'}</p>
      </div>

      <button onClick={odjava} className='bg-cyan-400 text-white text-sm px-10 py-2 rounded-full hover:bg-cyan-600'>Odjava</button>
    </div>

  )
}

export default Navbar