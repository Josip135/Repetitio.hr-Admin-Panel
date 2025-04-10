import React, { useContext, useEffect } from 'react'
import { InstruktorContext } from '../../context/InstruktorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

function InstruktorTermini() {

  const { instrtoken, termini, getTermini, gotoveRepeticije, otkazaneRepeticije } = useContext(InstruktorContext)

  const { racunanjeDobi, terminDatumFormat, valutaSimbol } = useContext(AppContext)

  useEffect(() => {
    if (instrtoken) {
      getTermini()
    }
  }, [instrtoken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>Svi termini</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>

        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Učenik</p>

          <p>Plaćeno</p>
          <p>Dob</p>

          <p>Datum i vrijeme</p>
          <p>CIjena </p>

          <p>Akcije</p>
        </div>

        {termini.reverse().map((termin, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={termin.korisnikPodaci.slika} alt="" />
              <p>{termin.korisnikPodaci.ime_prezime}</p>
            </div>

            <div>
              <p className=' text-xs inline border border-cyan px-2 py-1 rounded-full'>
                {termin.placeno ? 'Online' : 'Gotovina'}
              </p>
            </div>

            <p className='max-sm:hidden'>{racunanjeDobi(termin.korisnikPodaci.datum_rodenja)}</p>

            <p className='max-sm:hidden'>{terminDatumFormat(termin.termin_datum)}., {termin.termin_vrijeme}</p>

            <p>{termin.cijena} {valutaSimbol}</p>

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



          </div>
        ))}

      </div>

    </div>
  )
}

export default InstruktorTermini