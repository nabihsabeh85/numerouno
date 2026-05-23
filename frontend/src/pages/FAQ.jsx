import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'How long have you been in business?',
          answer: 'Numero Uno Portrait Studio has been proudly serving our community since 1988 - over 35 years of excellence in portrait photography and photo services!'
        },
        {
          question: 'Do I need an appointment?',
          answer: 'While appointments are recommended for portrait sessions, we welcome walk-ins for passport photos and quick print orders. Call us at (123) 456-7890 to schedule your session.'
        },
        {
          question: 'Where are you located?',
          answer: 'We\'re located at 123 Main Street, Your City, ST 12345. Free parking is available in front and behind our building.'
        }
      ]
    },
    {
      category: 'Photo Printing',
      questions: [
        {
          question: 'How long does it take to get my photos?',
          answer: 'Standard prints (4x6 to 8x10) are typically ready within 1-2 business days. Larger prints (11x14 to 24x36) may take 2-3 business days. Same-day service is available for an additional fee.'
        },
        {
          question: 'What sizes can you print?',
          answer: 'We offer a wide range of sizes from wallet photos (2.5x3.5) up to 24x36 poster size. Popular sizes include 4x6, 5x7, 8x10, 11x14, 16x20, and 20x24. Custom sizes are also available.'
        },
        {
          question: 'Do you print from digital files?',
          answer: 'Yes! We accept digital files from phones, cameras, USB drives, email, and our online ordering system. We accept JPEG, PNG, and most common image formats.'
        },
        {
          question: 'What about photo quality? Will my pictures look good?',
          answer: 'We use professional-grade printers and high-quality photo paper to ensure excellent results. If your original photo is low resolution, we\'ll let you know and recommend the best size for optimal quality.'
        },
        {
          question: 'Can I order prints online?',
          answer: 'Absolutely! Use our online ordering system to upload photos, select sizes and quantities, pay online, and pick up your prints at the studio. It\'s quick and convenient!'
        }
      ]
    },
    {
      category: 'Portrait Sessions',
      questions: [
        {
          question: 'How long does a portrait session take?',
          answer: 'Most sessions take 15-30 minutes. Our popular 1-hour package includes the session, selection time, and finished photos ready to take home within an hour!'
        },
        {
          question: 'Can I bring my own background or props?',
          answer: 'Yes! While we have beautiful seasonal backgrounds and props available, you\'re welcome to bring personal items that have special meaning to you.'
        },
        {
          question: 'What should we wear for family photos?',
          answer: 'Coordinate colors but avoid matching exactly. Solid colors or simple patterns work best. Avoid busy patterns, large logos, or neon colors. We\'re happy to provide styling advice when you book!'
        },
        {
          question: 'Do you photograph children?',
          answer: 'Yes! We specialize in children\'s portraits and have over 35 years of experience working with kids of all ages, from newborns to teens. We make it fun and stress-free!'
        }
      ]
    },
    {
      category: 'Passport Photos',
      questions: [
        {
          question: 'Do you do passport photos?',
          answer: 'Yes! We provide passport photos that meet all US passport requirements. Photos are ready in minutes, and we guarantee acceptance. Price is $14.99 for a set of two photos.'
        },
        {
          question: 'Are your passport photos compliant with official requirements?',
          answer: 'Absolutely! Our passport photos meet all official US Department of State requirements. We also do visa photos, citizenship photos, and other ID photos.'
        },
        {
          question: 'Can you do passport photos for children and babies?',
          answer: 'Yes! We have experience photographing children and babies for passports. We\'ll work patiently to get a compliant photo, and we guarantee it will be accepted.'
        }
      ]
    },
    {
      category: 'Photo Restoration',
      questions: [
        {
          question: 'Do you do photo restoration?',
          answer: 'Yes! We specialize in restoring old, damaged, or faded photographs. We can remove scratches, tears, and stains, restore color, and enhance image quality.'
        },
        {
          question: 'How long does photo restoration take?',
          answer: 'Restoration time varies depending on the condition of the photo and complexity of work needed. Simple restorations take 3-5 days, while extensive work may take 1-2 weeks. We\'ll give you an estimate when you bring in your photo.'
        },
        {
          question: 'Will you damage my original photo?',
          answer: 'Never! We scan your original and work on digital copies only. Your original photo is returned to you safely. We can also provide digital files and prints of the restored image.'
        },
        {
          question: 'What if my photo is severely damaged?',
          answer: 'We\'ve successfully restored photos that were torn, water-damaged, faded, or missing pieces. Bring it in for a free consultation - you might be surprised what we can do!'
        }
      ]
    },
    {
      category: 'Pricing & Payment',
      questions: [
        {
          question: 'How much do portrait sessions cost?',
          answer: 'Portrait sessions start at $29.99 for basic packages. Pricing varies based on the type of session, number of people, and print packages. Contact us for detailed pricing and custom quotes!'
        },
        {
          question: 'Do you offer discounts?',
          answer: 'Yes! We offer bulk print discounts, family package deals, and seasonal promotions. Ask about our loyalty program for repeat customers!'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept cash, credit/debit cards (Visa, MasterCard, American Express, Discover), and online payments through our secure payment system.'
        }
      ]
    },
    {
      category: 'Frames & Products',
      questions: [
        {
          question: 'Do you sell frames?',
          answer: 'Yes! We have a wide selection of frames in various sizes, styles, and colors. We also offer custom framing, matting, and professional mounting services.'
        },
        {
          question: 'What other products do you offer?',
          answer: 'In addition to prints and frames, we offer canvas prints, metal prints, photo albums, greeting cards, and photo gifts. Ask us about custom products!'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-200">
            Find answers to common questions about our services
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-secondary border-b-4 border-primary pb-2 inline-block">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-lg text-secondary pr-4">
                          {faq.question}
                        </span>
                        <span className="text-primary text-xl flex-shrink-0">
                          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-700 border-t border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-secondary">Still Have Questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're here to help! Contact us directly and we'll be happy to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+1234567890"
              className="px-8 py-4 bg-primary text-secondary font-bold rounded-lg text-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg"
            >
              Call Us: (123) 456-7890
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 bg-secondary text-white font-bold rounded-lg text-lg hover:bg-blue-900 transition-all hover:scale-105 shadow-lg"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gradient-to-br from-secondary to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/services"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-all text-center"
            >
              <h3 className="text-xl font-bold mb-2 text-primary">View Services</h3>
              <p className="text-gray-200">See all our photography and printing services</p>
            </Link>
            <Link
              to="/portfolio"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-all text-center"
            >
              <h3 className="text-xl font-bold mb-2 text-primary">View Portfolio</h3>
              <p className="text-gray-200">Browse our collection of beautiful portraits</p>
            </Link>
            <Link
              to="/upload"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-all text-center"
            >
              <h3 className="text-xl font-bold mb-2 text-primary">Order Prints</h3>
              <p className="text-gray-200">Upload and order prints online for pickup</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

