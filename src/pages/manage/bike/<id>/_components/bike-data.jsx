/**
 * ---------------------------------------------------------------------------
 * BIKE DATA COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../../../env.js';
/** @const {!React} */
import React from 'react';
/** @const {!function} */
import uploadBikeData from '../_helpers/upload-bike-data.js';
/** @const {!function} */
import isValidModelInput from '../../../../../helpers/is-valid-model-input.js';
/** @const {!function} */
import isValidColorInput from '../../../../../helpers/is-valid-color-input.js';
/** @const {!function} */
import isValidLocationInput from '../../../../../helpers/is-valid-location-input.js';

/**
 * This component contains the primary bike data.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function BikeData({ bike, db }) {

    /** @const {number} */
    const [ modelTimeoutID, setModelTimeoutID ] = React.useState(0);
    /** @const {number} */
    const [ colorTimeoutID, setColorTimeoutID ] = React.useState(0);
    /** @const {number} */
    const [ locationTimeoutID, setLocationTimeoutID ] = React.useState(0);

    /** @const {boolean} */
    const [ emptyModel, setEmptyModel ] = React.useState(false);
    /** @const {boolean} */
    const [ emptyColor, setEmptyColor ] = React.useState(false);
    /** @const {boolean} */
    const [ emptyLocation, setEmptyLocation ] = React.useState(false);
    /** @const {boolean} */
    const [ badModel, setBadModel ] = React.useState(false);
    /** @const {boolean} */
    const [ badColor, setBadColor ] = React.useState(false);
    /** @const {boolean} */
    const [ badLocation, setBadLocation ] = React.useState(false);

    /** @const {string} */
    const [ model, setModel ] = React.useState(bike.model);
    /** @const {string} */
    const [ color, setColor ] = React.useState(bike.color);
    /** @const {string} */
    const [ location, setLocation ] = React.useState(bike.location);

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleModelChange(event) {
        const val = event.target.value;

        setModel(val);
        setEmptyModel(false);
        setBadModel(false);

        if (!val) {
            setEmptyModel(true);
            return;
        }
        if (!isValidModelInput(val)) {
            setBadModel(true);
            return;
        }

        if (modelTimeoutID) {
            clearTimeout(modelTimeoutID);
        }

        setModelTimeoutID(setTimeout(() => {
            bike.model = val;
            uploadBikeData(bike, {
                model: val
            });
        }, 1000));
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleColorChange(event) {
        const val = event.target.value;

        setColor(val);
        setEmptyColor(false);
        setBadColor(false);

        if (!val) {
            setEmptyColor(true);
            return;
        }
        if (!isValidColorInput(val)) {
            setBadColor(true);
            return;
        }

        if (colorTimeoutID) {
            clearTimeout(colorTimeoutID);
        }

        setColorTimeoutID(setTimeout(() => {
            bike.color = val;
            uploadBikeData(bike, {
                color: val
            });
        }, 1000));
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleLocationChange(event) {
        const val = event.target.value;

        setLocation(val);
        setEmptyLocation(false);
        setBadLocation(false);

        if (!val) {
            setEmptyLocation(true);
            return;
        }
        if (!isValidLocationInput(val)) {
            setBadLocation(true);
            return;
        }

        if (locationTimeoutID) {
            clearTimeout(locationTimeoutID);
        }

        setLocationTimeoutID(setTimeout(() => {
            bike.location = val;
            uploadBikeData(bike, {
                location: val
            });
        }, 750));
    }

    return (
        <div className="bikedata">
            <div className="bikecell model">
                <label htmlFor="model">Model:</label>
                <input
                    type="text"
                    id="model"
                    value={model}
                    placeholder="Model"
                    onChange={handleModelChange}
                />
                {emptyModel && <p className="failure">Model Is Required</p>}
                {badModel && <p className="failure">Invalid Model</p>}
            </div>
            <div className="bikecell color">
                <label htmlFor="color">Color:</label>
                <input
                    type="text"
                    id="color"
                    value={color}
                    placeholder="Color"
                    onChange={handleColorChange}
                />
                {emptyColor && <p className="failure">Color Is Required</p>}
                {badColor && <p className="failure">Invalid Color</p>}
            </div>
            <div className="bikecell location">
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    placeholder="Location"
                    onChange={handleLocationChange}
                />
                {emptyLocation && (
                    <p className="failure">Location Is Required</p>
                )}
                {badLocation && <p className="failure">Invalid Location</p>}
            </div>
            <div className="bikecell rating">
                <p>{bike.rating} / 5 from {bike.rate_count} reviews</p>
            </div>
        </div>
    );
}

export default BikeData;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
