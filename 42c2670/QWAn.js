// get TESLA stock price of today & print it to console 
function getStockPrice() {
    var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=YOUR_API_KEY";
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    var data = JSON.parse(json);
    var price = data["Time Series (Daily)"]["2020-04-20"]["4. close"];
    console.log(price)
}

await getStockPrice()