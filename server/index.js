const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const yup = require('yup');

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req,res) =>{
    res.json({
        message: 'larallyn.link - short urls for your code'
    });
});

// app.get('/url/:id', (req,res) =>{
//     //TODO: get a short url by id
// });

// app.get('/:id', (req,res) =>{
//     //TODO: redirect to URL
// });

const schema = yup.object().shape({
    alias: yup.string().trim().matches(/^[\w\-\d]+$/),
    url: yup.string().trim().url().required(),

})

app.post('/url', (req,res) =>{
    //TODO: create a short url
});



const port = process.send.PORT || 3000;

app.listen(port, () => console.log(`Listening at https://localhost:${port}`));