// Function to get the status of the WeatherAPI monitor from UptimeRobot API
export const handler = async () => {
  const API_KEY = import.meta.env.UPTIME_ROBOT_API_KEY;
  const MONITOR_ID = "797784086"; // WeatherAPI monitor ID
  const url = `https://api.uptimerobot.com/v2/getMonitors`; // UptimeRobot API endpoint

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

    if (response.ok) {
      const monitorData = await response.json();
      const status =
        monitorData.monitors[0].status === 2 ? "Online" : "Offline"; // 2 is the status code for "up

      return {
        statusCode: 200,
        body: JSON.stringify({ status }),
      };
    }

    return {
      statusCode: response.status,
      body: JSON.stringify({ error: "Failed to fetch monitor status" }),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data" }),
    };
  }
};
