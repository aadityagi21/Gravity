const form = document.getElementById('uploadForm');
const message = document.getElementById('message');
const fileList = document.getElementById('fileList');

// Upload file
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:3000/api/files/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        message.style.color = 'green';
        message.innerText = data.message;
        form.reset();
        fetchFiles(); // Refresh file list
    } catch (error) {
        message.style.color = 'red';
        message.innerText = 'Upload failed! ' + error.message;
    }
});

// Fetch and display all files
async function fetchFiles() {
    fileList.innerHTML = '';
    try {
        const response = await fetch('http://localhost:3000/api/files');
        const files = await response.json();
        files.forEach(file => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `http://localhost:3000/uploads/${file}`;
            link.target = '_blank';
            link.innerText = file;
            li.appendChild(link);
            fileList.appendChild(li);
        });
    } catch (error) {
        fileList.innerHTML = 'Failed to load files: ' + error.message;
    }
}

document.getElementById("searchBar").addEventListener("input", function () {
    let value = this.value.toLowerCase();
    let items = document.querySelectorAll("#fileList li");

    items.forEach(item => {
        let text = item.textContent.toLowerCase();
        item.style.display = text.includes(value) ? "" : "none";
    });
});


// Load files on page load
fetchFiles();





