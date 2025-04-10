import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

function SviTermini() {

  const { adminToken, repeticije, getSviTermini, otkaziRepeticijeAdmin } = useContext(AdminContext)

  const { racunanjeDobi, terminDatumFormat, valutaSimbol } = useContext(AppContext)

  useEffect(() => {
    if (adminToken) {
      getSviTermini()
    }
  }, [adminToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>Svi termini repeticija</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Ime i prezime učenika:</p>
          <p>Dob:</p>

          <p>Datum i vrijeme:</p>
          <p>Ime i prezime instruktora:</p>
          <p>Cijena:</p>
          <p>Akcije:</p>
        </div>

        {repeticije.map((repeticija, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200' key={index}>

            <p className='max-sm:hidden'>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={repeticija.korisnikPodaci.slika} /> <p>{repeticija.korisnikPodaci.ime_prezime}</p>
            </div>

            <p className='max-sm:hidden'>{racunanjeDobi(repeticija.korisnikPodaci.datum_rodenja)}</p>

            <p>{terminDatumFormat(repeticija.termin_datum)}., {repeticija.termin_vrijeme}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={repeticija.instruktorPodaci.slika} /> <p>{repeticija.instruktorPodaci.ime_prezime}</p>
            </div>

            <p>{repeticija.cijena} {valutaSimbol}</p>

            {repeticija.otkazano
              ? <p className='text-red-400 text-xs font-medium'>Otkazano!</p>
              : repeticija.odradeno
                ? <p className='text-green-400 text-xs font-medium'>Odrađeno</p>
                : <img onClick={() => otkaziRepeticijeAdmin(repeticija._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} />
            }

          </div>
        ))}

      </div>


    </div>
  )
}

export default SviTermini;