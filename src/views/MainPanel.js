import kind from '@enact/core/kind';
// import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import Layout, { Row, Cell, Column, CellDecorator, LayoutDecorator } from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import Card from '../components/Card/Card.js';
import RadioItem from '@enact/moonstone/RadioItem';
import Button from '@enact/moonstone/Button';
import IconButton from '@enact/moonstone/IconButton';
import ToggleItem from '@enact/moonstone/ToggleItem';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import Checkbox from '@enact/moonstone/Checkbox';
import Switch from '@enact/moonstone/Switch';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'

const GroupLayout = LayoutDecorator(Group);
const RadioItemCell = CellDecorator(RadioItem);
const ButtonCell = CellDecorator(Button);

const MainPanel = kind({
    name: 'MainPanel',

    propTypes: {
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

    handlers: {
        // Lets App know if the toggle is pressed and flips whether or not expansion material is included
        onEnableExpansion: (ev, {expansion, onEnableExpansion}) => {
            if (onEnableExpansion) {
                onEnableExpansion({expansion});
            }
        },

        // Lets App know the player count (effects African Death's Head Moth)
        onSetPlayerCount: (ev, {children, onSetPlayerCount}) => {
            if (onSetPlayerCount) {
                onSetPlayerCount({children});
            }
        },

        // Lets App know the slider was toggled to switch themes
        onToggleTheme: (ev, {lightModeActive, onToggleTheme}) => {
            if (onToggleTheme) {
                onToggleTheme({lightModeActive});
            }
        },

        // Lets App know if a set is selected
        onSelectSet: (ev, {children, onSelectSet}) => {
            if (onSelectSet) {
                onSelectSet({children});
            }
        },

        // Lets App know the button was pressed and changes the index for all the cards
        onRandomizeAll: (ev, {onRandomizeAll}) => {
            if (onRandomizeAll) {
                onRandomizeAll();
            }
        }
    },

    render: ({onEnableExpansion, expansion, onSetPlayerCount, selectedPlayerCount, onSelectSet, activeSet, onToggleTheme, lightModeActive, cards, onRandomizeIndividual, onRandomizeAll, ...rest}) => (
        // <fieldset>
            <Layout {...rest}>
                <Column>
                <Row style={{height: '10%'}}>
                    <Cell><ToggleItem iconComponent={Checkbox} onToggle={onEnableExpansion} selected={expansion}>The Herb Witches</ToggleItem></Cell>
                    <Cell>
                        <GroupLayout orientation="horizontal" childComponent={RadioItemCell} select="radio" onSelect={onSetPlayerCount} selected={selectedPlayerCount}>
                            {[
                                {children: '2 Players'},
                                {children: '3,4,5 Players'}
                            ]}
                        </GroupLayout>
                    </Cell>
                    <Cell><Switch onToggle={onToggleTheme} selected={lightModeActive}>Dark/Light Mode</Switch></Cell>
                </Row>
                <Row style={{height: '90%'}}>
                    <Cell size="10%">
                        <Column>
                        <Cell component="header">Ingredient Sets</Cell>
                        <Cell>
                            <Group childComponent={ButtonCell} select="radio" onSelect={onSelectSet} selected={activeSet}>
                                {[
                                    {children: '1'},
                                    {children: '2'},
                                    {children: '3'},
                                    {children: '4'},
                                    {children: '5'},
                                    {children: '6'}
                                ]}
                            </Group>
                        </Cell>
                        {/* <Cell><Button onClick={onSelectSet}>1</Button></Cell>
                        <Cell><Button onClick={onSelectSet}>2</Button></Cell>
                        <Cell><Button onClick={onSelectSet}>3</Button></Cell>
                        <Cell><Button onClick={onSelectSet}>4</Button></Cell>
                        <Cell><Button onClick={onSelectSet}>5</Button></Cell>
                        <Cell><Button onClick={onSelectSet}>6</Button></Cell> */}
                        </Column>
                    </Cell>
                    <Cell size="90%">
                        {/* Randomized Cards */}
                        <Column>
                        <Row align="center">
                            <Card name="toadstool" descriptions={cards.toadstool.descriptions} index={cards.toadstool.index} onRandomize={onRandomizeIndividual} />
                            <Card name="crowSkull" descriptions={cards.crowSkull.descriptions} index={cards.crowSkull.index} onRandomize={onRandomizeIndividual} />
                            <Card name="mandrake" descriptions={cards.mandrake.descriptions} index={cards.mandrake.index} onRandomize={onRandomizeIndividual} />
                            <Card name="locoweed" descriptions={cards.locoweed.descriptions} index={cards.locoweed.index} onRandomize={onRandomizeIndividual} />
                        </Row>
                        <Row align="center">
                            <Card name="gardenSpider" descriptions={cards.gardenSpider.descriptions} index={cards.gardenSpider.index} onRandomize={onRandomizeIndividual} />
                            <Card name="africanDeathsHeadHawkmoth" descriptions={cards.africanDeathsHeadHawkmoth.descriptions} index={cards.africanDeathsHeadHawkmoth.index} onRandomize={onRandomizeIndividual} />
                            <Card name="ghostsBreath" descriptions={cards.ghostsBreath.descriptions} index={cards.ghostsBreath.index} onRandomize={onRandomizeIndividual} />
                            <Card name="pumpkin" descriptions={cards.pumpkin.descriptions} index={cards.pumpkin.index} onRandomize={onRandomizeIndividual} />
                        </Row>
                        <Row align="center">
                            <Card name="snakeWitch" descriptions={cards.snakeWitch.descriptions} index={cards.snakeWitch.index} onRandomize={onRandomizeIndividual} />
                            <Card name="owlWitch" descriptions={cards.owlWitch.descriptions} index={cards.owlWitch.index} onRandomize={onRandomizeIndividual} />
                            <Card name="catWitch" descriptions={cards.catWitch.descriptions} index={cards.catWitch.index} onRandomize={onRandomizeIndividual} />
                        </Row>
                        <Cell>
                            <IconButton onClick={onRandomizeAll} size="large">
                                <FontAwesomeIcon icon={faDice} />
                            </IconButton>
                        </Cell>
                        </Column>
                    </Cell>
                </Row>
                </Column>
            </Layout>
        // </fieldset>
        // <Panel {...props}>
        // 	<Header title="Hello world!" />
        // 	<Button>Click me</Button>
        // </Panel>
    )
});

export default Changeable({prop: 'cards', change:'onRandomizeAll'},
    Changeable({prop: 'lightModeActive', change: 'onToggleTheme'},
        Changeable({prop: 'activeSet', change:'onSelectSet'},
            Changeable({prop: 'selectedPlayerCount', change: 'onSetPlayerCount'},
                Changeable({prop: 'expansion', change: 'onEnableExpansion'},
                    MoonstoneDecorator(MainPanel)
                )
            )
        )
    )
);
