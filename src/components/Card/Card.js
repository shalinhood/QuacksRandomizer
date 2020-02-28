import IconButton from '@enact/moonstone/IconButton';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Changeable from '@enact/ui/Changeable';
import css from './Card.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'

const names = {
    "pumpkin": "Pumpkin",
    "crowSkull": "Crow Skull",
    "toadstool": "Toadstool",
    "mandrake": "Mandrake",
    "locoweed": "Locoweed",
    "gardenSpider": "Garden Spider",
    "ghostsBreath": "Ghost's Breath",
    "africanDeathsHeadHawkmoth": "African Death's Head Hawkmoth",
    "snakeWitch": "Snake Witch",
    "catWitch": "Cat Witch",
    "owlWitch": "Owl Witch"
};

const CardBase = kind({
    name: "Card",

    styles: {
        css,
        className: 'card'
    },

    propTypes: {
        name: PropTypes.string,
        descriptions: PropTypes.array,
        index: PropTypes.number,
        onRandomize: PropTypes.func
    },

    handlers: {
        // Sends the name to App so that it can send the new index
        onRandomize: (ev, {name, onRandomize}) => {
            if (onRandomize) {
                onRandomize({name});
            }
        }
    },

    computed: {
        // Appends the name to the className so that the background color can be set
        className: ({name, styler}) => styler.append(name)
    },

    render: ({name, descriptions, onRandomize, index, ...rest}) => {
        return (
            <div {...rest}>
                <h1>{names[name]}</h1>
                <br/>
                {descriptions[index]}
                <IconButton onClick={onRandomize} size="small">
                    {/* <FontAwesomeIcon icon={faDice} /> */}
                    rollforward
                </IconButton>
            </div>
        );
    }
});

const Card = Changeable({prop: 'index', change: 'onRandomize'}, CardBase);
export default Card;
export {Card, CardBase};