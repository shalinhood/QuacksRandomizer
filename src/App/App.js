import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Panels from '@enact/moonstone/Panels';
import React from 'react';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const ingredients = [
    "pumpkin",
    "crowSkull",
    "toadstool",
    "mandrake",
    "locoweed",
    "gardenSpider",
    "ghostsBreath",
    "africanDeathsHeadHawkmoth"
];

const pumpkinDesc = [
    "1: 3 | 6: 22 \n Has no effect other than adding flavor!"
];

const crowSkullDesc = [
    "1: 5 | 2: 10 | 4: 19 \n Draw 1/2/4 chips from your bag. You may plae 1 of them in your pot.",
    "1: 5 | 2: 10 | 4: 19 \n If the pot explodes within the next 1/2/4 chips, you get victory points and money during the evaluation phase (but no die roll).",
    "1: 4 | 2: 8 | 4: 14 \n If this chip is on a ruby space, you IMMEDIATELY receive 1 ruby.",
    "1: 5 | 2: 10 | 4: 20 \n If this chip is on a ruby space, you IMMEDIATELY receive 1/2/4 victory points.",
    "1: 8 | 2: 15 | 4: 19 \n If you draw a blue chip, if in your pot there are at least as many orange chips as the value of the drawn blue chip, immediately receive 1/2/4 victory points.",
    "1: 5 | 2: 10 | 4: 18 \n When you place a blue chip, immediately receive 1 ruby for each white 1-chip in the previously placed 1/2/4 chips."
];

const toadstoolDesc = [
    "1: 6 | 2: 10 | 4: 16 \n If there are already 1 or 2 orange chips in your pot move the red chip 1 additional space forward. If there are 3 or more orange chips, move the red chip 2 additional spaces forward.",
    "1: 4 | 2: 8 | 4: 14 \n Put this chip aside. After you have stopped drawing, choose to either use ithis round or save it for the end of a future turn.",
    "1: 5 | 2: 9 | 4: 15 \n If the previously placed chip was white, add its value to the red chip. Move the red that many spaces forward.",
    "1: 7 | 2: 11 | 4: 17 \n As soon as 1 or more red chips are in the pot, each following  white 1-chip is moved 2 spaces.",
    "1: 6 | 2: 11 | 4: 18 \n Place a red chip according to the value or the value of the highest red chip already in your pot.",
    "1: 7 | 2: 11 | 4: 17 \n Draw 1 additional chip and put it aside, you decide when to place this chip in your pot, but you must use it this turn, even if your pot exploded."
];

const mandrakeDesc = [
    "1: 8 | 2: 12 | 4: 18 \n If the previously played chip was white, put the white chip back into the bag.",
    "1: 9 | 2: 13 | 4: 19 \n The next chip that is placed is moved ahead twice as far as its number indicates.",
    "1: 8 | 2: 12 | 4: 18 \n The total value of white chips needed to blow up your pot increases to 8. After drawing 3 yellow chips, the threshold increases to 9.",
    "1: 8 | 2: 12 | 4: 18 \n Your first placed yellow chip is moved 1 extra space, the 2nd yellow chip 2 extra spaces and the 3rd yellow chip 3 extra spaces.",
    "1: 10 | 2: 14 | 4: 20 \n After place this chip, draw 1 additional chip and move the yellow chip forward the value of the newly drawn chip. Put the newly drawn chip back in your bag.",
    "1: 8 | 2: 12 | 4: 18 \n If you give up 1 ruby, you can move this chip 3 more spaces forward."
]

const locoweedDesc = [
    "8 \n Place this chip forward for the total number of spaces you moved your rat stone at the beginning of your turn, plus 1 (max. 4).",
    "10 \n Copy the action and value of the last colored chip placed (ignore white chips)."
];

