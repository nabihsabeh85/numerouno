import { Link } from 'react-router-dom';
import { FaCamera, FaHeart, FaAward, FaUsers } from 'react-icons/fa';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Numero Uno</h1>
          <p className="text-2xl text-primary italic">"Your memories are in good hands."</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-secondary">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Since <span className="font-bold text-secondary">1988</span>, Numero Uno Portrait 
                  Studio has been the #1 choice for portrait photography in our community. For over 
                  <span className="font-bold text-primary"> 35 years</span>, we've been capturing 
                  life's most precious moments for families across generations.
                </p>
                <p>
                  As a <span className="font-bold text-secondary">family-owned business</span>, we 
                  understand the importance of preserving memories. We pioneered the 1-hour portrait 
                  package, making professional photography accessible and convenient for everyone.
                </p>
                <p>
                  Our commitment to quality, affordability, and personal service has made us a trusted 
                  name in the community. Whether it's your child's first portrait, a family reunion, 
                  or restoring precious old photographs, we treat every project with the care and 
                  attention it deserves.
                </p>
                <p className="text-xl font-semibold text-primary mt-6">
                  "We don't just take photos—we preserve your legacy."
                </p>
              </div>
            </div>
            <div>
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl shadow-2xl flex items-center justify-center p-8">
                <div className="text-center">
                  <FaCamera className="text-9xl text-secondary mx-auto mb-6" />
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <p className="text-4xl font-bold text-primary">35+</p>
                      <p className="text-gray-600 font-semibold">Years</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <p className="text-4xl font-bold text-primary">1000s</p>
                      <p className="text-gray-600 font-semibold">Families</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaHeart className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-secondary">Family First</h3>
              <p className="text-gray-600">
                We're a family business that treats every customer like family. Your trust means everything to us.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaAward className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-secondary">Excellence</h3>
              <p className="text-gray-600">
                35+ years of experience delivering top-quality portraits and prints that last a lifetime.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaCamera className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-secondary">Innovation</h3>
              <p className="text-gray-600">
                We pioneered the 1-hour portrait package and continue to embrace new technologies.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <FaUsers className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-secondary">Community</h3>
              <p className="text-gray-600">
                Proud to serve our community and capture memories for multiple generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">Our Journey</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center text-secondary font-bold text-xl">
                1988
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-2">The Beginning</h3>
                <p className="text-gray-700">
                  Numero Uno Portrait Studio opened its doors, bringing professional portrait 
                  photography to the community with a personal touch.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center text-secondary font-bold text-xl">
                1995
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Innovation Leader</h3>
                <p className="text-gray-700">
                  Introduced the revolutionary 1-hour portrait package, making professional 
                  photography quick, convenient, and affordable for everyone.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center text-secondary font-bold text-xl">
                2010
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Digital Revolution</h3>
                <p className="text-gray-700">
                  Embraced digital photography while maintaining our commitment to quality prints 
                  and exceptional service.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center text-secondary font-bold text-xl">
                2023
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Online Ordering</h3>
                <p className="text-gray-700">
                  Launched our online print ordering system, making it easier than ever to get 
                  your photos printed and ready for pickup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Experience the Numero Uno Difference</h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of satisfied customers who trust us with their precious memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-primary text-secondary font-bold rounded-lg text-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-xl"
            >
              Visit Our Studio
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 bg-white text-secondary font-bold rounded-lg text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

