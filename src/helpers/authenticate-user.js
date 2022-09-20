/**
 * ---------------------------------------------------------------------------
 * AUTHENTICATE USER HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../env.js';

/**
 * This method makes an AJAX call to the server to authenticate the user.
 *
 * @param {!function(boolean)} done
 * @return {void}
 */
function authenticateUser(done) {
    const url = SITE_URL + '/api/user/authenticate';
    fetch(url, { method: 'HEAD' })
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' authenticate the user failed.');
            setTimeout(() => { throw err }, 0);
        })
        .then(res => {
            if (res.ok) {
                done(true);
            } else if (/401/.test(res.status)) {
                done(false);
            } else {
                const err = new Error('fetch("' + url + '") responded with'
                    + ' status ' + res.status);
                console.error(err.message);
                console.error(err);
                alert('SERVER ERROR: The attempt to authenticate the user'
                    + ' with our server failed.');
                setTimeout(() => { throw err }, 0);
            }
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default authenticateUser;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
