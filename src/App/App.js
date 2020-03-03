import kind from '@enact/core/kind';
import {handle, forward, log, adaptEvent} from '@enact/core/handle';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Panels from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import Changeable from '@enact/ui/Changeable';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

import cardStore from './cards.json';

import {activateSet, randomizeCard, randomizeAllCards, changePlayerCount} from './card-controller.js';

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
		onRefreshCards: PropTypes.func,
		onSelectSet: PropTypes.func,
		onSetPlayerCount: PropTypes.func,
		onToggleTheme: PropTypes.func,
		selectedPlayerCount: PropTypes.number
	},

	// defaultProps: {
	// },

	styles: {
		css,
		className: 'app' // 'app debug layout'
	},

	handlers: {
		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		// onEnableExpansion: handle(
		// 	log('onEnableExpansion'),
		// 	forward('onEnableExpansion')
		// ),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		onSetPlayerCount: handle(
			adaptEvent(
				({selectedPlayerCount}, {cards}) => ({cards: changePlayerCount(cards, selectedPlayerCount), selectedPlayerCount}),
				handle(
					forward('onSetPlayerCount'),
					forward('onRefreshCards')
				)
			),
		),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		// onSelectSet: handle(
		// 	log('onSelectSet'),
		// 	forward('onSelectSet')
		// ),

		onSelectSet: handle(
			adaptEvent(
				({activeSet}, {cards, selectedPlayerCount}) => ({cards: activateSet(cards, selectedPlayerCount, activeSet), activeSet}),
				handle(
					forward('onSelectSet'),
					forward('onRefreshCards')
				)
			),
		),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		// onToggleTheme: handle(
		// 	log('onToggleTheme'),
		// 	forward('onToggleTheme')
		// ),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		onRandomizeAll: handle(
			adaptEvent(
				(ev, {cards, selectedPlayerCount, expansion}) => ({cards: randomizeAllCards(cards, selectedPlayerCount, expansion), activeSet: null}),
				forward('onRefreshCards')
			),
		),

		// Safe to remove - Doesn't do anything except print the value to the console, and forward the event to Changeable.
		onRandomizeIndividual: handle(
			adaptEvent(
				({name}, {cards, selectedPlayerCount, expansion}) => ({cards: randomizeCard(cards, expansion, selectedPlayerCount, name), activeSet: null}),
				forward('onRefreshCards')
			),
		)
	},

	render: ({
		activeSet,
		cards,
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
		delete rest.onRefreshCards;

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
							cards,
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
	Changeable({prop: 'cards', change: 'onRefreshCards'}),
	Changeable({prop: 'expansion', change: 'onEnableExpansion'}),
	Changeable({prop: 'selectedPlayerCount', change: 'onSetPlayerCount'})
);


// Set up the main App with the majority of the functionality
const DecoratedApp = AppDecorator(App);

// Set up an instance of DecoratedApp with some logic to apply the skin prop, which is what
// MoonstoneDecorator needs to apply the skin. This reads the props set by Changeable below
// and sets the "skin" prop on the DecoratedApp.
//
// We specify "default*" because this is how we feed defaults into the `Changeable` HOCs above
// (Defined on the AppDecorator). The defaultProps on the component for these Changeable props were
// being ignored.
const SkinCapableApp = (props) => (
	<DecoratedApp
		// eslint-disable-next-line enact/prop-types
		skin={props.lightModeActive ? 'light' : 'dark'}
		defaultCards={cardStore}
		defaultActiveSet={1}
		defaultExpansion
		defaultSelectedPlayerCount={0}
		{...props}
	/>
);

// Set up a Changeable wrapper to handle the state of the `lightModeActive` prop and the `onToggleTheme` callback.
const SkinnedApp = Changeable({prop: 'lightModeActive', change: 'onToggleTheme'}, SkinCapableApp);

export default SkinnedApp;
