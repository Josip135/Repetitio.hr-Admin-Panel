import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : "")
  const [instruktori, setInstruktori] = useState([])

  const [repeticije, setRepeticije] = useState([])
  const [glavniPodaci, setGlavniPodaci] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const getListaInstruktora = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/lista_instruktora', {}, { headers: { adminToken } })
      if (data.success) {
        setInstruktori(data.instruktori)
        console.log(data.instruktori);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const promijeniDostupnost = async (instId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/promijeni_dostupnost', { instId }, { headers: { adminToken } })

      if (data.success) {
        toast.success(data.message)
        getListaInstruktora()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const getSviTermini = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/svi_termini', { headers: { adminToken } })

      if (data.success) {
        setRepeticije(data.repeticije)
        console.log(data.repeticije)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const otkaziRepeticijeAdmin = async (repeticijaId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/otkazi_repeticije', { repeticijaId }, { headers: { adminToken } })

      if (data.success) {
        toast.success(data.message)
        getSviTermini()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const getGlavniPodaci = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/kontrolna_ploca', { headers: { adminToken } })

      if (data.success) {
        setGlavniPodaci(data.glavniPodaci)
        console.log(data.glavniPodaci)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    adminToken, setAdminToken,
    backendUrl, instruktori,
    getListaInstruktora, promijeniDostupnost,
    repeticije, setRepeticije,
    getSviTermini, otkaziRepeticijeAdmin, glavniPodaci, getGlavniPodaci
  }

  return (
    < AdminContext.Provider value={value} >
      {props.children}
    </AdminContext.Provider >
  )
}

export default AdminContextProvider;