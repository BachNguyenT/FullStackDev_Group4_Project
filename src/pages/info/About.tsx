function About() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-100 bg-gradient-to-b from-purple-900 to-purple-400 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold mb-8 text-yellow-300 text-center border-b-2 border-yellow-300 pb-2">
        About Us - Vai Gay Team - Group 4
      </h1>

      {/* Special Introduction */}
      <p className="mb-8 text-lg leading-relaxed bg-purple-800 bg-opacity-50 p-6 rounded-md shadow-inner text-center">
        Welcome to the world of the{" "}
        <span className="font-bold text-yellow-300">Vai Gay Team</span>! We’re a
        dynamic crew of five dreamers and doers from RMIT University Vietnam,
        united by a love for innovation and a knack for turning ideas into
        reality. With a splash of creativity and a whole lot of hustle, we’re
        here to build digital experiences that dazzle, delight, and make
        waves—because when we team up, there’s no limit to what we can create!
      </p>

      {/* Team Members */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-yellow-200 text-center">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="bg-purple-800 bg-opacity-70 p-4 rounded-md shadow-inner">
            <p className="text-yellow-300 font-semibold">Vu Van Tuan</p>
            <p>
              <a
                href="mailto:s4040269@rmit.edu.vn"
                className="text-gray-200 hover:text-yellow-300 underline transition-colors duration-200"
              >
                s4040269@rmit.edu.vn
              </a>
            </p>
            <p className="text-sm italic text-gray-300">Backend Developer</p>
          </div>
          <div className="bg-purple-800 bg-opacity-70 p-4 rounded-md shadow-inner">
            <p className="text-yellow-300 font-semibold">Tran Thanh Lam</p>
            <p>
              <a
                href="mailto:s4038329@rmit.edu.vn"
                className="text-gray-200 hover:text-yellow-300 underline transition-colors duration-200"
              >
                s4038329@rmit.edu.vn
              </a>
            </p>
            <p className="text-sm italic text-gray-300">Frontend Developer</p>
          </div>
          <div className="bg-purple-800 bg-opacity-70 p-4 rounded-md shadow-inner">
            <p className="text-yellow-300 font-semibold">Do Phan Viet Anh</p>
            <p>
              <a
                href="mailto:s4063835@rmit.edu.vn"
                className="text-gray-200 hover:text-yellow-300 underline transition-colors duration-200"
              >
                s4063835@rmit.edu.vn
              </a>
            </p>
            <p className="text-sm italic text-gray-300">Frontend Developer</p>
          </div>
        </div>
        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-purple-800 bg-opacity-70 p-4 rounded-md shadow-inner">
            <p className="text-yellow-300 font-semibold">Ngo Hoang Viet</p>
            <p>
              <a
                href="mailto:s3998350@rmit.edu.vn"
                className="text-gray-200 hover:text-yellow-300 underline transition-colors duration-200"
              >
                s3998350@rmit.edu.vn
              </a>
            </p>
            <p className="text-sm italic text-gray-300">Backend Developer</p>
          </div>
          <div className="bg-purple-800 bg-opacity-70 p-4 rounded-md shadow-inner">
            <div className="flex items-center">
              <p className="text-yellow-300 font-semibold">Nguyen Trong Bach</p>
            </div>
            <p>
              <a
                href="mailto:s4044878@rmit.edu.vn"
                className="text-gray-200 hover:text-yellow-300 underline transition-colors duration-200"
              >
                s4044878@rmit.edu.vn
              </a>
            </p>
            <p className="text-sm italic text-gray-300">Project Leader</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 text-center mt-8">
        Fueled by passion and purple vibes - Vai Gay Team, 2025
      </p>
    </div>
  );
}

export default About;
