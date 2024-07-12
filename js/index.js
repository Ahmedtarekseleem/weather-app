let countryLocation = document.getElementById("countryLocation")
let todayDegree = document.getElementById("todayDegree")
let todayImag = document.getElementById("todayImag")
let conditionToday = document.querySelector("p.condition-today")
let windSpeed = document.querySelector(".windSpeed")
let compass = document.querySelector(".compass")
let humidity = document.getElementById("humidity")
let conditionText2=document.getElementById("conditionText2")
let img2=document.querySelector(".img2")
let maxtemp2=document.querySelector(".maxtemp2")
let mintemp=document.querySelector(".mintemp")
let conditionText3=document.getElementById("conditionText3")
let img3=document.querySelector(".img3")
let maxtemp3=document.querySelector(".maxtemp3")
let mintemp3=document.querySelector(".mintemp3")
let dayName=document.querySelector(".dayName")
let daynum=document.querySelector(".daynum")
let day2=document.querySelector(".day2")
let day3=document.querySelector(".day3")
let searchInput=document.querySelector(".searchInput")








// fetch API
async function getWeather(url) {
    let WeatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d0b4924e581041cfaee165808241107&q=${url}&days=3`)
    let result = await WeatherData.json()
    console.log(result);
    return result;
}

//  display Today data

// let h="innerHTML";
function displayTodayData(todayData) {
    let today1= new Date(todayData.forecast.forecastday[0].date)
    
    daynum.innerHTML=today1.getDate()+today1.toLocaleDateString("en-US",{month:"long"})
    dayName.innerHTML=today1.toLocaleDateString("en-US",{weekday:"long"})
    countryLocation.innerHTML = todayData.location.name;
    todayDegree.innerHTML = todayData.current.temp_c
    todayImag.setAttribute("src", "https:" + todayData.current.condition.icon)
    conditionToday.innerHTML = todayData.current.condition.text
    humidity.innerHTML = todayData.current.humidity
    windSpeed.innerHTML = todayData.current.wind_kph
    compass.innerHTML = todayData.current.wind_dir

}

function tomorrow(data){
    let today1= new Date(data.forecast.forecastday[1].date)
    day2.innerHTML=today1.toLocaleDateString("en-US",{weekday:"long"})
    conditionText2.innerHTML=data.forecast.forecastday[1].day.condition.text
    img2.setAttribute("src","https:"+data.forecast.forecastday[1].day.condition.icon)
    maxtemp2.innerHTML=data.forecast.forecastday[1].day.maxtemp_c
    mintemp.innerHTML=data.forecast.forecastday[1].day.mintemp_c
}
function nextTomorrow(data){
    let today1= new Date(data.forecast.forecastday[2].date)
    day3.innerHTML=today1.toLocaleDateString("en-US",{weekday:"long"})
    conditionText3.innerHTML=data.forecast.forecastday[2].day.condition.text
    img3.setAttribute("src","https:"+data.forecast.forecastday[2].day.condition.icon)
    maxtemp3.innerHTML=data.forecast.forecastday[2].day.maxtemp_c
    mintemp3.innerHTML=data.forecast.forecastday[2].day.mintemp_c
}


async function startApp(dt="cairo") {
    let weatherData = await getWeather(dt)
    if(!weatherData.error){

        displayTodayData(weatherData)
        tomorrow(weatherData)
        nextTomorrow(weatherData)
    }
}
startApp()

searchInput.addEventListener("input", function (){
    startApp(searchInput.value)
    
})