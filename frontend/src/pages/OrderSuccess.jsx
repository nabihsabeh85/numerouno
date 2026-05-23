import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaCamera, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import axios from 'axios';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/stripe/session/${sessionId}`
      );
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <FaCheckCircle className="text-6xl text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your order! Your payment was successful.
          </p>
          <p className="text-lg text-gray-500">
            We've sent a confirmation email to <strong>{orderDetails?.customer_email}</strong>
          </p>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-secondary mb-6">Order Details</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="font-semibold text-gray-800">{orderDetails.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                <p className="font-semibold text-2xl text-primary">
                  ${(orderDetails.amount_total / 100).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                <p className="font-semibold text-gray-800">
                  {orderDetails.metadata?.customerName || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-semibold text-gray-800">{orderDetails.customer_email}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-500 mb-2">Status</p>
              <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 font-semibold rounded-full">
                Processing
              </span>
            </div>
          </div>
        )}

        {/* Pickup Instructions */}
        <div className="bg-gradient-to-br from-secondary to-blue-900 text-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaCamera className="mr-3 text-primary" />
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-secondary font-bold rounded-full flex items-center justify-center mr-4">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">We Process Your Order</h3>
                <p className="text-gray-200">
                  Your photos are now being printed on premium quality paper with professional equipment.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-secondary font-bold rounded-full flex items-center justify-center mr-4">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Quality Check</h3>
                <p className="text-gray-200">
                  Each print is carefully inspected to ensure it meets our high standards.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-secondary font-bold rounded-full flex items-center justify-center mr-4">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Ready for Pickup</h3>
                <p className="text-gray-200">
                  Within 2-3 business days, we'll email you when your photos are ready!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-secondary mb-6">Pickup Location</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-2xl text-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Numero Uno Portrait Studio</h3>
                  <p className="text-gray-600">
                    123 Main Street<br />
                    Your City, State 12345
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FaClock className="text-2xl text-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">
                Please bring this confirmation email or your order ID when picking up.
              </p>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316f0b7c09%3A0x54f3b98b5c75e54!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Studio Location"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 px-8 py-4 bg-secondary text-white font-bold rounded-lg text-center hover:bg-blue-900 transition-all hover:scale-105 shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            to="/upload"
            className="flex-1 px-8 py-4 bg-primary text-secondary font-bold rounded-lg text-center hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg"
          >
            Order More Prints
          </Link>
        </div>

        {/* Thank You Note */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 italic">
            "Your memories are in good hands."
          </p>
          <p className="text-gray-500 mt-2">
            Thank you for choosing Numero Uno Portrait Studio!
          </p>
        </div>
      </div>
    </div>
  );
}