const gardenSpiderDesc = [
    "1: 4 | 2: 8 | 4: 14 \n For each green chip that is the last or next-to-last chip, you receive 1 ruby.",
    "1: 6 | 2: 11 | 4: 18 \n For each green chip that is the last or next-to-last chip, take 1 of the indicated ingredients: 1 -> orange 1-chip, 2 -> blue or red 1-chip, 4 -> yellow or purple 1-chip",
    "1: 6 | 2: 11 | 4: 21 \n If your white chips have an exact value of 7, add up the value of all green chips in your pot and then move your last chip that many spaces foward.",
    "1: 4 | 2: 8 | 4: 14 \n For each green chip that is the last or next-to-last chip, you may pay 1 ruby to move your droplet 1 space.",
    "1: 5 | 2: 9 | 4: 16 \n For each green chip that is the last or next-to-last chip, you may choose any chip that is currently in your pot to be the first chip you place next turn. This chip has to be equal or lower in value to the green chip.",
    "1: 4 | 2: 8 | 4: 14 \n For each green chip that is the last or next-to-last chip, you can roll the Bonus Die once."
];

const ghostsBreathDesc = [
    "9 \n Count the purple chips in your pot. 1 purple chip -> 1 victory point. 2 purple chips -> 1 victory point and 1 ruby. 3+ purple chips -> 2 victory points and you may more your droplet 1 space forward.",
    "12 \n You can discard drawn purple chips and exchange them for the following bonuses. 1 purple chip -> 1 black 1-chip, 1 victory point, and 1 ruby. 2 purple chips -> 1 green 1-chip, 1 blue 2-chip, 3 victory points, and you may move your droplet 1 space foward. 3 purple chips -> 1 yellow 4-chip, 6 victory points, 1 ruby, and you may move your droplet 2 spaces forward.",
    "10 \n For each purple chip, depending on its space in the pot, you receive the following victory points: <= 9 -> 0 victory points, >= 10 -> 1 victory points, >= 20 -> 2 victory points, >= 30 -> 3 victory points",
    "11 \n Trade 1 chip from the pot for another chip of the same color with a greater value according to the number or purple chips in your pot. 1 purple chip -> upgrade a 1-chip to a 2-chip. 2 purple chips -> upgrade a 2-chip to a 4-chip. 3+ purple chips -> upgrade a 1-chip to a 4-chip.",
    "9 \n Total up the victory points of all spaces covered by purple chips. But up to 2 additional different colored chips with this amount in the Chip Action Phase.",
    "16 \n Receive as many victory points as the printed value of the next placed chip. Lcocweed is worth 1."
];

const africanDeathsHeadHawkmothDesc = [
    "10 \n If you draw as many black chips as the other player move your droplet 1 space forward. If you draw more chips than the other player move your droplet 1 space forward and receive 1 ruby.",
    "10 \n If you draw more black chips than one of the players sitting next to you move your droplet 1 space foward. If you draw more black chips than both players sitting next to you move your droplet 1 space forward and receive 1 ruby.",
    "10 \n When purchased give this chip to the player to your left and move your droplet forward 1 space. Recieve 1 ruby for every black chip the person to your left has in their pot. For each black chip that is last or next-to-last chip receive 1 ruby.",
    "9 \n The player whose black chips is the furthest ahead in the potcan move their droplet 1 space foward. The player with the second furthest black chip receives 1 ruby."
];

const witches = [
    "snakeWitch",
    "catWitch",
    "owlWitch"
];

const catWitchDesc = [
    "Brewing Phase \n Use your flask after your pot explodes.",
    "Brewing Phase \n Draw 6 chips and decide in what order to place them. You do not have to use them all; return unused chips to the bag.",
    "Brewing Phase \n If your pot has not exploded you can return the last 2 white chips in your pot back to your bag.",
    "Scoring Phase \n Do not suffer any penalties if your pot explodes."
];

