import { Link } from "react-router-dom";
import { IFripe } from "../interfaces/IFripe";

function Fripe({ fripe }: Readonly<{ fripe: IFripe }>) {
    return <Link className="ff-fripe-container" to={`fripe/${fripe.id}`}>
        <div className="ff-fripe-main-picture-container">
            <img alt="" className="ff-fripe-main-picture"
                src={fripe.fripePictures.length > 0 ? fripe.fripePictures[0].filename : ""} />
        </div>
        <div className="ff-fripe-name">
            {fripe.name}
        </div>
    </Link>
}

export default Fripe;