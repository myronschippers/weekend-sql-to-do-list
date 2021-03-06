const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const todo = require('./routers/todo.router');

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());

app.use('/todo', todo);

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});

// considered best practice in NODE to always export
module.exports = app;
