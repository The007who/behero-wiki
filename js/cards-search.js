var fuseOptions = {
	// isCaseSensitive: false,
	// includeScore: false,
	// ignoreDiacritics: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	minMatchCharLength: 4,
	// location: 0,
	threshold: 0.45,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: []
};

const ids = [
	[
		'lost-check',
		'golden-check',
		'enchanted-check',
		'frozen-check',
		'new-check',
		'nightmare-check'
	],
	[
		'warrior-check',
		'magician-check',
		'adventurer-check',
		'knight-check',
		'alchemist-check',
		'ninja-check'
	],
	[
		'head-check',
		'body-check',
		'feet-check',
		'weapon-check',
		'shield-check',
		'companion-check'
	]
];

function makeSearch() {
	let searchPattern = document.getElementById('search-query').value;
	fuseOptions.keys = [];
	fuseOptions.keys.push("name_" + sessionStorage.getItem('lang'));

	// make search
	let response;
	if (searchPattern != '') {
		const fuse = new Fuse(database, fuseOptions);
		response = fuse.search(searchPattern);
	} else {
		response = structuredClone(database);
		for (i = 0; i < response.length; i++) {
			response[i] = { 'item': response[i] };
		}
	}

	// options strip
	let options = getOptions();

	//options = [['Lost'], ['Warrior']];
	for (i = response.length - 1; i >= 0; i--) {
		if (!options[0].includes(response[i].item.age)
			|| !options[1].includes(response[i].item.guild) 
			|| !options[2].includes(response[i].item.slot)) {
			response.splice(i, 1);
		}
	}
	
	// search limit
	let limit = Number(document.getElementById('search-limit').value);
	if (limit < 0) limit = 0;
	response = response.slice(0, limit);

	createHtml(response);
}

function getOptions() {
	let output = [[], [], []];

	for (let x=0; x<=2; x++) {
		ids[x].forEach(element => {
			if (document.getElementById(element).checked) {
				output[x].push(checkToAttribute(element));
			}
		});
	}
	
	// if empty include all
	for (let x=0; x<=2; x++) {
		if (output[x].length == 0) {
			let y = structuredClone(ids[x]);
			for (z=0; z<=5; z++) {
				y[z] = checkToAttribute(y[z]);
			}
			output[x] = y;
		}
	}
	
	return output;
}

function checkToAttribute(checkName) {
	switch(checkName) {
		case 'lost-check': return 'Lost'
		case 'golden-check': return 'Golden'
		case 'enchanted-check': return 'Enchanted'
		case 'frozen-check': return 'Frozen'
		case 'new-check': return 'New'
		case 'nightmare-check': return 'Nightmare'
		case 'warrior-check': return 'Warrior'
		case 'magician-check': return 'Magician'
		case 'adventurer-check': return 'Adventurer'
		case 'knight-check': return 'Knight'
		case 'alchemist-check': return 'Alchemist'
		case 'ninja-check': return 'Ninja'
		case 'head-check': return 'head'
		case 'body-check': return 'body'
		case 'feet-check': return 'feet'
		case 'weapon-check': return 'weapon'
		case 'shield-check': return 'shield'
		case 'companion-check': return 'companion'
	}
}

function createHtml(response) {
	const target = document.getElementById('search-results');
	target.replaceChildren();
	
	if (response.length == 0) {
		const ita = document.createElement('p');
		ita.className = 'ita-text';
		ita.innerText = 'Nessun risultato.';

		const eng = document.createElement('p');
		eng.className = 'eng-text';
		eng.innerText = 'Nothing found.';

		target.appendChild(ita);
		target.appendChild(eng);
		
		return;
	}

	response.forEach(element => {
		const main = document.createElement('div');
		main.style = 'width: 30%; border: solid 0.2rem #d2a64d; border-radius: 1em; padding: 0.5em; margin-bottom: 1em;'
		
		// link
		const link = document.createElement('a');
		link.href = BASE_URL + '/collection/' + element.item.collection_name;

		// image
		const image = document.createElement('img');
		if (element.item.image_path) {
			image.src = BASE_URL + '/resources/cards/' + element.item.image_path;
			image.style = 'width: 100%;';
		} else {
			image.src = BASE_URL + '/resources/cards/backcard.jpg';
			image.style = 'width: 100%; filter: grayscale(100%);';
		}
		image.loading = 'lazy';
		
		// add name
		const name = document.createElement('div');
		name.style = 'font-weight: bold;';

		const ita = document.createElement('p');
		ita.className = 'ita-text';
		ita.innerText = element.item.name_ita;

		const eng = document.createElement('p');
		eng.className = 'eng-text';
		eng.innerText = element.item.name_eng;

		link.appendChild(image);

		name.appendChild(ita);
		name.append(eng);

		main.appendChild(link);
		main.appendChild(name);

		target.appendChild(main);
	});

}

function clearSearch() {
	// TODO: clear options as well
	document.getElementById('search-results').replaceChildren();
	document.getElementById('search-query').value = '';
	
	for (let x=0; x<=2; x++) {
		ids[x].forEach(element => {
			document.getElementById(element).checked = false;
		});
	}

}