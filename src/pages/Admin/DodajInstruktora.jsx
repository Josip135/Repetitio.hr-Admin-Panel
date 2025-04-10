import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function DodajInstruktora() {

  const [instSlika, setInstSlika] = useState(false)
  const [ime_prezime, setImePrezime] = useState('')
  const [email, setEmail] = useState('')

  const [lozinka, setLozinka] = useState('')
  const [godine_iskustva, setGodineIskustva] = useState('1 godina')
  const [cijena_repeticija, setCijenaRepeticija] = useState('')

  const [informacije, setInformacije] = useState('')
  const [predmet, setPredmet] = useState([])
  //const [razina_skolovanja, setRazinaSKolovanja] = useState('Osnovna škola')
  const [razina_skolovanja, setRazinaSKolovanja] = useState([])

  const [grad, setGrad] = useState('')
  const [prva_adresa, setPrvaAdresa] = useState('')
  const [druga_adresa, setDrugaAdresa] = useState('')

  const { backendUrl, adminToken } = useContext(AdminContext)

  const handleCheckboxChangeRazina = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRazinaSKolovanja(prosliPodaci => [...prosliPodaci, value])
    } else {
      setRazinaSKolovanja(prosliPodaci => prosliPodaci.filter(item => item !== value))
    }
  }

  const handleCheckboxChangePredmet = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPredmet(prosliPodaci => [...prosliPodaci, value])
    } else {
      setPredmet(prosliPodaci => prosliPodaci.filter(item => item !== value))
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (!instSlika) {
        return toast.error("Niste odabrali sliku za instruktora!")
      }

      const formData = new FormData()

      formData.append('slika', instSlika)
      formData.append('ime_prezime', ime_prezime)
      formData.append('email', email)

      formData.append('lozinka', lozinka)
      formData.append('iskustvo', godine_iskustva)
      formData.append('cijena_repeticija', Number(cijena_repeticija))

      formData.append('informacije', informacije)
      //formData.append('predmet', predmet)

      predmet.forEach((item) => {
        formData.append('predmet[]', item)  // Use '[]' to indicate multiple values for the same key
      })

      //formData.append('razina_skolovanja', razina_skolovanja)
      razina_skolovanja.forEach((item) => {
        formData.append('razina_skolovanja[]', item)  // Use '[]' to indicate multiple values for the same key
      })

      formData.append('grad', grad)
      formData.append('adresa', JSON.stringify({ prva: prva_adresa, druga: druga_adresa }))

      //console log za formData
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`)
      })

      const { data } = await axios.post(backendUrl + '/api/admin/dodaj_instruktora', formData, { headers: { adminToken } })

      if (data.success) {
        toast.success(data.message)

        setInstSlika(false)
        setImePrezime('')
        setEmail('')

        setLozinka('')
        setGodineIskustva('1 godina')
        setCijenaRepeticija('')

        setInformacije('')
        setPredmet([])
        setRazinaSKolovanja([])

        setGrad('')
        setPrvaAdresa('')
        setDrugaAdresa('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Dodajte instruktora</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="slika_instruktora">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={instSlika ? URL.createObjectURL(instSlika) : assets.upload_area} alt="" />
          </label>

          <input onChange={(e) => setInstSlika(e.target.files[0])} type="file" id="slika_instruktora" hidden />
          <p>Dodajte sliku <br /> instruktora</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Ime i prezime instruktora</p>
              <input onChange={(e) => setImePrezime(e.target.value)} value={ime_prezime} className='border rounded px-3 py-2' type="text" placeholder="Ime" required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Email instruktora</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder="Email" required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Lozinka instruktora</p>
              <input onChange={(e) => setLozinka(e.target.value)} value={lozinka} className='border rounded px-3 py-2' type="password" placeholder="Lozinka" required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Godine iskustva</p>
              <select onChange={(e) => setGodineIskustva(e.target.value)} value={godine_iskustva} className='border rounded px-3 py-2' name="" id="">
                <option value="1 godina">1 godina</option>
                <option value="2 godine">2 godine</option>
                <option value="3 godine">3 godine</option>
                <option value="4 godine">4 godine</option>
                <option value="5 godina">5 godina</option>
                <option value="6 godina">6 godina</option>
                <option value="7 godina">7 godina</option>
                <option value="8 godina">8 godina</option>
                <option value="9 godina">9 godina</option>
                <option value="10+ godina">10+ godina</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Cijena repeticija</p>
              <input onChange={(e) => setCijenaRepeticija(e.target.value)} value={cijena_repeticija} className='border rounded px-3 py-2' type="number" placeholder="Cijena repeticija" required />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Predmet</p>

              <div className='columns-3'>
                <label className='block'>
                  <input
                    type="checkbox"
                    value="Matematika"
                    checked={predmet.includes("Matematika")}
                    onChange={handleCheckboxChangePredmet}
                  /> Matematika
                </label>

                <label className='block'>
                  <input
                    type="checkbox"
                    value="Fizika"
                    checked={predmet.includes("Fizika")}
                    onChange={handleCheckboxChangePredmet}
                  /> Fizika
                </label>

                <label className='block'>
                  <input
                    type="checkbox"
                    value="Kemija"
                    checked={predmet.includes("Kemija")}
                    onChange={handleCheckboxChangePredmet}
                  /> Kemija
                </label>

                <label>
                  <input
                    type="checkbox"
                    value="Biologija"
                    checked={predmet.includes("Biologija")}
                    onChange={handleCheckboxChangePredmet}
                  /> Biologija
                </label>

                <label className='block'>
                  <input
                    type="checkbox"
                    value="Povijest"
                    checked={predmet.includes("Povijest")}
                    onChange={handleCheckboxChangePredmet}
                  /> Povijest
                </label>

                <label>
                  <input
                    type="checkbox"
                    value="Geografija"
                    checked={predmet.includes("Geografija")}
                    onChange={handleCheckboxChangePredmet}
                  /> Geografija
                </label>

                <label className='block'>
                  <input
                    type="checkbox"
                    value="Informatika"
                    checked={predmet.includes("Informatika")}
                    onChange={handleCheckboxChangePredmet}
                  /> Informatika
                </label>

                <label className='block'>
                  <input
                    type="checkbox"
                    value="Hrvatski"
                    checked={predmet.includes("Hrvatski")}
                    onChange={handleCheckboxChangePredmet}
                  /> Hrvatski
                </label>

                <label className='block'>
                  <input
                    type="checkbox"
                    value="Engleski"
                    checked={predmet.includes("Engleski")}
                    onChange={handleCheckboxChangePredmet}
                  /> Engleski
                </label>

                <label className='block'>
                  <input
                    type="checkbox"
                    value="Njemački"
                    checked={predmet.includes("Njemački")}
                    onChange={handleCheckboxChangePredmet}
                  /> Njemački
                </label>

                <label className='block'>
                  <input
                    type="checkbox"
                    value="Talijanski"
                    checked={predmet.includes("Talijanski")}
                    onChange={handleCheckboxChangePredmet}
                  /> Talijanski
                </label>
              </div>



            </div>

            <div className='flex-1 flex flex-col gap-1'>
              { /**<p>Razina školovanja</p>
              <select onChange={(e) => setRazinaSKolovanja(e.target.value)} value={razina_skolovanja} className='border rounded px-3 py-2' name="" id="">
                <option value="Osnovna škola">Osnovna škola</option>
                <option value="Srednja škola">Srednja škola</option>
                <option value="Fakultet">Fakultet</option>
                </select>**/ }
              <p>Razina školovanja</p>
              <div className='flex gap-3'>
                <label>
                  <input
                    type="checkbox"
                    value="Osnovna škola"
                    checked={razina_skolovanja.includes("Osnovna škola")}
                    onChange={handleCheckboxChangeRazina}
                  /> Osnovna škola
                </label>

                <label>
                  <input
                    type="checkbox"
                    value="Srednja škola"
                    checked={razina_skolovanja.includes("Srednja škola")}
                    onChange={handleCheckboxChangeRazina}
                  /> Srednja škola
                </label>

                <label>
                  <input
                    type="checkbox"
                    value="Fakultet"
                    checked={razina_skolovanja.includes("Fakultet")}
                    onChange={handleCheckboxChangeRazina}
                  /> Fakultet
                </label>
              </div>

            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Grad</p>
              <input onChange={(e) => setGrad(e.target.value)} value={grad} className='border rounded px-3 py-2' type="text" placeholder="Grad" required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Adresa</p>
              <input onChange={(e) => setPrvaAdresa(e.target.value)} value={prva_adresa} className='border rounded px-3 py-2' type="text" placeholder="Prva adresa" required />
              <input onChange={(e) => setDrugaAdresa(e.target.value)} value={druga_adresa} className='border rounded px-3 py-2' type="text" placeholder="Druga adresa" required />
            </div>

          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>Informacije o instruktoru</p>
          <textarea onChange={(e) => setInformacije(e.target.value)} value={informacije} className='w-full px-4 pt-2 border rounded' placeholder="Informacije o instruktoru" />
        </div>

        <button type="submit" className='bg-cyan-400 text-white font-semibold text-sm px-10 py-3 rounded-full hover:bg-cyan-600'>Dodajte instruktora</button>

      </div>
    </form>
  )
}

export default DodajInstruktora;