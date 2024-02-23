const UserData = (props) => {
  console.log(props);
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
  } = props.userData;

  // const { atheleteStats } = props.atheleteStats;

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Athelete Details */}
      <div className="bg-gray-100 w-4/5 h-3/5 rounded p-5 ">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold ml-4">
          Athelete Details
        </div>
        <div className=" rounded-lg p-4 shadow-md flex items-center space-x-56">
          <img
            src={profile}
            alt={"profile_img"}
            className="w-36 h-36 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {firstname} {lastname}
            </h2>
            <p className="mt-2 text-gray-600">Sex: {sex}</p>
            <p className="mt-2 text-gray-600">Stat: 30</p>
            <p className="mt-2 text-gray-600">City: {city}</p>
          </div>
        </div>
      </div>
      {/* Athelete Stats */}
      <div>
        <div className="bg-gray-100 w-4/5 h-3/5 rounded-lg p-5">
          <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold ml-4">
            Athelete Stats
          </div>
          {/* <div>
            <h3 className="text-md font-semibold mb-2">All Ride Totals</h3> */}
          {/* <ul className="list-disc pl-6">
              {Object.entries(athleteStats.all_ride_totals).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                )
              )}
            </ul>
          </div> */}
          {/* <div>
            <h3 className="text-md font-semibold mb-2">All Run Totals</h3>
            <ul className="list-disc pl-6">
              {Object.entries(athleteStats.all_run_totals).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">All Swim Totals</h3>
            <ul className="list-disc pl-6">
              {Object.entries(athleteStats.all_swim_totals).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                )
              )}
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default UserData;
