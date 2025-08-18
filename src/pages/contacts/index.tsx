import React, { useState } from 'react';
import FAQ from '@/src/components/contacts/FAQ';
import MyDefaultPage from '@/src/components/DefaultPage';


const initBody = { name: '', email: '', mobile: '', message: '' };

export default function Contacts() {
  const [body, setBody] = useState(initBody);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', 'invalid-email'

  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValidEmail(body.email)) {
      setSubmitStatus('invalid-email');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('sending');

    try {
      // URL do seu Google Apps Script (substitua pelo seu)
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw70clzSYRz5XVUK7RolqFLJ4X-nxv7VqctHNkQszO4Sp-hWvrWiLEdbvCnveHBdCfp/exec';
      
      const formData = new URLSearchParams();
      formData.append('name', body.name);
      formData.append('email', body.email);
      formData.append('mobile', body.mobile || '');
      formData.append('message', body.message);
      formData.append('timestamp', new Date().toISOString());
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      });

      const result = await response.text();
      
      if (result.toLowerCase().includes('success')) {
        setSubmitStatus('success');
        setBody(initBody); // Reset form
        setTimeout(() => setSubmitStatus(null), 3000); // Hide success message after 3s
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-y-auto z-10">
      {/* Background */}
      <MyDefaultPage>

      {/* Main Content */}
      <div className="relative flex max-md:flex-col items-center justify-center mt-[10vh] max-lg:mt-[18vh]  max-md:p-5">
        {/* Form Container */}
        <div className="m-[5%] ml-[10%] w-[60%] p-[1.3%] bg-white rounded-lg shadow-md font-sans max-md:w-[90%] max-md:ml-0 max-md:m-0 max-md:mb-8 ">
          <h2 className="text-[#007bff] text-xl md:text-2xl -mt-[1.5%] max-md:mt-0 max-md:text-xl">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col ">
            <label htmlFor="name" className="mt-3.3 max-md:mt-3 max-md:ml-[5%] max-md:text-sm">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Diogo Martins"
              value={body.name}
              onChange={handleChange}
              required
              className="w-full p-2.5 mt-1 border border-gray-300 rounded-md max-md:p-2 max-md:w-[90%] max-md:ml-[5%]"
            />

            <div className="flex gap-3 mt-3 max-md:flex-col max-md:w-[90%] max-md:ml-[5%]">
              <div className="flex-1 max-md:mb-3">
                <label htmlFor="email" className="max-md:text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="diogomartins@gmail.com"
                  value={body.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 mt-1 border border-gray-300 rounded-md max-md:p-2"
                />
              </div>
              <div className="flex-1 max-md:mb-3">
                <label htmlFor="mobile" className="max-md:text-sm">Mobile</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="912345678"
                  value={body.mobile}
                  onChange={handleChange}
                  className="w-full p-2.5 mt-1 border border-gray-300 rounded-md max-md:p-2"
                />
              </div>
            </div>

            <label htmlFor="message" className="mt-3 max-md:text-sm max-md:ml-[5%]">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              value={body.message}
              onChange={handleChange}
              required
              minLength={10}
              className="w-full p-2.5 mt-1 border max-md:ml-[5%] max-md:w-[90%] border-gray-300 rounded-md h-28 max-md:p-2 max-md:h-32"
            ></textarea>

            {/* Honeypot field */}
            <input
              type="text"
              name="website"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              value=""
              onChange={() => {}}
            />

            <button 
              type="submit" 
              className="mt-4 bg-[#39a6ff] max-md:w-[90%] max-md:ml-[5%] text-white py-2.5 rounded-md cursor-pointer hover:bg-[#39a6ff] transition-colors max-md:py-2 max-md:text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>

            {/* Status Messages */}
            {submitStatus && (
              <div className="mt-4 max-md:text-sm">
                {submitStatus === 'success' && (
                  <p className="text-green-600">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600">Failed to send message. Please try again later.</p>
                )}
                {submitStatus === 'invalid-email' && (
                  <p className="text-red-600">Please enter a valid email address.</p>
                )}
                {submitStatus === 'sending' && (
                  <p className="text-blue-600">Sending your message...</p>
                )}
              </div>
            )}
          </form>
        </div>
        
        {/* Contact Info Column */}
        <div className="flex flex-col w-1/3 mr-[10%] max-xl:w-lg max-md:w-[90%] max-md:mr-0 ">
          <div className="bg-[#39a6ff] text-white p-5 rounded-lg shadow-md w-full font-sans max-md:p-4">
            <h3 className="mb-2.5 text-xl md:text-2xl max-md:text-lg">Contact Info</h3>
            <p><strong>Pavilhão de Mecânica III</strong></p>
            <p>Avenida Rovisco Pais, 1 1049-001</p>
            <p>Lisboa, Portugal</p>
            <p className='break-all max-md:break-words'>Email: info@tlmoto.tecnico.ulisboa.pt</p>
            <p>Phone: +351 218 419 556</p>
          </div>
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.528704837498!2d-9.140627224030416!3d38.73670337155637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193381fefb1f6d%3A0xe4c8c04a8e06df26!2sPavilh%C3%A3o%20de%20Mec%C3%A2nica%20III!5e0!3m2!1sen!2spt!4v1647583982827!5m2!1sen!2spt"
            className="mt-8 w-full h-48 border-none rounded-md"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <FAQ />
      </MyDefaultPage>
    </div>
  );
}