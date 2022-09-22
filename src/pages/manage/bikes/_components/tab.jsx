/**
 * ---------------------------------------------------------------------------
 * TAB COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';

/**
 * This component is a single page tab.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function Tab({ tab, active, handleTabChange }) {

    /**
     * @return {void}
     */
    function handleTabClick() {
        if (!active) {
            handleTabChange(tab);
        }
    }

    return (
        <div className="tab">
            {active
                ? <button
                    className="active"
                    onClick={handleTabClick}
                  >{tab}</button>
                : <button onClick={handleTabClick}>{tab}</button>
            }
        </div>
    );
}

export default Tab;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
