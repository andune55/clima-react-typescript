
import styles from "./App.module.css"
import Form from './components/Form/Form'
import useWeather from "./hooks/useWeather"
import WeatherDetail from './components/WeatherDetail/WeatherDetail';

function App() {
  
  const { fetchWeather, weather, hasWeatherData } = useWeather()

  //console.log(import.meta.env)

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form
          fetchWeather = {fetchWeather}
        />
        
        {hasWeatherData &&
          <WeatherDetail
            weather = {weather}
          />
        }
        
      </div>
    </>
  )
}

export default App
