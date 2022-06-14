
let newsCard = document.getElementById('newsCard');  

let link = 'https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=18146180c1c547d9a865f6a250c79a71&pagesize=70';

const generalBtn = document.getElementById('general');
const businessBtn = document.getElementById('business');
const entertainmentBtn = document.getElementById('entertainment');
const healthBtn = document.getElementById('health');
const scienceBtn = document.getElementById('science');
const sportsBtn = document.getElementById('sports');
const techBtn = document.getElementById('technology');

generalBtn.addEventListener('click', ()=>{
    link = 'https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=18146180c1c547d9a865f6a250c79a71&pagesize=70';
    apiCall();
})

businessBtn.addEventListener('click', ()=>{
    link = 'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=18146180c1c547d9a865f6a250c79a71&pagesize=70';
    apiCall();
})

entertainmentBtn.addEventListener('click', ()=>{
    link = 'https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=18146180c1c547d9a865f6a250c79a71&pagesize=70';
    apiCall();
})

healthBtn.addEventListener('click', ()=>{
    link = 'https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=18146180c1c547d9a865f6a250c79a71&pagesize=70';
    apiCall();
})

scienceBtn.addEventListener('click', ()=>{
    link = 'https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=18146180c1c547d9a865f6a250c79a71&pagesize=70';
    apiCall();
})

sportsBtn.addEventListener('click', ()=>{
    link = 'https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=18146180c1c547d9a865f6a250c79a71&pagesize=70';
    apiCall();
})

techBtn.addEventListener('click', ()=>{
    link = 'https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=18146180c1c547d9a865f6a250c79a71&pagesize=70';
    apiCall();
})

//---------------------------------------------------News API Call----------------------------------------------------------------------------------//

const defaultDisc = "null! Sorry no discription is available for this article please click on the Read More button to get the full news."

apiCall = async ()=>{
    let data = await fetch(link);
    let parsedData  = await data.json();
    console.log(parsedData);

    let articlesArray = parsedData.articles;
    console.log(articlesArray);

    let newsHtml = " ";
  //    background: #007bff;
  //    height: 43px;
    articlesArray.forEach((element) => {
        
        let news = `<div class="col-md-4">
                        <img class="card-img-top" src=${element.urlToImage} alt="default.jpg" onerror="this.src='default.jpg'">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.description?element.description.substring(0,88):defaultDisc}</p>
                            <a href="${element['url']}" class="btn btn-primary" target="_blank">Read More</a>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Updated on ${new Date(element.publishedAt).toGMTString()}</small>
                            <hr>
                      </div>
                    </div>`
                    
        newsHtml += news  // insert news iteams in newsHtml            
    });
    newsCard.innerHTML = newsHtml;  // setting the innerHTML of newsCard with newsHtml.

    let title = document.getElementById('title');
    title.innerHTML = `NewsTimes-Top Headlines(${parsedData.totalResults})`;
}
apiCall();

//--------------------------------------------------------------------------------------------------------------------------------------//

//-------------------------------------------Making navbar as sticky---------------------------------------------------------------------//
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar i.e coordinate of the navbar from the top
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
//--------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------Getting location using geolocation services-----------------------------------------------------------------//

navigator.geolocation.getCurrentPosition((position) =>{
    // console.log("position", position.coords.latitude);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    apiCallForLocation(latitude, longitude);
})
//----------------------------------------------------------------------------------------------------------------------------------------//

//---------------------------Making Api Call to openweathermap to get the Temp, location etc---------------------------------------------//

apiCallForLocation = async (latitude, longitude)=>{

    link = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1c4f4fd6d2e6c2ac1d0aa41c3ff8d213`;

    let data = await fetch(link);
    let parsedData  = await data.json();
    // console.log("loc api res: ", parsedData);

    let timeZne = document.getElementById('timeZone');
    console.log(parsedData);
    let tempInCelsius = (parsedData.main.temp - 273.15).toFixed(2);   // api giving us the temp in kelvin so you need to convert and toFixed is func to limit decimal places.
    timeZne.innerHTML = parsedData.name + " " + tempInCelsius + '॰C';
}
//----------------------------------------------------------------------------------------------------------------------------------------//


