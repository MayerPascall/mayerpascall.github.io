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
                    sendGoogleForm(letter.title, link); // Submit form with letter title
                });
                
                listItem.appendChild(link);
                letterList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching letters:', error));
}

function sendGoogleForm(letterTitle, linkHref) {
    // Gather additional information
    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;
    const referrer = document.referrer;
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    const windowSize = `${window.innerWidth}x${window.innerHeight}`;

    // Construct the Google Form submission URL
    const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSc6SS3fpcG6xCliB5BdbBXo7YqpCrTEoL-jQ1pKZmiXNPJkZw/formResponse?` +
        `entry.373416654=${encodeURIComponent(letterTitle)}` +  // Letter title
        `&entry.123456789=${encodeURIComponent(timestamp)}` +  // Timestamp
        `&entry.987654321=${encodeURIComponent(userAgent)}` +  // User agent
        `&entry.654321987=${encodeURIComponent(referrer)}` +   // Referrer URL
        `&entry.321987654=${encodeURIComponent(screenSize)}` + // Screen size
        `&entry.654123789=${encodeURIComponent(windowSize)}`;  // Window size

    const iframe = document.getElementById('hidden_iframe');
    
    // Listen for iframe load event to verify form submission
    iframe.onload = () => {
        console.log('Form submission complete for letter:', letterTitle);
        window.location.href = linkHref;  // Proceed to the letter page after submission
    };

    // Submit the form by loading the URL into the hidden iframe
    iframe.src = googleFormUrl;
}

