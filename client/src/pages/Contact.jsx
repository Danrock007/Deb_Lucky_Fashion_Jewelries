import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Contact.css";

const PLACEHOLDER_WHATSAPP_NUMBER = "233200000000";
const configuredWhatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? "";
const isValidWhatsAppNumber = /^[1-9]\d{7,14}$/.test(configuredWhatsAppNumber);
const whatsappNumber = configuredWhatsAppNumber
  ? isValidWhatsAppNumber
    ? configuredWhatsAppNumber
    : null
  : PLACEHOLDER_WHATSAPP_NUMBER;

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!whatsappNumber) {
      return;
    }

    const message = [
      "Hello Deb Lucky Fashion Jewelries,",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  const displayPhoneNumber =
    !configuredWhatsAppNumber ||
    configuredWhatsAppNumber === PLACEHOLDER_WHATSAPP_NUMBER
      ? "+233 20 000 0000"
      : isValidWhatsAppNumber
        ? `+${configuredWhatsAppNumber}`
        : "+233 20 000 0000";

  return (
    <>
      <Navbar />

      <main className="contact-page">
        <header className="contact-heading">
          <p className="contact-eyebrow">We’re here to help</p>
          <h1>Let’s talk</h1>
          <p className="contact-intro">
            Questions about an order, a custom piece, or anything else? Send us
            a message and we’ll be happy to help.
          </p>
        </header>

        <div className="contact-layout">
          <aside className="contact-info" aria-label="Contact details">
            <div className="contact-info-heading">
              <span className="contact-info-kicker">Get in touch</span>
              <h2>Personal service, one message away.</h2>
              <p>
                We’d love to hear from you. Reach out about a piece, an order,
                or a little styling advice.
              </p>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <a href="mailto:hello@debluckyjewelries.com">
                hello@debluckyjewelries.com
              </a>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">Phone</span>
              <a href={`tel:${displayPhoneNumber.replace(/\s/g, "")}`}>
                {displayPhoneNumber}
              </a>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">Studio hours</span>
              <p>Mon–Fri, 9am–6pm</p>
            </div>
          </aside>

          <section className="contact-card" aria-labelledby="contact-form-title">
            <div className="contact-card-heading">
              <span className="contact-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M12 2.5a9.4 9.4 0 0 0-8 14.3L3 21l4.4-1.1A9.5 9.5 0 1 0 12 2.5Zm0 17a7.5 7.5 0 0 1-3.8-1l-.3-.2-2.6.7.7-2.5-.2-.3A7.5 7.5 0 1 1 12 19.5Zm4.1-5.6c-.2-.1-1.3-.7-1.5-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5.1a6.2 6.2 0 0 1-1.8-1.1 6.8 6.8 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.2.2-.4s0-.3 0-.4-.5-1.2-.7-1.7c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3 1.6 2.5 4 3.5c.5.2.9.3 1.2.4.5.2 1 .1 1.3.1.4-.1 1.3-.5 1.5-1s.2-.9.1-1-.2-.2-.4-.3Z" />
                </svg>
              </span>
              <div>
                <h2 id="contact-form-title">Message us on WhatsApp</h2>
                <p>Your message opens in WhatsApp, ready for you to send.</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Your name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  maxLength={200}
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </label>

              <label>
                How can we help?
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  maxLength={5000}
                  required
                />
              </label>

              {configuredWhatsAppNumber && !isValidWhatsAppNumber && (
                <p className="contact-config-error" role="alert">
                  WhatsApp chat is unavailable. Check the
                  VITE_WHATSAPP_NUMBER setting.
                </p>
              )}

              <button
                type="submit"
                className="contact-submit"
                disabled={!whatsappNumber}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.5a9.4 9.4 0 0 0-8 14.3L3 21l4.4-1.1A9.5 9.5 0 1 0 12 2.5Zm0 17a7.5 7.5 0 0 1-3.8-1l-.3-.2-2.6.7.7-2.5-.2-.3A7.5 7.5 0 1 1 12 19.5Zm4.1-5.6c-.2-.1-1.3-.7-1.5-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5.1a6.2 6.2 0 0 1-1.8-1.1 6.8 6.8 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.2.2-.4s0-.3 0-.4-.5-1.2-.7-1.7c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3 1.6 2.5 4 3.5c.5.2.9.3 1.2.4.5.2 1 .1 1.3.1.4-.1 1.3-.5 1.5-1s.2-.9.1-1-.2-.2-.4-.3Z" />
                </svg>
                Start a WhatsApp chat
              </button>
            </form>
            {!configuredWhatsAppNumber && (
              <p className="contact-placeholder-note">
                WhatsApp is using the setup placeholder number. Set the
                business number before launch.
              </p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default Contact;
