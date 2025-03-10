export async function fetchStockData(symbol) {
  if (!symbol) {
    throw new Error("Symbol is required");
  }

  // You can use your own API key here or use an environment variable
  const API_KEY = "SVW81TULKPLE7IFZ"; // Replace with your Alpha Vantage API key or use process.env
  const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data["Error Message"]) {
      throw new Error(data["Error Message"]);
    }

    const timeSeries = data["Time Series (Daily)"];
    if (!timeSeries) {
      throw new Error("No data available for this symbol");
    }
    
    const formattedData = Object.entries(timeSeries)
      .map(([date, values]) => ({
        date,
        price: Number(values["4. close"]), // Extract closing price
      }))
      .slice(0, 30); // Get last 30 days of data

    return formattedData;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
}