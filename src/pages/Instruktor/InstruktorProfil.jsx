import React, { useContext, useEffect, useState } from 'react'
import { InstruktorContext } from '../../context/InstruktorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const InstruktorProfil = () => {

  const { instrtoken, instrProfil, setInstrProfil, getInstruktorProfil, backendUrl } = useContext(InstruktorContext)
  const { valutaSimbol } = useContext(AppContext)

  const [edit, setEdit] = useState(false)

  const izmijeniProfil = async () => {
    try {
      const izmijeniPodatke = {
        adresa: instrProfil.adresa,
        cijena_repeticija: instrProfil.cijena_repeticija,
        dostupnost: instrProfil.dostupnost
      }

      const { data } = await axios.post(backendUrl + '/api/instruktor/izmjena_profila', izmijeniPodatke, { headers: { instrtoken } })

      if (data.success) {
        toast.success(data.message)
        setEdit(false)
        getInstruktorProfil()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (instrtoken) {
      getInstruktorProfil()
    }
  }, [instrtoken])

  return instrProfil && (
    <div>

      <div className='flex flex-col gap-4 m-5'>

        <div>
          <img className='bg-sky-100 w-full sm:max-w-64 rounded-lg hover:bg-sky-300' src={instrProfil.slika} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

          {/**Ime, prezime, predmet, razina, iskustvo instruktora*/}
          <p className='flex items-center gap-2 text-3xl font-medium tex-gray-700'>{instrProfil.ime_prezime}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{instrProfil.predmet} - {instrProfil.razina_skolovanja}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{instrProfil.iskustvo}</button>
          </div>

          {/*Podaci o instruktoru*/}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>Info: </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{instrProfil.informacije}</p>
          </div>

          <p className='text-gray-600 font-medium-600 mt-4'>
            Cijena repeticija: {edit ? <input type="number" onChange={(e) => setInstrProfil(prosliPodaci => ({ ...prosliPodaci, cijena_repeticija: e.target.value }))} value={instrProfil.cijena_repeticija} /> : instrProfil.cijena_repeticija}<span className='text-gray-800'>{valutaSimbol}</span>
          </p>

          <div className='flex gap-2 py-2'>
            <p>Adresa: </p>
            <p className='text-sm'>
              {edit ? <input type="text" onChange={(e) => setInstrProfil(prosliPodaci => ({ ...prosliPodaci, adresa: { ...prosliPodaci.adresa, prva: e.target.value } }))} value={instrProfil.adresa.prva} /> : instrProfil.adresa.prva}
              <br />
              {edit ? <input type="text" onChange={(e) => setInstrProfil(prosliPodaci => ({ ...prosliPodaci, adresa: { ...prosliPodaci.adresa, druga: e.target.value } }))} value={instrProfil.adresa.druga} /> : instrProfil.adresa.druga}
            </p>
          </div>
          {/**prosliPodaci => ({ ...prosliPodaci, cijena_repeticija: e.target.value }))} value={instrProfil.cijena_repeticija} /> : instrProfil.cijena_repeticija */}
          <div className='flex gap-1 pt-2'>
            <input
              onChange={() => {
                if (edit) {
                  setInstrProfil(prosliPodaci => ({ ...prosliPodaci, dostupnost: !prosliPodaci.dostupnost }))
                }
              }
              }
              checked={instrProfil.dostupnost}
              /*onChange={(e) => setInstrProfil(prosliPodaci => ({ ...prosliPodaci, dostupnost: e.target.value }))}*/
              type="checkbox" />
            <label> Dostupnost</label>
          </div>

          {edit ?
            <button onClick={() => izmijeniProfil()} className='px-4 py-1 border-2 border-cyan-400 text-sm font-semibold rounded-full mt-5 hover:bg-cyan-400 hover:text-white transition-all'>Sačuvajte izmjenu</button>
            :
            <button onClick={() => setEdit(true)} className='px-4 py-1 border-2 border-cyan-400 text-sm font-semibold rounded-full mt-5 hover:bg-cyan-400 hover:text-white transition-all'>Izmijenite profil</button>
          }
        </div>
      </div>

    </div>
  )
}

export default InstruktorProfil