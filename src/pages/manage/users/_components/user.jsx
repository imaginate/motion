/**
 * ---------------------------------------------------------------------------
 * USER COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../../env.js';
/** @const {!React} */
import React from 'react';

/**
 * This component renders a single user.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function User({ user }) {
    const href = SITE_URL + '/manage/user/' + user.id;
    return (
        <div className="userrow">
            <div id={'user:' + user.id} className="user">
                <a href={href} className="userlink">
                    <div className="usercell">
                        <p>{user.id}</p>
                    </div>
                    <div className="usercell">
                        <p>{user.first_name}</p>
                    </div>
                    <div className="usercell">
                        <p>{user.last_name}</p>
                    </div>
                    <div className="usercell">
                        <p>{user.email}</p>
                    </div>
                    <div className="usercell">
                        <p>{user.manager ? 'Manager' : 'User'}</p>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default User;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
