import IconButton from '@enact/moonstone/IconButton';
import kind from '@enact/core/kind';
import {handle, forward, adaptEvent} from '@enact/core/handle';
import PropTypes from 'prop-types';
import React from 'react';
import Changeable from '@enact/ui/Changeable';
import {Cell, Column} from '@enact/ui/Layout';
import Heading from '@enact/moonstone/Heading';
import BodyText from '@enact/moonstone/BodyText';

import css from './Card.module.less';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faDice } from '@fortawesome/free-solid-svg-icons'

const CardBase = kind({
	name: 'Card',

	styles: {
		css,
		className: 'card'
	},

	propTypes: {
		cards: PropTypes.object,
		index: PropTypes.number,
		lightModeActive: PropTypes.bool,
		name: PropTypes.string,
		onRandomize: PropTypes.func
	},

	handlers: {
		// Sends the name to App so that it can send the new index
		onRandomize: handle(
			adaptEvent(
				(ev, {name}) => ({name}),
				forward('onRandomize')
			)
		)
	},

	computed: {
		// Appends the name to the className so that the background color can be set
		className: ({lightModeActive, name, styler}) => styler.append(name, {light: lightModeActive})
	},

	render: ({cards, name, onRandomize, ...rest}) => {
		const {title, topMatter, descriptions, index} = cards[name];
		delete rest.lightModeActive;
		return (
			<Column {...rest}>
				<Cell shrink component={Heading} showLine>{title}</Cell>
				<Cell shrink><BodyText>{topMatter[index]}</BodyText></Cell>
				<Cell><BodyText>{descriptions[index]}</BodyText></Cell>
				<Cell shrink><IconButton onClick={onRandomize} size="small">
					{/* <FontAwesomeIcon icon={faDice} /> */}
					rollforward
				</IconButton>
				</Cell>
			</Column>
		);
	}
});

const Card = Changeable({prop: 'index', change: 'onRandomize'}, CardBase);

export default Card;
export {
	Card,
	CardBase
};
