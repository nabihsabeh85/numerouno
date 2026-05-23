import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaCamera } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <FaCamera className="text-4xl text-primary group-hover:scale-110 transition-transform" />
            <div>
              <h1 className="text-2xl font-bold text-secondary">Numero Uno</h1>
              <p className="text-xs text-gray-600">Portrait Studio</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-secondary bg-primary/20'
                    : 'text-gray-700 hover:text-secondary hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/upload"
              className="ml-4 px-6 py-2 bg-primary text-secondary font-semibold rounded-lg hover:bg-yellow-500 transition-colors shadow-md"
            >
              Order Prints
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-secondary text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-secondary bg-primary/20'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/upload"
              onClick={() => setIsOpen(false)}
              className="block mt-2 px-4 py-3 bg-primary text-secondary font-semibold rounded-lg text-center hover:bg-yellow-500 transition-colors"
            >
              Order Prints
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

