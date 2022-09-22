const button = document.getElementById("button");
const input = document.getElementById("input");

input.addEventListener("keypress", function(event) {
  if (event.key === 'Enter'){
    button.click();
  }
  
});


const loadWeater = () => {
    const input = document.getElementById('input');
    const inputValue = input.value;
    input.value = '';   
    const API = `86fa47db6bff7d0e3dcb0a0e48bab328`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${API}`
    fetch(url)
    .then(res => res.json())
    .then(data => showWeather(data))

    const showWeather = (weather) => {
        console.log(weather);
       const displayWeather = document.getElementById('weather')
       displayWeather.textContent= '';
       const div = document.createElement('div')

       div.classList.add('car');
    // ------------------------- SunRise here 
       var sec = weather.sys.sunrise;
       var date1 = new Date(sec * 1000);
       var timestr1 = date1.toLocaleTimeString();
	   console.log(date1);

       //var timestr = date.toLocaleTimeString();
    // ------------------------------   SunSet 
        var sec = weather.sys.sunset;
        var date = new Date(sec * 1000);
        var timestr2 = date.toLocaleTimeString();
        //----------------------- date 
        var sec = weather.dt;
        var date = new Date(sec * 1000);
        var time = date.toLocaleTimeString();
        // ---------------visibility 
        var sec = weather.visibility;
        var visibility = sec/1000


       div.innerHTML = `
       <h4 class="text-center text-white mt-5" >${weather.weather[0].description}</h4>
       <h1 class="name text-center text-white mt-2">${weather.name}</h1>
        <h4 class="text-center text-white mt-2" >${weather.main.temp}°C</h4>
        <div class="container h-50 mt-0 mp-0 text-white ">
        <div class="row ">
          <div id="Fcol" class="col">
            <ul class="ul">
            <li><h6>Feels Like</h6></li>
            <li><h4>${weather.main.feels_like}</h4></li>
            <li><h6>Min-Temp</h6></li>
            <li><h4>${weather.main.temp_min}</h4></li>
            <li><h6>Sunrise</h6></li>
            <li><h4>${timestr1}</h4></li>
            <li><h6>Sunset</h6></li>
            <li><h4>${timestr2}</h4></li>
            </ul>
          </div>
          <div id="Lcol" class="col">
            <ul class="ul">
            <li><h6>Country</h6></li>
            <li><h4>${weather.sys.country}</h4></li>
            <li><h6>Local Time</h6></li>
            <li><h4>${time}</h4></li>
            <li><h6>Visibility</h6></li>
            <li><h4>${weather.main.humidity}°C</h4></li>
            <li><h6>Wind</h6></li>
            <li><h4>Speed ${weather.wind.speed}</h4></li>
            </ul>
          </div>
        </div>
     </div>
        
        `
        displayWeather.appendChild(div)
    }
}


"use strict";

var inputCalculatior = document.getElementById('inputCalculatior'), // input/output button
  number = document.querySelectorAll('.numbers button'), // number buttons
  operator = document.querySelectorAll('.operators button'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = inputCalculatior.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      inputCalculatior.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // if result is currently displayed and user pressed an operator
      // we need to keep on adding to the string for next operation
      resultDisplayed = false;
      inputCalculatior.innerHTML += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      inputCalculatior.innerHTML = "";
      inputCalculatior.innerHTML += e.target.innerHTML;
    }

  });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // storing current input string and its last character in variables - used later
    var currentString = inputCalculatior.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      inputCalculatior.innerHTML = newString;
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a number first");
    } else {
      // else just add the operator pressed to the input
      inputCalculatior.innerHTML += e.target.innerHTML;
    }

  });
}

// on click of 'equal' button
result.addEventListener("click", function() {

  // this is the string that we will be processing eg. -10+26+33-56*34/23
  var inputString = inputCalculatior.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  inputCalculatior.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
  inputCalculatior.innerHTML = "";
})