const owlWitchDesc = [
    "Buying Phase \n Upgrade the last two chips you added to your pot by 1 level or upgrade one chip anywhere in your pot.",
    "Buying Phase \n Double the coins you have to buy ingredients this phase. You can still only buy a total of 2 different-colored chips.",
    "Buying Phase \n Chose one of the chips you just purchased. Take a second one for free.",
    "Buying Phase \n For every ruby in your possession, increase the amount of coins you have to spend this phase by 2. You do not give up your rubies."
];

const snakeWitchDesc = [
    "Victory Point Phase \n According to the number of different chip colors in your pot, you receive the following victory points: 1-4 -> 3, 5-> 4, 6-> 7, 7 -> 10, 8 -> 14",
    "Victory Point Phase \n For every colored 2-, 4-, and 6-chip, as well as every purple and Locoweed chip in your bag, earn 2 victory points.",
    "Ruby Phase \n If you have a ruby on your scoring space, take as many rubies as victory points shows on the scoring space.",
    "End of Round \n At the end of the turn, the price for moving a droplet and filling the flask is 1 ruby each (cannot be used to buy victory points)."
];

const allCards = {
    pumpkin: {
        descriptions: pumpkinDesc,
        index: 0
    },
    crowSkull: {
        descriptions: crowSkullDesc,
        index: 0
    },
    toadstool: {
        descriptions: toadstoolDesc,
        index: 0
    },
    mandrake: {
        descriptions: mandrakeDesc,
        index: 0
    },
    locoweed: {
        descriptions: locoweedDesc,
        index: 0
    },
    gardenSpider: {
        descriptions: gardenSpiderDesc,
        index: 0
    },
    africanDeathsHeadHawkmoth: {
        descriptions: africanDeathsHeadHawkmothDesc,
        index: 0
    },
    ghostsBreath: {
        descriptions: ghostsBreathDesc,
        index: 0
    },
    snakeWitch: {
        descriptions: snakeWitchDesc,
        index: 0
    },
    catWitch: {
        descriptions: catWitchDesc,
        index: 0
    },
    owlWitch: {
        descriptions: owlWitchDesc,
        index: 0
    }
};

const App = kind({
    name: 'App',

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

    defaultProps: {
        expansion: true,
        selectedPlayerCount: 0,
        activeSet: null,
        lightModeActive: false,
        cards: allCards
    },

    styles: {
        css,
        className: 'app'
    },

    handlers: {
        onEnableExpansion: (ev, {onEnableExpansion}) => {
            if (onEnableExpansion) {
                onEnableExpansion({
                    expansion: !ev.expansion
                });
            }
        },

        onSetPlayerCount: (ev, {onSetPlayerCount}) => {
            if (onSetPlayerCount) {
                if (ev.children === '2 Players') {
                    onEnableExpansion({
                        selectedPlayerCount: 0
                    })
                }
                if (ev.children === '3,4,5 Players') {
                    onEnableExpansion({
                        selectedPlayerCount: 1
                    })
                }
            }
        },

        onSelectSet: (ev, {onSelectSet}) => {
            if (onSelectSet) {
                switch (ev.children) {
                    case '1':
                        onSelectSet({activeSet: 0});
                        break;
                    case '2':
                        onSelectSet({activeSet: 1});
                        break;
                    case '3':
                        onSelectSet({activeSet: 2});
                        break;
                    case '4':
                        onSelectSet({activeSet: 3});
                        break;
                    case '5':
                        onSelectSet({activeSet: 4});
                        break;
                    case '6':
                        onSelectSet({activeSet: 5});
                        break;
                    default:
                        onSelectSet({activeSet: null});
                }
            }
        }
    },

    render: (props) => (
        <div>
            {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
            <script src="/__/firebase/7.8.1/firebase-app.js"></script>

            {/* <!-- TODO: Add SDKs for Firebase products that you want to use */}
                {/* https://firebase.google.com/docs/web/setup#available-libraries --> */}

            {/* <!-- Initialize Firebase --> */}
            <script src="/__/firebase/init.js"></script>

            <Panels>
                <MainPanel {...props}/>
            </Panels>
        </div>
    )
});

export default MoonstoneDecorator(App);
