/**
 * ---------------------------------------------------------------------------
 * BIKE COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';
/** @const {!function} */
import Loading from '../../../../components/loading.jsx';
/** @const {!function} */
import authenticateUser from '../../../../helpers/authenticate-user.js';
/** @const {!function} */
import downloadBike from '../_helpers/download-bike.js';
/** @const {!function} */
import getBikeID from '../_helpers/get-bike-id.js';
/** @const {!BikesDB} */
import BikeDB from '../_helpers/bike-db.js';
/** @const {!function} */
import UserNavBar from '../../../../components/user-nav-bar.jsx';
/** @const {!function} */
import LogButtons from '../../../../components/log-buttons.jsx';
/** @const {!function} */
import Reserve from './reserve.jsx';

/**
 * This method is the root component for the user bike app. It sets up the
 * environment, verifies the user, loads the bike, and hands over the
 * rendering to other components.
 *
 * @return {!ReactElement}
 */
function Bike() {

    /** @const {number} */
    const [ bikeID ] = React.useState(() => getBikeID());
    /** @const {!BikesDB} */
    const [ db ] = React.useState(() => new BikeDB());
    /** @const {boolean} */
    const [ authenticated, setAuthenticated ] = React.useState(false);
    /** @const {boolean} */
    const [ loggedin, setLoggedin ] = React.useState(false);
    /** @const {boolean} */
    const [ loaded, setLoaded ] = React.useState(false);
    /** @const {?Object} */
    const [ bike, setBike ] = React.useState(() => db.bike());

    React.useEffect(() => {
        authenticateUser(handleAuthenticateComplete);
        downloadBike(bikeID, db, handleDownloadComplete);
    }, []);

    /**
     * @param {boolean} loggedin
     * @return {void}
     */
    function handleAuthenticateComplete(loggedin) {
        setLoggedin(loggedin);
        setAuthenticated(true);
    }

    /**
     * @return {void}
     */
    function handleDownloadComplete() {
        db.update();
        setBike(db.bike());
        setLoaded(true);
    }

    /**
     * @return {void}
     */
    function handleLogout() {
        setLoggedin(false);
    }

    if (!authenticated || !loaded) {
        return (
            <>
                <UserNavBar/>
                <h1 className="intro">Bike {bikeID} Rental</h1>
                <Loading/>
            </>
        );
    }

    return (
        <>
            <UserNavBar/>
            <LogButtons loggedin={loggedin} handleLogout={handleLogout}/>
            <h1 className="intro">Bike {bikeID} Rental</h1>
            <div className="bike">
                <div className="bikecell model">
                    <p>
                        <span className="label">Model:</span>
                        <span> {bike.model}</span>
                    </p>
                </div>
                <div className="bikecell color">
                    <p>
                        <span className="label">Color:</span>
                        <span> {bike.color}</span>
                    </p>
                </div>
                <div className="bikecell location">
                    <p>
                        <span className="label">Location:</span>
                        <span> {bike.location}</span>
                    </p>
                </div>
                <div className="bikecell rating">
                    <p>{bike.rating}/5 from {bike.rate_count} reviews</p>
                </div>
                <Reserve bike={bike} db={db}/>
            </div>
        </>
    );
}

export default Bike;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
