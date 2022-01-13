const submitBtn = document.getElementById("submitBtn")
const day = document.querySelector(".day")
const date = document.querySelector(".date")
let city_name = document.getElementById("city_name")
let result = document.querySelector(".result")
let temp = document.querySelector(".temp")
let temp_logo = document.querySelector(".temp_logo")
let cityName = document.querySelector("#city")

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
    
        event.preventDefault();
        let cityVal = cityName.value;

        if(cityVal === "")
        {
            city_name.innerHTML=`Plz write name`;
            temp.classList.add("hide_data")
        }
        else
        {
          try{  
            
            let url  = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=5425a6ecab425f4758218a98974240b0`;
            
            // OpenWeather Api key is used
            const response = await fetch(url);
            const data = await response.json()
            const arrData = [data];
          
            
            result.innerHTML = `${arrData[0].main.temp}<sup>&deg;</sup>C`
            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`
            temp.classList.remove("hide_data")

            

            // Changing temp_logo , According to weather
            const status = arrData[0].weather[0].main;
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
                temp_logo.innerHTML = `<i 	class="fas fa-sun" style="color:yellow"></i>`
            }
         }
         catch(error){
            console.log(error)
            city_name.innerHTML= "Enter correct city name..";
            temp.classList.add("hide_data")
         }
        }
}


submitBtn.addEventListener("click", getWeather)

setDate();


