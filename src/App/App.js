import kind from '@enact/core/kind';
import {handle, forward, log} from '@enact/core/handle';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Panels from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import Changeable from '@enact/ui/Changeable';

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

	propTypes: {
		activeSet: PropTypes.number,
		cards: PropTypes.object,
		expansion: PropTypes.bool,
		lightModeActive: PropTypes.bool,
		onEnableExpansion: PropTypes.func,
		onRandomizeAll: PropTypes.func,
		onRandomizeIndividual: PropTypes.func,
		onSelectSet: PropTypes.func,
		onSetPlayerCount: PropTypes.func,
		onToggleTheme: PropTypes.func,
		selectedPlayerCount: PropTypes.number
	},

	defaultProps: {
		activeSet: 1,
		cards,
		expansion: true,
		lightModeActive: false,
		selectedPlayerCount: 0
	},

	styles: {
		css,
		className: 'app' // 'app debug layout'
	},

	handlers: {
		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		onEnableExpansion: handle(
			log('onEnableExpansion'),
			forward('onEnableExpansion')
		),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		onSetPlayerCount: handle(
			log('onSetPlayerCount'),
			forward('onSetPlayerCount')
		),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		onSelectSet: handle(
			log('onSelectSet'),
			forward('onSelectSet')
		),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		onToggleTheme: handle(
			log('onToggleTheme'),
			forward('onToggleTheme')
		),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		onRandomizeAll: handle(
			log('onRandomizeAll'),
			forward('onRandomizeAll')
		),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		onRandomizeIndividual: handle(
			log('onRandomizeIndividual'),
			forward('onRandomizeIndividual')
		)
	},

	render: ({
		activeSet,
		cards: randomizedCards,
		expansion,
		lightModeActive,
		onEnableExpansion,
		onRandomizeAll,
		onRandomizeIndividual,
		onSelectSet,
		onSetPlayerCount,
		onToggleTheme,
		selectedPlayerCount,
		...rest
	}) => {
		return (
			<React.Fragment>
				{/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
				<script src="/__/firebase/7.8.1/firebase-app.js" />

				{/* <!-- TODO: Add SDKs for Firebase products that you want to use */}
				{/* https://firebase.google.com/docs/web/setup#available-libraries --> */}

				{/* <!-- Initialize Firebase --> */}
				<script src="/__/firebase/init.js" />

				<Panels {...rest}>
					<MainPanel
						{...{
							cards: randomizedCards,
							lightModeActive,
							activeSet,
							selectedPlayerCount,
							expansion,
							onRandomizeAll,
							onRandomizeIndividual,
							onToggleTheme,
							onSelectSet,
							onSetPlayerCount,
							onEnableExpansion
						}}
					/>
				</Panels>
			</React.Fragment>
		);
	}
});

const AppDecorator = compose(
	MoonstoneDecorator,
	Changeable({prop: 'activeSet', change: 'onSelectSet'}),
	Changeable({prop: 'cards', change: 'onRandomizeAll'}),
	Changeable({prop: 'expansion', change: 'onEnableExpansion'}),
	Changeable({prop: 'lightModeActive', change: 'onToggleTheme'}),
	Changeable({prop: 'selectedPlayerCount', change: 'onSetPlayerCount'})
);

export default AppDecorator(App);
