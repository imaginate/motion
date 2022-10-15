/**
 * ---------------------------------------------------------------------------
 * BIKE COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../../env.js';
/** @const {!React} */
import React from 'react';

/**
 * This component renders a single bike.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function Bike({ bike }) {
    const href = SITE_URL + '/manage/bike/' + bike.id;
    return (
        <a href={href} className="bikerow" title={'Edit Bike #' + bike.id}>
            <div className="bikecell">
                <p>#{bike.id}</p>
            </div>
            <div className="bikecell">
                <p>{bike.model}</p>
            </div>
            <div className="bikecell">
                <p>{bike.color}</p>
            </div>
            <div className="bikecell">
                <p>{bike.location}</p>
            </div>
            <div className="bikecell">
                <p>{bike.rating.toFixed(2)} / 5</p>
            </div>
        </a>
    );
}

export default Bike;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
