
import styles from "./App.module.css"
import Form from './components/Form/Form'
import useWeather from "./hooks/useWeather"
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import Spinner from "./components/Spinner/Spinner";

function App() {
  
  const { fetchWeather, weather, loading, hasWeatherData } = useWeather()

  //console.log(import.meta.env)

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form
          fetchWeather = {fetchWeather}
        />
        
        {loading && <Spinner />}
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
