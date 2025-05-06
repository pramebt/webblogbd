const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const morgan = require('morgan');
const cors = require('cors');


const { readdirSync } = require('fs');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Auto load route files
readdirSync('./routes').map((routeFile) => {
    app.use('/api', require('./routes/' + routeFile));
});

// ✅ ต้องใช้ server.listen (ไม่ใช่ app.listen)
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
})