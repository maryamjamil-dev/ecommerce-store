import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
    <Header/>
    <main className="bg-[#FAFAF8]">
      {/* Hero */}
      <section className="border-b border-[#E5E7EB] bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFB020]/10 px-4 py-2 text-sm font-semibold text-[#FFB020]">
              <MessageCircle size={16} />
              Get in Touch
            </span>

            <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
              How can we help?
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#9CA3AF] sm:text-lg">
              Have a question about a product, order, delivery, or
              anything else? Send us a message and our team will be
              happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          {/* Contact Information */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#B8791A]">
              Contact Information
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#14181F]">
              We'd love to hear from you
            </h2>

            <p className="mt-4 leading-7 text-[#6B7280]">
              Reach out to us using any of the contact options below.
              We're here to help with your shopping experience.
            </p>

            <div className="mt-8 space-y-4">
              {/* Email */}
              <div className="flex gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7]">
                  <Mail
                    size={21}
                    className="text-[#FFB020]"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-[#14181F]">
                    Email
                  </h3>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    support@voltora.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7]">
                  <Phone
                    size={21}
                    className="text-[#FFB020]"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-[#14181F]">
                    Phone
                  </h3>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    +92 300 1234567
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7]">
                  <MapPin
                    size={21}
                    className="text-[#FFB020]"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-[#14181F]">
                    Location
                  </h3>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    Faisalabad, Punjab, Pakistan
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7]">
                  <Clock
                    size={21}
                    className="text-[#FFB020]"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-[#14181F]">
                    Business Hours
                  </h3>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    Monday – Saturday: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Card */}
            <div className="mt-6 rounded-2xl bg-[#0A0E14] p-6">
              <h3 className="text-lg font-bold text-white">
                Have a quick question?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">
                You may find the answer you're looking for in our
                frequently asked questions.
              </p>

              <Link
                to="/faq"
                className="mt-5 inline-flex items-center font-semibold text-[#FFB020] transition hover:text-white"
              >
                Visit FAQ
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
            {!submitted ? (
              <>
                <div className="mb-7">
                  <h2 className="text-2xl font-bold text-[#14181F]">
                    Send us a message
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Fill out the form and we'll get back to you as
                    soon as possible.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#14181F]"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#14181F]"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-[#14181F]"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-[#14181F]"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full resize-none rounded-xl border border-[#D1D5DB] px-4 py-3 text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFB020] px-5 py-3.5 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </>
            ) : (
              /* Success Message */
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7]">
                  <CheckCircle
                    size={32}
                    className="text-[#FFB020]"
                  />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-[#14181F]">
                  Message Sent!
                </h2>

                <p className="mt-3 max-w-md text-sm leading-7 text-[#6B7280]">
                  Thank you for contacting Voltora. Your message has
                  been received and our team will get back to you
                  as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-xl bg-[#0A0E14] px-6 py-3 font-semibold text-white transition hover:bg-[#171d29]"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#E5E7EB] bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-[#14181F] sm:text-3xl">
            Looking for something specific?
          </h2>

          <p className="mt-3 leading-7 text-[#6B7280]">
            Explore our product categories and discover electronics
            for work, entertainment, and everyday life.
          </p>

          <Link
            to="/categories"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FFB020] px-6 py-3 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
          >
            Explore Categories
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}

