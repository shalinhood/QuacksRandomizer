function activateSet (cards, selectedPlayerCount, setNumber) {
	let newCards = {...cards};
	for (const name in newCards) {
		if (name.includes('Witch')) {
			continue;
		} else {
			switch (name) {
				case 'pumpkin':
					break;
				case 'locoweed':
					if (setNumber < 6) {
						newCards[name].index = 0;
					} else {
						newCards[name].index = 1;
					}
					break;
				case 'africanDeathsHeadHawkmoth':
					if (setNumber > 4) {
						newCards[name].index = setNumber - 3;
					} else {
						newCards[name].index = selectedPlayerCount;
					}
					break;
				default: // toadstool, crow skull, mandrake, garden spider, and ghost's breath
					newCards[name].index = setNumber - 1;
					break;
			}
		}

	}
	return newCards;
}

function randomizeCard (cards, expansion, selectedPlayerCount, name) {
	let newCards = {...cards};
	if (name === 'africanDeathsHeadHawkmoth') {
		if (expansion) {
			const options = selectedPlayerCount ? [1, 2, 3] : [0, 2, 3];
			newCards[name].index = options[Math.floor(Math.random() * 3)];
		} else {
			newCards[name].index = selectedPlayerCount; // only 1 option for this card w/o the expansion
		}
	} else {
		const max = expansion ? cards[name].descriptions.length : Math.min(4, cards[name].descriptions.length); // expansion adds cards 5 and 6
		newCards[name].index = Math.floor(Math.random() * max);
	}
	return newCards;
}

function randomizeAllCards (cards, selectedPlayerCount, expansion) {
	let newCards = {...cards};
	for (const name in newCards) {
		newCards = randomizeCard(newCards, expansion, selectedPlayerCount, name);
	}
	return newCards;
}

function changePlayerCount (cards, selectedPlayerCount) {
	let newCards = {...cards};
	if (newCards['africanDeathsHeadHawkmoth'].index > 1) {
		return newCards;
	}
	newCards['africanDeathsHeadHawkmoth'].index = selectedPlayerCount;
	return newCards;
}

export {activateSet, randomizeCard, randomizeAllCards, changePlayerCount};
