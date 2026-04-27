/**
 * STUDENT LIST PAGINATION & FILTERING (Refactored)
 * Optimizations: 
 * 1. O(N) In-memory filtering instead of DOM querying
 * 2. Debounced search (300ms delay)
 * 3. Event Delegation for pagination links
 */

// 1. INITIAL STATE
const allStudents = Array.from(document.querySelectorAll('.student-item'));
const itemsPerPage = 10;
const pageHeader = document.querySelector('div.page-header');
const divPage = document.querySelector('div.page');

/**
 * DISPLAYS A SPECIFIC PAGE
 * Optimization: Only touches the 10 students needed for the view.
 */
function showPage(list, page) {
    // Hide everyone first (Mass action)
    allStudents.forEach(student => student.style.display = 'none');

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    // Show only the slice of students for this page
    const pageItems = list.slice(startIndex, endIndex);
    pageItems.forEach(student => student.style.display = 'block');
}

/**
 * CREATES PAGINATION UI
 * Optimization: Uses Event Delegation (one listener for all links).
 */
function appendPageLinks(list) {
    const existingPagination = document.querySelector('.pagination');
    if (existingPagination) existingPagination.remove();

    if (list.length === 0) return;

    const pagesNeeded = Math.ceil(list.length / itemsPerPage);
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    
    const ul = document.createElement('ul');
    for (let i = 1; i <= pagesNeeded; i++) {
        ul.innerHTML += `<li><a href="#" ${i === 1 ? 'class="active"' : ''}>${i}</a></li>`;
    }

    paginationDiv.appendChild(ul);
    divPage.appendChild(paginationDiv);

    // One listener on the parent UL instead of many listeners on A tags
    ul.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault(); // Prevent page jump
            document.querySelectorAll('.pagination a').forEach(a => a.className = '');
            e.target.className = 'active';
            showPage(list, parseInt(e.target.textContent));
        }
    });
}

/**
 * SEARCH LOGIC
 */
function performSearch(searchTerm) {
    const cleanTerm = searchTerm.toLowerCase().trim();
    
    // Clear old error messages
    const oldError = document.querySelector('h4');
    if (oldError) oldError.remove();

    // Filter students array in memory
    const matches = allStudents.filter(student => {
        const name = student.querySelector('h3').textContent.toLowerCase();
        return name.includes(cleanTerm);
    });

    if (cleanTerm.length > 0 && matches.length === 0) {
        const noMatchMessage = document.createElement('h4');
        noMatchMessage.textContent = 'No results found';
        divPage.append(noMatchMessage);
        showPage([], 1); 
        appendPageLinks([]);
    } else {
        showPage(matches, 1);
        appendPageLinks(matches);
    }
}

/**
 * DEBOUNCE HELPER
 * Prevents the search from firing until the user stops typing for 300ms.
 */
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// 2. CONSTRUCT SEARCH UI
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
searchDiv.innerHTML = `
    <input id="search-input" placeholder="Search for students...">
    <button id="search-button">Search</button>
`;
pageHeader.appendChild(searchDiv);

const input = document.getElementById('search-input');
const button = document.getElementById('search-button');

// 3. EVENT LISTENERS
const debouncedSearch = debounce((val) => performSearch(val), 300);

input.addEventListener('keyup', () => debouncedSearch(input.value));
button.addEventListener('click', () => performSearch(input.value));

// 4. INITIAL LOAD
showPage(allStudents, 1);
appendPageLinks(allStudents);
