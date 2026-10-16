import { useState } from "react";
import Navbar from "../components/Navbar";
import { submitContactMessage } from "../utils/api.js";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await submitContactMessage(form);
      setSent(true);
    } catch (error) {
      setSubmitError(error.message || "We couldn't send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="contact-page">
        <h1>Get in Touch</h1>
        <p>Questions about an order, a custom piece, or anything else — we're happy to help.</p>

        <div className="contact-layout">
          <div className="contact-info">
            <div>
              <h2>Email</h2>
              <p>hello@debluckyjewelries.com</p>
            </div>
            <div>
              <h2>Phone</h2>
              <p>+233 20 000 0000</p>
            </div>
            <div>
              <h2>Studio Hours</h2>
              <p>Mon–Fri, 9am–6pm</p>
            </div>
          </div>

          {sent ? (
            <div className="contact-success" role="status">
              <h2>Message sent</h2>
              <p>Thanks for reaching out — we'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={200}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={254}
                  required
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  maxLength={5000}
                  required
                />
              </label>

              {submitError && (
                <p className="contact-error" role="alert">{submitError}</p>
              )}
              <button type="submit" className="contact-submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}

export default Contact;