import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const InstruktorContext = createContext();

const InstruktorContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [instrtoken, setInstruktorToken] = useState(localStorage.getItem('instrtoken') ? localStorage.getItem('instrtoken') : "")

  const [termini, setTermini] = useState([])

  const [kontrolniPodaci, setKontrolniPodaci] = useState(false)

  const [instrProfil, setInstrProfil] = useState(false)

  const getTermini = async () => {
    try {
      console.log("Saljem token: ", instrtoken)
      const { data } = await axios.get(backendUrl + '/api/instruktor/termini', { headers: { instrtoken } })
      if (data.success) {
        setTermini(data.termini)
        console.log(data.termini)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  const getKontrolniPodaci = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/instruktor/kontrolna_ploca', { headers: { instrtoken } })
      //console.log("Kontrolni podaci za konzolu: ", data.kontrolniPodaci)
      //setKontrolniPodaci(data.kontrolniPodaci)
      //console.log("Provjera: ", podaci)
      if (data.success) {
        setKontrolniPodaci(data.kontrolniPodaci)
        console.log(data.kontrolniPodaci)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const gotoveRepeticije = async (repeticijaId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/instruktor/odradene_repeticije', { repeticijaId }, { headers: { instrtoken } })
      if (data.success) {
        toast.success(data.message)
        getTermini()
        getKontrolniPodaci()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const otkazaneRepeticije = async (repeticijaId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/instruktor/otkazi_repeticije', { repeticijaId }, { headers: { instrtoken } })
      if (data.success) {
        toast.success(data.message)
        getTermini()
        getKontrolniPodaci()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getInstruktorProfil = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/instruktor/profil', { headers: { instrtoken } })
      if (data.success) {
        setInstrProfil(data.profilPodaci)
        console.log(data.profilPodaci)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    instrtoken, setInstruktorToken, backendUrl,
    termini, setTermini, getTermini, gotoveRepeticije,
    otkazaneRepeticije, kontrolniPodaci, setKontrolniPodaci, getKontrolniPodaci,
    instrProfil, setInstrProfil, getInstruktorProfil
  }

  return (
    < InstruktorContext.Provider value={value} >
      {props.children}
    </InstruktorContext.Provider >
  )
}

export default InstruktorContextProvider;