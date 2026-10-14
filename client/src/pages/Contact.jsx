import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire this up to an actual email/backend endpoint
    setSent(true);
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
            <div className="contact-success">
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
                  required
                />
              </label>

              <button type="submit" className="contact-submit">
                Send Message
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}

export default Contact;