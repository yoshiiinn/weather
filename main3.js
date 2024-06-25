const api = 'https://api.open-meteo.com/v1/forecast?latitude=35.7&longitude=139.6875&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FTokyo';

function getData() {
    fetch(api)
        .then(response => response.json())
        .then(data => makePage(data));
}
getData();
setInterval(getData, 1000 * 60 * 60);

function makePage(data) {
    setData('day0', dateFormat(data.daily.time[0]));
    setData('day1', dateFormat(data.daily.time[1]));

    setData('weathercode0', getWMO(data.daily.weather_code[0]));
    setData('weathercode1', getWMO(data.daily.weather_code[1]));

    setData('temperature_max0', data.daily.temperature_2m_max[0] + '℃');
    setData('temperature_max1', data.daily.temperature_2m_max[1] + '℃');

    setData('temperature_min0', data.daily.temperature_2m_min[0] + '℃');
    setData('temperature_min1', data.daily.temperature_2m_min[1] + '℃');

    setData('precipitation_sum0', data.daily.precipitation_sum[0] + 'mm');
    setData('precipitation_sum1', data.daily.precipitation_sum[1] + 'mm');


    const weatherBackgrounds = {
        '☀️': 'linear-gradient(#a3e2ff 5%, #ffcb77 10%)',  // 晴天: 青からオレンジのグラデーション
        '🌤': 'linear-gradient(#f8e9a1 5%, #ffd700 10%)',  // 薄曇り: 黄色のグラデーション
        '⛅️': 'linear-gradient(#d3d3d3 5%, #f0f0f0 10%)', // 曇り: 灰色のグラデーション
        '☁️': 'linear-gradient(#7a7a7a 5%, #d3d3d3 10%)', // 曇り（厚い雲）
        '霧': 'linear-gradient(#e0e0e0 5%, #ffffff 10%)',  // 霧: 白に近い灰色
        '霧氷': 'linear-gradient(#d0f0f0 5%, #f0ffff 10%)', // 霧氷: 薄い青
        '霧雨': 'linear-gradient(#a0a0a0 5%, #c0c0c0 10%)', // 霧雨
        '☔️': 'linear-gradient(#8fa4c8 5%, #d4e2f4 10%)',  // 雨: 青灰色
        '氷雨': 'linear-gradient(#b0e0e6 5%, #add8e6 10%)', // 氷雨: 薄青
        '❄️': 'linear-gradient(#ffffff 5%, #e0f7ff 10%)',  // 雪: 白から薄青
        '⚡️☔️': 'linear-gradient(#4a4a4a 5%, #7a7a7a 10%)' // 雷雨: 暗い灰色
    };

    const currentWeatherIcon = getWMO(data.daily.weather_code[0]);
    const backgroundImage = weatherBackgrounds[currentWeatherIcon] || weatherBackgrounds['☀️'];
    document.getElementById('body').style.backgroundImage = backgroundImage;
}

function setData(id, data) {
    document.getElementById(id).innerHTML = data;
}
function dateFormat(date, mode) {
    let dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    const hour = add0(dateObject.getHours());
    const minute = add0(dateObject.getMinutes());
    const second = add0(dateObject.getSeconds());
   // const dayofWeek = (dateObject.getDay());

    if (mode == 1) {
        return `${year}年${month}月${day}日${hour}:${minute}:${second}`;
    } else {
        return month + '月' + day + '日';
    }
}
function add0(val) {
    if (val < 10) {
        val = '0' + val;
    }
    return val;
}

function getWMO(w) {
    if (w==0) {
      return '☀️';
    } else if (w==1) {
      return '🌤';
    } else if (w==2) {
      return '⛅️';
    } else if (w==3) {
      return '☁️';
    } else if (w==45) {
      return '霧';
    } else if (w==48) {
      return '霧氷';
    } else if (w==51) {
      return '霧雨';
    } else if (w==53) {
      return '霧雨';
    } else if (w==55) {
      return '霧雨';
    } else if (w==56) {
      return '霧雨';
    } else if (w==57) {
      return '霧雨';
    } else if (w==61) {
      return '☔️';
    } else if (w==63) {
      return '☔️';
    } else if (w==65) {
      return '☔️';
    } else if (w==66) {
      return '氷雨';
    } else if (w==67) {
      return '氷雨';
    } else if (w==71) {
      return '❄️';
    } else if (w==73) {
      return '❄️';
    } else if (w==75) {
      return '❄️';
    } else if (w==77) {
      return '❄️';
    } else if (w==80) {
      return '☔️';
    } else if (w==81) {
      return '☔️';
    } else if (w==82) {
      return '☔️';
    } else if (w==85) {
      return '❄️';
    } else if (w==86) {
      return '❄️';
    } else if (w==95) {
      return '⚡️☔️';
    } else if (w==96) {
      return '⚡️☔️';
    } else if (w==99) {
      return '⚡️☔️';
    } else {
      return w;
    }
  }

function updateScreen() {
    setData('time', dateFormat(new Date(), 1));
}
window.onload = updateScreen;

setInterval(updateScreen, 1000);