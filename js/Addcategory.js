document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Function to update the progress bar and display text
    function updateProgressBar(percent, progressBarSelector, progressTextSelector) {
        const progressBar = document.querySelector(progressBarSelector);
        const progressText = document.querySelector(progressTextSelector);

        progressBar.style.width = percent + '%';
        progressText.innerHTML = 'Progress: ' + percent + '%';
    }

    // Example usage: Update the progress bars to different percentages
    updateProgressBar(50, '.progress-bar-1', '#progressText1');
    updateProgressBar(15, '.progress-bar-2', '#progressText2');
    updateProgressBar(30, '.progress-bar-3', '#progressText3');

    // Initial call to display categories
    displayCategories();
});

const predefinedCategories = [
    { name: 'Google', image: 'image/Google Logo.svg' },
    { name: 'GitHub', image: 'image/GitHub Logo.svg' },
    { name: 'Youtube', image: 'image/Youtube Logo.svg' },
    { name: 'Instagram', image: 'image/Instagram Logo.svg' },
    { name: 'Facebook', image: 'image/Facebook Logo.svg' }
];

const categories = JSON.parse(localStorage.getItem('categories')) || [];
const allCategories = [...predefinedCategories, ...categories];

function displayCategories() {
    const categoryContainer = document.querySelector('.MoreSavedrow');
    categoryContainer.innerHTML = ''; // Clear existing content

    allCategories.forEach(category => {
        const moreSavedCard = document.createElement('div');
        moreSavedCard.classList.add('moreSavedcard');

        const link = document.createElement('a');
        link.href = `category.html?category=${category.name}`;

        const img = document.createElement('img');
        img.classList.add('img-fluid');
        img.src = category.image;
        img.alt = category.name;

        link.appendChild(img);
        moreSavedCard.appendChild(link);
        categoryContainer.appendChild(moreSavedCard);
    });
}

function addCategory(event) {
    event.preventDefault(); // Prevent the default form submission

    const newCategory = document.getElementById('platform').value;
    const categoryImage = document.getElementById('category-image').files[0];

    if (newCategory && categoryImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            const category = { name: newCategory, image: imageData };
            categories.push(category);
            localStorage.setItem('categories', JSON.stringify(categories));
            displayCategories();
            document.getElementById('platform').value = '';
            document.getElementById('category-image').value = '';
        };
        reader.readAsDataURL(categoryImage);
    }
    window.location.href = 'dashboard.html';
}

function validateForm(event) {
    // Provided email and password
    const correctEmail = "mahnoort643@gmail.com";
    const correctPassword = "mahnoor123";

    // Get the entered email and password
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate email and password
    if (email !== correctEmail) {
        alert("Invalid email address.");
        return false;
    }

    if (password !== correctPassword) {
        alert("Incorrect password.");
        return false;
    }

    addCategory(event);
    return true; // Form will submit if validation passes
}

function searchCategory() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.innerHTML = ''; // Clear existing content

    if (searchInput) {
        const matchingCategories = allCategories.filter(category => category.name.toLowerCase().includes(searchInput));

        matchingCategories.forEach(category => {
            const dropdownItem = document.createElement('li');
            dropdownItem.classList.add('dropdown-item');
            dropdownItem.innerHTML = `<a  style="text-decoration:none;" href="categoryData.html?category=${encodeURIComponent(category.name)}&image=${encodeURIComponent(category.image)}">
                                  <img src="${category.image}" alt="${category.name}" style="width: 20px; height: 20px; margin-right: 10px;">
                                  ${category.name}
                              </a>`;
            dropdownMenu.appendChild(dropdownItem);
        });

        if (matchingCategories.length > 0) {
            dropdownMenu.classList.add('show');
        } else {
            dropdownMenu.classList.remove('show');
        }
    } else {
        dropdownMenu.classList.remove('show');
    }
}

// Attach the searchCategory function to the search field input event
document.getElementById('search-input').addEventListener('input', searchCategory);


// Attach the searchCategory function to the search field input event
document.querySelector('.form-control').addEventListener('input', searchCategory);