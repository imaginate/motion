/**
 * ---------------------------------------------------------------------------
 * BIKE COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../../../env.js';
/** @const {!React} */
import React from 'react';
/** @const {!function} */
import Loading from '../../../../../components/loading.jsx';
/** @const {!function} */
import authenticateManager from '../../../../../helpers/authenticate-manager.js';
/** @const {!function} */
import downloadBike from '../_helpers/download-bike.js';
/** @const {!function} */
import getIDFromURL from '../../../../../helpers/get-id-from-url.js';
/** @const {!BikesDB} */
import BikeDB from '../_helpers/bike-db.js';
/** @const {!function} */
import ManagerNavBar from '../../../../../components/manager-nav-bar.jsx';
/** @const {!function} */
import LogButtons from '../../../../../components/log-buttons.jsx';
/** @const {!function} */
import BikeData from './bike-data.jsx';
/** @const {!function} */
import Reserve from './reserve.jsx';

/**
 * This method is the root component for the manage bike app. It sets up the
 * environment, verifies the manager, loads the bike, and hands over the
 * rendering to other components.
 *
 * @return {!ReactElement}
 */
function Bike() {

    /** @const {boolean} */
    const [ authenticated, setAuthenticated ] = React.useState(false);
    /** @const {boolean} */
    const [ loaded, setLoaded ] = React.useState(false);

    /** @const {number} */
    const [ bikeID ] = React.useState(() => getIDFromURL());
    /** @const {!BikesDB} */
    const [ db ] = React.useState(() => new BikeDB());

    /** @const {?Object} */
    const [ bike, setBike ] = React.useState(() => db.bike());

    React.useEffect(() => {
        authenticateManager(handleAuthenticateComplete);
        downloadBike(bikeID, db, handleDownloadComplete);
    }, []);

    /**
     * @param {boolean} loggedin
     * @param {boolean} isManager
     * @return {void}
     */
    function handleAuthenticateComplete(loggedin, isManager) {
        if (!loggedin) {
            window.location.replace(SITE_URL + '/login');
        }
        if (!isManager) {
            window.location.replace(SITE_URL + '/bikes');
        }
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
        window.location.href = SITE_URL + '/bikes';
    }

    if (!authenticated || !loaded) {
        return (
            <>
                <ManagerNavBar/>
                <h1 className="intro">Manage Bike {bikeID}</h1>
                <Loading/>
            </>
        );
    }

    return (
        <>
            <ManagerNavBar/>
            <LogButtons loggedin={true} handleLogout={handleLogout}/>
            <h1 className="intro">Manage Bike {bikeID}</h1>
            <div className="bike">
                <BikeData bike={bike} db={db}/>
                <Reserve bike={bike} db={db}/>
            </div>
        </>
    );
}

export default Bike;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
