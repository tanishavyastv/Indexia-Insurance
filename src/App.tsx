import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import WhyIndexia from "./components/WhyIndexia";
import QuoteForm from "./components/QuoteForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <WhyIndexia />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
