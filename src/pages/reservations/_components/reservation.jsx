/**
 * ---------------------------------------------------------------------------
 * RESERVATION COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../env.js';
/** @const {!React} */
import React from 'react';
/** @const {!function} */
import prettifyDate from '../../../helpers/prettify-date.js';
/** @const {!function} */
import isValidRatingInput from '../../../helpers/is-valid-rating-input.js';
/** @const {!function} */
import uploadRating from '../_helpers/upload-rating.js';
/** @const {!function} */
import deleteReservation from '../_helpers/delete-reservation.js';

/**
 * This component renders a single reservation.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function Reservation({ reservation, handleDelete }) {

    /** @const {(string|number)} */
    const [ rating, setRating ] = React.useState(() => (
        isValidRatingInput(reservation.rating)
            ? reservation.rating
            : ''
    ));

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleRatingChange(event) {
        const val = event.target.value;
        setRating(val);
        reservation.rating = isValidRatingInput(val)
            ? +val
            : 0;
        uploadRating(reservation);
    }

    /**
     * @return {void}
     */
    function handleDeleteClick() {
        deleteReservation(reservation, handleDelete);
    }

    return (
        <div className="reservationrow">
            <div id={'reservation:' + reservation.id} className="reservation">
                <div className="reservationcell">
                    <p>{reservation.id}</p>
                </div>
                <div className="reservationcell">
                    <a
                        href={SITE_URL + '/bike/' + reservation.bike_id}
                        className="reservationlink"
                    >Bike {reservation.bike_id}</a>
                </div>
                <div className="reservationcell">
                    <p>{prettifyDate(reservation.from) + ' - '
                        + prettifyDate(reservation.to)
                    }</p>
                </div>
                <div className="reservationcell">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={handleRatingChange}
                    >
                        <option value="">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="reservationcell">
                    <button id="delete" onClick={handleDeleteClick}>X</button>
                </div>
                </a>
            </div>
        </div>
    );
}

export default Reservation;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
