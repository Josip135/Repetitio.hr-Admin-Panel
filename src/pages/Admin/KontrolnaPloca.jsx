import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

function KontrolnaPloca() {

  const { adminToken, getGlavniPodaci, otkaziRepeticijeAdmin, glavniPodaci } = useContext(AdminContext)

  const { terminDatumFormat } = useContext(AppContext)

  useEffect(() => {
    if (adminToken) {
      getGlavniPodaci()
    }
  }, [adminToken])

  return glavniPodaci && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 hover:bg-cyan-100 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{glavniPodaci.instruktori}</p>
            <p className='text-gray-400'>Instruktori</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 hover:bg-cyan-100 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{glavniPodaci.repeticije}</p>
            <p className='text-gray-400'>Repeticije</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 hover:bg-cyan-100 transition-all '>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{glavniPodaci.korisnici}</p>
            <p className='text-gray-400'>Korisnici</p>
          </div>
        </div>

      </div>

      <div className='bg-white'>

        <div className='flex items.center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} />
          <p className='font-semibold'>Najnoviji termini</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {
            glavniPodaci.najnovijiTermini.map((termin, index) =>
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10' src={termin.instruktorPodaci.slika} />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{termin.instruktorPodaci.ime_prezime}</p>
                  <p className='text-gray-600'>{terminDatumFormat(termin.termin_datum)}</p>
                </div>
                {termin.otkazano
                  ? <p className='text-red-400 text-xs font-medium'>Otkazano!</p>
                  : termin.odradeno
                    ? <p className='text-green-400 text-xs font-medium'>Odrađeno</p>
                    : <img onClick={() => otkaziRepeticijeAdmin(termin._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} />
                }
              </div>)
          }
        </div>

      </div>

    </div>
  )
}

export default KontrolnaPloca;