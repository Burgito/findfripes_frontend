import { ChangeEvent, useEffect, useState } from 'react';
import _ from 'underscore';
import { getFripesByCity } from '../services/httpService';
import { IFripe } from '../interfaces/IFripe';
const LocalisationSearchBar = () => {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [fripes, setFripes] = useState<IFripe[]>([]);

    // FIXME : cities should be loaded with autocomplete, then the search should be done with selected one.
    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            try {
                const newFripes = await getFripesByCity(city, abortController)
                setFripes(newFripes);
                console.log(newFripes);
            } catch (error) {
                console.error("Error on getting fripes by city");
                console.error(error);
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
        <input id="ff-loc-search-bar" type="search" placeholder="Montpellier, Bordeaux, ..." onChange={
            _.debounce((e: ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;
                if (inputValue.trim().length < 3) return;

                setCity(inputValue);
                console.log(e.target.value)
            }, 400)
        } />
    </div>
}

export default LocalisationSearchBar;