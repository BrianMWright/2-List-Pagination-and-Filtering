//Create variables to store the entire list of students and the number of items per page
const studentList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

//This function shows 10 items per page from the passed in list
function showPage(list, page) {
	//index being with 0 - 10 for page 1, 10 - 20 for page 2, etc.
	let startIndex = page * itemsPerPage - itemsPerPage;
	console.log(`Start Index: ${startIndex}`); // REMOVE ME
	let endIndex = page * itemsPerPage;
	console.log(`End Index: ${endIndex}`); // REMOVE ME

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
			showPage(studentList, a.textContent);
		});
	}
}
showPage(studentList, 1);
appendPageLinks(studentList);
