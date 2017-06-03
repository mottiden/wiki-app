const searchBtn = document.querySelector('.btn--search');
const closeBtn = document.querySelector('.btn--search-close');
const searchWin = document.querySelector('.search-div');
const homeWin = document.querySelector('.page-div');
const resWin = document.querySelector('.res-div');
const input = document.querySelector('.search__input');
const form = document.querySelector('.search__form');
const loader = document.querySelector('.loader-div');

const numberResults = 20;

function openSearch(){
	searchWin.classList.value = 'search';
	homeWin.classList.value = 'hidden';
}

function closeSearch(){
	searchWin.classList.value = 'hidden';
	homeWin.classList.value = 'page';
	closeResults(); 
}

function searchWiki(searchVal){
	const wikipedia = `https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchVal}&limit=${numberResults}&namespace=0&format=json`;
	loader.classList.value = 'loader';
	closeResults();
	fetch(wikipedia)
		.then(response => response.json())
	 	.then(parsed => visualizeResults(parsed));
}

function visualizeResults(data){
	loader.classList.value = 'hidden';
	const resultsList = [];
	for (var i = 1; i<numberResults; i++) {
		resultsList.push(`<li class="entry">
		<span class="entry-title">${data[1][i]}</span>
		<span class="entry-description">${data[2][i]}</span>
		<span class="entry-link"><a href=${data[3][i]} title="">More</a></span>
		</li>`);
	}
	resWin.children[1].innerHTML = resultsList.join('');
	resWin.classList.value = 'results';
}

function closeResults(){
	resWin.classList.value = 'hidden';
}

document.addEventListener('keydown', function(e) {
	if( e.keyCode == 13 ) {
		searchWiki(e.target.value);
		input.value = '';
		e.preventDefault();
	}
});


document.addEventListener('keyup', function(e) {
			if( e.keyCode == 27 ) {
				closeSearch();
				input.value = '';
			} 

		});

searchBtn.addEventListener('click', openSearch);
closeBtn.addEventListener('click', closeSearch);