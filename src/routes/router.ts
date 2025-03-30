import { Router } from 'express';
import pool from '../config/db';

const router = Router();

// Get all states
router.get('/', async (req, res) => {
  try {
    console.log('📢 Fetching all states...');
    const [states] = await pool.query('SELECT * FROM states');
    console.log('✅ Data:', states);
    res.json(states);
  } catch (error) {
    console.error('❌ Error fetching states:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get a state by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [states] = await pool.query('SELECT * FROM states WHERE id = ?', [id]);

    if (!states.length) return res.status(404).json({ error: 'State not found' });

    res.json(states[0]);
  } catch (error) {
    console.error('Error fetching state:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new state entry
router.post('/', async (req, res) => {
  try {
    const { name, city, state } = req.body;
    const [result] = await pool.query(
      'INSERT INTO states (name, city, state) VALUES (?, ?, ?)',
      [name, city, state]
    );

    res.status(201).json({ message: 'State added', stateId: result.insertId });
  } catch (error) {
    console.error('Error adding state:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a state
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM states WHERE id = ?', [id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'State not found' });

    res.json({ message: 'State deleted' });
  } catch (error) {
    console.error('Error deleting state:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
