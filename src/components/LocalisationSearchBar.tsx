import { useContext } from "react";
import { IAddress } from "../interfaces/IAddress";
import { getCitiesLike } from "../services/httpService";
import AutocompleteSearchBar from "./AutocompleteSearchBar";
import { FripesContext } from "../pages/Home";

const LocalisationSearchBar = () => {
    const fripesContext = useContext(FripesContext);
    const { setFripes, getFripesByCity } = fripesContext!;
    return <AutocompleteSearchBar<IAddress> label="Une fripe dans ma ville ?" search={getCitiesLike}
        callback={async (loc: string) => setFripes(await getFripesByCity(loc))}
        getValueTypeValue={(val: IAddress) => val.city}
        placeholder="Montpellier, Bordeaux, ..." />
}

export default LocalisationSearchBar;
