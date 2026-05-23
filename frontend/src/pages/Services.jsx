import { Link } from 'react-router-dom';
import { 
  FaCamera, 
  FaImage, 
  FaPrint, 
  FaIdCard, 
  FaChild, 
  FaUsers, 
  FaHeart,
  FaBaby,
  FaGraduationCap,
  FaPhotoVideo
} from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      icon: <FaCamera />,
      title: 'Portrait Photography',
      description: 'Professional studio portraits with beautiful seasonal backgrounds and setups.',
      features: [
        'Individual portraits',
        'Family photos',
        'Couples & engagement',
        'Children portraits',
        'Maternity photos',
        '1-hour package available',
      ],
      price: 'Starting at $29.99',
    },
    {
      icon: <FaChild />,
      title: 'Children & Family',
      description: 'Capture your family\'s precious moments with our specialized children and family packages.',
      features: [
        'Newborn photography',
        'Birthday portraits',
        'Family reunions',
        'Sibling photos',
        'Seasonal themes',
        'Props & costumes available',
      ],
      price: 'Starting at $39.99',
    },
    {
      icon: <FaIdCard />,
      title: 'Passport Photos',
      description: 'Quick, professional passport and ID photos that meet all official requirements.',
      features: [
        'US Passport compliant',
        'Ready in minutes',
        'Digital copies included',
        'Visa photos',
        'License photos',
        'Walk-ins welcome',
      ],
      price: '$14.99',
    },
    {
      icon: <FaImage />,
      title: 'Photo Restoration',
      description: 'Bring your old, damaged, or faded photos back to life with expert restoration.',
      features: [
        'Remove scratches & tears',
        'Color restoration',
        'Size adjustments',
        'Enhance faded photos',
        'Digital copies provided',
        'Before/after preview',
      ],
      price: 'Starting at $24.99',
    },
    {
      icon: <FaPrint />,
      title: 'Printing & Enlargements',
      description: 'High-quality photo printing from digital files. Sizes from wallet to poster.',
      features: [
        'Sizes: 4x6 to 24x36',
        'Glossy or matte finish',
        'Same-day service available',
        'Canvas prints',
        'Metal prints',
        'Bulk discounts',
      ],
      price: 'From $1.99',
    },
    {
      icon: <FaPhotoVideo />,
      title: 'Frames & Display',
      description: 'Beautiful frames and display options to showcase your favorite photos.',
      features: [
        'Wide selection of frames',
        'Custom framing',
        'Photo albums',
        'Canvas mounting',
        'Collage frames',
        'Gift packaging available',
      ],
      price: 'Starting at $9.99',
    },
    {
      icon: <FaGraduationCap />,
      title: 'Special Occasions',
      description: 'Celebrate life\'s milestones with themed photo sessions.',
      features: [
        'Graduation photos',
        'Quinceañera',
        'Sweet 16',
        'Anniversary portraits',
        'Holiday photos',
        'Seasonal backdrops',
      ],
      price: 'Custom packages',
    },
    {
      icon: <FaBaby />,
      title: 'Maternity & Newborn',
      description: 'Capture the joy of your growing family with beautiful maternity and newborn photos.',
      features: [
        'Maternity sessions',
        'Newborn portraits',
        'Milestone photos',
        'Props included',
        'Gentle, safe handling',
        'Family inclusion options',
      ],
      price: 'Starting at $49.99',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-200">
            Professional photography and printing services for every occasion
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-primary to-yellow-500 p-8 text-center">
                  <div className="text-6xl text-secondary mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-xl font-bold text-secondary">{service.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Why Choose Numero Uno?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCamera className="text-4xl text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary">Professional Quality</h3>
              <p className="text-gray-600">
                State-of-the-art equipment and 35+ years of expertise ensure stunning results every time.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-4xl text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary">Family Friendly</h3>
              <p className="text-gray-600">
                Welcoming atmosphere perfect for children and families. We make photo sessions fun!
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-4xl text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary">Trusted Since 1988</h3>
              <p className="text-gray-600">
                Three generations of families trust us with their precious memories. Join our family!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact us today to book your session or request a custom quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-primary text-secondary font-bold rounded-lg text-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-xl"
            >
              Request a Quote
            </Link>
            <Link
              to="/upload"
              className="px-8 py-4 bg-white text-secondary font-bold rounded-lg text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            >
              Order Prints Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

