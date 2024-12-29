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
});

// Copy to clipboard function
function copyToClipboard(elementId, button) {
    // Get the text from the specified element
    const textToCopy = document.getElementById(elementId).innerText;

    // Create a temporary textarea element to hold the text
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);

    // Select the text in the textarea and copy it to clipboard
    tempTextArea.select();
    document.execCommand("copy");

    // Remove the temporary textarea element
    document.body.removeChild(tempTextArea);

    // Change the button UI to indicate the text was copied
    button.classList.add("copied");
    const icon = button.querySelector("i");
    icon.classList.remove("bi-copy");
    icon.classList.add("bi-check");

    // Set a timeout to revert the button UI back to its original state after 1 second
    setTimeout(() => {
        button.classList.remove("copied");
        icon.classList.remove("bi-check");
        icon.classList.add("bi-copy");
    }, 1000);
}

 const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('category');
const categoryImg = urlParams.get('image');
const passwords = JSON.parse(localStorage.getItem(categoryName)) || [];

document.getElementById('category-title').innerText = categoryName;
document.getElementById('category-titleForModal').innerText = categoryName + ' Credentials';
document.getElementById('imgDisp').src = categoryImg;

const maskString=(input)=>{
    return 'x'.repeat(input.length);
}

function displayPasswords() {
    const passwordContainer = document.getElementById('password-container');
    passwordContainer.innerHTML = ''; // Clear existing content
    passwords.forEach((item, index) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('col-12', 'd-flex', 'style1', 'mb-3', 'justify-content-between', 'align-items-center');

        // email
        const emailDiv = document.createElement('div');
        emailDiv.classList.add('col-5', 'd-flex', 'me-4', 'justify-content-between', 'style1a');
        emailDiv.innerHTML = `<div>${item.email}</div>
                                  <div><button class="btnHide" onclick="copyToClipboard('email-${index}', this)"><i class="bi bi-copy"></i></button></div>`;
        rowDiv.appendChild(emailDiv);

        // password
        const passwordDiv = document.createElement('div');
        passwordDiv.classList.add('col-5', 'd-flex', 'me-4', 'justify-content-between', 'style1a');
        const maskedPWD=maskString(item.password);
        passwordDiv.innerHTML = `<div>${maskedPWD}</div>
                                    <div style="display:none;" id="password-${index}">${item.password}</div>
                                     <div><button class="btnHide" onclick="copyToClipboard('password-${index}', this)"><i class="bi bi-copy"></i></button></div>`;
        rowDiv.appendChild(passwordDiv);

        // delete btn
        const delDiv = document.createElement('div');
        delDiv.classList.add('col-1', 'ms-4', 'style1a', 'text-center');
        delDiv.innerHTML = '<button class="btnHide"><i class="bi bi-pen"></i></button>';
        rowDiv.appendChild(delDiv);

        passwordContainer.appendChild(rowDiv);

        // append to container
        passwordContainer.appendChild(rowDiv);
    });
}

function validateAndAddPassword() {
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate password
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    // Add the password if validation passes
    addPassword();
}

function addPassword() {
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    const newPassword = { email, password };
    passwords.push(newPassword);
    localStorage.setItem(categoryName, JSON.stringify(passwords));
    displayPasswords();
    // Close the modal
const modalElement = document.getElementById('exampleModal');
const modal = bootstrap.Modal.getInstance(modalElement);
modal.hide();
}

document.addEventListener('DOMContentLoaded', displayPasswords);

function copyToClipboard(elementId, button) {
    const textToCopy = document.getElementById(elementId).innerText;
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);

    button.classList.add("copied");
    const icon = button.querySelector("i");
    icon.classList.remove("bi-copy");
    icon.classList.add("bi-check");

    setTimeout(() => {
        button.classList.remove("copied");
        icon.classList.remove("bi-check");
        icon.classList.add("bi-copy");
    }, 1000);
}
const predefinedCategories = [
    { name: 'Google', image: 'image/Google Logo.svg' },
    { name: 'GitHub', image: 'image/GitHub Logo.svg' },
    { name: 'Youtube', image: 'image/Youtube Logo.svg' },
    { name: 'Instagram', image: 'image/Instagram Logo.svg' },
    { name: 'Facebook', image: 'image/Facebook Logo.svg' }
];

const categories = JSON.parse(localStorage.getItem('categories')) || [];
const allCategories = [...predefinedCategories, ...categories];

function searchCategory() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.innerHTML = ''; // Clear existing content

    if (searchInput) {
        const matchingCategories = allCategories.filter(category => category.name.toLowerCase().includes(searchInput));

        matchingCategories.forEach(category => {
            const dropdownItem = document.createElement('li');
            dropdownItem.classList.add('dropdown-item');
            dropdownItem.innerHTML = `<a style="text-decoration:none;" href="categoryData.html?category=${encodeURIComponent(category.name)}&image=${encodeURIComponent(category.image)}">
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