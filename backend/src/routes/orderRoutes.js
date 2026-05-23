import express from 'express';
import { db } from '../config/firebase.js';
import { sendOrderReadyEmail } from '../config/email.js';

const router = express.Router();

// Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ 
        error: 'Database not available',
        message: 'Firebase is not configured. Please add Firebase credentials to .env file.',
        orders: []
      });
    }

    const { status, limit = 50 } = req.query;
    
    let query = db.collection('orders').orderBy('createdAt', 'desc');
    
    if (status) {
      query = query.where('status', '==', status);
    }
    
    query = query.limit(parseInt(limit));
    
    const snapshot = await query.get();
    const orders = [];
    
    snapshot.forEach(doc => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({ orders, count: orders.length });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const doc = await db.collection('orders').doc(orderId).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    if (!['Processing', 'Ready', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const orderRef = db.collection('orders').doc(orderId);
    const doc = await orderRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    await orderRef.update({
      status,
      updatedAt: new Date().toISOString(),
    });
    
    // If status is "Ready", send email to customer
    if (status === 'Ready') {
      const orderData = doc.data();
      await sendOrderReadyEmail({
        name: orderData.customerName,
        email: orderData.customerEmail,
        orderId,
      });
    }
    
    res.json({ 
      message: 'Order status updated successfully',
      orderId,
      status 
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete order (admin only)
router.delete('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    await db.collection('orders').doc(orderId).delete();
    res.json({ message: 'Order deleted successfully', orderId });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

