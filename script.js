document.getElementById('convertForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const youtubeUrl = document.getElementById('youtubeUrl').value;
    
    // Using yt-download.org API to get MP4 download link
    const apiUrl = `https://www.yt-download.org/api/button/mp3/${encodeURIComponent(youtubeUrl)}`;

    fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
            // Parse HTML response to get MP4 download link
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const mp4Url = htmlDoc.querySelector('a[aria-label="Download Video (MP4)"]').getAttribute('href');

            if (mp4Url) {
                const downloadLink = `<p>Download MP4: <a href="${mp4Url}" target="_blank">${mp4Url}</a></p>`;
                document.getElementById('result').innerHTML = downloadLink;
            } else {
                document.getElementById('result').innerHTML = `<p>Error: MP4 download link not found.</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
