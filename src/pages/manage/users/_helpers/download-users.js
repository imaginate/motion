/**
 * ---------------------------------------------------------------------------
 * DOWNLOAD BIKES HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../../env.js';

/**
 * This method handles the AJAX calls that download the users. After each
 * successful fetch it adds its downloaded users to the current state and
 * initiates the next AJAX call until all users have been downloaded.
 *
 * @param {number} page
 * @param {!PageOptions} opts
 * @param {!UsersDB} db
 * @param {!function} done
 * @return {void}
 */
function downloadUsers(page, opts, db, done) {
    const url = SITE_URL + '/api/manager/users/' + page;
    let isLastPage = false;
    fetch(url)
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' download the users failed.');
            setTimeout(() => { throw err }, 0);
        })
        .then(res => {
            if (!res.ok) {
                const err = new Error('fetch("' + url + '") responded with'
                    + ' status ' + res.status);
                console.error(err.message);
                console.error(err);
                alert('SERVER ERROR: The attempt to download the users from'
                    + ' our server failed.');
                setTimeout(() => { throw err }, 0);
            }
            if (res.headers.get('Page-Number')
                === res.headers.get('Last-Page')
            ) {
                isLastPage = true;
            }
            return res.json();
        })
        .then(bikes => {
            if (!isLastPage) {
                downloadUsers(page + 1, opts, db, done);
            }
            db.adds(users, false);
            if (isLastPage) {
                done();
            }
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default downloadUsers;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
