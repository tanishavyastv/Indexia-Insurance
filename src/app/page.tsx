import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyIndexia from "@/components/WhyIndexia";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <WhyIndexia />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
