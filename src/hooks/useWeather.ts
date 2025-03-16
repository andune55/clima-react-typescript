import axios from "axios"
import { SearchType } from "../Types"
export default function useWeather(){

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`  
            console.log(geoUrl)
            const {data} = await axios.get(geoUrl)
            //console.log(data)
            const lat= data[0].lat
            const lon= data[0].lon
            
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            //console.log(weatherUrl)
            const{data: weatherResult} = await axios.get(weatherUrl)
            console.log(weatherResult)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}