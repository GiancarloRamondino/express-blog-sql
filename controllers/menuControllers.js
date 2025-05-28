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
    //prendo l'id dal parametro della richiesta
    const id = parseInt(req.params.id);
    //creao la query
    const sql = 'SELECT * FROM posts WHERE id = ?'; //testo SQL
    //eseguo la query
    posts.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 'errore',
                message: 'Errore nel recupero del post',
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: 'errore',
                message: 'Post non trovato',
            });
        }
        res.json(results[0]);
    });
}

// store
function store(req, res) {
    const sql = 'INSERT INTO posts (title, content, image, tags) VALUES (?, ?, ?, ?)';
    const newPost = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags || []
    };
    posts.query(sql, [newPost.title, newPost.content, newPost.image, JSON.stringify(newPost.tags)], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 'errore',
                message: 'Errore nella creazione del post',
            });
        }
        res.status(201).json({ status: 'successo', message: 'Post creato con successo', post: { id: result.insertId, ...newPost } });
    });
}

// update (PUT)
function update(req, res) {
    const id = parseInt(req.params.id);
    const sql = 'UPDATE posts SET title = ?, content = ?, image = ?, tags = ? WHERE id = ?';
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({
            status: 'errore',
            message: 'Post non trovato'
        });
    }
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags || []
    };
    posts.query(sql, [updatedPost.title, updatedPost.content, updatedPost.image, JSON.stringify(updatedPost.tags), id], (err) => {
        if (err) {
            return res.status(500).json({
                status: 'errore',
                message: 'Errore nell\'aggiornamento del post',
            });
        }
        res.status(200).json({ status: 'successo', message: 'Post aggiornato con successo', post: updatedPost });
    });
}

// patch (PATCH)
function patch(req, res) {
    const id = parseInt(req.params.id);
    // First, get the existing post
    const selectSql = 'SELECT * FROM posts WHERE id = ?';
    posts.query(selectSql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 'errore',
                message: 'Errore nel recupero del post'
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: 'errore',
                message: 'Post non trovato'
            });
        }
        const post = results[0];
        // Update only the fields provided in the request
        const updatedPost = {
            title: req.body.title !== undefined ? req.body.title : post.title,
            content: req.body.content !== undefined ? req.body.content : post.content,
            image: req.body.image !== undefined ? req.body.image : post.image,
            tags: req.body.tags !== undefined ? req.body.tags : post.tags
        };
        const updateSql = 'UPDATE posts SET title = ?, content = ?, image = ?, tags = ? WHERE id = ?';
        posts.query(updateSql, [updatedPost.title, updatedPost.content, updatedPost.image, JSON.stringify(updatedPost.tags), id], (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'errore',
                    message: 'Errore nell\'aggiornamento del post'
                });
            }
            res.status(200).json({ status: 'successo', message: 'Post aggiornato con successo', post: updatedPost });
        });
    });
}

// delete
function destroy(req, res) {
    const id = parseInt(req.params.id);
    const sql = 'DELETE FROM posts WHERE id = ?';
    posts.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 'errore',
                message: 'Errore nell\'eliminazione del post',
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 'errore',
                message: 'Post non trovato',
            });
        }
        res.status(200).json({ status: 'successo', message: 'Post eliminato.' });
    });
}

module.exports = { index, show, store, update, patch, destroy };