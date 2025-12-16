import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-[#f9fafc] flex flex-col items-center">
      <h1 className="mt-8 mb-4 text-2xl font-semibold text-[#1f1f29]">
        Contact Page
      </h1>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14007.758492109759!2d77.02413138715819!3d28.631571600000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d053359984b27%3A0xd28d958bb53a4b9e!2sKakash%20Agro%20Pvt.%20Limited!5e0!3m2!1sen!2sin!4v1764099797645!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="location"
      ></iframe>

      {/* FORM SECTION */}
      <section className="w-full flex justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-md shadow-xl px-8 py-10">
          <h2 className="text-xl font-semibold text-[#111322] mb-1">
            Get in Touch
          </h2>

          <p className="text-sm text-[#7b7f90] mb-7">
            Have any questions or feedback? Drop your details below and we’ll
            reach out to you.
          </p>

          <form
            className="flex flex-col gap-4"
            method="POST"
            action="https://formspree.io/f/xdkvbeyq"
          >
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              className="w-full text-sm tracking-wide uppercase p-3 border border-[#e1e4f0] rounded-sm bg-[#fdfdff] outline-none focus:border-[#6c4bff] focus:ring-1 focus:ring-[#6c4bff]"
              required
              autoComplete="off"
            />

            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              className="w-full text-sm tracking-wide uppercase p-3 border border-[#e1e4f0] rounded-sm bg-[#fdfdff] outline-none focus:border-[#6c4bff] focus:ring-1 focus:ring-[#6c4bff]"
              autoComplete="off"
              required
            />

            <textarea
              name="message"
              placeholder="YOUR MESSAGE"
              className="w-full min-h-[140px] text-sm tracking-wide uppercase p-3 border border-[#e1e4f0] rounded-sm bg-[#fdfdff] outline-none resize-y focus:border-[#6c4bff] focus:ring-1 focus:ring-[#6c4bff]"
              required
            ></textarea>

            <button
              type="submit"
              className="mt-1 self-start px-10 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm text-white bg-[#6c4bff] transition-all duration-150 hover:bg-[#5b3be6] hover:shadow-xl hover:-translate-y-[2px] active:translate-y-0 active:shadow-md"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
