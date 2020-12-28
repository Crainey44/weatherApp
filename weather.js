const btnWeather = document.getElementById("btnWeather");
const txtCity = document.getElementById("txtCity");
const resultOut = document.getElementById("result");
const key = "e037f1c3aa9c882f329e8dff5c72d3fd";


btnWeather.onclick = function (){
    const city = txtCity.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?id={city ID}&appid=${key}`;
    console.log(url);
    fetch(url).then(response => {
    response.json().then(json => {
        let data = json;
        console.log(data);
        //store data;
        let output = formatResponse(data);
        resultOut.innerHTML = output;
        });
    });
}

function kelvinToFahrenheit(kTemp){
    const fTemp = kTemp * (9/5) - 459.67;
    return fTemp;
}

function msToMPH(ms){
    return ms * 2.237;
}

function formatResponse(data){
    let conditions = "";
    if(data.weather.length>1){
        for(var i = 0; i < data.weather.length; i++ ){
            conditions += data.weather[i].main;
            if (i != (data.weather.length -1)) {
                conditions += " and ";
            }
        }
    } else {
        conditions += data.weather[0].main;
    }

let out = `<p><strong>Current Conditions for ${data.name}</strong></p>
<p><strong>Temperature:</strong> ${Math.round(kelvinToFahrenheit(data.main.temp))}F<br/>
<p><strong>Humidity:</strong> ${data.main.humidity}%,br/>
<p><strong>Wind:</strong> ${data.wind.deg} degrees at ${Math.round(msToMPH(data.wind.speed))} MPH<br/>
<p>${conditions}</p>`;
return(out);
        }
