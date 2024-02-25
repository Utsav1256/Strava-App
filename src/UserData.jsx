const UserData = (props) => {
  console.log(props);

  const { userData, athleteStats } = props;
  const {
    firstname,
    lastname,
    bio,
    sex,
    city,
    countryweight,
    username,
    profile,
    resource_state,
    weight,
    country,
    state,
  } = userData;

  console.log("athleteStats", athleteStats);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      {/* Athelete Details */}
      <div className="bg-gray-100 w-full md:w-4/5 h-auto md:h-3/5 rounded p-5 mt-5">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold ml-4">
          Athelete Details
        </div>
        <div className="rounded-lg p-4 shadow-md flex flex-col md:flex-row items-center md:space-x-6">
          <img
            src={profile}
            alt={"profile_img"}
            className="w-36 h-36 rounded-full object-cover mb-4 md:mb-0 md:w-48 md:h-48"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {firstname} {lastname}
            </h2>
            <p className="mt-2 text-gray-600">
              Username: {username ? username : "Not available"}
            </p>
            <p className="mt-2 text-gray-600">Sex: {sex}</p>
            <p className="mt-2 text-gray-600">
              Weight: {weight ? weight : "Not Available"}
            </p>
            <p className="mt-2 text-gray-600">
              Location: {city}
              {", "} {state}
              {", "} {country}{" "}
            </p>
          </div>
        </div>
      </div>
      {/* Athelete Stats */}
      <div className="bg-gray-100 w-full md:w-4/5 h-auto md:h-3/5 rounded p-5 mt-5">
        <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold ml-4 mb-4">
          Athelete Stats
        </div>
        {athleteStats ? (
          <>
            <div className="flex  justify-evenly">
              <div className="ml-6 flex flex-col gap-10">
                <div>
                  <h3 className="text-md font-semibold mb-2">
                    All Ride Totals
                  </h3>
                  <ul className="list-disc pl-6">
                    {Object.entries(athleteStats?.all_ride_totals).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-md font-semibold mb-2">All Run Totals</h3>
                  <ul className="list-disc pl-6">
                    {Object.entries(athleteStats?.all_run_totals).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-md font-semibold mb-2">
                    All Swim Totals
                  </h3>
                  <ul className="list-disc pl-6">
                    {Object.entries(athleteStats?.all_swim_totals).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>{" "}
              </div>
              <div className="">
                <div className="ml-6 flex flex-col gap-4">
                  <div>
                    <h3 className="text-md font-semibold mb-2">
                      Recent Ride Totals
                    </h3>
                    <ul className="list-disc pl-6">
                      {Object.entries(athleteStats?.recent_ride_totals).map(
                        ([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold mb-2">
                      Recent Run Totals
                    </h3>
                    <ul className="list-disc pl-6">
                      {Object.entries(athleteStats?.recent_run_totals).map(
                        ([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold mb-2">
                      Recent Swim Totals
                    </h3>
                    <ul className="list-disc pl-6">
                      {Object.entries(athleteStats?.recent_swim_totals).map(
                        ([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>{" "}
                </div>
              </div>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
};
export default UserData;
