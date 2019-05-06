const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});

// considered best practice in NODE to always export
module.exports = app;
