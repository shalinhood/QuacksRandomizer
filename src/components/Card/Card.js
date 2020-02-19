import IconButton from '@enact/moonstone/IconButton';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Changeable from '@enact/ui/Changeable';

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
        onRandomize: (ev, {name, onRandomize}) => {
            if (onRandomize) {
                onRandomize({name});
            }
        }
    },

    computer: {
        className: ({name, styler}) => styler.append({name})
    },

    render: ({name, descriptions, onRandomize, ...rest}) => {
        return (
            <div {...rest}>
                <h1>{name}</h1>
                <br/>
                {descriptions[index]}
                <IconButton onClick={onRandomize} size="small">
                    <i class="fas fa-dice"></i>
                </IconButton>
            </div>
        );
    }
});

const Card = Changeable({prop: 'index', change: 'onRandomize'}, CardBase);
export default Card;
export {Card, CardBase};