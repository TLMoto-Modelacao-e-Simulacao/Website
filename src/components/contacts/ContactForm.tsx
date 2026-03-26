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
        <p className="text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw] font-medium">
          Thank you for contacting us!
        </p>
        <p className="text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw] text-gray-500 mt-[1vh]">
          We will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleCustomSubmit} className="flex flex-col text-black gap-[1.5vh]">
      <div>
        <label
          htmlFor="name"
          className="text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw] block"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-[1vh] mt-[0.5vh] text-[3.7vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.3vw] 2xl:text-[1vw] border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && (
          <p className="text-red-500 text-[3.7vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.3vw] 2xl:text-[1vw] mt-[0.5vh]">
            {errors.name}
          </p>
        )}

        <div className="flex gap-[1.5vh] mt-[1.5vh] max-md:flex-col w-full">
          <div className="flex-1">
            <label
              htmlFor="email"
              className="text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw] block"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-[1vh] text-[3.7vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.3vw] 2xl:text-[1vw] mt-[0.5vh] border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email ? (
              <p className="text-red-500 text-[3.7vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.3vw] 2xl:text-[1vw] mt-[0.5vh]">
                {errors.email}
              </p>
            ) : (
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            )}
          </div>

          <div className="flex-1">
            <label
              htmlFor="mobile"
              className="text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw] block"
            >
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full p-[1vh] mt-[0.5vh] text-[3.7vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.3vw] 2xl:text-[1vw] border rounded-md ${errors.mobile ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.mobile && (
              <p className="text-red-500 text-[3.7vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.3vw] 2xl:text-[1vw] mt-[0.5vh]">
                {errors.mobile}
              </p>
            )}
          </div>
        </div>

        <label
          htmlFor="message"
          className="text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw] mt-[1.5vh] block"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full p-[1vh] mt-[0.5vh] text-[3.7vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.3vw] 2xl:text-[1vw] border rounded-md h-[15vh] ${errors.message ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.message ? (
          <p className="text-red-500 text-[3.7vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.3vw] 2xl:text-[1vw]">
            {errors.message}
          </p>
        ) : (
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        )}
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="mt-[1vh] bg-[#39a6ff] text-white py-[1vh] rounded-md cursor-pointer hover:bg-[#39a6ff] 
                transition-colors text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw] disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
}
