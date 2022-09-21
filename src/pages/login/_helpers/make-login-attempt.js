/**
 * ---------------------------------------------------------------------------
 * MAKE LOGIN ATTEMPT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../env.js';

/**
 * This method handles the AJAX POST that logs you in.
 *
 * @param {string} email
 * @param {string} pwd
 * @param {!function(boolean)} done
 * @return {void}
 */
function makeLoginAttempt(email, pwd, done) {
    const url = SITE_URL + '/api/user/login';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password: pwd
        })
    })
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            done(false);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' log you in failed.');
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
                done(false);
                alert('SERVER ERROR: The attempt to log you in with our'
                    + ' server failed.');
                setTimeout(() => { throw err }, 0);
            }
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default makeLoginAttempt;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
