/**
 * ---------------------------------------------------------------------------
 * DOWNLOAD BIKE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../../env.js';

/**
 * This method handles the AJAX call that downloads the bike's data.
 *
 * @param {number} bikeID
 * @param {!BikeDB} db
 * @param {!function} done
 * @return {void}
 */
function downloadBike(bikeID, db, done) {
    const url = SITE_URL + '/api/user/bike/' + bikeID;
    fetch(url)
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' download the bike data failed.');
            setTimeout(() => { throw err }, 0);
        })
        .then(res => {
            if (!res.ok) {
                const err = new Error('fetch("' + url + '") responded with'
                    + ' status ' + res.status);
                console.error(err.message);
                console.error(err);
                alert('SERVER ERROR: The attempt to download the bike date'
                    + ' from our server failed.');
                setTimeout(() => { throw err }, 0);
            }
            return res.json();
        })
        .then(bike => {
            db.bike(bike, false);
            done();
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default downloadBike;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
