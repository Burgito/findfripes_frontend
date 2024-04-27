import FripeNameSearchBar from "./FripeNameSearchBar";
import LocalisationSearchBar from "./LocalisationSearchBar";

const HomeSearchBars = () => {
    return <div className="ff-homesearchbars">
        <LocalisationSearchBar />
        <FripeNameSearchBar />
    </div>
}

export default HomeSearchBars;