const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req,res) =>{
    res.json({
        message: 'larallyn.link - short urls for your code'
    });
});

const port = process.send.PORT || 3000;

app.listen(port, () => console.log(`Listening at https://localhost:${port}`));