import kind from '@enact/core/kind';
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
        onEnableExpansion: (ev, {onEnableExpansion}) => {
            if (onEnableExpansion) {
                onEnableExpansion({
                    expansion: !ev.expansion
                });
            }
        },

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

        onSelectSet: (ev, {onSelectSet}) => {
            if (onSelectSet) {
                switch (ev.children) {
                    case '1':
                        onSelectSet({activeSet: 0});
                        break;
                    case '2':
                        onSelectSet({activeSet: 1});
                        break;
                    case '3':
                        onSelectSet({activeSet: 2});
                        break;
                    case '4':
                        onSelectSet({activeSet: 3});
                        break;
                    case '5':
                        onSelectSet({activeSet: 4});
                        break;
                    case '6':
                        onSelectSet({activeSet: 5});
                        break;
                    default:
                        onSelectSet({activeSet: null});
                }
            }
        },

        onToggleTheme: (ev, {onToggleTheme}) => {
            if (onToggleTheme) {
                onToggleTheme({
                    lightModeActive: !ev.lightModeActive
                })
            }
        },

        onRandomizeAll: (ev, {onRandomizeAll}) => {
            if (onRandomizeAll) {
                onRandomizeAll()
            }
        },

        onRandomizeIndividual: (ev, {onRandomizeIndividual}) => {
            if (onRandomizeIndividual) {
                onRandomizeIndividual()
            }
        }
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
