document.addEventListener('DOMContentLoaded', () => {
    fetchDestinations();
});

async function fetchDestinations() {
    try {
        const response = await fetch('/api/destinations');
        const destinations = await response.json();
        displayDestinations(destinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        alert('Failed to load destinations');
    }
}

function displayDestinations(destinations) {
    const container = document.getElementById('destinations-container');
    container.innerHTML = '';

    destinations.forEach(destination => {
        const destinationElement = document.createElement('div');
        destinationElement.className = 'destination-card';
        destinationElement.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}" class="destination-image">
            <div class="destination-details">
                <h3 class="destination-name">${destination.name}</h3>
                <p class="destination-description">${destination.description}</p>
                <a href="#" class="destination-button">Explore</a>
            </div>
        `;
        container.appendChild(destinationElement);
    });
}