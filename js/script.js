//Create variables to store the entire list of students and the number of items per page
const studentList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

//This function shows 10 items per page from the list parameter
function showPage(list, page) {
	//index being with 0 - 10 for page 1, 10 - 20 for page 2, etc.
	let startIndex = page * itemsPerPage - itemsPerPage;
	let endIndex = page * itemsPerPage;

	for (let i = 0; i < list.length; i++) {
		if (i >= startIndex && i < endIndex) {
			list[i].style.display = 'block';
		} else {
			list[i].style.display = 'none';
		}
	}
}
// This fucntion creates, selects and appends list items to the page as needed
function appendPageLinks(list) {
	let paginationSelect = document.querySelectorAll('div.pagination');

	if (paginationSelect !== null) {
		for (let i = 0; i < paginationSelect.length; i++) {
			paginationSelect[i].remove();
		}
	}

	const divPage = document.querySelector('div.page');
	const div = document.createElement('div');
	//Can't display partial pages. Ensures that the number returned is rounded up without any weird rounding errors
	const pagesNeeded = Math.ceil(list.length / itemsPerPage);
	const ul = document.createElement('ul');

	div.className = 'pagination';
	divPage.append(div);
	div.append(ul);

	for (i = 0; i < pagesNeeded; i++) {
		let li = document.createElement('li');
		let a = document.createElement('a');
		//add the active class to the first pagination link
		if (i === 0) {
			a.className = 'active';
		}
		a.setAttribute('href', '#');
		a.textContent = `${i + 1}`;
		ul.append(li);
		li.append(a);

		//remove the 'active' class from all elements and add it to the page element that is clicked
		a.addEventListener('click', (e) => {
			let allActive = document.querySelectorAll('.active');

			for (let i = 0; i < allActive.length; i++) {
				allActive[i].classList.remove('active');
				e.target.className = 'active';
			}
			showPage(list, a.textContent);
		});
	}
}

//Create and append HTML dynamically for Search Bar
const pageHeader = document.querySelector('div.page-header');
const searchDiv = document.createElement('div');
pageHeader.append(searchDiv);
searchDiv.className = 'student-search';

const input = document.createElement('input');
input.setAttribute('placeholder', 'Search for students...');

const button = document.createElement('button');
button.textContent = 'Search';

searchDiv.append(input);
searchDiv.append(button);

// Functionality for the search
function search(searchInput) {
	/* I created a new array with JUST the student names to search through, however I'm displaying
	the results tied with their corresponding index in the studentList variable. */
	const studentNames = document.querySelectorAll('h3');
	const studentListArr = Array.from(studentNames);
	const studentMatches = [];

	//Checking for existence of error message, if exists , remove it
	let errorMessgeCheck = document.querySelectorAll('h4');
	if (errorMessgeCheck !== null) {
		for (let i = 0; i < errorMessgeCheck.length; i++) {
			errorMessgeCheck[i].remove();
		}
	}

	//Searching through the list of names and displaying matches based on the value the user inputs into the search box
	for (let i = 0; i < studentListArr.length; i++) {
		if (
			searchInput.length !== 0 &&
			studentListArr[i].textContent.toLowerCase().includes(searchInput.toLowerCase())
		) {
			studentList[i].style.display = 'block';
			studentMatches.push(studentList[i]);
		} else if (searchInput.length === 0) {
			showPage(studentList, 1);
		} else {
			studentList[i].style.display = 'none';
		}
	}

	//Display pagination based on search results
	if (input.value === '') {
		showPage(studentList, 1);
		appendPageLinks(studentList);
	} else if (studentMatches.length === 0) {
		const divPage = document.querySelector('div.page');
		let noMatchMessage = document.createElement('h4');
		noMatchMessage.textContent = 'No results found';
		divPage.append(noMatchMessage);
	} else {
		appendPageLinks(studentMatches);
		showPage(studentMatches, 1);
	}
}

//allows search results to return in real time as user types in the seach box
input.addEventListener('keyup', () => {
	search(input.value);
});
//returns search results after the Search button is clicked
button.addEventListener('click', () => {
	search(input.value);
});

showPage(studentList, 1);
appendPageLinks(studentList);
