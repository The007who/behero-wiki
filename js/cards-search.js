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

function makeSearch() {
	let searchPattern = document.getElementById('search-query').value;
	fuseOptions.keys = [];
	fuseOptions.keys.push("name_" + sessionStorage.getItem('lang'));

	const fuse = new Fuse(database, fuseOptions);
	let response = fuse.search(searchPattern);
	
	let html = '';
	response.forEach(element => {
		html += `<div style="width: 30%; border: solid 0.2rem #d2a64d; border-radius: 1em; padding: 0.5em; margin-bottom: 1em;">`;
		
		// link
		html += `<a href=/collection/` + element.item.collection_name + `>`;

		// image
		if (element.item.confirmed == true) {
			html += `<img src=/resources/cards/`;
			html += element.item.image_path + ` style="width: 100%;">`;
		} else {
			html += `<img src=/resources/cards/backcard.jpg style="width: 100%; filter: grayscale(100%);">`
		}
		html += `</a>`;
		
		// add name
		html += `<div style="font-weight: bold;">`;
		html += `<p class="ita-text">`+ element.item.name_ita + `</p>`;
		html += `<p class="eng-text">`+ element.item.name_eng + `</p>`;
		html += `</div>`;

		// credits
		html += `<div style="border: solid 0.2rem #d2a64d; border-radius: 1em; padding: 0.2em;">`;
		if (element.item.author) {
			html += `<p class="ita-text">Caricato da: ` + element.item.author + `</p>`;
			html += `<p class="eng-text">Uploaded by: ` + element.item.author + `</p>`;
		} else {
			html += `<p class="ita-text">Caricato da: The007who</p>`;
			html += `<p class="eng-text">Uploaded by: The007who</p>`;
		}
		html += `</div>`;

		html += `</div>`;
	});

	document.getElementById('search-results').innerHTML = html;
}