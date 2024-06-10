import { createContext, useEffect, useMemo, useState } from "react";
import HomeSearchBars from "../components/HomeSearchBars";
import { IFripe } from "../interfaces/IFripe";
import { getFripesByCity } from "../services/httpService";
import FripesGallery from "../components/FripesGallery";

export interface IFripesContext {
    setFripes: (fripes: IFripe[]) => void;
    getFripesByCity: (city: string) => Promise<IFripe[]>;
}

export const FripesContext = createContext<IFripesContext | null>(null)

function Home() {
    const [fripes, setFripes] = useState<IFripe[]>([])
    useEffect(() => {
        const getFripes = async () => setFripes(await getFripesByCity(""))
        getFripes();
    }, [])

    const fripesProviderValue = useMemo(() => ({ setFripes, getFripesByCity }), [setFripes, getFripesByCity]);
    return <FripesContext.Provider value={fripesProviderValue}>
        <div className="ff-home">
            <HomeSearchBars />
            <FripesGallery fripes={fripes} />
        </div>
    </FripesContext.Provider>
}

export default Home;