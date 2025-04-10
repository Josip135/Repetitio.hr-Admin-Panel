import React, { useContext, useEffect } from 'react'
import { InstruktorContext } from '../../context/InstruktorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const InstruktorKontrolnaPloca = () => {

  const { instrtoken, kontrolniPodaci, setKontrolniPodaci, getKontrolniPodaci, otkazaneRepeticije, gotoveRepeticije } = useContext(InstruktorContext)

  const { terminDatumFormat, valutaSimbol } = useContext(AppContext)

  useEffect(() => {
    if (instrtoken) {
      getKontrolniPodaci()
    }
  }, [instrtoken])

  return kontrolniPodaci && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 hover:bg-cyan-100 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{kontrolniPodaci.zarada} {valutaSimbol}</p>
            <p className='text-gray-400'>Zarada</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 hover:bg-cyan-100 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{kontrolniPodaci.termini}</p>
            <p className='text-gray-400'>Repeticije</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 hover:bg-cyan-100 transition-all '>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{kontrolniPodaci.ucenici}</p>
            <p className='text-gray-400'>Učenici</p>
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
            kontrolniPodaci.najnoviji_termini.map((termin, index) =>
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10' src={termin.korisnikPodaci.slika} />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{termin.korisnikPodaci.ime_prezime}</p>
                  <p className='text-gray-600'>{terminDatumFormat(termin.termin_datum)}</p>
                </div>
                {
                  termin.otkazano
                    ? <p className='text-red-500 text-sm font-medium'>Otkazano!</p>
                    : termin.odradeno
                      ? <p className='text-green-500 text-sm font-medium'>Odrađeno!</p>
                      : <div className='flex'>
                        <img onClick={() => otkazaneRepeticije(termin._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={() => gotoveRepeticije(termin._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                      </div>
                }
              </div>)
          }
        </div>

      </div>

    </div>
  )
}

export default InstruktorKontrolnaPloca