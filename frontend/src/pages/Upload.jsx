import { useState } from 'react';
import { FaUpload, FaTrash, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_your_key_here');

const PRINT_SIZES = [
  { size: '4x6', price: 1.99 },
  { size: '5x7', price: 2.99 },
  { size: '8x10', price: 5.99 },
  { size: '11x14', price: 7.99 },
  { size: '16x20', price: 9.99 },
  { size: '20x24', price: 12.99 },
  { size: '24x36', price: 14.99 },
];

export default function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== files.length) {
      alert('Only image files are allowed!');
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one photo');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('photos', file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const uploaded = response.data.files.map(file => ({
        filename: file.originalName,
        url: file.url,
        size: '4x6',
        quantity: 1,
        price: 1.99
      }));

      setUploadedPhotos(uploaded);
      setSelectedFiles([]);
      alert('Photos uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload photos. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const updatePhotoOption = (index, field, value) => {
    setUploadedPhotos(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      
      // Update price if size changed
      if (field === 'size') {
        const sizeOption = PRINT_SIZES.find(s => s.size === value);
        if (sizeOption) {
          updated[index].price = sizeOption.price * updated[index].quantity;
        }
      }
      
      // Update price if quantity changed
      if (field === 'quantity') {
        const sizeOption = PRINT_SIZES.find(s => s.size === updated[index].size);
        if (sizeOption) {
          updated[index].price = sizeOption.price * parseInt(value);
        }
      }
      
      return updated;
    });
  };

  const removeUploadedPhoto = (index) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return uploadedPhotos.reduce((sum, photo) => sum + photo.price, 0);
  };

  const handleCheckout = async () => {
    if (uploadedPhotos.length === 0) {
      alert('Please upload and configure at least one photo');
      return;
    }

    if (!customerInfo.name || !customerInfo.email) {
      alert('Please provide your name and email');
      return;
    }

    setProcessing(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/stripe/create-checkout-session`,
        {
          items: uploadedPhotos.map(photo => ({
            filename: photo.filename,
            size: photo.size,
            quantity: photo.quantity,
            price: photo.price,
            downloadUrl: photo.url
          })),
          customerInfo
        }
      );

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (error) {
        console.error('Stripe error:', error);
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process checkout. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Photo Prints Online</h1>
          <p className="text-xl text-gray-200">
            Upload your photos, choose sizes, and pick up at our studio
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Upload Photos */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-primary text-secondary font-bold rounded-full flex items-center justify-center text-xl">
              1
            </div>
            <h2 className="text-3xl font-bold ml-4 text-secondary">Upload Your Photos</h2>
          </div>

          <div className="border-4 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors">
            <FaUpload className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">
              Drag and drop your photos here, or click to browse
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-8 py-3 bg-primary text-secondary font-bold rounded-lg cursor-pointer hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg"
            >
              Select Photos
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: JPG, PNG (Max 10MB per file)
            </p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 text-secondary">
                Selected Files ({selectedFiles.length})
              </h3>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={uploadFiles}
                disabled={uploading}
                className="mt-4 w-full px-8 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-blue-900 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Photo(s)`}
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Configure Prints */}
        {uploadedPhotos.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-primary text-secondary font-bold rounded-full flex items-center justify-center text-xl">
                2
              </div>
              <h2 className="text-3xl font-bold ml-4 text-secondary">Choose Sizes & Quantities</h2>
            </div>

            <div className="space-y-6">
              {uploadedPhotos.map((photo, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div>
                      <img
                        src={photo.url}
                        alt={photo.filename}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 truncate">{photo.filename}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Size
                      </label>
                      <select
                        value={photo.size}
                        onChange={(e) => updatePhotoOption(index, 'size', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      >
                        {PRINT_SIZES.map(option => (
                          <option key={option.size} value={option.size}>
                            {option.size} - ${option.price.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={photo.quantity}
                        onChange={(e) => updatePhotoOption(index, 'quantity', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-secondary mb-2">
                        ${photo.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeUploadedPhoto(index)}
                        className="text-red-500 hover:text-red-700 flex items-center ml-auto"
                      >
                        <FaTrash className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-primary/20 to-yellow-100 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-secondary">Total:</span>
                <span className="text-4xl font-bold text-secondary">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Customer Info & Checkout */}
        {uploadedPhotos.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-primary text-secondary font-bold rounded-full flex items-center justify-center text-xl">
                3
              </div>
              <h2 className="text-3xl font-bold ml-4 text-secondary">Complete Your Order</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-secondary p-6 mb-6">
              <h3 className="font-bold text-lg text-secondary mb-2">Pickup Information</h3>
              <p className="text-gray-700 mb-2">
                Your photos will be ready for pickup at our studio within <strong>2-3 business days</strong>.
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> 123 Main Street, Your City, ST 12345<br />
                <strong>Hours:</strong> Mon-Fri 9AM-6PM, Sat 10AM-4PM
              </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={processing || uploadedPhotos.length === 0}
              className="w-full px-8 py-4 bg-primary text-secondary font-bold rounded-lg text-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {processing ? (
                'Processing...'
              ) : (
                <>
                  <FaShoppingCart className="mr-2" />
                  Proceed to Payment - ${calculateTotal().toFixed(2)}
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment powered by Stripe. You will receive a confirmation email after payment.
            </p>
          </div>
        )}

        {/* Empty State */}
        {uploadedPhotos.length === 0 && selectedFiles.length === 0 && (
          <div className="text-center py-12">
            <FaUpload className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">
              Upload your photos to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

