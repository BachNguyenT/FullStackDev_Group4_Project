function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-100 bg-gradient-to-b from-purple-900 to-purple-400 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold mb-8 text-yellow-300 text-center border-b-2 border-yellow-300 pb-2">Privacy Policy</h1>
      <p className="mb-8 text-lg leading-relaxed bg-purple-800 bg-opacity-50 p-4 rounded-md shadow-inner">
        Welcome to our Privacy Policy! This document explains how we collect, use, and protect your personal information while you explore our web application, crafted with care as part of the COSC2769/COSC2808 Full Stack Development course at RMIT University.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-yellow-200 flex items-center">
            <span className="bg-yellow-300 text-purple-900 rounded-full w-8 h-8 flex items-center justify-center mr-2">1</span>
            Information We Collect
          </h2>
          <ul className="list-none mb-6 text-gray-100 space-y-3 border-l-4 border-yellow-300 pl-4">
            <li><span className="font-semibold text-yellow-300">Account Information:</span> Your username, email address, and password — the keys to your personal space.</li>
            <li><span className="font-semibold text-yellow-300">Usage Data:</span> How you interact with our app, like the pages you visit and features you love.</li>
            <li><span className="font-semibold text-yellow-300">Technical Information:</span> Details like your IP address, browser type, and device — the techy stuff that keeps things running smoothly.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3 text-yellow-200 flex items-center">
            <span className="bg-yellow-300 text-purple-900 rounded-full w-8 h-8 flex items-center justify-center mr-2">3</span>
            Information Sharing
          </h2>
          <p className="mb-6 leading-relaxed bg-purple-800 bg-opacity-50 p-4 rounded-md shadow-inner">
            Your privacy matters to us! We don’t share your personal information with third parties. Everything we collect stays within our project team, used solely for educational purposes and to showcase our work.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3 text-yellow-200 flex items-center">
            <span className="bg-yellow-300 text-purple-900 rounded-full w-8 h-8 flex items-center justify-center mr-2">5</span>
            Your Rights
          </h2>
          <p className="mb-6 leading-relaxed bg-purple-800 bg-opacity-50 p-4 rounded-md shadow-inner">
            You’re in control! At any time, you can view, update, or delete your personal data — just reach out to us through the app, and we’ll make it happen.
          </p>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-yellow-200 flex items-center">
            <span className="bg-yellow-300 text-purple-900 rounded-full w-8 h-8 flex items-center justify-center mr-2">2</span>
            How We Use Your Information
          </h2>
          <p className="mb-4 text-gray-100 leading-relaxed">
            We put your data to work in exciting ways to make your experience unforgettable:
          </p>
          <ul className="list-none mb-6 text-gray-100 space-y-3 border-r-4 border-yellow-300 pr-4">
            <li><span className="text-yellow-300 font-semibold">Powering Your Journey:</span> We use it to deliver a smooth, reliable service that keeps you coming back.</li>
            <li><span className="text-yellow-300 font-semibold">Leveling Up:</span> Your interactions help us tweak and tune the app, creating a personalized adventure just for you.</li>
            <li><span className="text-yellow-300 font-semibold">Guarding the Gates:</span> We leverage this info to lock down security, ensuring our app stays a safe and trusted space.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3 text-yellow-200 flex items-center">
            <span className="bg-yellow-300 text-purple-900 rounded-full w-8 h-8 flex items-center justify-center mr-2">4</span>
            Data Security
          </h2>
          <p className="mb-6 leading-relaxed bg-purple-800 bg-opacity-50 p-4 rounded-md shadow-inner">
            We’re committed to keeping your data safe with reasonable protections against unauthorized access. That said, no online system is foolproof, but we’ve got your back with our best efforts!
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3 text-yellow-200 flex items-center">
            <span className="bg-yellow-300 text-purple-900 rounded-full w-8 h-8 flex items-center justify-center mr-2">6</span>
            Contact Us
          </h2>
          <p className="mb-6 leading-relaxed bg-purple-800 bg-opacity-50 p-4 rounded-md shadow-inner">
            Got questions? We’d love to hear from you! Connect with our project team via the app’s contact form or support email — we’re here to help.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-yellow-200 text-center">Terms of Commitment and Application</h2>
      <p className="mb-8 leading-relaxed bg-purple-800 bg-opacity-50 p-4 rounded-md shadow-inner text-center">
        Our website’s rules evolve over time to keep things fresh and fair. By joining us, you agree to follow the latest guidelines as you learn and explore our platform — no prior notice needed!
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-yellow-200 text-center">Official Contact Information</h2>
      <ul className="list-none mb-8 text-gray-100 space-y-3 bg-purple-800 bg-opacity-50 p-4 rounded-md shadow-inner">
        <li><strong className="text-yellow-300">Company/Organization:</strong> Team 4 - Vai Gay Team</li>
        <li><strong className="text-yellow-300">Address:</strong> The Riverside Residence Block A - Phu My Hung, District 7, Ho Chi Minh, Vietnam</li>
        <li><strong className="text-yellow-300">Email:</strong> s3998350@rmit.edu.vn</li>
        <li><strong className="text-yellow-300">Phone Number:</strong> 02837761300</li>
      </ul>

      <p className="text-sm text-gray-300 text-center">Last updated: April 2025</p>
    </div>
  );
}

export default PrivacyPolicy;