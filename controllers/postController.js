// importo dati del post
const postsRouter = require('./../data/posts');

// elenco funzioni relative alle rotte della risorsa post

function index (req, res) {
    let filteredPost = postsRouter;

    if (req.query.tags) {
        filteredPost = postsRouter.filter(
            post => post.tags.includes(req.query.tags)
        );
    }
    const postCompleto = {
        numeroPosts: filteredPost.length,
        listaPosts: filteredPost
    }
    res.json(postCompleto);
};
function show (req, res) {
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const postTrovato = postsRouter.find( post => post.id === id);

    // facciamo il controllo
    if(!postTrovato){
        // imposto lo status 404
        res.status(404)

        // restituisco un JSON con le altre informazioni
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        });
    }
    // restituisco un JSON con il post trovato
    res.json(postTrovato);
};
function store (req, res) {
    res.send('Creazione nuovo post');
};
function update (req, res) {
    res.send('Modifica integrale post ' + req.params.id);
};
function modify (req, res) {
    res.send('Modifica parziale del post ' + req.params.id);
};
function destroy (req, res) {
    const id = parseInt(req.params.id);

    //cerchiamo il post tramite id
    const post = postsRouter.find(post => post.id === id);

    if (!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }
    // Rimuoviamo il post
    postsRouter.splice(postsRouter.indexOf(post), 1);

    // Returniamo lo status corretto
    res.sendStatus(204)
};

// esportiamo le funzioni per il router
module.exports = { index, show, store, update, modify, destroy };