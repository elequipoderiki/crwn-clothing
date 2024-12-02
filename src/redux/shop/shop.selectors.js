import { collection } from "@firebase/firestore";
import { createSelector } from "reselect";

const selectShop = state => state.shop;


export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)


export const selectCollection = () => createSelector(
    [selectCollections],
    collections => collections ? collectionFun(collections) : null
)

export const collectionFun =  (collections) => {
    return (collectionUrlParam) => collections[collectionUrlParam]
}

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)