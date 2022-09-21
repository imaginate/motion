/**
 * ---------------------------------------------------------------------------
 * MAKE RESERVATION HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../../env.js';

/**
 * This method handles the AJAX POST that reserves a bike.
 *
 * @param {!Object} bike
 * @param {!DateOption} from
 * @param {!DateOption} to
 * @param {!function(?Error)} done
 * @return {void}
 */
function makeReservation(bike, from, to, done) {
    const url = SITE_URL + '/api/user/bike/reserve';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bike_id: bike.id,
            from: from.key(),
            to: to.key()
        })
    })
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            done(err);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' make your reservation failed.');
        })
        .then(res => {
            if (res.ok) {
                done(null);
            } else {
                const err = new Error('fetch("' + url + '") responded with'
                    + ' status ' + res.status);
                console.error(err.message);
                console.error(err);
                done(err);
                alert('SERVER ERROR: The attempt to make your reservation'
                    + ' with our server failed.');
            }
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default makeReservation;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
