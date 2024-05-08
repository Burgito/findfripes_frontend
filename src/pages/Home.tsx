import { createContext, useState } from "react";
import HomeSearchBars from "../components/HomeSearchBars";
import { IFripe } from "../interfaces/IFripe";
import { getFripesByCity } from "../services/httpService";

export interface IFripesContext {
    setFripes: (fripes: IFripe[]) => void;
    getFripesByCity: (city: string) => Promise<IFripe[]>;
}

export const FripesContext = createContext<IFripesContext | null>(null)

function Home() {
    const [fripes, setFripes] = useState<IFripe[]>([])



    return <FripesContext.Provider value={{ setFripes, getFripesByCity }}>
        <div className="ff-home">
            <HomeSearchBars />

            {fripes.map(f => <div>
                {f.name}
            </div>)}
        </div>
    </FripesContext.Provider>
}

export default Home;