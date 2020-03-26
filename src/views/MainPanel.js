import kind from '@enact/core/kind';
import {Panel} from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';
import {handle, forward, adaptEvent, log} from '@enact/core/handle';
import Group from '@enact/ui/Group';
import {Row, Cell, Column} from '@enact/ui/Layout';
import RadioItem from '@enact/moonstone/RadioItem';
import Button from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import IconButton from '@enact/moonstone/IconButton';
import ToggleItem from '@enact/moonstone/ToggleItem';
import Picker from '@enact/moonstone/Picker';
import Checkbox from '@enact/moonstone/Checkbox';
import SwitchItem from '@enact/moonstone/SwitchItem';
import Scroller from '@enact/moonstone/Scroller';
import dice from '../icons/dice-solid.svg';

import Card from '../components/Card/Card.js';

import css from './MainPanel.module.less';

const playerOpitons = ['2 Players', '3,4,5 Players'];

const MainPanel = kind({
	name: 'MainPanel',

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
		activeSet: 1
	},

	styles: {
		css,
		className: 'mainPanel'
	},

	computed: {
		ingredientSetOptions: ({expansion}) => {
			if (expansion) {
				return ['Rnd', '1', '2', '3', '4', '5', '6'];
			}
			else {
				return ['Rnd', '1', '2', '3', '4'];
			}
		},

		witchCards: ({expansion, cards, onRandomizeIndividual}) => {
			if (expansion) {
				return (
				<Cell shrink>
					<Row>
						<Cell className={css.card}><Card name="snakeWitch" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
						<Cell className={css.card}><Card name="owlWitch" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
						<Cell className={css.card}><Card name="catWitch" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
					</Row>
				</Cell>
				);
			}
			else {
				return null;
			}
		},

		locoweedCard: ({expansion, cards, onRandomizeIndividual}) => {
			if (expansion) {
				return (
					<Cell className={css.card}><Card name="locoweed" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
				);
			}
			else {
				return null;
			}
		}
	},

	handlers: {
		// Lets App know if the toggle is pressed and flips whether or not expansion material is included
		onEnableExpansion: handle(
			adaptEvent(
				({selected}) => ({expansion: selected}),
				forward('onEnableExpansion')
			)
		),

		// Lets App know the player count (effects African Death's Head Moth)
		onSetPlayerCount: handle(
			adaptEvent(
				({selected}) => ({selectedPlayerCount: selected}),  // Group's event payload includes 2 values, the children text (`data`) of the seleciton, and the index of the array (`selected`).
				forward('onSetPlayerCount')
			)
		),

		// Lets App know the slider was toggled to switch themes
		onToggleTheme: handle(
			adaptEvent(
				({selected}) => ({lightModeActive: selected}),  // ToggleItem based components return a boolean in the `selected` key of the event payload
				forward('onToggleTheme')
			)
		),

		// Lets App know if a set is selected
		onSelectSet: handle(
			log('onSelectSet-before'),
			adaptEvent(
				// This references data and value because the two different controls wired up to this event return different event payloads, so we're just looking for both and choosing the one that isn't blank, augmenting `data` because it's the visible text, not the index.
				({data, value}) => ({activeSet:  parseInt(data) || parseInt(value)}), // if NaN, return 0
				handle(forward('onSelectSet'),
				log('onSelectSet-after'))
			)
		),

		onGithub: handle(
			() => (window.open('https://github.com/shalinhood/QuacksRandomizer', '_blank')),
			forward('onGithub')
		)
	},

	render: ({
		activeSet,
		cards,
		expansion,
		ingredientSetOptions,
		lightModeActive,
		locoweedCard,
		onGithub,
		onEnableExpansion,
		onRandomizeAll,
		onRandomizeIndividual,
		onSelectSet,
		onSetPlayerCount,
		onToggleTheme,
		selectedPlayerCount,
		witchCards,
		...rest
	}) => {
		return (
			<Panel {...rest}>
				<Column>
					<Cell shrink>
						<Row align="center space-evenly">
							<Cell shrink>
								<Row align="center">
									<Cell shrink component={Heading}>Expansion:</Cell>
									<Cell shrink>
										<ToggleItem iconComponent={Checkbox} onToggle={onEnableExpansion} selected={expansion}>The Herb Witches</ToggleItem>
									</Cell>
								</Row>
							</Cell>
							<Cell shrink>
								<Group childComponent={RadioItem} select="radio" onSelect={onSetPlayerCount} selected={selectedPlayerCount} selectedProp="selected" itemProps={{inline: true}}>
									{playerOpitons}
								</Group>
							</Cell>
							<Cell component={Button} onClick={onGithub} shrink>Github!</Cell>
							<Cell shrink><SwitchItem onToggle={onToggleTheme} selected={lightModeActive}>Dark/Light Mode</SwitchItem></Cell>
						</Row>
					</Cell>
					<Cell>
						<Row style={{height: '100%'}}>
							<Cell size="15%">
								<Column align="center space-between">
									<Cell component={Heading} shrink>Ingredient Sets</Cell>
									<Cell shrink style={{textAlign: 'center'}}>
										<Picker value={activeSet} onChange={onSelectSet} orientation="vertical" joined width="medium">
											{ingredientSetOptions}
										</Picker>
										<Group component="div" childComponent={Button} select="radio" onSelect={onSelectSet} selected={activeSet} selectedProp="selected">
											{ingredientSetOptions.slice(1)}
										</Group>
									</Cell>
									<Cell shrink>
										<IconButton onClick={onRandomizeAll} size="large">
											{dice}
										</IconButton>
									</Cell>
								</Column>
							</Cell>
							<Cell>
								<Scroller>
									{/* Randomized Cards */}
									<Column>
										<Cell shrink>
											<Row>
												<Cell className={css.card}><Card name="toadstool" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
												<Cell className={css.card}><Card name="crowSkull" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
												<Cell className={css.card}><Card name="mandrake" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
												{locoweedCard}
											</Row>
										</Cell>
										<Cell size="1000px" shrink>
											<Row>
												<Cell className={css.card}><Card name="gardenSpider" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
												<Cell className={css.card}><Card name="africanDeathsHeadHawkmoth" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
												<Cell className={css.card}><Card name="ghostsBreath" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
												<Cell className={css.card}><Card name="pumpkin" cards={cards} onRandomize={onRandomizeIndividual} /></Cell>
											</Row>
										</Cell>
										{witchCards}
									</Column>
								</Scroller>
							</Cell>
						</Row>
					</Cell>
				</Column>
			</Panel>
		);
	}
});

export default MainPanel;
