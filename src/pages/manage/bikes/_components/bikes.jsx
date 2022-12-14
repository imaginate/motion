/**
 * ---------------------------------------------------------------------------
 * BIKES COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../../env.js';
/** @const {!React} */
import React from 'react';
/** @const {!function} */
import Loading from '../../../../components/loading.jsx';
/** @const {!function} */
import authenticateManager from '../../../../helpers/authenticate-manager.js';
/** @const {!function} */
import downloadBikes from '../_helpers/download-bikes.js';
/** @const {!PageOptions} */
import PageOptions from '../_helpers/page-options.js';
/** @const {!BikesDB} */
import BikesDB from '../_helpers/bikes-db.js';
/** @const {!function} */
import ManagerNavBar from '../../../../components/manager-nav-bar.jsx';
/** @const {!function} */
import LogButtons from '../../../../components/log-buttons.jsx';
/** @const {!function} */
import Filters from './filters.jsx';
/** @const {!function} */
import BikeList from './bike-list.jsx';
/** @const {!function} */
import Tabs from './tabs.jsx';

/**
 * This method is the root component for the bikes management page. It sets up
 * the environment, verifies the manager, loads the bikes, and hands over the
 * rendering to other components.
 *
 * @return {!ReactElement}
 */
function Bikes() {

    /** @const {boolean} */
    const [ authenticated, setAuthenticated ] = React.useState(false);
    /** @const {boolean} */
    const [ loaded, setLoaded ] = React.useState(false);

    /** @const {!PageOptions} */
    const [ opts ] = React.useState(() => new PageOptions());
    /** @const {!BikesDB} */
    const [ db ] = React.useState(() => new BikesDB(opts));

    /** @const {number} */
    const [ tab, setTab ] = React.useState(() => opts.tab());
    /** @const {!Array<!Object>} */
    const [ bikes, setBikes ] = React.useState(() => db.bikes());

    // This effect sets up the browser history state, appends the handler for
    // history state change (e.g. the user presses the back button), and
    // starts the bike list download. On unmount this effect removes the
    // history state management listener.
    React.useEffect(() => {
        if (!opts.has('tab')) {
            opts.tab(1);
        }
        window.history.replaceState({
            opts: opts.state(),
            bikes
        }, '', opts.urlpath());
        window.addEventListener('popstate', handleHistoryChange);
        authenticateManager(handleAuthenticateComplete);
        return () => {
            window.removeEventListener('popstate', handleHistoryChange);
        };
    }, []);

    /**
     * @param {boolean} loggedin
     * @param {boolean} isManager
     * @return {void}
     */
    function handleAuthenticateComplete(loggedin, isManager) {
        if (!loggedin) {
            window.location.replace(SITE_URL + '/login');
            return;
        }
        if (!isManager) {
            window.location.replace(SITE_URL + '/bikes');
            return;
        }
        setAuthenticated(true);
        downloadBikes(1, opts, db, handleDownloadComplete);
    }

    /**
     * @return {void}
     */
    function handleDownloadComplete() {
        db.update();
        const bikes = db.bikes();
        opts.prunetab(bikes.length);
        window.history.replaceState({
            opts: opts.state(),
            bikes
        }, '', opts.urlpath());
        setTab(opts.tab());
        setBikes(bikes);
        setLoaded(true);
    }

    /**
     * @return {void}
     */
    function handleOptionsChange() {
        db.update();
        const bikes = db.bikes();
        opts.prunetab(bikes.length);
        window.history.pushState({
            opts: opts.state(),
            bikes
        }, '', opts.urlpath());
        setTab(opts.tab());
        setBikes(bikes);
    }

    /**
     * @param {number} tab
     * @return {void}
     */
    function handleTabChange(tab) {
        opts.tab(tab);
        window.history.pushState({
            opts: opts.state(),
            bikes
        }, '', opts.urlpath());
        setTab(opts.tab());
    }

    /**
     * This method handles a history state change (e.g. user clicks the back
     * or forward button).
     *
     * @param {!Event} event
     * @return {void}
     */
    function handleHistoryChange(event) {
        opts.state(event.state.opts);
        opts.prunetab(event.state.bikes.length);
        setTab(opts.tab());
        setBikes(event.state.bikes);
        if (!authenticated) {
            authenticateManager(handleAuthenticateComplete);
        }
        if (!loaded) {
            downloadBikes(1, opts, db, handleDownloadComplete);
        }
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
                <h1 className="intro">Manage Bikes</h1>
                <Loading/>
            </>
        );
    }

    return (
        <>
            <ManagerNavBar/>
            <LogButtons loggedin={true} handleLogout={handleLogout}/>
            <h1 className="intro">Manage Bikes</h1>
            <Filters
                opts={opts}
                db={db}
                bikes={bikes}
                handleOptionsChange={handleOptionsChange}
            />
            <BikeList opts={opts} db={db} bikes={bikes} tab={tab}/>
            <Tabs bikes={bikes} tab={tab} handleTabChange={handleTabChange}/>
        </>
    );
}

export default Bikes;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
