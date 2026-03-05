import "../App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Pure & Powerful Cleaning Solutions</h1>
          <p>
            Premium soaps and detergents that make your life cleaner and fresher.
          </p>
          <Link to="/products">
            <button>Explore Products</button>
          </Link>
        </div>
      </section>

      {/* Products Preview */}
      <section className="home-products">
        <h2>Our Best Sellers</h2>

        <div className="product-container">
          <div className="product-card">
            <h3>Laundry Detergent</h3>
            <p>Removes toughest stains instantly.</p>
          </div>

          <div className="product-card">
            <h3>Dish Wash Liquid</h3>
            <p>Powerful grease cutting formula.</p>
          </div>

          <div className="product-card">
            <h3>Herbal Bath Soap</h3>
            <p>Natural freshness with skin care.</p>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="why-section">
        <h2>Why Choose CleanFresh?</h2>
        <div className="why-grid">
          <div>✔ Affordable Pricing</div>
          <div>✔ Eco-Friendly Ingredients</div>
          <div>✔ Trusted by 10,000+ Customers</div>
        </div>
      </section>
    </>
  );
}

export default Home;