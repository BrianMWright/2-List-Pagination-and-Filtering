//Create variables to store the entire list of students and the number of items per page
const studentList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

function showPage(list, page) {
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

function appendPageLinks(list) {
	//create DOM elements
	// grab parent node to attach to
	const divPage = document.querySelector('div.page');
	//create element
	const div = document.createElement('div');
	//add class to element
	div.className = 'pagination';
	//append element
	divPage.append(div);
	const ul = document.createElement('ul');
	div.append(ul);
	//creat the lis
	const pagesNeeded = Math.ceil(list.length / itemsPerPage);

	for (i = 0; i < pagesNeeded; i++) {
		let li = document.createElement('li');
		let a = document.createElement('a');
		//add the active class to the first pagination link - BUG : NEED A BETTER WAY TO DO THIS!
		if (i === 0) {
			a.className = 'active';
		}
		a.setAttribute('href', '#');
		a.textContent = `${i + 1}`; //need to get the page number somehow
		ul.append(li);
		li.append(a);

		a.addEventListener('click', (e) => {
			//active class name removed from all
			let allActive = document.querySelectorAll('.active');

			for (let i = 0; i < allActive.length; i++) {
				allActive[i].classList.remove('active');
				e.target.className = 'active';
			}
			//active class name added to clicked element. use target property of event object

			showPage(studentList, a.textContent);
		});
	}
}

showPage(studentList, 1); //Remove hard coded page number.
appendPageLinks(studentList);
