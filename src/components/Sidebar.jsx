import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { InstruktorContext } from '../context/InstruktorContext'

function Sidebar() {

  const { adminToken } = useContext(AdminContext)
  const { instrtoken } = useContext(InstruktorContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {
        adminToken && <ul className='text-[#515151] mt-5'>
          <NavLink to={'/admin_kontrolnaploca'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-400' : ''}`}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Kontrolna ploča</p>
          </NavLink>

          <NavLink to={'/svi_termini'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-400' : ''}`}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Termini</p>
          </NavLink>

          <NavLink to={'/dodaj_instruktora'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-400' : ''}`}>
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Dodajte instruktora</p>
          </NavLink>

          <NavLink to={'/lista_instruktora'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-400' : ''}`}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Lista instruktora</p>
          </NavLink>
        </ul>
      }

      {
        instrtoken && <ul className='text-[#515151] mt-5'>
          <NavLink to={'/instruktor_kontrolnaploca'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-400' : ''}`}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Kontrolna ploča</p>
          </NavLink>

          <NavLink to={'/instruktor_termini'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-400' : ''}`}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Termini</p>
          </NavLink>

          <NavLink to={'/instruktor_profil'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-cyan-400' : ''}`}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Profil</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar