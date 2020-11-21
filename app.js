const express = require('express');

let app = express();
let port = 3000;

app.get('/', (req,res) => {
    res.send ("hi");
})

app.listen(port, () => console.log(`server on at http://localhost:${port}`));