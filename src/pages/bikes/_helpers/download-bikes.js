/**
 * ---------------------------------------------------------------------------
 * DOWNLOAD BIKES HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../env.js';

/**
 * This method handles the AJAX calls that download the bikes. After each
 * successful fetch it adds its downloaded bikes to the current state and
 * initiates the next AJAX call until all bikes have been downloaded.
 *
 * @param {number} page
 * @param {!PageOptions} opts
 * @param {!BikesDB} db
 * @param {!function} done
 * @return {void}
 */
function downloadBikes(page, opts, db, done) {
    const url = SITE_URL + '/api/user/bikes/' + page;
    let isLastPage = false;
    fetch(url)
        .catch(err => {
            err.message += '\nfetch("' + url + '") failed to connect with the'
                + ' server';
            console.error(err.message);
            console.error(err);
            alert('SERVER ERROR: The attempt to connect with our server to'
                + ' download the bikes failed.');
            setTimeout(() => { throw err }, 0);
        })
        .then(res => {
            if (!res.ok) {
                const err = new Error('fetch("' + url + '") responded with'
                    + ' status ' + res.status);
                console.error(err.message);
                console.error(err);
                alert('SERVER ERROR: The attempt to download the bikes from'
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
                downloadBikes(page + 1, opts, db, done);
            }
            db.adds(bikes, false);
            if (isLastPage) {
                done();
            }
        })
        .catch(err => setTimeout(() => { throw err }, 0));
}

export default downloadBikes;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
