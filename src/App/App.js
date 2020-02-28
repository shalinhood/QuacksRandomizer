import kind from '@enact/core/kind';
import {handle, forward, adaptEvent} from '@enact/core/handle';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Panels from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';
import MainPanel from '../views/MainPanel';

import css from './App.module.less';

import cards from './cards.json';

// const witches = [
//     "snakeWitch",
//     "catWitch",
//     "owlWitch"
// ];

const App = kind({
    name: 'App',

    PropTypes: {
        onEnableExpansion: PropTypes.func,
        expansion: PropTypes.bool,
        onSetPlayerCount: PropTypes.func,
        selectedPlayerCount: PropTypes.number,
        onSelectSet: PropTypes.func,
        activeSet: PropTypes.number,
        onToggleTheme: PropTypes.func,
        lightModeActive: PropTypes.bool,
        cards: PropTypes.object,
        onRandomizeIndividual: PropTypes.func,
        onRandomizeAll: PropTypes.func,
    },

    defaultProps: {
        expansion: true,
        selectedPlayerCount: 0,
        activeSet: null,
        lightModeActive: false,
        cards
    },

    styles: {
        css,
        className: 'app'
    },

    handlers: {
        onEnableExpansion: handle(
            adaptEvent(
                ({expansion}) => ({
                    expansion: !expansion
                }),
                forward('onEnableExpansion')
            )
        ),

        onSetPlayerCount: (ev, {onSetPlayerCount}) => {
            if (onSetPlayerCount) {
                if (ev.children === '2 Players') {
                    onSetPlayerCount({
                        selectedPlayerCount: 0
                    })
                }
                if (ev.children === '3,4,5 Players') {
                    onSetPlayerCount({
                        selectedPlayerCount: 1
                    })
                }
            }
        },

        onSelectSet: handle(
            adaptEvent(
                ({children}) => ({
                    activeSet: (children ? (parseInt(children) - 1) : null)
                }),
                forward('onSelectSet')
            )
        ),

        onToggleTheme: handle(
            adaptEvent(
                ({lightModeActive}) => ({
                    lightModeActive: !lightModeActive
                }),
                forward('onToggleTheme')
            )
        ),

        // These don't actually do anything and may not be necessary
        onRandomizeAll: forward('onRandomizeAll'),
        onRandomizeIndividual: forward('onRandomizeIndividual'),
    },

    render: (props) => (
        <div>
            {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
            <script src="/__/firebase/7.8.1/firebase-app.js" />

            {/* <!-- TODO: Add SDKs for Firebase products that you want to use */}
                {/* https://firebase.google.com/docs/web/setup#available-libraries --> */}

            {/* <!-- Initialize Firebase --> */}
            <script src="/__/firebase/init.js" />

            <Panels>
                <MainPanel {...props}/>
            </Panels>
        </div>
    )
});

export default MoonstoneDecorator(App);
