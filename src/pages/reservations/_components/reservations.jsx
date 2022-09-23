/**
 * ---------------------------------------------------------------------------
 * RESERVATIONS COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../env.js';
/** @const {!React} */
import React from 'react';
/** @const {!function} */
import Loading from '../../../components/loading.jsx';
/** @const {!function} */
import authenticateUser from '../../../helpers/authenticate-user.js';
/** @const {!function} */
import downloadReservations from '../_helpers/download-reservations.js';
/** @const {!PageOptions} */
import PageOptions from '../_helpers/page-options.js';
/** @const {!ReservationsDB} */
import ReservationsDB from '../_helpers/reservations-db.js';
/** @const {!function} */
import UserNavBar from '../../../components/user-nav-bar.jsx';
/** @const {!function} */
import LogButtons from '../../../components/log-buttons.jsx';
/** @const {!function} */
import Filters from './filters.jsx';
/** @const {!function} */
import ReservationList from './reservation-list.jsx';
/** @const {!function} */
import Tabs from './tabs.jsx';

/**
 * This method is the root component for the user reservations page. It sets
 * up the environment, verifies the user, loads the reservations, and hands
 * over the rendering to other components.
 *
 * @return {!ReactElement}
 */
function Reservations() {

    /** @const {boolean} */
    const [ authenticated, setAuthenticated ] = React.useState(false);
    /** @const {boolean} */
    const [ loaded, setLoaded ] = React.useState(false);

    /** @const {!PageOptions} */
    const [ opts ] = React.useState(() => new PageOptions());
    /** @const {!ReservationsDB} */
    const [ db ] = React.useState(() => new ReservationsDB(opts));

    /** @const {number} */
    const [ tab, setTab ] = React.useState(() => opts.tab());
    /** @const {!Array<!Object>} */
    const [ reservations, setReservations ] = React.useState(() => (
        db.reservations()
    );

    // This effect sets up the browser history state, appends the handler for
    // history state change (e.g. the user presses the back button), and
    // starts the reservation list download. On unmount this effect removes
    // the history state management listener.
    React.useEffect(() => {
        if (!opts.has('tab')) {
            opts.tab(1);
        }
        window.history.replaceState({
            opts: opts.state(),
            reservations
        }, '', opts.urlpath());
        window.addEventListener('popstate', handleHistoryChange);
        authenticateUser(handleAuthenticateComplete);
        downloadReservations(1, opts, db, handleDownloadComplete);
        return () => {
            window.removeEventListener('popstate', handleHistoryChange);
        };
    }, []);

    /**
     * @param {boolean} loggedin
     * @return {void}
     */
    function handleAuthenticateComplete(loggedin) {
        if (!loggedin) {
            window.location.replace(SITE_URL + '/login');
        }
        setAuthenticated(true);
    }

    /**
     * @return {void}
     */
    function handleDownloadComplete() {
        db.update();
        const reservations = db.reservations();
        // If the tab value is greater than the total tab count set the tab
        // to the last tab.
        opts.tab(reservations.length <= (opts.tab() - 1) * 20
            ? Math.ceil(reservations.length / 20)
            : opts.tab());
        window.history.replaceState({
            opts: opts.state(),
            reservations
        }, '', opts.urlpath());
        setTab(opts.tab());
        setReservations(reservations);
        setLoaded(true);
    }

    /**
     * @return {void}
     */
    function handleOptionsChange() {
        db.update();
        const reservations = db.reservations();
        window.history.pushState({
            opts: opts.state(),
            reservations
        }, '', opts.urlpath());
        setTab(opts.tab() || 1);
        setReservations(reservations);
    }

    /**
     * @param {number} tab
     * @return {void}
     */
    function handleTabChange(tab) {
        opts.tab(tab);
        window.history.pushState({
            opts: opts.state(),
            reservations
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
        setTab(opts.tab() || 1);
        setReservations(event.state.reservations);
        if (!authenticated) {
            authenticateUser(handleAuthenticateComplete);
        }
        if (!loaded) {
            downloadReservations(1, opts, db, handleDownloadComplete);
        }
    }

    /**
     * @return {void}
     */
    function handleDelete() {
        setLoaded(false);
        db.wipe();
        downloadReservations(1, opts, db, handleDownloadComplete);
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
                <UserNavBar/>
                <h1 className="intro">Your Reservations</h1>
                <Loading/>
            </>
        );
    }

    return (
        <>
            <UserNavBar/>
            <LogButtons loggedin={true} handleLogout={handleLogout}/>
            <h1 className="intro">Your Reservations</h1>
            <Filters
                opts={opts}
                db={db}
                reservations={reservations}
                handleOptionsChange={handleOptionsChange}
            />
            <ReservationList
                opts={opts}
                db={db}
                reservations={reservations}
                tab={tab}
                handleDelete={handleDelete}
            />
            <Tabs
                reservations={reservations}
                tab={tab}
                handleTabChange={handleTabChange}
            />
        </>
    );
}

export default Reservations;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
