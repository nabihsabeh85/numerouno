import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaCamera className="text-3xl text-primary" />
              <div>
                <h3 className="text-xl font-bold">Numero Uno</h3>
                <p className="text-sm text-gray-300">Portrait Studio</p>
              </div>
            </div>
            <p className="text-primary text-sm italic mb-4">
              "Your memories are in good hands."
            </p>
            <p className="text-sm text-gray-300">
              Serving our community with excellence for over 35 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-primary transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-300 hover:text-primary transition-colors">Order Prints</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Services</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Portrait Photography</li>
              <li>Photo Restoration</li>
              <li>Printing & Enlargements</li>
              <li>Passport Photos</li>
              <li>Frame Sales</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Contact Us</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <div>
                  <p>123 Main Street</p>
                  <p>Your City, State 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-primary" />
                <a href="tel:(212) 369-6360" className="hover:text-primary transition-colors">
                  (212) 369-6360
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-primary" />
                <a href="mailto:info@numerouno.com" className="hover:text-primary transition-colors">
                  info@numerouno.com
                </a>
              </div>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-primary transition-colors"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-primary transition-colors"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Numero Uno Portrait Studio. All rights reserved.</p>
          <p className="mt-2">Proudly serving since 1988 | Family-owned and operated</p>
        </div>
      </div>
    </footer>
  );
}

