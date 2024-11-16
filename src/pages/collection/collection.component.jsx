import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import collectionItem from "../../components/collection-item/collection-item.component";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import CollectionItem from "../../components/collection-item/collection-item.component";
import './collection.styles.scss'

const CollectionPage = ({collection}) => {
    // console.log('***** collection ********: ',collection)
    const {title, items } = collection
    return (
    <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
            {items.map(item => (
                <CollectionItem key={item.id} item={item} />
            ))}
        </div>
    </div>
    )
}
 
const mapStateToProps = (state, ownProps) => ({
    //ownProps are the props coming from parent component and includes a function called getProps. These are not default props
    collection: selectCollection(ownProps.getProps().collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)

