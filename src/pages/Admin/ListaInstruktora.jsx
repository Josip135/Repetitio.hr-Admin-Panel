import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';

function ListaInstruktora() {

  const { instruktori, adminToken, getListaInstruktora, promijeniDostupnost } = useContext(AdminContext)
  useEffect(() => {
    if (adminToken) {
      getListaInstruktora()
    }
  }, [adminToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>

      <h1 className='text-lg font-medium'>Lista instruktora</h1>

      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {instruktori.map((instruktor, index) => (
          <div className='border border-sky-100 rounded-xl max-x-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-sky-100 hover:bg-sky-300 transition-all duration-500' src={instruktor.slika} alt="" />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{instruktor.ime_prezime}</p>
              <p className='text-zinc-600 text-sm'>{instruktor.predmet}</p>
              <p className='text-zinc-600 text-sm'>{instruktor.razina_skolovanja}</p>
              <p className='text-zinc-600 text-sm'>{instruktor.grad}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={() => promijeniDostupnost(instruktor._id)} type="checkbox" checked={instruktor.dostupnost} />
                <p>Dostupan/na</p>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ListaInstruktora;