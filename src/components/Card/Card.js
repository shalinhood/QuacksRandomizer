import IconButton from '@enact/moonstone/IconButton';
import kind from '@enact/core/kind';
import {handle, forward, adaptEvent} from '@enact/core/handle';
import PropTypes from 'prop-types';
import React from 'react';
import Changeable from '@enact/ui/Changeable';
import {Cell, Column, Row} from '@enact/ui/Layout';
import Heading from '@enact/moonstone/Heading';
import BodyText from '@enact/moonstone/BodyText';
import Skinnable from '@enact/moonstone/Skinnable';

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
		className: ({name, styler}) => styler.append(name)
	},

	render: ({cards, name, onRandomize, ...rest}) => {
		const {title, topMatter, descriptions, index} = cards[name];
		return (
			<Column {...rest}>
				<Cell shrink component={Heading} showLine>{title}</Cell>
				<Cell shrink><BodyText>{topMatter[index]}</BodyText></Cell>
				<Cell><BodyText>{descriptions[index]}</BodyText></Cell>
				<Row align="center">
					<Cell shrink><IconButton onClick={onRandomize} size="small">
						{/* <FontAwesomeIcon icon={faDice} /> */}
						rollforward
					</IconButton>
					</Cell>
					<Cell />
					<Cell shrink>{index+1}</Cell>
				</Row>
			</Column>
		);
	}
});

const Card = Changeable({prop: 'index', change: 'onRandomize'}, Skinnable(CardBase));

export default Card;
export {
	Card,
	CardBase
};
