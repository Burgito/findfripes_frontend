import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import _ from 'underscore';
import { getCitiesLike } from '../services/httpService';
import { IAddress } from '../interfaces/IAddress';
const LocalisationSearchBar = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState<IAddress[]>([]);
    const [autocompleteFocused, setAutocompleteFocused] = useState(false);

    // FIXME : cities should be loaded with autocomplete, then the search should be done with selected one.
    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            try {
                const adressesCities = await getCitiesLike(searchCity, abortController)
                setCities(adressesCities)
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
    }, [searchCity])

    const debouncedSearch = useMemo(() => _.debounce((value: string) => {
        if (value.trim().length == 0) setCities([])
        if (value.trim().length < 3) return;

        setSearchCity(value)
    }, 400), [])

    return <div className="ff-loc-search-bar ff-searchbar">
        <label htmlFor="ff-loc-search-bar">Une fripe dans ma ville ?</label>
        <div className="ff-autocomplete-field">
            <input id="ff-loc-search-bar" type="search" placeholder="Montpellier, Bordeaux, ..." onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;
                setSelectedCity(inputValue)
                debouncedSearch(inputValue)
            }}
                onFocus={() => setAutocompleteFocused(true)}
                onBlur={() => setTimeout(() => { setAutocompleteFocused(false) }, 200)}
                // TODO remove settimeout, idk how, but hiding li prevents clic event
                value={selectedCity} />
            {autocompleteFocused && <ul className="ff-autocomplete-values">
                {
                    cities.map((c, i) =>
                        <li key={`${c.city}-${i}`}
                            onClick={() => { setSelectedCity(c.city) }}>{c.city}</li>)
                }
            </ul>}
        </div>
    </div>
}

export default LocalisationSearchBar;