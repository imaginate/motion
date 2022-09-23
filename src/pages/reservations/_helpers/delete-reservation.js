/**
 * ---------------------------------------------------------------------------
 * DELETE RESERVATION HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../env.js';

/**
 * This method handles the AJAX POST that deletes a reservation.
 *
 * @param {!Object} reservation
 * @param {!function(?Error)} done
 * @return {void}
 */
function deleteReservation(reservation, done) {
    const url = SITE_URL + '/api/user/reservation/' + reservation.id;
    fetch(url, {
        method: 'DELETE'
    })
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            done(err);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' delete the reservation failed.');
            setTimeout(() => { throw err }, 0);
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
                alert('SERVER ERROR: The attempt to delete the reservation'
                    + ' with our server failed.');
                setTimeout(() => { throw err }, 0);
            }
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default deleteReservation;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
