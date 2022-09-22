/**
 * ---------------------------------------------------------------------------
 * UPLOAD BIKE DATA HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../../../env.js';

/**
 * This method handles the AJAX POST that updates a bike's information.
 *
 * @param {!Object} bike
 * @param {!Object} data
 * @return {void}
 */
function uploadBikeData(bike, data) {
    const url = SITE_URL + '/api/manager/bike/edit';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bike_id: bike.id,
            data
        })
    })
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' update the bike failed.');
            setTimeout(() => { throw err }, 0);
        })
        .then(res => {
            if (!res.ok) {
                const err = new Error('fetch("' + url + '") responded with'
                    + ' status ' + res.status);
                console.error(err.message);
                console.error(err);
                alert('SERVER ERROR: The attempt to update the bike with our'
                    + ' server failed.');
                setTimeout(() => { throw err }, 0);
            }
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default uploadBikeData;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
