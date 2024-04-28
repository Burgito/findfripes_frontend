import { getRequest } from "../config/axios.config"
import { IFripe } from "../interfaces/IFripe";

export const getFripesByCity = async (city: string, aborter?: AbortController) => {
    return await getRequest("/fripes", { city: city }, aborter) as IFripe[];
}