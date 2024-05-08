import { useContext } from "react";
import { IAddress } from "../interfaces/IAddress";
import { getCitiesLike } from "../services/httpService";
import AutocompleteSearchBar from "./AutocompleteSearchBar";
import { FripesContext } from "../pages/Home";

const LocalisationSearchBar = () => {
    const fripesContext = useContext(FripesContext);
    return <AutocompleteSearchBar<IAddress> label="Une fripe dans ma ville ?" search={getCitiesLike}
        callback={(loc: string) => fripesContext!.getFripesByCity(loc)} getValueTypeValue={(val: IAddress) => val.city}
        placeholder="Montpellier, Bordeaux, ..." />
}

export default LocalisationSearchBar;
