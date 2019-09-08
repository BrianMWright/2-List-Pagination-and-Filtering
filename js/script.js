//Create variable to store the list of students
const studentList = document.querySelectorAll('.student-item');

//Create a variable to store the number of items to show on each “page”, which for this project, is 10.
const itemsPerPage = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

/* The list parameter to represent the actual list of students that you’ll pass in as an argument later when you     call this function.
   
The page parameter to represent the page number that you’ll pass in as an argument later when you call this function. */

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
		a.setAttribute('href', '#');
		a.textContent = `${i + 1}`; //need to get the page number somehow
		ul.append(li);
		li.append(a);
		console.log(a);
	}
	// functionality for the pagination elements
}

showPage(studentList, 1); //Remove hard coded page number.
appendPageLinks(studentList);
