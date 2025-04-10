import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom'
import KontrolnaPloca from './pages/Admin/KontrolnaPloca';
import SviTermini from './pages/Admin/SviTermini';
import DodajInstruktora from './pages/Admin/DodajInstruktora';
import ListaInstruktora from './pages/Admin/ListaInstruktora';
import { InstruktorContext } from './context/InstruktorContext';
import InstruktorKontrolnaPloca from './pages/Instruktor/instruktorKontrolnaPloca';
import InstruktorTermini from './pages/Instruktor/instruktorTermini';
import InstruktorProfil from './pages/Instruktor/instruktorProfil';

function App() {

  const { adminToken } = useContext(AdminContext)
  const { instrtoken } = useContext(InstruktorContext)

  return adminToken || instrtoken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/*Admin Route */}
          <Route path="/" element={<></>} />
          <Route path="/admin_kontrolnaploca" element={<KontrolnaPloca />} />
          <Route path="/svi_termini" element={<SviTermini />} />
          <Route path="/dodaj_instruktora" element={<DodajInstruktora />} />
          <Route path="/lista_instruktora" element={<ListaInstruktora />} />

          {/*InstruktorRoute */}
          <Route path="/instruktor_kontrolnaploca" element={<InstruktorKontrolnaPloca />} />
          <Route path="/instruktor_profil" element={<InstruktorProfil />} />
          <Route path="/instruktor_termini" element={<InstruktorTermini />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App