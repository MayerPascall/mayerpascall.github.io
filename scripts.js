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
                listItem.classList.add('letter-item'); // Add class for styling
                const link = document.createElement('a');
                link.href = `letter.html?id=${letter.id}`; // Link to individual letter page
                link.textContent = `${letter.date} - ${letter.title}`;
                listItem.appendChild(link);
                letterList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching letters:', error));
}
