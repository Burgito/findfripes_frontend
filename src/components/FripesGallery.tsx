import { IFripe } from "../interfaces/IFripe";
import Fripe from "./Fripe";

const FripesGallery = ({ fripes }: { fripes: IFripe[] }) => {
    return <div className="ff-fripes-gallery">
        {fripes.map(f => <Fripe fripe={f} key={`${f.id}-${f.name}`} />)}
    </div>
}

export default FripesGallery;