document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');

    // Create a 'loading' row that spans two columns, now with an id of 'loading'
    const loadingRow = output.insertRow();
    loadingRow.id = 'loading';  // Add this line
    const loadingCell = loadingRow.insertCell();
    loadingCell.colSpan = 2;
    loadingCell.textContent = 'Loading...';

    function createPromise(index) {
        return new Promise(resolve => {
            const timeInSeconds = 1 + Math.random() * 2;  // Random time between 1 and 3 seconds
            setTimeout(() => {
                resolve({
                    promiseIndex: index,
                    duration: timeInSeconds
                });
            }, timeInSeconds * 1000);
        });
    }

    const startTime = performance.now();
    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    Promise.all(promises).then(results => {
        const endTime = performance.now();
        const totalDuration = (endTime - startTime) / 1000;

        // Clear the loading row by removing or hiding
        output.removeChild(loadingRow);

        results.forEach(result => {
            const row = output.insertRow();
            row.insertCell().textContent = `Promise ${result.promiseIndex}`;
            row.insertCell().textContent = result.duration.toFixed(3);
        });

        const totalRow = output.insertRow();
        totalRow.insertCell().textContent = 'Total';
        totalRow.insertCell().textContent = totalDuration.toFixed(3);
    });
});
