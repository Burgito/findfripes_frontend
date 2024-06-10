import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IFripe } from "../interfaces/IFripe";
import { getFripeDetails } from "../services/httpService";

const FripeDetails = () => {
    const { fripeId } = useParams();
    const [fripe, setFripe] = useState<IFripe | null>(null);
    useEffect(() => {
        const getFripe = async () => fripeId ? setFripe(await getFripeDetails(fripeId)) : setFripe(null);
        getFripe();
    }, [])

    if (!fripe) return <div>
        Loader
    </div>

    return <div>
        <div>{fripe.fripePictures.map(fp => <img src={fp.filename} key={`${fripe.id}-${fp.filename}`} alt="" />)}</div>
        <div>
            <div>
                {fripe.name}
            </div>
            <div>
                {fripe.shortDescription}
            </div>
            <div>
                {fripe.longDescription}
            </div>
        </div>
        Fripe : {fripeId}
    </div>
}

export default FripeDetails;
