import { createContext, useEffect, useState } from "react";
import HomeSearchBars from "../components/HomeSearchBars";
import { IFripe } from "../interfaces/IFripe";
import { getFripesByCity } from "../services/httpService";
import Fripe from "../components/Fripe";

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

    return <FripesContext.Provider value={{ setFripes, getFripesByCity }}>
        <div className="ff-home">
            <HomeSearchBars />

            {fripes.map(f => <Fripe fripe={f} />)}
        </div>
    </FripesContext.Provider>
}

export default Home;