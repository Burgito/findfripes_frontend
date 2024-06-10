import { getRequest } from "../config/axios.config"
import { IAddress } from "../interfaces/IAddress";
import { IFripe } from "../interfaces/IFripe";

export const getFripesByCity = async (city: string) => {
    return await getRequest<IFripe[]>('/fripes', { city: city });
}

export const getCitiesLike = async (city: string, aborter?: AbortController) => {
    return await getRequest<IAddress[]>('/addresses', { city: city }, aborter);
}

export const getFripeDetails = async (fripeId: number | string) => {
    return await getRequest<IFripe>(`/fripes/${fripeId}`);
}