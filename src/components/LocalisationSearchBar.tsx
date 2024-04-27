const LocalisationSearchBar = () => {
    return <div className="ff-loc-search-bar ff-searchbar">
        <label htmlFor="ff-loc-search-bar">Une fripe dans ma ville ?</label>
        <input id="ff-loc-search-bar" type="search" placeholder="Montpellier, Bordeaux, ..." />
    </div>
}

export default LocalisationSearchBar;