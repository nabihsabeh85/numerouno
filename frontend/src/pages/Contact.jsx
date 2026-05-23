import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaStar } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">
            Get in touch with us today - we'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <FaPhone className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-secondary">Phone</h3>
              <a href="tel:+1234567890" className="text-gray-700 hover:text-primary">
                (123) 456-7890
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <FaEnvelope className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-secondary">Email</h3>
              <a href="mailto:info@numerouno.com" className="text-gray-700 hover:text-primary">
                info@numerouno.com
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <FaMapMarkerAlt className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-secondary">Address</h3>
              <p className="text-gray-700">
                123 Main Street<br />
                Your City, ST 12345
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <FaClock className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-secondary">Hours</h3>
              <p className="text-gray-700">
                Mon-Fri: 9AM-6PM<br />
                Sat: 10AM-4PM<br />
                Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-secondary">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Book a Session</option>
                    <option value="printing">Print Order Question</option>
                    <option value="restoration">Photo Restoration</option>
                    <option value="pricing">Pricing Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-secondary font-bold rounded-lg text-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>

                {submitted && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    ✓ Thank you! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-secondary">Visit Our Studio</h2>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  {/* Google Maps Embed - Replace with your actual location */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316f0b7c09%3A0x54f3b98b5c75e54!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Numero Uno Location"
                  />
                </div>
                <p className="mt-4 text-gray-600">
                  <strong>Parking:</strong> Free parking available in front and behind the building
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-secondary">Why Visit Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-gray-700">See our beautiful studio and seasonal setups</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-gray-700">Browse frame options in person</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-gray-700">Get passport photos done in minutes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-gray-700">Discuss custom packages and pricing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-gray-700">Walk-ins welcome!</span>
                  </li>
                </ul>
              </div>

              <div className="bg-secondary p-8 rounded-lg text-white text-center">
                <FaStar className="text-5xl text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Love Our Service?</h3>
                <p className="mb-4">Leave us a review on Google!</p>
                <a
                  href="https://www.google.com/search?q=numero+uno+portrait+studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-primary text-secondary font-bold rounded-lg hover:bg-yellow-500 transition-all"
                >
                  Write a Review
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

