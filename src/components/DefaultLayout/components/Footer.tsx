import { Button } from "@/components/ui/components/Button";

function Footer() {
  return (
    <footer className="w-full p-8 text-gray-100 bg-gradient-to-t from-purple-900 to-purple-400 shadow-lg">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Section - About the Team */}
        <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">
            Vai Gay Team
          </h3>
          <p className="text-sm leading-relaxed">
            We’re a passionate crew from RMIT University Vietnam, dedicated to
            crafting digital experiences that inspire and innovate. Let’s make
            the web a more vibrant place, together!
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">
            Explore
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Button
              to="/about"
              variant="link"
              size="sm"
              className="text-gray-100 hover:text-yellow-300 p-0 text-left"
            >
              About Us
            </Button>
            <Button
              to="/services"
              variant="link"
              size="sm"
              className="text-gray-100 hover:text-yellow-300 p-0 text-left"
            >
              Our Services
            </Button>
            <Button
              to="/terms"
              variant="link"
              size="sm"
              className="text-gray-100 hover:text-yellow-300 p-0 text-left"
            >
              Privacy Policy
            </Button>
            <Button
              to="/contact"
              variant="link"
              size="sm"
              className="text-gray-100 hover:text-yellow-300 p-0 text-left"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Right Section - Contact Info */}
        <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">
            Stay Connected
          </h3>
          <p className="text-sm">Have a question or idea? Reach out to us!</p>
          <p className="text-sm mt-2">
            <a
              href="mailto:support@vaigayteam.com"
              className="hover:text-yellow-300 transition-colors duration-200 underline"
            >
              support@vaigayteam.com
            </a>
          </p>
          <p className="text-sm mt-2">Ho Chi Minh City, Vietnam</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm text-gray-300 border-t border-purple-700 pt-4">
        <p>
          © 2025 Vai Gay Team | Powered by creativity and purple vibes | Made
          with <span className="text-yellow-300">✨</span> in Vietnam
        </p>
      </div>
    </footer>
  );
}

export default Footer;
