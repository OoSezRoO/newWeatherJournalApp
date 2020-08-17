/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() +1 + '.' + d.getDate()+ '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apikey = '&appid=9587dd825880b491bf30f95eab2d333b';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', clickResult);

/* Function called by event listener */
function clickResult(e){
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

getWeather(baseURL , zipCode , apikey)
  .then(function(data){
    postData('/postData', {
      date:newDate ,
      temp : data.list[0].main.temp,
      content : feelings})
      updateUI()
    })
}

/* Function to GET Web API Data*/

const getWeather = async (baseURL , zip , key)=> {
  const res = await fetch(baseURL+zip+key)
    try{
      const data = await res.json();
      return data;
    }catch(error) {
      console.log("error" ,error);
    }
}

/* Function to POST data */

const postData = async(url='' , data={}) =>{
  const response = await fetch(url ,{
    method:'post',
    credentials:'same-origin',
    headers: {
      'content-type' : 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  }catch(error){
    console.log("error",error);
  }
}

/* Function to GET Project Data */
const updateUI = async() => {
  const request = await fetch('/getData');
  try{
    const getData = await request.json();
    document.getElementById('date').innerHTML= getData.date;
    document.getElementById('temp').innerHTML= getData.temp;
    document.getElementById('content').innerHTML= getData.content;
  }catch(error){
    console.log("error",error);
  }
}
