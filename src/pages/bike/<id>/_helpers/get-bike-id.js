/**
 * ---------------------------------------------------------------------------
 * GET BIKE ID HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const ID_PATT = /^.*\/([1-9][0-9]{0,9})\/?(?:\?.*)?$/;

/**
 * Retrieves the ID from the URL path.
 *
 * @return {number}
 */
function getBikeID() {
    const url = new URL(window.location.href);
    const path = url.pathname;
    return ID_PATT.test(path)
        ? +path.replace(ID_PATT, '$1')
        : 0;
}

export default getBikeID;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
