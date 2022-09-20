/**
 * ---------------------------------------------------------------------------
 * LOADING COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';

/**
 * This is the loading component which is the loading icon for all pages.
 *
 * @return {!ReactElement}
 */
function Loading() {
    return (
        <div id="loadingbox">
            <div id="loading">
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
}

export default Loading;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
