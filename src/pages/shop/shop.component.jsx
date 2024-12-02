import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
// import CollectionsOverviewComponent from "../../components/collections-overview/collections-overview.component";
import { Route, Routes, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { convertCollectionsSnapshotToMap, db } from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { createStructuredSelector } from "reselect";
import {selectIsCollectionsLoaded, selectIsCollectionFetching } from "../../redux/shop/shop.selectors";


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    
    // constructor() {
    //     super();
    //     this.state = {
    //         loading: true
    //     }
    // }
    // unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {fetchCollectionsStartASync} = this.props
        fetchCollectionsStartASync()
        // const {updateCollections} = this.props;
        // const collectionRef = collection(db, 'collections')

        // this.unsubscribeFromSnapshot = onSnapshot(collectionRef, async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false})
        // })
    }
    
    render () {
        const {match, isFetchingCollections, isCollectionsLoaded} = this.props;
        // const {loading} = this.state;
        const params = useParams;
        // console.log('--------- props: ', this.props)
        return (
            <div className="shop-page">
                <Routes>
                    {/* <Route path={``} element={<CollectionsOverview/>} /> */}
                    <Route path={``} element={<CollectionsOverviewWithSpinner   
                     isLoading={isFetchingCollections} {...this.props}/>} />
                    <Route path={`/:collectionId`}  
                    element={<CollectionPageWithSpinner isLoading={!isCollectionsLoaded} getProps={params}/> } />
                </Routes>
            </div>
        )    
    }
}


/*
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
*/

const mapStateToProps = createStructuredSelector({
    isFetchingCollections: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartASync: () => dispatch(fetchCollectionsStartAsync())
    // updateCollections: collectionsMap => 
    //     dispatch(updateCollections(collectionsMap))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (ShopPage);