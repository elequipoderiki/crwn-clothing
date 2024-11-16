import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
// import CollectionsOverviewComponent from "../../components/collections-overview/collections-overview.component";
import { Route, Routes, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CollectionPage from "../collection/collection.component";

const ShopPage = () => {
    //we pass useParams function to child component in order to use it on its  mapStateToProps function, because useParams cannot be invoked directly on these child function, it is a hook, but it can if it is passed as a prop
    const params = useParams
    return (
        <div className="shop-page">
            <Routes>
                <Route path={``} element={<CollectionsOverview/>} />
                <Route path={`/:collectionId`} 
                element={<CollectionPage getProps={params}/>}/>
            </Routes>
        </div>
    )
}


export default ShopPage;