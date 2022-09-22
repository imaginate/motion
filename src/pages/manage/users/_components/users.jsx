/**
 * ---------------------------------------------------------------------------
 * USERS COMPONENT
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
import downloadUsers from '../_helpers/download-users.js';
/** @const {!PageOptions} */
import PageOptions from '../_helpers/page-options.js';
/** @const {!UsersDB} */
import UsersDB from '../_helpers/users-db.js';
/** @const {!function} */
import ManagerNavBar from '../../../../components/manager-nav-bar.jsx';
/** @const {!function} */
import LogButtons from '../../../../components/log-buttons.jsx';
/** @const {!function} */
import Filters from './filters.jsx';
/** @const {!function} */
import UserList from './user-list.jsx';
/** @const {!function} */
import Tabs from './tabs.jsx';

/**
 * This method is the root component for the users management page. It sets up
 * the environment, verifies the manager, loads the users, and hands over the
 * rendering to other components.
 *
 * @return {!ReactElement}
 */
function Users() {

    /** @const {boolean} */
    const [ authenticated, setAuthenticated ] = React.useState(false);
    /** @const {boolean} */
    const [ loaded, setLoaded ] = React.useState(false);

    /** @const {!PageOptions} */
    const [ opts ] = React.useState(() => new PageOptions());
    /** @const {!UsersDB} */
    const [ db ] = React.useState(() => new UsersDB(opts));

    /** @const {number} */
    const [ tab, setTab ] = React.useState(() => opts.tab());
    /** @const {!Array<!Object>} */
    const [ users, setUsers ] = React.useState(() => db.users());

    // This effect sets up the browser history state, appends the handler for
    // history state change (e.g. the user presses the back button), and
    // starts the user list download. On unmount this effect removes the
    // history state management listener.
    React.useEffect(() => {
        if (!opts.has('tab')) {
            opts.tab(1);
        }
        window.history.replaceState({
            opts: opts.state(),
            users
        }, '', opts.urlpath());
        window.addEventListener('popstate', handleHistoryChange);
        authenticateManager(handleAuthenticateComplete);
        downloadUsers(1, opts, db, handleDownloadComplete);
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
        const users = db.users();
        // If the tab value is greater than the total tab count set the tab
        // to the last tab.
        opts.tab(users.length <= (opts.tab() - 1) * 20
            ? Math.ceil(users.length / 20)
            : opts.tab());
        window.history.replaceState({
            opts: opts.state(),
            users
        }, '', opts.urlpath());
        setTab(opts.tab());
        setUsers(users);
        setLoaded(true);
    }

    /**
     * @return {void}
     */
    function handleOptionsChange() {
        db.update();
        const users = db.users();
        window.history.pushState({
            opts: opts.state(),
            users
        }, '', opts.urlpath());
        setTab(opts.tab() || 1);
        setUsers(users);
    }

    /**
     * @param {number} tab
     * @return {void}
     */
    function handleTabChange(tab) {
        opts.tab(tab);
        window.history.pushState({
            opts: opts.state(),
            users
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
        setUsers(event.state.users);
        if (!authenticated) {
            authenticateManager(handleAuthenticateComplete);
        }
        if (!loaded) {
            downloadUsers(1, opts, db, handleDownloadComplete);
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
                <h1 className="intro">Manage Users</h1>
                <Loading/>
            </>
        );
    }

    return (
        <>
            <ManagerNavBar/>
            <LogButtons loggedin={true} handleLogout={handleLogout}/>
            <h1 className="intro">Manage Users</h1>
            <Filters
                opts={opts}
                db={db}
                users={users}
                handleOptionsChange={handleOptionsChange}
            />
            <UserList opts={opts} db={db} users={users} tab={tab}/>
            <Tabs users={users} tab={tab} handleTabChange={handleTabChange}/>
        </>
    );
}

export default Users;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
