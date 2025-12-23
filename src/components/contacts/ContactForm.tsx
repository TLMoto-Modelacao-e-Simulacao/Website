import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
}

export function ContactForm() {
  const [state, handleSubmit, reset] = useForm("xzznjvlp");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.toLowerCase())) {
      newErrors.email = "Invalid email address";
    }

    const mobileRegex = /^[0-9]+$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Mobile must contain only numbers";
    } else if (formData.mobile && formData.mobile.length < 9) {
      newErrors.mobile = "Mobile number is too short";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    return newErrors;
  };

  const handleCustomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      handleSubmit(e);
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => {
        reset();
        setFormData({ name: "", email: "", mobile: "", message: "" });
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, reset]);

  if (state.succeeded) {
    return (
      <div className="flex flex-col text-black h-full min-h-[400px] justify-center items-center text-center">
        <p className="text-xl font-medium">Thank you for contacting us!</p>
        <p className="text-sm text-gray-500 mt-2">We will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleCustomSubmit}
      className="flex flex-col text-black h-full min-h-[400px] justify-between"
    >
      <div>
        <label htmlFor="name" className="mt-3.3 max-md:mt-3 max-md:ml-[5%] max-md:text-sm block">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2.5 mt-1 border rounded-md max-md:p-2 max-md:w-[90%] max-md:ml-[5%] text-black ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1 max-md:ml-[5%]">{errors.name}</p>}

        <div className="flex gap-3 mt-3 max-md:flex-col max-md:w-[90%] max-md:ml-[5%]">
          <div className="flex-1 max-md:mb-3">
            <label htmlFor="email" className="max-md:text-sm block">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2.5 mt-1 border rounded-md max-md:p-2 text-black ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email ? (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            ) : (
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            )}
          </div>

          <div className="flex-1 max-md:mb-3">
            <label htmlFor="mobile" className="max-md:text-sm block">
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full p-2.5 mt-1 border rounded-md max-md:p-2 text-black ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>
        </div>

        <label htmlFor="message" className="mt-3 max-md:text-sm max-md:ml-[5%] block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full p-2.5 mt-1 border max-md:ml-[5%] max-md:w-[90%] rounded-md h-28 max-md:p-2 max-md:h-32 text-black ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.message ? (
          <p className="text-red-500 text-xs mt-1 max-md:ml-[5%]">{errors.message}</p>
        ) : (
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        )}
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="mt-4 bg-[#39a6ff] max-md:w-[90%] max-md:ml-[5%] text-white py-2.5 rounded-md cursor-pointer hover:bg-[#39a6ff] transition-colors max-md:py-2 max-md:text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
}
