import { IFripe } from "../interfaces/IFripe";

function Fripe({ fripe }: { fripe: IFripe }) {
    return <div>
        <div>
            {fripe.name}
        </div>
        <div>
            <img src={fripe.fripePictures.length > 0 ? fripe.fripePictures[0].filename : ""} />
        </div>
    </div>
}

export default Fripe;