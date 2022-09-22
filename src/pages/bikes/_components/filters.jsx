/**
 * ---------------------------------------------------------------------------
 * FILTERS COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';
/** @const {!function} */
import makeUniqueID from '../../../helpers/make-unique-id.js';
/** @const {!function} */
import trimWhitespace from '../../../helpers/trim-whitespace.js';
/** @const {!ValidOptionInputs} */
import VALID_OPTION_INPUTS from '../_helpers/valid-option-inputs.js';

/**
 * This component creates and manages the bike list filters.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function Filters({ opts, db, bikes, handleOptionsChange }) {

    const datespan = db.choices('datespan');
    const fromMaxDate = opts.has('to')
        ? opts.to().strictkey()
        : datespan[1].strictkey();
    const toMinDate = opts.has('from')
        ? opts.from().strictkey()
        : datespan[0].strictkey();
    const models = db.choices('model');
    const colors = db.choices('color');
    const locations = db.choices('location');
    const ratings = db.choices('rating');

    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleFromChange(event) {
        const input = event.target;
        const from = input.value;
        if (from && VALID_OPTION_INPUTS.from(from)) {
            const [ start, end ] = db.choices('datespan');
            opts.from(from);
            if (!opts.has('from')) {
                input.value = '';
            } else if (opts.from().compare(start) < 0) {
                opts.delete('from');
                input.value = '';
            } else if (opts.from().compare(end) > 0) {
                opts.from(end);
                if (opts.has('from')) {
                    input.value = opts.from().strictkey();
                } else {
                    opts.delete('from');
                    input.value = '';
                }
            }
        } else {
            opts.delete('from');
            input.value = '';
        }
        handleOptionsChange();
    }

    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleToChange(event) {
        const input = event.target;
        const to = input.value;
        if (to && VALID_OPTION_INPUTS.to(to)) {
            const [ start, end ] = db.choices('datespan');
            opts.to(to);
            if (!opts.has('to')) {
                input.value = '';
            } else if (opts.to().compare(start) < 0) {
                opts.to(start);
                if (opts.has('to')) {
                    input.value = opts.to().strictkey();
                } else {
                    opts.delete('to');
                    input.value = '';
                }
            } else if (opts.to().compare(end) > 0) {
                opts.delete('to');
                input.value = '';
            }
        } else {
            opts.delete('to');
            input.value = '';
        }
        handleOptionsChange();
    }

    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleModelChange(event) {
        const input = event.target;
        const model = trimWhitespace(input.value);
        if (model && VALID_OPTION_INPUTS.model(model)) {
            opts.model(model);
        } else {
            opts.delete('model');
            input.value = '';
        }
        handleOptionsChange();
    }

    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleColorChange(event) {
        const input = event.target;
        const color = trimWhitespace(input.value);
        if (color && VALID_OPTION_INPUTS.color(color)) {
            opts.color(color);
        } else {
            opts.delete('color');
            input.value = '';
        }
        handleOptionsChange();
    }

    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleLocationChange(event) {
        const input = event.target;
        const location = trimWhitespace(input.value);
        if (location && VALID_OPTION_INPUTS.location(location)) {
            opts.location(location);
        } else {
            opts.delete('location');
            input.value = '';
        }
        handleOptionsChange();
    }

    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleRatingChange(event) {
        const input = event.target;
        const rating = input.value;
        if (rating && VALID_OPTION_INPUTS.rating(rating)) {
            opts.rating(rating);
        } else {
            opts.delete('rating');
            input.value = '';
        }
        handleOptionsChange();
    }

    return (
        <div className="filters">
            <div className="filter">
                <label htmlFor="from">Available From:</label>
                <input
                    type="date"
                    id="from"
                    className="date"
                    min={datespan[0].strictkey()}
                    max={fromMaxDate}
                    value={opts.has('from') ? opts.from().strictkey() : ''}
                    onChange={handleFromChange}
                />
            </div>
            <div className="filter">
                <label htmlFor="to">Available To:</label>
                <input
                    type="date"
                    id="to"
                    className="date"
                    min={toMinDate}
                    max={datespan[1].strictkey()}
                    value={opts.has('to') ? opts.to().strictkey() : ''}
                    onChange={handleToChange}
                />
            </div>
            <div className="filter">
                <label htmlFor="model">Model:</label>
                <input
                    type="text"
                    id="model"
                    className="text"
                    list="modeldatalist"
                    placeholder="Model"
                    value={opts.has('model') ? opts.model() : ''}
                    onChange={handleModelChange}
                />
                <datalist id="modeldatalist">
                    {models.map((model, i) => (
                        <option key={makeUniqueID(i)} value={model}/>
                    ))}
                </datalist>
            </div>
            <div className="filter">
                <label htmlFor="color">Color:</label>
                <input
                    type="text"
                    id="color"
                    className="text"
                    list="colordatalist"
                    placeholder="Color"
                    value={opts.has('color') ? opts.color() : ''}
                    onChange={handleColorChange}
                />
                <datalist id="colordatalist">
                    {colors.map((color, i) => (
                        <option key={makeUniqueID(i)} value={color}/>
                    ))}
                </datalist>
            </div>
            <div className="filter">
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    className="text"
                    list="locationdatalist"
                    placeholder="Location"
                    value={opts.has('location') ? opts.location() : ''}
                    onChange={handleLocationChange}
                />
                <datalist id="locationdatalist">
                    {locations.map((location, i) => (
                        <option key={makeUniqueID(i)} value={location}/>
                    ))}
                </datalist>
            </div>
            <div className="filter">
                <label htmlFor="rating">Rating:</label>
                <input
                    type="text"
                    id="rating"
                    className="text"
                    list="ratingdatalist"
                    placeholder="Rating"
                    value={opts.has('rating') ? opts.rating() : ''}
                    onChange={handleRatingChange}
                />
                <datalist id="ratingdatalist">
                    {ratings.map((rating, i) => (
                        <option key={makeUniqueID(i)} value={rating}/>
                    ))}
                </datalist>
            </div>
        </div>
    );
}

export default Filters;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
