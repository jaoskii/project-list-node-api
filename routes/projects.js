var express = require('express');
var router = express.Router();
const db = require('../config/database');

// GET all projects
router.get('/', async function(req, res, next) {
  try {
    const result = await db.query('SELECT * FROM projects ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Search projects by name or description
router.get('/search', async function(req, res, next) {
  try {
    const { str } = req.query;
    
    if (!str) {
      return res.status(400).json({ message: 'Search query string is required' });
    }

    const result = await db.query(
      'SELECT * FROM projects WHERE name ILIKE $1 OR description ILIKE $1 ORDER BY id',
      [`%${str}%`]
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// GET single project by ID
router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// CREATE new project
router.post('/', async function(req, res, next) {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const result = await db.query(
      'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// UPDATE project
router.put('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const result = await db.query(
      'UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// DELETE project
router.delete('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
