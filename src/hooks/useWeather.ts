import axios from "axios"
import { z } from 'zod'
//import { object, string, number, InferOutput, parse } from 'valibot'
import { SearchType } from "../Types"
import { useState, useMemo } from "react"

// TYPE GUARD O ASSERTION
    // function isWeatherResponse(weather : unknown) : weather is Weather{
    //     return(        
    //         Boolean(weather) &&         //que weather exista, que le hayamos pasado algo
    //         typeof weather === 'object' && //que sea un objeto
    //         typeof (weather as Weather).name === 'string' && //accedemos a cada uno de los elementos revisando que el nombre sea un string, que las 3 temepraturas sean números
    //         typeof (weather as Weather).main.temp === 'number' &&
    //         typeof (weather as Weather).main.temp_min === 'number' &&
    //         typeof (weather as Weather).main.temp_max === 'number' 
    //     )
    // }

//ZOD
    const WeatherSchema = z.object({
        name: z.string(),
        main: z.object({
            temp: z.number(),
            temp_max: z.number(),
            temp_min: z.number()
        })
    })
    export type Weather = z.infer<typeof WeatherSchema>

//Valibot
    // const WeatherSchema = object({
    //     name: string(),
    //     main: object({
    //         temp: number(),
    //         temp_max: number(),
    //         temp_min: number()
    //     })
    // })
    // type Weather = InferOutput<typeof WeatherSchema>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0, 
        temp_min: 0
    }
}

export default function useWeather(){

    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`  
            //console.log(geoUrl)
            const {data} = await axios.get(geoUrl)
            //console.log(data)

            //Comprobar si existe
            if(!data[0]){
                setNotFound(true)
                return
            }
            //console.log(data)
            const lat= data[0].lat
            const lon= data[0].lon
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            //console.log(weatherUrl)

            //1. Castear el type
                // const{data: weatherResult} = await axios<Weather>(weatherUrl)
                // console.log(weatherResult.name)
                // console.log(weatherResult.main.temp_max)

            //2. Type Guards
                // const{data: weatherResult} = await axios(weatherUrl)
                // const result = isWeatherResponse(weatherResult)
                // //console.log(result)
                // if(result){
                //     console.log(weatherResult.name)
                // } else {
                //     console.log('Respuesta mal formada')
                // }

            //3. Zod
                const{data: weatherResult} = await axios(weatherUrl)
                console.log(weatherResult)
                const result = WeatherSchema.safeParse(weatherResult)
                //console.log(result)
                if(result.success){
                    //console.log(result.data)
                    //console.log(result.data.name)
                    //console.log(result.data.main.temp)
                    setWeather(result.data)
                }else {
                    console.log('Respuesta mal formada...')
                }
            //4. Valibot
                // const{data: weatherResult} = await axios(weatherUrl)
                // const result = parse(WeatherSchema, weatherResult)
                // //console.log(result)
                // if(result){
                // console.log(result.name)
                // console.log(result.main.temp)
                // }else {
                //     console.log('Respuesta mal formada...')
                // }

         
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }    
    }

    const hasWeatherData = useMemo(() => weather.name , [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}