// Function to get the status of the WeatherAPI monitor from UptimeRobot API
export const handler = async () => {
  const API_KEY = process.env.UPTIME_ROBOT_API_KEY;
  const MONITOR_ID = "797784086"; // WeatherAPI monitor ID
  const url = `https://api.uptimerobot.com/v2/getMonitors`; // UptimeRobot API endpoint

  console.log("API_KEY:", API_KEY);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: API_KEY,
        format: "json",
        monitors: MONITOR_ID,
      }),
    });

    console.log("Response status:", response.status);

    if (response.ok) {
      const monitorData = await response.json();
      console.log("Monitor data:", monitorData);

      const status =
        monitorData.monitors[0].status === 2 ? "Online" : "Offline"; // 2 is the status code for "up"
      const color = status === "Online" ? "#97c40e" : "#cc573f";

      return {
        statusCode: 200,
        body: JSON.stringify({
          schemaVersion: 1,
          label: "API Status",
          message: status,
          color: color,
        }),
      };
    }

    return {
      statusCode: response.status,
      body: JSON.stringify({ error: "Failed to fetch monitor status" }),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data" }),
    };
  }
};
