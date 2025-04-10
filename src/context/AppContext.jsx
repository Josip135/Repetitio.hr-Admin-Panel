import { createContext } from "react";


export const AppContext = createContext();

const AppContextProvider = (props) => {

  const valutaSimbol = '€'

  const racunanjeDobi = (datum_rodenja) => {
    const danas = new Date()
    const rodendan = new Date(datum_rodenja)

    let dob = danas.getFullYear() - rodendan.getFullYear()
    return dob
  }

  const mjeseci = ["", "Siječnja", "Veljače", "Ožujka", "Travnja", "Svibnja", "Lipnja", "Srpnja", "Kolovoza", "Rujna", "Listopada", "Studenog", "Prosinca"]

  const terminDatumFormat = (termin_datum) => {
    const datumPolje = termin_datum.split('_')
    return datumPolje[0] + ". " + mjeseci[Number(datumPolje[1])] + " " + datumPolje[2]
  }

  const value = {
    racunanjeDobi, terminDatumFormat, valutaSimbol,
  }

  return (
    < AppContext.Provider value={value} >
      {props.children}
    </AppContext.Provider >
  )
}

export default AppContextProvider;