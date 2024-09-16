window.onload = function() {
    fetchLetters();
};

function sendEmail(letter) {
    fetch('https://formspree.io/enmes.mescall@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'enmes.mescall@gmail.com', // Replace with your email
            message: `Letter clicked: ${letter.date} - ${letter.title}`
        })
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
                    sendEmail(letter); // Call function to send email
                    window.location.href = link.href; // Navigate to the link after sending email
                });
                listItem.appendChild(link);
                letterList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching letters:', error));
}

