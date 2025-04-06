import RegisterImage from "@/assets/Pictures/RegisterImage.jpg";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-400 p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center">
        {/* Illustration Section */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src={RegisterImage}
            alt="Event Planning Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-4xl font-semibold text-center text-gray-700 mb-2">
            Plan<span className="text-purple-600 font-bold">Evnt</span>
          </h1>
          <h2 className="text-xl text-center text-gray-600 mb-8">Register</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Enter phone number..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Birthday */}
              <div className="flex flex-col">
                <label
                  htmlFor="birthday"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Birthday
                </label>
                <input
                  id="birthday"
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            {/* Checkbox Agreement */}
            <div className="flex items-center justify-center gap-2">
              <input
                id="terms"
                type="checkbox"
                className="accent-purple-500 w-4 h-4"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to all the{" "}
                <a href="#" className="text-purple-600 underline">
                  Private Policies
                </a>
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-full font-semibold transition"
            >
              Sign-up
            </button>

            <div className="text-center mt-4">
              <a href="/login" className="text-purple-600 hover:underline">
                Back to login page
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
