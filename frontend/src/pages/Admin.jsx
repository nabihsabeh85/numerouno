import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSync, FaEye, FaCheckCircle, FaTimes } from 'react-icons/fa';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders`
      );
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/${orderId}/status`,
        { status: newStatus }
      );
      alert(`Order status updated to: ${newStatus}`);
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-secondary mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage and track photo print orders</p>
            </div>
            <button
              onClick={fetchOrders}
              className="px-6 py-3 bg-primary text-secondary font-bold rounded-lg hover:bg-yellow-500 transition-all flex items-center shadow-lg"
            >
              <FaSync className="mr-2" />
              Refresh Orders
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-secondary">{orders.length}</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-lg">
            <p className="text-sm text-gray-500 mb-1">Processing</p>
            <p className="text-3xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'Processing').length}
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-lg">
            <p className="text-sm text-gray-500 mb-1">Ready</p>
            <p className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.status === 'Ready').length}
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-3xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'Completed').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {['All', 'Processing', 'Ready', 'Completed', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filterStatus === status
                    ? 'bg-primary text-secondary shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-xl text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">
                        {order.orderId?.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.items?.length || 0} photo(s)
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">
                        ${order.totalPrice?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-secondary hover:text-blue-900 font-semibold flex items-center"
                        >
                          <FaEye className="mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-secondary text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white hover:text-primary text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              {/* Customer Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-secondary mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{selectedOrder.customerEmail}</p>
                  </div>
                  {selectedOrder.customerPhone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold">{selectedOrder.customerPhone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-secondary mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{item.filename}</p>
                        <p className="text-sm text-gray-600">
                          Size: {item.size} | Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-primary/20 rounded-lg flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-secondary">
                    ${selectedOrder.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Status Update */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-secondary mb-3">Update Status</h3>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.orderId, 'Processing')}
                    className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all"
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.orderId, 'Ready')}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all flex items-center"
                  >
                    <FaCheckCircle className="mr-2" />
                    Ready for Pickup
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.orderId, 'Completed')}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.orderId, 'Cancelled')}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

