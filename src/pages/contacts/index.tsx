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
        <div className="relative flex flex-col lg:flex-row items-center justify-center mt-[18vh] lg:mt-[20vh] ml-[10vw] max-md:ml-0 mr-[10vw] max-md:mr-0 mb-[7vh] md:gap-[3vw]">
          {/* Form Container */}
          <div className="w-[90vw] lg:w-[60vw] p-[2vw] md:p-[1.5vh] bg-white rounded-lg lg:rounded-xl shadow-md mb-[5vh] lg:mb-0">
            <h2 className="text-[#007bff] text-[4.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] 2xl:text-[1.5vw] mb-[1vw] underline">
              Send a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact Info Column */}
          <div className="flex flex-col lg:w-[30vw] w-[90vw] gap-[1.5vh]">
            <div className="bg-[#39a6ff] text-white p-[1.5vh] rounded-lg lg:rounded-xl shadow-md text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw]">
              <h3 className="mb-[1vh] underline text-[4.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] 2xl:text-[1.5vw]">
                Contact Info
              </h3>
              <p>
                <strong>Pavilhão de Mecânica III</strong>
              </p>
              <p>Avenida Rovisco Pais, 1 1049-001</p>
              <p>Lisboa, Portugal</p>
              <p className="break-all max-md:break-words">Email: info@tlmoto.tecnico.ulisboa.pt</p>
              <p>Phone: +351 218 419 556</p>
              <p>Martim Carneiro, Team Leader : +351 934 112 711</p>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.528704837498!2d-9.140627224030416!3d38.73670337155637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193381fefb1f6d%3A0xe4c8c04a8e06df26!2sPavilh%C3%A3o%20de%20Mec%C3%A2nica%20III!5e0!3m2!1sen!2spt!4v1647583982827!5m2!1sen!2spt"
              className="w-full h-[22vh] border-none rounded-md lg:rounded-xl"
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
