const express = require('express')
const morgan = require('morgan');
const app = express()
const port = 3000

app.use( express.static(__dirname + '/public' ));
app.use( morgan( 'dev' ) );

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})