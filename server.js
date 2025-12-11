const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// Serve uploads folder
app.use('/uploads', express.static('uploads'));

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Upload route
app.post('/api/files/upload', upload.single('file'), (req, res) => {
    console.log('File received:', req.file); // ✅ debug
    res.json({ message: 'File uploaded successfully!' });
});

// Get files route
app.get('/api/files', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to scan files!' });
        }
        res.json(files);
    });
});



// Serve frontend (index.html + CSS + JS)
app.use(express.static(path.join(__dirname, 'public')));

// Optional: explicitly / route handle karna
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





