const submitBtn = document.getElementById("submitBtn")
const day = document.querySelector(".day")
const date = document.querySelector(".date")
const city_name = document.querySelector("#city_name")
let result = document.querySelector(".result")
let temp = document.querySelector(".temp")
let temp_logo = document.querySelector(".temp_logo")

// this function will set todays date and month.
let setDate = ()=>{
    let dt = new Date();

    let weekArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    day.innerHTML= `${weekArray[dt.getDay()]}`
    date.innerHTML = `${dt.getDate()} ${monthArray[dt.getMonth()]}`
} 

// This function will fetch & display temperature.
const getWeather = async(event)=>{
    try{
        event.preventDefault();

        let city = document.querySelector("#city").value;
        
        // OpenWeather Api key is used
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5425a6ecab425f4758218a98974240b0`);
        data = await data.json()

        result.innerHTML = `${data.main.temp}<sup>&deg;</sup>C`
        city_name.innerHTML = `${data.name},${data.sys.country}`
        temp.classList.remove("hide_data")

        // console.log(data);
        
        // Changing temp_logo , According to weather
        let status = data.weather[0].main;
        console.log(status);
        if(status=="Clouds")
        {
            temp_logo.innerHTML = `<i 	class="fas fa-cloud" style="color:white"></i>`
        }
        else if(status=="Clear")
        {
            temp_logo.innerHTML = `<i 	class="fas fa-sun" style="color:yellow"></i>`
        }
        else if(status=="Rain")
        {
            temp_logo.innerHTML = `<i 	class="fas fa-cloud-rain" style="color:white"></i>`
        }
        else{
            temp_logo.innerHTML = `<i 	class="fas fa-cloud" style="color:white"></i>`
        }

    }
    catch(error){
        city_name.innerHTML= "Enter correct city name..";
        temp.classList.add("hide_data")
    }
}


submitBtn.addEventListener("click", getWeather)

setDate();


