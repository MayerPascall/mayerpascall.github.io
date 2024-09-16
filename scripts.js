window.onload = function() {
    fetchLetters();
};

function fetchLetters() {
    fetch('letters.json') // Assume you have a JSON file with details of letters
        .then(response => response.json())
        .then(data => {
            const letterList = document.getElementById('letterList');
            data.forEach(letter => {
                const listItem = document.createElement('li');
                listItem.classList.add('letter-item');
                
                const link = document.createElement('a');
                link.href = `letter.html?id=${letter.id}`; // Link to individual letter page
                link.textContent = `${letter.date} - ${letter.title}`;

                // Handle link click
                link.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default link behavior
                    sendGoogleForm(letter.title); // Submit form with letter title
                    setTimeout(() => {
                        window.location.href = link.href; // Proceed to letter page
                    }, 100000); // Adjust delay as necessary
                });
                
                listItem.appendChild(link);
                letterList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching letters:', error));
}

function sendGoogleForm(letterTitle) {
    console.log('Submitting form for letter:', letterTitle);
    // Construct the Google Form submission URL
    const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSc6SS3fpcG6xCliB5BdbBXo7YqpCrTEoL-jQ1pKZmiXNPJkZw/formResponse?entry.373416654=${encodeURIComponent(letterTitle)}`;
    
    const iframe = document.getElementById('hidden_iframe');
    
    // Listen for iframe load event to verify form submission
    iframe.onload = () => {
        console.log('Form submission complete for letter:', letterTitle);
        window.location.href = linkHref; // Proceed to the letter page after submission
    };

    // Submit the form by loading the URL into the hidden iframe
    iframe.src = googleFormUrl;
}
