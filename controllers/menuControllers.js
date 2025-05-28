const posts = require('../data/db.js');

// index
function index(req, res) {
    const  sql  = 'SELECT * FROM posts';
    posts.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 'errore',
                message: 'Errore nel recupero dei post',
            });
        }
        res.json(results);
    });
}

// show
function show(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({
            status: 'errore',
            message: 'Post non trovato',
        });
    }
}

// store
function store(req, res) {
    const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags || [],
    };
    posts.push(newPost);
    res.status(201).json(newPost);
}

// update (PUT)
function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({
            status: 'errore',
            message: 'Post non trovato'
        });
    }
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags || [];
    res.status(200).json(post);
}

// patch (PATCH)
function patch(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({
            status: 'errore',
            message: 'Post non trovato'
        });
    }
    if (req.body.title !== undefined) post.title = req.body.title;
    if (req.body.content !== undefined) post.content = req.body.content;
    if (req.body.image !== undefined) post.image = req.body.image;
    if (req.body.tags !== undefined) post.tags = req.body.tags;
    res.status(200).json(post);
}

// delete
function destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
        posts.splice(index, 1);
        res.status(200).json({ status: 'successo', message: 'Post eliminato.' });
    } else {
        res.status(404).json({
            status: 'errore',
            message: 'Post non trovato',
        });
    }
}

module.exports = { index, show, store, update, patch, destroy };