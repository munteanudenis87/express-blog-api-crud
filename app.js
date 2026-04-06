const express = require('express')
const app = express()
const port = 3000

const postRouter = require('./routers/post');

app.use(express.static('public'));

// rotta di home
app.get('/', (req, res) => {
    res.send('Server di mio blog')
});

// rotte di CRUD
app.use('/posts', postRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});