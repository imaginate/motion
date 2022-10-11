/**
 * ---------------------------------------------------------------------------
 * MAKE REGISTRATION HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../env.js';

/**
 * This method handles the AJAX POST that registers you.
 *
 * @param {!Object} user
 * @param {!function(boolean)} done
 * @return {void}
 */
function makeRegistration(user, done) {
    const url = SITE_URL + '/api/user/register';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            done(false);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' register you failed.');
            setTimeout(() => { throw err }, 0);
        })
        .then(res => {
            if (res.ok) {
                done(true);
            } else if (/409/.test(res.status)) {
                done(false);
            } else {
                const err = new Error('fetch("' + url + '") responded with'
                    + ' status ' + res.status);
                console.error(err.message);
                console.error(err);
                done(false);
                alert('SERVER ERROR: The attempt to register you with our'
                    + ' server failed.');
                setTimeout(() => { throw err }, 0);
            }
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default makeRegistration;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
