import { useState } from 'react'
import AppSeguro from './components/AppSeguro'
import useCotizador from './hooks/useCotizador'

import {CotizadorProvider} from './context/CotizadorProvider' //es importante que tenga llavez!!!

function App() {
  
  return (
    <CotizadorProvider>
      <AppSeguro/>
    </CotizadorProvider>
    
  )
}

export default App
