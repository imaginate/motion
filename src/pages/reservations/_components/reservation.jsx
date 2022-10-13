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
function Reservation({
    db,
    opts,
    reservation,
    handleOptionsChange,
    handleDelete
}) {

    /** @const {(string|number)} */
    const [ rating, setRating ] = React.useState(() => (
        isValidRatingInput(reservation.rating)
            ? reservation.rating
            : ''
    ));

    /** @const {boolean} */
    const [ updating, setUpdating ] = React.useState(false);
    /** @const {boolean} */
    const [ failure, setFailure ] = React.useState(false);
    /** @const {boolean} */
    const [ success, setSuccess ] = React.useState(false);

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleRatingChange(event) {
        const val = event.target.value;
        setFailure(false);
        setSuccess(false);
        setUpdating(true);
        const prev = reservation.rating;
        db.changeRating(reservation, val);
        uploadRating(reservation, err => {
            if (err) {
                db.changeRating(reservation, prev);
                setFailure(true);
                setTimeout(() => setFailure(false), 5000);
            } else {
                setRating(val);
                if (opts.rating()) {
                    handleOptionsChange();
                } else {
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 5000);
                }
            }
            setUpdating(false);
        });
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
                    <label className="rating" htmlFor="rating">Rating:</label>
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
                    <span className="icon">
                    {updating && (
                        <img
                            className="icon"
                            src={SITE_URL + '/img/loading-green-24x24.svg'}
                            alt="Updating Rating"
                        />
                    )}
                    {failure && (
                        <img
                            className="icon"
                            src={SITE_URL + '/img/x-red-24x24.svg'}
                            alt="Rating Update Failed"
                        />
                    )}
                    {success && (
                        <img
                            className="icon"
                            src={SITE_URL + '/img/checkmark-green-24x24.svg'}
                            alt="Rating Updated"
                        />
                    )}
                    </span>
                </div>
                <div className="reservationcell">
                    <button id="delete" onClick={handleDeleteClick}>X</button>
                </div>
            </div>
        </div>
    );
}

export default Reservation;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
