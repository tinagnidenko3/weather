if (new Date().getHours() > 20 || new Date().getHours() < 8) {
  document.body.style.backgroundImage = 'url(../img/night.jpg)'
} else{
  document.body.style.backgroundImage = 'url(../img/thumb_l_0689.jpg)'
}

window.addEventListener('keypress', (e)=>{
  if(e.key === 'Enter'){cityName()}
})
document.querySelector('.searchBtn').addEventListener('click', cityName)

function cityName(){
  const city = document.querySelector('.search input')
  if(city.value.length === 0){
    city.style.borderColor = 'red'
  }else{
    city.style.borderColor = 'cornsilk'
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&lang=ua&units=metric&appid=33a4edb2fe337fd387e632012d97d0de`
    weather(url)
  }
}

async function weather (url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    const city = document.querySelector('.search input')
    if(response.status === 404){
      city.style.borderColor = 'red'
    }else{
      city.style.borderColor = 'cornsilk'
    }
    main(data)
    newElementTable(data)
  } catch (error) {
    console.log(error);
  }
}

function main(data){
  document.getElementById('city').innerHTML = data.city.name
  document.getElementById('time').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  setInterval(()=>{
    document.getElementById('time').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  },1000)
  document.getElementById('dateWether').innerHTML = `погода на: ${data.list[0].dt_txt}`
  document.getElementById('generalPnj').src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`
  document.getElementById('weatherStan').innerHTML = data.list[0].weather[0].description
  document.getElementById('temp').innerHTML = `${parseInt(data.list[0].main.temp)}`
  document.getElementById('temFelt').innerHTML = `Відчувається як: ${data.list[0].main.temp}`
  document.getElementById('tempMax').innerHTML = `Mаксимальна: ${parseInt(data.list[0].main.temp_max)}`
  document.getElementById('tempMin').innerHTML = `Mінімальна: ${parseInt(data.list[0].main.temp_min)}`
  document.getElementById('humidity').innerHTML = `Вологісьть: ${data.list[0].main.humidity} %`
  document.getElementById('pressure').innerHTML = `Тиск: ${data.list[0].main.pressure} Па`
  document.getElementById('seaLevel').innerHTML = `Рівень моря: ${data.list[0].main.sea_level} м`
  document.getElementById('visibility').innerHTML = `Видимісьть: ${data.list[0].visibility} м`
}

function newElementTable(data) {
  const table = document.getElementById('allInformaition')
  data.list.forEach(item => {
    const {dt_txt, main, visibility, wind, weather} = item
    const {feels_like, humidity, pressure, sea_level, temp, temp_max, temp_min} = main
    const weatherDescription = weather[0].description
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    const rowHtml = `
    <td>${dt_txt}</td>
    <td>${parseInt(temp)} C&deg</td>
    <td>${parseInt(feels_like)} C&deg</td>
    <td>${parseInt(temp_max)} C&deg</td>
    <td>${parseInt(temp_min)} C&deg</td>
    <td>${visibility / 1000} км.</td>
    <td>${pressure} Па</td>
    <td>${wind.speed} м/с</td>
    <td>${humidity} %</td>
    <td>${sea_level} м.</td>
    <td>${weatherDescription}</td>
    <td><img src='${weatherIconUrl}'></td>
    `
    const row = document.createElement('tr')
    row.innerHTML = rowHtml
    table.appendChild(row)
  })
  document.querySelector('.search').style.display = 'none'
  document.querySelector('.weather').style.display = 'block'
}

document.getElementById('btnBack').addEventListener('click', ()=>{
  document.querySelector('.search').style.display = 'block'
  document.querySelector('.weather').style.display = 'none'
})