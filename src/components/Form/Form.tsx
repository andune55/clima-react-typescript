import { useState, ChangeEvent, FormEvent } from "react"
import type { SearchType } from "../../Types"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import Alert from "../Alert/Alert"

export default function Form() {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })
    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{
        setSearch({
            ...search,
            [e.target.name] : e.target.value //escribimos en el campo en el cual estamos modificando
        })
    }
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')){
            //console.log('Sí hay campos vacíos...')
            setAlert('Todos los campos son obligatorios')
            return
        }
    }
    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert>}

            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input 
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">Pais:</label>
                <select 
                    id="country"
                    name="country"
                    value={search.country}  
                    onChange={handleChange}              
                >
                <option value="">-- Seleccione un País --</option>
                    {countries.map(country => (
                        <option 
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input type="submit" className={styles.submit} value="Consultar clima" />

        </form>
    )
}
