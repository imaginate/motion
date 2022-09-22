/**
 * ---------------------------------------------------------------------------
 * USER LIST COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';
/** @const {!function} */
import makeUniqueID from '../../../../helpers/make-unique-id.js';
/** @const {!function} */
import User from './user.jsx';

/**
 * This component renders the list of users.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function UserList({ opts, db, users, tab }) {
    const start = (tab - 1) * 20;
    const end = Math.min(users.length, tab * 20);
    const list = users.slice(start, end);
    return (
        <div className="userlist">
            {list.length === 0 && (
                <p className="nousers">No Matching Users</p>
            )}
            {list.map((user, i) => (
                <User key={makeUniqueID(i)} user={user}/>
            ))}
        </div>
    );
}

export default UserList;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
