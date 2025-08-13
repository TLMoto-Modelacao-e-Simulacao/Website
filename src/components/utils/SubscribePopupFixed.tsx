import { useState, useEffect } from 'react';

interface SubscribePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribePopupFixed({ isOpen, onClose }: SubscribePopupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  // Debug logging
  useEffect(() => {
    console.log('SubscribePopupFixed mounted, isOpen:', isOpen);
  }, []);

  useEffect(() => {
    console.log('SubscribePopupFixed isOpen changed to:', isOpen);
    
    // Prevent body scroll when popup is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Handle ESC key press
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch(
        'https://script.google.com/macros/s/AKfycbxQD-hNhx8cgODBIvvnBHqhUuAAPM4G75kFgRUmiptxwTlg5tzCBG1umguPX0MOiqq_/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ email, website: '' }),
        }
      );

      const text = await res.text().then(t => t.toLowerCase());

      if (text.includes('success')) setStatus('success');
      else if (text.includes('already')) setStatus('already');
      else if (text.includes('invalid')) setStatus('invalid');
      else if (text.includes('blocked')) setStatus('blocked');
      else setStatus('error');

      if (text.includes('success')) {
        setEmail('');
        setTimeout(() => {
          setStatus('');
          onClose();
        }, 1500);
      }
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    console.log('Close button clicked');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    console.log('Backdrop clicked');
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    console.log('SubscribePopupFixed not rendering - isOpen is false');
    return null;
  }

  console.log('SubscribePopupFixed rendering...');

  return (
    <>
      {/* Overlay backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-5"
        onClick={handleBackdropClick}
      >
        {/* Modal content */}
        <div 
          className="bg-white rounded-xl p-8 w-full max-w-md relative shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-[61] animate-modalAppear"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white border-none rounded-full w-8 h-8 cursor-pointer text-lg flex items-center justify-center font-bold transition-all duration-200 hover:scale-110"
            onClick={handleClose}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Title */}
          <h2 className="mb-6 text-gray-800 text-2xl font-bold text-center">
            Subscribe to our Newsletter
          </h2>

          {/* Email input */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-base mb-4 focus:outline-none focus:border-blue-500 transition-colors duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Hidden honeypot field */}
          <input
            type="text"
            name="website"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Submit button */}
          <button
            className={`w-full text-white border-none rounded-lg p-3 text-base font-bold transition-colors duration-200 ${
              status === 'loading' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
            }`}
            onClick={handleSubmit}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>

          {/* Status messages */}
          {status && (
            <div className="mt-4">
              {status === 'invalid' && (
                <p className="text-red-600 text-sm text-center">
                  Invalid email address.
                </p>
              )}
              {status === 'already' && (
                <p className="text-red-600 text-sm text-center">
                  This email is already subscribed.
                </p>
              )}
              {status === 'blocked' && (
                <p className="text-red-600 text-sm text-center">
                  Submission blocked.
                </p>
              )}
              {status === 'success' && (
                <p className="text-green-600 text-sm text-center">
                  Subscribed successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm text-center">
                  Something went wrong. Try again.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
