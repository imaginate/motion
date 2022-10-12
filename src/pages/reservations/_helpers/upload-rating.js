/**
 * ---------------------------------------------------------------------------
 * UPLOAD RATING HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../env.js';

/**
 * This method handles the AJAX POST that updates a reservation's rating.
 *
 * @param {!Object} reservation
 * @param {!function(?Error): void} done
 * @return {void}
 */
function uploadRating(reservation, done) {
    const url = SITE_URL + '/api/user/rating';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reservation_id: reservation.id,
            bike_id: reservation.bike_id,
            rating: reservation.rating
        })
    })
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            done(err);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' update the rating failed.');
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
                alert('SERVER ERROR: The attempt to update the rating with'
                    + ' our server failed.');
                setTimeout(() => { throw err }, 0);
            }
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default uploadRating;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
