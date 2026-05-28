import axios from "axios";

export async function getUserCountry() {
  // Check if the country data is cached and valid
  const cachedData = getItem("userCountry");
  const cacheTimestamp = getItem("userCountryTimestamp");
  const cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

//   if (
//     cachedData &&
//     cacheTimestamp &&
//     Date.now() - cacheTimestamp < cacheExpiration
//   ) {

//     return cachedData; // Return cached country data
//   }

  try {
    // Fetch country from the API if no valid cache exists
    const response = await axios.get("https://get.geojs.io/v1/ip/country");
    const country = response.data.trim();

    // Cache the fetched data and timestamp
    setItem("userCountry", country);
    setItem("userCountryTimestamp", Date.now().toString());


    return country;
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
}
