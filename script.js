//your JS code here. If required.
// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');

    // Create a 'loading' row that spans two columns
    const loadingRow = output.insertRow();
    const loadingCell = loadingRow.insertCell();
    loadingCell.colSpan = 2;
    loadingCell.textContent = 'Loading...';

    // Function to create a promise that resolves after a random time between 1 and 3 seconds
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

    // Start time measurement for the total duration
    const startTime = performance.now();

    // Create an array of promises
    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    // Use Promise.all to handle the promises
    Promise.all(promises).then(results => {
        // Calculate total time after all promises have resolved
        const endTime = performance.now();
        const totalDuration = (endTime - startTime) / 1000;

        // Clear the loading row
        output.removeChild(loadingRow);

        // Loop through each result and display it in the table
        results.forEach(result => {
            const row = output.insertRow();
            row.insertCell().textContent = `Promise ${result.promiseIndex}`;
            row.insertCell().textContent = result.duration.toFixed(3);
        });

        // Add a final row for the total time
        const totalRow = output.insertRow();
        totalRow.insertCell().textContent = 'Total';
        totalRow.insertCell().textContent = totalDuration.toFixed(3);
    });
});
