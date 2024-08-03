document.addEventListener('DOMContentLoaded', () => {
    generateSeatMap();
});

function generateSeatMap() {
    const seatMap = document.getElementById('seat-map');
    const rows = 10;
    const seatsPerRow = 6;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < seatsPerRow; j++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.textContent = `${String.fromCharCode(65 + i)}${j + 1}`;
            seat.addEventListener('click', toggleSeat);
            seatMap.appendChild(seat);
        }
        if (i < rows - 1) {
            const aisle = document.createElement('div');
            aisle.className = 'aisle';
            seatMap.appendChild(aisle);
        }
    }
}

function toggleSeat(e) {
    if (!e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }
}