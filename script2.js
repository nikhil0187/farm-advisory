/* script.js */
const queryBoxes = document.querySelectorAll('.query-box, .slide-button');
const filterButtons = document.querySelectorAll('.filter-buttons button');

function animateBoxes() {
    queryBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('active');
            box.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        }, index * 50); // Fixed the missing closing parenthesis and adjusted the delay
    });
}

function filterContent(filter = '') {
    const queryBoxes = document.querySelectorAll('.query-box');
    const searchBar = document.querySelector('.search-bar');
    const searchText = searchBar.value.toLowerCase();

    queryBoxes.forEach(box => {
        const text = box.textContent.toLowerCase();
        const dataFilter = box.getAttribute('data-filter');

        if ((filter === 'all' || filter === '' || dataFilter === filter) && text.includes(searchText)) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });

    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(button => {
        if (button.getAttribute('data-filter') === filter) {
            button.classList.add('active-filter');
        } else {
            button.classList.remove('active-filter');
        }
    });
}