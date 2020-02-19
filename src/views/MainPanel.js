import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import Layout, { Cell, Column } from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import Card from '../components/Card.js';
import RadioItem from '@enact/moonstone/RadioItem';
import Button from '@enact/moonstone/Button';
import ToggleItem from '@enact/moonstone/ToggleItem';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import Checkbox from '@enact/moonstone/Checkbox';

const MainPanel = kind({
    name: 'MainPanel',

    propTypes: {
        onEnableExpansion: PropTypes.func,
        expansion: PropTypes.bool,
        onSetPlayerCount: PropTypes.func,
        onSelectSet: PropTypes.func,
        cards: PropTypes.object,
        onRandomizeIndividual: PropTypes.func,
        onRandomizeAll: PropTypes.func,
    },

    handlers: {
        onEnableExpansion: (ev, {expansion, onEnableExpansion}) => {
            if (onEnableExpansion) {
                onEnableExpansion({expansion});
            }
        },

        onSetPlayerCount: (ev, {children, onSetPlayerCount}) => {
            if (onSetPlayerCount) {
                onSetPlayerCount({children});
            }
        },

        onSelectSet: (ev, {children, onSelectSet}) => {
            if (onSelectSet) {
                onSelectSet({children});
            }
        },

        onRandomizeAll: (ev, {onRandomizeAll}) => {
            if (onRandomizeAll) {
                onRandomizeAll();
            }
        }
    },

    render: ({onEnableExpansion, onSetPlayerCount, onSelectSet, cards, onRandomizeIndividual, onRandomizeAll, ...rest}) => (
        <fieldset>
            <Layout>
                <Row>
                    <Cell><ToggleItem iconComponent={Checkbox} onToggle={onEnableExpansion}>The Herb Witches</ToggleItem></Cell>
                    <Cell>
                        <Group childComponent={RadioItem} select="radio" onSelect={onSetPlayerCount}>
                            {[
                                {children: '2 Players'},
                                {children: '3,4,5 Players'}
                            ]}
                        </Group>
                    </Cell>
                    <Cell>Dark/Light Mode</Cell>
                </Row>
                <Row>
                    <Cell>
                        <Column>
                        <Cell component="header"><h1>Ingredient Sets</h1></Cell>
                        <Cell>
                            <Group childComponent={Button} select="radio" onSelect={onSelectSet}>
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
                    <Cell>
                        {/* Randomized Cards */}
                        <Column>
                        <Row>
                            <Card name="toadstool" descriptions={cards.toadstool.descriptions} index={cards.toadstool.index} onRandomize={onRandomizeIndividual} />
                            <Card name="crowSkull" descriptions={cards.crowSkull.descriptions} index={cards.crowSkull.index} onRandomize={onRandomizeIndividual} />
                            <Card name="mandrake" descriptions={cards.mandrake.descriptions} index={cards.mandrake.index} onRandomize={onRandomizeIndividual} />
                            <Card name="locoweed" descriptions={cards.locoweed.descriptions} index={cards.locoweed.index} onRandomize={onRandomizeIndividual} />
                        </Row>
                        <Row>
                            <Card name="gardenSpider" descriptions={cards.gardenSpider.descriptions} index={cards.gardenSpider.index} onRandomize={onRandomizeIndividual} />
                            <Card name="africanDeathsHeadHawkmoth" descriptions={cards.africanDeathsHeadHawkmoth.descriptions} index={index.africanDeathsHeadHawkmoth.index} onRandomize={onRandomizeIndividual} />
                            <Card name="ghostsBreath" descriptions={cards.ghostsBreath.descriptions} index={cards.ghostsBreath.index} onRandomize={onRandomizeIndividual} />
                            <Card name="pumpkin" descriptions={cards.pumpkin.descriptions} index={cards.pumpkin.index} onRandomize={onRandomizeIndividual} />
                        </Row>
                        <Row>
                            <Card name="snakeWitch" descriptions={cards.snakeWitch.descriptions} index={cards.snakeWitch.index} onRandomize={onRandomizeIndividual} />
                            <Card name="owlWitch" descriptions={cards.owlWitch.descriptions} index={cards.owlWitch.index} onRandomize={onRandomizeIndividual} />
                            <Card name="catWitch" descriptions={cards.catWitch.descriptions} index={cards.catWitch.index} onRandomize={onRandomizeIndividual} />
                        </Row>
                        <Cell>
                            <IconButton onClick={onRandomizeAll} size="large">
                                <i class="fas fa-dice"></i>
                            </IconButton>
                        </Cell>
                        </Column>
                    </Cell>
                </Row>
            </Layout>
        </fieldset>
        // <Panel {...props}>
        // 	<Header title="Hello world!" />
        // 	<Button>Click me</Button>
        // </Panel>
    )
});

export default Changeable({prop: 'cards', change:'onRandomizeAll'}, MainPanel);
