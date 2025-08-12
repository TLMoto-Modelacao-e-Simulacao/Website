import { useState } from 'react';
import { cards } from 'src/components/textContent/GarageSectionTexts';
import { TransitionLink } from '../utils/TransitionLink';

export default function MyGarageCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/videos/garage/garage_menu.mp4" type="video/mp4" />
      </video>

      <div className="relative w-full max-w-4xl p-6">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cards.map((card, index) => (
              <div key={index} className="flex-shrink-0 w-full flex justify-center">
                <div className="relative w-[28rem] h-[32rem] overflow-hidden rounded-lg shadow-lg group">
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                    <h3 className="text-lg font-bold">{card.title}</h3>
                    <p className="text-sm mt-2 text-center">{card.description}</p>
                    <TransitionLink
                      href={card.detailsLink}
                      className="mt-3 text-blue-300 underline"
                    >
                      More Details
                    </TransitionLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              className={`
                w-2 h-2 rounded-full
                ${idx === currentIndex ? 'bg-white' : 'bg-gray-400'}
                transition-opacity
                focus:outline-none
              `}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="fixed left-4 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
          aria-label="Previous Slide"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="fixed right-4 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
          aria-label="Next Slide"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
