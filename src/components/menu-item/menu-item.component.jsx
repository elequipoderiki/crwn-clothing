import React from "react";
import {withRouter} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
// import {useHistory} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import './menu-item.styles.scss';

    // var history2 = useNavigate()

// const MenuItem = ({title, imageUrl, size, history}) => (
function MenuItem({title, imageUrl, size, linkUrl}) {
    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();
    // console.log("++++++++++++++++++++",location.pathname)

    return (
        <div className={ `${size} menu-item`} 
            onClick={() => navigate(`${location.pathname}${linkUrl}`)}
            // onClick={() => console.log(location.pathname)}
        >
            <div className="background-image" 
                style={{backgroundImage: `url(${imageUrl})` }}
            /> 
            
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )


// )
}

export default MenuItem;
// export default withRouter(MenuItem);