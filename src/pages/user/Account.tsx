function Account() {
  return (
    <div>
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Account</h2>
      {/* Account Information */}
      <div>

        {/* Avatar */}
        <div>

        </div>
        {/* Text Information */}
        {/* <div className="flex justify-between items-center mb-4">
          <div>
            <div>
              <label htmlFor="name" className="block mb-2 font-light text-base">
                Name:
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                value={name}
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
              />
            </div>
            <div>
              <label htmlFor="date" className="block mb-2 font-light text-base">
                Date & Time:
              </label>
              <input
                id="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                value={date}
                type="datetime-local"
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
              />
            </div>
            <div>
              <label htmlFor="venue" className="block mb-2 font-light text-base">
                Venue:
              </label>
              <input
                onChange={(e) => {
                  setVenue(e.target.value);
                }}
                id="venue"
                value={venue}
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
              />
            </div>
          </div>
          <div>
            <div>
              <label
                className="block mb-2 font-light text-base"
                htmlFor="eventType"
              >
                Event Type:
              </label>
              <select
                id="eventType"
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full  font-light text-sm"
                onChange={(e) => {
                  setEventType(e.target.value);
                }}
                value={eventType}
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block mb-2 font-light text-base"
              >
                Duration
              </label>
              <div className="flex items-center mb-4">
                <input
                  onChange={(e) => {
                    setDuration(parseInt(e.target.value));
                  }}
                  id="duration"
                  value={duration}
                  type="number"
                  className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full  font-light text-sm"
                />
                <select
                  className="border-2 border-gray-300 rounded-md p-2 mb-4 w-24 font-light text-sm ml-2"
                  onChange={(e) => {
                    setDurationUnit(e.target.value);
                  }}
                  value={durationUnit}
                >
                  {durationUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-light text-base" htmlFor="image">
                Image:
              </label>
              <input
                id="image"
                onChange={(e) => previewImage(e)}
                type="file"
                accept="image/*"
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
              />
            </div>
          </div>
          <div className="bg-gray-100 w-1/3 h-70 flex justify-center items-center">
            {" "}
            
            <img
              src={typeof image === "string" ? image : undefined}
              alt="Preview Image"
              className="h-full w-full object-cover text-center rounded-md"
            />
          </div>
        </div>*/}
      </div>
    </div>
  );
}
export default Account;