import { useState,createContext } from "react";
import {obtenerDiferenciaYear,calcularMarca,calcularPlan,formatearDinero} from '../helpers' //no requiere la ruta completa por que tiene index


const CotizadorContext = createContext()

// children es importante pues no sabemos cuantos componentes tendra
//basicamente seran todos los componentes hijos 
const CotizadorProvider = ({children}) =>{

    //en toda esta area puedo definir funciones
    //puedo definir estados, etc... y todo esto se lo puedo parar en el value
    //de esta forma lo que envuelva cotizadorContext lo tendra
    const [datos,setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error,setError]= useState('') //definimos un error de forma global
    const [resultado,setResultado]= useState(0)
    const [cargando,setCargando]= useState(false)
    
    const handleChangeDatos = e =>{
        setDatos({
            ...datos,  //hacemos una compia para que no se borre todo el state
            [e.target.name] : e.target.value
        })
       
    }

    const cotizarSeguro =()=>{
        //una base
        let resultado = 2000;

        //obtenner la diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)

        //hay que restar el 3% por cada año
        resultado -= ((diferencia * 3) *resultado) /100
        //Americano 15%
        //Europeo 30%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca)

        //Basico 20%
        //Completo 50%
        resultado  *= calcularPlan(datos.plan)

        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(()=>{
            setResultado(resultado);
            setCargando(false)
        },3000)
        
        
    }

    //TODO LO QUE NECESITEMOS QUE ESTE GLOBAL O EN CIERTOS COMPONENTES
    //SE PASA DE ESTA FORMA COMO OBJETO EN EL VALUE
    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando,
                setCargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

//CotizadorProvider es la fuente de los datos 
export{
    CotizadorProvider
}

export default CotizadorContext