import React from "react";
import FAQ from "@/src/components/contacts/FAQ";
import MyDefaultPage from "@/src/components/DefaultPage";
import { ContactForm } from "@/src/components/contacts/ContactForm";

export default function Contacts() {
  return (
    <div className="relative min-h-screen overflow-y-auto z-10">
      {/* Background */}
      <MyDefaultPage>
        {/* Main Content */}
        <div className="relative flex max-md:flex-col items-center justify-center mt-[10vh] max-lg:mt-[18vh]  max-md:p-5">
          {/* Form Container */}
          <div className="m-[5%] ml-[10%] w-[60%] p-[1.3%] bg-white rounded-lg shadow-md max-md:w-[90%] max-md:ml-0 max-md:m-0 max-md:mb-8 ">
            <h2 className="text-[#007bff] text-xl md:text-2xl -mt-[1.5%] max-md:mt-0 max-md:text-xl">
              Send a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact Info Column */}
          <div className="flex flex-col w-1/3 mr-[10%] max-xl:w-lg max-md:w-[90%] max-md:mr-0 ">
            <div className="bg-[#39a6ff] text-white p-5 rounded-lg shadow-md w-full max-md:p-4">
              <h3 className="mb-2.5 text-xl md:text-2xl max-md:text-lg">Contact Info</h3>
              <p>
                <strong>Pavilhão de Mecânica III</strong>
              </p>
              <p>Avenida Rovisco Pais, 1 1049-001</p>
              <p>Lisboa, Portugal</p>
              <p className="break-all max-md:break-words">Email: info@tlmoto.tecnico.ulisboa.pt</p>
              <p>Phone: +351 218 419 556</p>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.528704837498!2d-9.140627224030416!3d38.73670337155637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193381fefb1f6d%3A0xe4c8c04a8e06df26!2sPavilh%C3%A3o%20de%20Mec%C3%A2nica%20III!5e0!3m2!1sen!2spt!4v1647583982827!5m2!1sen!2spt"
              className="mt-8 w-full h-48 border-none rounded-md"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <FAQ />
      </MyDefaultPage>
    </div>
  );
}
