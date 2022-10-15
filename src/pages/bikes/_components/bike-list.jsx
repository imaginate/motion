/**
 * ---------------------------------------------------------------------------
 * BIKE-LIST COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';
/** @const {!function} */
import makeUniqueID from '../../../helpers/make-unique-id.js';
/** @const {!function} */
import Bike from './bike.jsx';

/**
 * This component renders the list of bikes.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function BikeList({ opts, db, bikes, tab }) {
    const start = (tab - 1) * 20;
    const end = Math.min(bikes.length, tab * 20);
    const list = bikes.slice(start, end);
    const last = list.length - 1;
    return (
        <div className="bikelist">
            {list.length === 0 && (
                <p className="nobikes">No Matching Bikes</p>
            )}
            {list.map((bike, i) => (
                <>
                    <Bike key={makeUniqueID(i)} bike={bike}/>
                    {i !== last && (
                        <div className="spacerow">
                            <div className="spacecell"></div>
                        </div>
                    )}
                </>
            ))}
        </div>
    );
}

export default BikeList;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
