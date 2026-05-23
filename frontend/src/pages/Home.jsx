import { Link } from 'react-router-dom';
import { FaCamera, FaImage, FaPrint, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <FaCamera />,
      title: 'Portrait Photography',
      description: 'Professional portraits for families, children, couples, maternity, and passport photos.',
    },
    {
      icon: <FaImage />,
      title: 'Photo Restoration',
      description: 'Bring your old, damaged photos back to life with our expert restoration services.',
    },
    {
      icon: <FaPrint />,
      title: 'Printing & Framing',
      description: 'High-quality prints up to 24x36 inches, plus professional framing options.',
    },
    {
      icon: <FaStar />,
      title: '35+ Years Experience',
      description: 'Trusted by generations. Family-owned, community-focused excellence.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Numero Uno has been capturing our family memories for three generations! The quality and service are unmatched.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      text: 'They restored my grandmother\'s wedding photo beautifully. I couldn\'t believe how perfect it looked!',
      rating: 5,
    },
    {
      name: 'Emily Chen',
      text: 'Fast, professional, and affordable. Got my passport photos done in minutes. Highly recommend!',
      rating: 5,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-blue-800 to-secondary text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Memories Are in <span className="text-primary">Good Hands</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Professional portrait photography and photo services for over 35 years
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-primary text-secondary font-bold rounded-lg text-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-xl"
            >
              Book a Session
            </Link>
            <Link
              to="/upload"
              className="px-8 py-4 bg-white text-secondary font-bold rounded-lg text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            >
              Order Prints Online
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-secondary">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Everything you need for preserving and printing your precious memories
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="text-5xl text-primary mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-secondary">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-secondary">
                Why Choose Numero Uno?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-secondary font-bold text-xl">
                    35+
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Years of Excellence</h3>
                    <p className="text-gray-600">
                      Serving our community since 1988 with unwavering quality and dedication.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <FaCamera className="text-secondary text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Professional Studio</h3>
                    <p className="text-gray-600">
                      State-of-the-art equipment and beautiful seasonal setups for every occasion.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <FaStar className="text-secondary text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Family Business</h3>
                    <p className="text-gray-600">
                      We treat every customer like family and handle your memories with care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-2xl flex items-center justify-center">
                <FaCamera className="text-white text-9xl opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <p className="text-3xl font-bold mb-4">Your memories are in good hands</p>
                    <div className="flex justify-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-primary text-2xl" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-secondary to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            Trusted by thousands of families in our community
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:bg-white/20 transition-all"
              >
                <FaQuoteLeft className="text-4xl text-primary mb-4" />
                <p className="text-lg mb-6 italic">{testimonial.text}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-primary">{testimonial.name}</p>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/search?q=numero+uno+portrait+studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-primary text-secondary font-bold rounded-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-xl"
            >
              Leave a Review on Google
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-secondary">
            Ready to Create Beautiful Memories?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Visit our studio or order prints online today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="px-8 py-4 bg-secondary text-white font-bold rounded-lg text-lg hover:bg-blue-900 transition-all hover:scale-105 shadow-lg"
            >
              View All Services
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 border-2 border-secondary text-secondary font-bold rounded-lg text-lg hover:bg-secondary hover:text-white transition-all hover:scale-105"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

