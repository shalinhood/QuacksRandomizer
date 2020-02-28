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
		// const skin = (skin ? 'light' : 'dark');

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
							selectedPlayerCount
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
	Changeable({prop: 'cards', change: 'onRandomizeIndividual'}),
	Changeable({prop: 'expansion', change: 'onEnableExpansion'}),
	Changeable({prop: 'selectedPlayerCount', change: 'onSetPlayerCount'})
);


// Set up the main App with the majority of the functionality
const DecoratedApp = AppDecorator(App);

// Set up an instance of DecoratedApp with some logic to apply the skin prop, which is what
// MoonstoneDecorator needs to apply the skin. This reads the props set by Changeable below
// and sets the "skin" prop on the DecoratedApp.
//
// eslint-disable-next-line enact/prop-types
const SkinCapableApp = (props) => <DecoratedApp skin={props.lightModeActive ? 'light' : 'dark'} {...props} />;

// Set up a Changeable wrapper to handle the state of the `lightModeActive` prop and the `onToggleTheme` callback.
const SkinnedApp = Changeable({prop: 'lightModeActive', change: 'onToggleTheme'}, SkinCapableApp);

export default SkinnedApp;
