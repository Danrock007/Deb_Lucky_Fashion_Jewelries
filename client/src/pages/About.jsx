import Navbar from "../components/Navbar";
import "./About.css";

const VALUES = [
  {
    title: "Handcrafted",
    description: "Every piece is shaped, set, and polished by hand in our studio, not mass-produced.",
  },
  {
    title: "Responsibly Sourced",
    description: "Our stones and metals are sourced from suppliers who meet strict ethical standards.",
  },
  {
    title: "Made to Last",
    description: "We build jewelry as an heirloom first, a trend second.",
  },
];

function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <h1>Our Story</h1>
          <p>
            Deb Lucky Fashion Jewelries began as a small studio with one simple belief:
            fine jewelry should feel personal. What started as one jeweler's craft has
            grown into a collection built for people who want pieces that last —
            not just for a season, but for a lifetime.
          </p>
        </section>

        <section className="about-values">
          {VALUES.map((value) => (
            <div key={value.title} className="about-value-card">
              <h2>{value.title}</h2>
              <p>{value.description}</p>
            </div>
          ))}
        </section>

        <section className="about-closing">
          <h2>Crafted With Care</h2>
          <p>
            From the first sketch to the final polish, every piece passes through the
            hands of our artisans before it reaches you. We think that care is worth
            preserving, even as we grow.
          </p>
        </section>
      </main>
    </>
  );
}

export default About;