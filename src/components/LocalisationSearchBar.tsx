import { ChangeEvent, useEffect, useState } from 'react';
import _ from 'underscore';
import { getCitiesLike } from '../services/httpService';
import { IAddress } from '../interfaces/IAddress';
const LocalisationSearchBar = () => {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState<IAddress[]>([]);

    // FIXME : cities should be loaded with autocomplete, then the search should be done with selected one.
    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            try {
                const adressesCities = await getCitiesLike(city, abortController)
                setCities(adressesCities)
                console.log(adressesCities)
            } catch (error) {
                console.error("Error on getting fripes by city");
                console.error(error)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return (() => {
            abortController.abort();
        });
    }, [city])

    return <div className="ff-loc-search-bar ff-searchbar">
        <label htmlFor="ff-loc-search-bar">Une fripe dans ma ville ?</label>
        <div className="ff-autocomplete-field">
            <input id="ff-loc-search-bar" type="search" placeholder="Montpellier, Bordeaux, ..." onChange={
                _.debounce((e: ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (inputValue.trim().length == 0) setCities([])
                    if (inputValue.trim().length < 3) return;
                    setCity(inputValue);
                    console.log(e.target.value)
                }, 400)
            } />
            <ul>
                {
                    cities.map((c, i) =>
                        <li key={`${c.city}-${i}`}>{c.city}</li>)
                }
            </ul>
        </div>
    </div>
}

export default LocalisationSearchBar;