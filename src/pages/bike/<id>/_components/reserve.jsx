/**
 * ---------------------------------------------------------------------------
 * RESERVE COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';
/** @const {!function} */
import makeUniqueID from '../../../../helpers/make-unique-id.js';
/** @const {!function} */
import makeReservation from '../_helpers/make-reservation.js';
/** @const {!function} */
import validDateInput from '../_helpers/valid-date-input.js';
/** @const {!DateOption} */
import DateOption from '../../../../helpers/date-option.js';

/**
 * This component handles making reservations for the bike.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function Reserve({ bike, db }) {

    /** @const {!Array<string>} */
    const [ dates, setDates ] = React.useState(() => db.dates());
    /** @const {!Set<string>} */
    const [ dateset, setDateset ] = React.useState(() => new Set(dates));
    /** @const {boolean} */
    const [ reserving, setReserving ] = React.useState(false);
    /** @const {boolean} */
    const [ success, setSuccess ] = React.useState(false);
    /** @const {boolean} */
    const [ failure, setFailure ] = React.useState(false);
    /** @const {?DateOption} */
    const [ from, setFrom ] = React.useState(null);
    /** @const {?DateOption} */
    const [ to, setTo ] = React.useState(null);

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleFromChange(event) {
        const input = event.target;
        const newfrom = input.value && validDateInput(input.value)
            ? new DateOption(input.value)
            : null;
        if (!newfrom || !dateset.has(newfrom.strictkey()) || (
            to && newfrom.compare(to) > 0
        )) {
            input.value = '';
            setFrom(null);
            return;
        }
        if (!to) {
            input.value = newfrom.strictkey();
            setFrom(newfrom);
            return;
        }
        for (let date = newfrom; !date.equals(to);) {
            date = new DateOption(date.year(), date.month(), date.day() + 1);
            if (!dateset.has(date.strictkey())) {
                input.value = '';
                setFrom(null);
                return;
            }
        }
        input.value = newfrom.strictkey();
        setFrom(newfrom);
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleToChange(event) {
        const input = event.target;
        const newto = input.value && validDateInput(input.value)
            ? new DateOption(input.value)
            : null;
        if (!newto || !dateset.has(newto.strictkey()) || (
            from && from.compare(newto) > 0
        )) {
            input.value = '';
            setTo(null);
            return;
        }
        if (!from) {
            input.value = newto.strictkey();
            setTo(newto);
            return;
        }
        for (let date = from; !date.equals(newto);) {
            date = new DateOption(date.year(), date.month(), date.day() + 1);
            if (!dateset.has(date.strictkey())) {
                input.value = '';
                setTo(null);
                return;
            }
        }
        input.value = newto.strictkey();
        setTo(newto);
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleReserveClick(event) {
        if (!from || !to) {
            setSuccess(false);
            setFailure(true);
            setTimeout(() => setFailure(false), 5000);
            return;
        }
        setReserving(true);
        makeReservation(bike, from, to, (err) => {
            if (err) {
                setSuccess(false);
                setFailure(true);
            } else {
                db.reserve(from, to);
                const newdates = db.dates();
                setDates(newdates);
                setDateset(new Set(newdates));
                setSuccess(true);
                setFailure(false);
            }
            setReserving(false);
            setTimeout(() => {
                setSuccess(false);
                setFailure(false);
            }, 5000);
        });
    }

    return (
        <>
            <div className="bikecell reserve">
                <label htmlFor="from">Reserve From:</label>
                <input
                    type="date"
                    id="from"
                    list="datesdatalist"
                    value={from ? from.strictkey() : ''}
                    onChange={handleFromChange}
                />
            </div>
            <div className="bikecell reserve">
                <label htmlFor="to">Reserve To:</label>
                <input
                    type="date"
                    id="to"
                    list="datesdatalist"
                    value={to ? to.strictkey() : ''}
                    onChange={handleToChange}
                />
            </div>
            <datalist id="datesdatalist">
                {dates.map((date, i) => (
                    <option key={makeUniqueID(i)} value={date}/>
                ))}
            </datalist>
            <div className="bikecell reserve">
                {reserving
                    ? <p className="reserving">Reserving</p>
                    : <button
                        id="reserve"
                        onClick={handleReserveClick}
                    >Make Reservation</button>
                }
                {success && <p className="success">Success</p>}
                {failure && <p className="failure">Failed</p>}
            </div>
        </>
    );
}

export default Reserve;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
