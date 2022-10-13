/**
 * ---------------------------------------------------------------------------
 * RESERVATION LIST COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';
/** @const {!function} */
import makeUniqueID from '../../../helpers/make-unique-id.js';
/** @const {!function} */
import Reservation from './reservation.jsx';

/**
 * This component renders the list of reservations.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function ReservationList({
    opts,
    db,
    reservations,
    tab,
    handleOptionsChange,
    handleDelete
}) {
    const start = (tab - 1) * 20;
    const end = Math.min(reservations.length, tab * 20);
    const list = reservations.slice(start, end);
    return (
        <div className="reservationlist">
            {list.length === 0 && (
                <p className="noreservations">No Matching Reservations</p>
            )}
            {list.map((reservation, i) => (
                <Reservation
                    key={makeUniqueID(i)}
                    db={db}
                    opts={opts}
                    reservation={reservation}
                    handleDelete={handleDelete}
                    handleOptionsChange={handleOptionsChange}
                />
            ))}
        </div>
    );
}

export default ReservationList;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
