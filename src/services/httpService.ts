import { getRequest } from "../config/axios.config"
import { IAddress } from "../interfaces/IAddress";
import { IFripe } from "../interfaces/IFripe";

export const getFripesByCity = async (city: string) => {
    return await getRequest('/fripes', { city: city }) as IFripe[];
}

export const getCitiesLike = async (city: string, aborter?: AbortController) => {
    return await getRequest('/addresses', { city: city }, aborter) as IAddress[];
}