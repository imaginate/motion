/**
 * ---------------------------------------------------------------------------
 * TABS COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';
/** @const {!function} */
import makeUniqueID from '../../../../helpers/make-unique-id.js';
/** @const {!function} */
import Tab from './tab.jsx';

/**
 * This component handles the page tabs located at the bottom of the screen.
 * The page tabs enable you to view a new selection of 20 matching users.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function Tabs({ users, tab, handleTabChange }) {

    const lastTab = Math.ceil(users.length / 20);

    // We are going to pick 9 sequential page tabs (including the current tab)
    // to display. If possible we want the current tab to be the middle value.
    const startTab = tab < 5
        ? 1
        : tab + 4 > lastTab
            ? lastTab - 8 > 1
                ? lastTab - 8
                : 1
            : tab - 4;
    const endTab = startTab + 8 > lastTab
        ? lastTab
        : startTab + 8;

    const tabs = [];
    for (let t = startTab; t <= endTab; ++t) {
        const id = makeUniqueID(t);
        tabs.push([ id, t, t === tab ]);
    }

    return (
        <div className="tabbox">
            <div className="tabs">
                {tabs.map(([ id, tab, active ]) => (
                    <Tab
                        key={id}
                        tab={tab}
                        active={active}
                        handleTabChange={handleTabChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default Tabs;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
