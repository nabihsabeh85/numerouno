import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample portfolio images (in production, these would come from a database or CMS)
  const portfolioImages = [
    { id: 1, category: 'Family', title: 'Family Portrait', description: 'Beautiful family moment', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800' },
    { id: 2, category: 'Children', title: 'Child Portrait', description: 'Happy childhood memories', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800' },
    { id: 3, category: 'Graduation', title: 'Graduation Day', description: 'Celebrating success', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800' },
    { id: 4, category: 'Maternity', title: 'Maternity Session', description: 'Expecting joy', image: 'https://images.unsplash.com/photo-1559582927-47cae3f6e2d1?w=800' },
    { id: 5, category: 'Family', title: 'Holiday Photo', description: 'Christmas memories', image: 'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800' },
    { id: 6, category: 'Children', title: 'First Birthday', description: 'One year milestone', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800' },
    { id: 7, category: 'Couples', title: 'Engagement Photo', description: 'Love story begins', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800' },
    { id: 8, category: 'Easter', title: 'Easter Portrait', description: 'Spring celebrations', image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800' },
    { id: 9, category: 'Family', title: 'Multi-Generation', description: 'Three generations together', image: 'https://images.unsplash.com/photo-1472148439583-25f75bfc03af?w=800' },
    { id: 10, category: 'Restoration', title: 'Photo Restoration', description: 'Bringing memories back to life', image: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=800' },
    { id: 11, category: 'Couples', title: 'Anniversary Portrait', description: '25 years together', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800' },
    { id: 12, category: 'Children', title: 'School Portrait', description: 'First day of school', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800' },
  ];

  const categories = ['All', 'Family', 'Children', 'Couples', 'Maternity', 'Graduation', 'Easter', 'Restoration'];

  const filteredImages = selectedCategory === 'All' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex - 1 < 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-gray-200">
            Explore our work and see why families trust us with their memories
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 sticky top-20 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-secondary shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => openLightbox(image)}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-bold text-lg">{image.title}</p>
                    <p className="text-sm text-gray-200">{image.description}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-primary text-secondary text-xs font-semibold rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors z-50"
          >
            <FaTimes />
          </button>

          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 text-white text-4xl hover:text-primary transition-colors z-50 bg-black/50 rounded-full p-4"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 text-white text-4xl hover:text-primary transition-colors z-50 bg-black/50 rounded-full p-4"
          >
            <FaChevronRight />
          </button>

          <div className="max-w-5xl w-full">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300 mb-2">{selectedImage.description}</p>
              <span className="inline-block px-4 py-2 bg-primary text-secondary font-semibold rounded-full">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-secondary">
            Let's Create Beautiful Photos Together!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your session today and become part of our portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-primary text-secondary font-bold rounded-lg text-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg"
            >
              Book a Session
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 bg-secondary text-white font-bold rounded-lg text-lg hover:bg-blue-900 transition-all hover:scale-105 shadow-lg"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

