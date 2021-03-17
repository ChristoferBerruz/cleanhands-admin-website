import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";

const HomeContent: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-body">
        <p className="title">Cleanhands</p>
        <p className="subtitle">Hero subtitle</p>
      </div>
    </div>
  );
};
const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HomeContent />
      <Footer />
    </>
  );
};

export default Home;
