window.onload = function() {
    fetchLetters();
};

function sendEmail(letter) {
    fetch('https://formspree.io/f/xldrkoyd', {
        method: 'POST',
        body: JSON.stringify({
            email: 'enmes.mescall@gmail.com', // Replace with your email
            message: `Letter clicked: ${letter.date} - ${letter.title}`
        }),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Email sent successfully');
        } else {
            console.error('Error sending email');
        }
    })
    .catch(error => console.error('Error:', error));
}

function sendGoogleForm(letter) {
    console.log('Submitting Google Form...');
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc6SS3fpcG6xCliB5BdbBXo7YqpCrTEoL-jQ1pKZmiXNPJkZw/formResponse';
    const formData = {
        'entry.373416654': `Letter clicked: ${letter.date} - ${letter.title}`
    };

    $.ajax({
        url: formUrl,
        method: 'POST',
        dataType: 'json',
        data: formData,
        success: function(response) {
            console.log('Form submitted successfully');
        },
        error: function(error) {
            console.error('Error submitting form', error);
        }
    });
}

function fetchLetters() {
    fetch('letters.json') // Assume you have a JSON file with details of letters
        .then(response => response.json())
        .then(data => {
            const letterList = document.getElementById('letterList');
            data.forEach(letter => {
                const listItem = document.createElement('li');
                listItem.classList.add('letter-item'); // Add class for styling
                const link = document.createElement('a');
                link.href = `letter.html?id=${letter.id}`; // Link to individual letter page
                link.textContent = `${letter.date} - ${letter.title}`;
                link.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default link behavior
                    sendGoogleForm(letter); // Call function to open Google Form
                    sendEmail(letter); // Call function to send email
                    window.location.href = link.href; // Navigate to the link after opening Google Form
                });
                listItem.appendChild(link);
                letterList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching letters:', error));
}