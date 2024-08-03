document.addEventListener('DOMContentLoaded', () => {
    fetchOffers();
});

async function fetchOffers() {
    try {
        const response = await fetch('/api/offers');
        const offers = await response.json();
        displayOffers(offers);
    } catch (error) {
        console.error('Error fetching offers:', error);
        alert('Failed to load offers');
    }
}

function displayOffers(offers) {
    const container = document.getElementById('offers-container');
    container.innerHTML = '';

    offers.forEach(offer => {
        const offerElement = document.createElement('div');
        offerElement.className = 'offer-card';
        offerElement.innerHTML = `
            <img src="${offer.image}" alt="${offer.title}" class="offer-image">
            <div class="offer-details">
                <h3 class="offer-title">${offer.title}</h3>
                <p class="offer-description">${offer.description}</p>
                <p class="offer-price">$${offer.price}</p>
                <a href="#" class="offer-button">Book Now</a>
            </div>
        `;
        container.appendChild(offerElement);
    });
}