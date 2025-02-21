import HeroSection from '../components/Home/Hero';
import Navbar from '../components/Navbar';
import CollaborativeSection from '../components/Home/CollaborativeSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f9eb]">
      <Navbar />
      <div className="space-y-0">
        <HeroSection />
        <CollaborativeSection />
      </div>
    </div>
  );
};

export default Home;