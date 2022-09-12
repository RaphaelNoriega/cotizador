import {useCallback,useMemo,useRef} from 'react'
import useCotizador from '../hooks/useCotizador'
import {MARCAS,PLANES} from '../constants'

/**
 * 
 * como usaremos useCallback ?, sera de la siguiente forma, useCalback y useMemo ambos soportan un areeglo de dependencias
 * es para evitar re refer, pues como los states estan siempre escuchando a los cambios de la aplicacion, la mejor forma es usar un useCallback para que solamente
 * cambie el objeto o el estate solo cuando cierto arreglo de dependencias, es decir solo ese state particualarmente cambiara solo cuando la dependencia cambie
 * es muy similar al useEffect, esto es para brindarme una experiencia mejor al usuario
 * 
 * ahora como en este ejemplo cambiara las variables solo cuando resultado cambie
 * 
 * useCallback es una funcion muy sencilla de usar y de incorporar a los proyectos
 * a diferencia de los ejemplos que se encuentran en internet que son de un grado de
 * complejidad altos y dificiles de entender
 * 
 * 
 * useRef el objeto devuelto se mantendra persistente durante la vida completa del componente
 * en este ejemlo va a congelar de alguna forma el valor
 * 
 * el useMemo es muy similar al useCalback solo que etse requiere un arrow function ()=> y es todo, da por inplicito un return
 * 
 *          https://tobiasahlin.com/spinkit/   (para los spoiner que son puro html)
 * 
 * CUANDO LA APLICACION EN REACT ES MUY LENTA SE PUEDE BENEFICIAR CON EL USO DE UNO DE ESTOS HOOK YA MENCIONADOS, PARA DARLE MAS RENDIMIENTO A LA APLCICACION
 * PERO OJO NO TODOS LOS COMPONENTES NECESITAN AGREGARLE ESTOS HOOKS, PUES ESTO A VECES LLEGA A SER CONTRAPRODUCENTE Y PROBLEMATICO
 * 
 * 
 * EL OTRO HOOK useReducer ES UNA ALTERNATIVA A useState, pero si se usa el context es normal usar el state, el useReducer se unsa mucho en el Redux (es otro Hook)
 * pues en redux se usa mucho el reducer, se puede seguir usando el useState() junto con el context
 */
const Resultado = () => {
    const {resultado, datos} = useCotizador()
    
    const {marca,plan,year} = datos  //hacemos un desesctructuracion (es mas facil)
    //o podemos hacerlo con datos.marca, datos.plan <- a mi me gusta mas asi
    const yearRef = useRef(year)
    //const nombreMarca = MARCAS.filter(m => m.id === Number(marca))
    //const [nombreMarca] = useCallback(MARCAS.filter(m => m.id === Number(marca)),[resultado]) //esta es la otra forma, haciendo un array destructuring
    //de esta forma lo va a estraer como un objeto, nos ahorra mucho tiempo la nueva forma que trae js
    //const [nombrePlan] = useCallback(PLANES.filter(p => p.id === Number(plan)),[resultado])

    //console.log(nombreMarca[0]) //esta es una morma cuando me regresa [{...}] un arreglo de objetos

    const [nombreMarca] = useMemo( ()=> MARCAS.filter(m => m.id === Number(marca)),[resultado]) //esta es la otra forma, haciendo un array destructuring
    //de esta forma lo va a estraer como un objeto, nos ahorra mucho tiempo la nueva forma que trae js
    const [nombrePlan] = useMemo(()=> PLANES.filter(p => p.id === Number(plan)),[resultado])

    console.log(nombreMarca)

    if(resultado === 0) return null
  return (
    <div className='bg-gray-100 text-center mt-5 p-5 shadow'>
        <h2 className='text-gray-600 font-black text-3xl'>
            Resumen
        </h2>

        <p className='my-2'>
            <span className='font-bold'>Marca: </span>
            {nombreMarca.nombre}
        </p>
        <p className='my-2'>
            <span className='font-bold'>Plan: </span>
            {nombrePlan.nombre}
        </p>
        <p className='my-2'>
            <span className='font-bold'>Año: </span>
            {yearRef.current}
        </p>
        <p className='my-2 text-2xl'>
            <span className='font-bold'>Total Cotizacion: </span>
            {resultado}
        </p>

    </div>
  )
}

export default Resultado