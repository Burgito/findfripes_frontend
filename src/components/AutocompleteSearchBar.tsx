import { ChangeEvent, useEffect, useMemo, useState } from "react";
import _ from "underscore";

export interface IAutocompleteProps<AutocompleteValuesType> {
    label: string;
    callback: (value: string) => void;
    search: (value: string, abortController: AbortController) => Promise<AutocompleteValuesType[]>;
    getValueTypeValue: (val: AutocompleteValuesType) => string;
    placeholder?: string;
}

function AutocompleteSearchBar<AutocompleteValuesType>(props: Readonly<IAutocompleteProps<AutocompleteValuesType>>) {
    const { label, callback, search, getValueTypeValue, placeholder } = props;
    const [selectedValue, setSelectedValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState<AutocompleteValuesType[]>([]);
    const [autocompleteFocused, setAutocompleteFocused] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            try {
                const searchedValues = await search(searchValue, abortController)
                setValues(searchedValues)
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
    }, [searchValue, search])

    const debouncedSearch = useMemo(() => _.debounce((value: string) => {
        if (value.trim().length == 0) setValues([])
        if (value.trim().length < 3) {
            setValues([])
            return;
        }

        setSearchValue(value)
    }, 400), [])

    return <div className="ff-autocomplete-searchbar ff-searchbar">
        <label htmlFor="ff-autocomplete-searchbar">{label}</label>
        <div className="ff-autocomplete-field">
            {/* // TODO : remove settimeout, idk how, but hiding li prevents clic event */}
            <input id="ff-autocomplete-searchbar" type="search" placeholder={placeholder}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    setSelectedValue(inputValue)
                    debouncedSearch(inputValue)
                }}
                onFocus={() => setAutocompleteFocused(true)}
                onBlur={() => setTimeout(() => { setAutocompleteFocused(false) }, 100)}
                value={selectedValue} />
            {autocompleteFocused && <ul className="ff-autocomplete-values">
                {
                    values.map((c, i) =>
                        <li key={`${getValueTypeValue(c)}-${i}`}
                            onClick={() => {
                                setSelectedValue(getValueTypeValue(c));
                                setSearchValue(getValueTypeValue(c));
                                callback(getValueTypeValue(c))
                            }}>
                            {getValueTypeValue(c)}
                        </li>)
                }
            </ul>}
            {!loading && !!selectedValue && <div className="ff-autocomplete-clear-btn" onClick={() => {
                setSelectedValue("");
                setSearchValue("");
                callback("");
            }}>
                <div>X</div>
            </div>}
            {loading && <div className="ff-autocomplete-loader" />}
        </div>
    </div>
}

export default AutocompleteSearchBar
