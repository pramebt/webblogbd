const db = require("../config/db")

exports.getAllBlogs = async(req, res) => {
    try{
        const [blogs] = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
        const results = await Promise.all(
        blogs.map(async blog => {
            const [blocks] = await db.query('SELECT * FROM blocks WHERE blog_id = ?', [blog.id]);
            return { ...blog, blocks };
        })
    );
    res.json(results);
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

exports.getBlogsById = async(req, res) => {
    try{
        const [blogs] = await db.query('SELECT * FROM blogs WHERE id = ?', [req.params.id]);
        if (blogs.length === 0) return res.status(404).json({ error: 'Not found' });
        const [blocks] = await db.query('SELECT * FROM blocks WHERE blog_id = ?', [req.params.id]);
        res.json({ ...blogs[0], blocks });
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

exports.postBlogs = async(req, res) => {
    try{
        const { title, description, blocks } = req.body;
        const [result] = await db.query(
            'INSERT INTO blogs (title, description) VALUES (?, ?)',
        [title, description]
        );

        const blogId = result.insertId;

        for (const block of blocks) {
            await db.query(
                'INSERT INTO blocks (blog_id, type, data) VALUES (?, ?, ?)',
            [blogId, block.type, JSON.stringify(block.data)]);
        }

        res.status(201).json({ id: blogId });
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

exports.updateBlogs = async(req, res) => {
    try{
        const { title, description, blocks } = req.body;
        await db.query(
            'UPDATE blogs SET title = ?, description = ?, updated_at = NOW() WHERE id = ?',
        [title, description, req.params.id]
    );

    await db.query('DELETE FROM blocks WHERE blog_id = ?', [req.params.id]);

    for (const block of blocks) {
        await db.query(
            'INSERT INTO blocks (blog_id, type, data) VALUES (?, ?, ?)',
        [req.params.id, block.type, JSON.stringify(block.data)]
        );
    }

    res.json({ message: 'Updated' });
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}
exports.deleteBlogs = async(req, res) =>{
    try{
        await db.query('DELETE FROM blogs WHERE id = ?', [req.params.id]);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}