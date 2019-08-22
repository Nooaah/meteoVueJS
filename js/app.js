var app = new Vue({
    el: '#app',
    data: {
        ville: '',
        result: false,
        temp : '',
        humidity : '',
        desc : ''
    },
    methods: {
        loadWeather() {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude
                var longitude = position.coords.longitude;
                axios.get(
                        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=fb557efd2995a66e6f189efa18ae200a`
                    )
                    .then(res => {
                        let response = res.data;
                        app.result = true;
                        var image = 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png';
                        var img = document.createElement('img');
                        img.src = image;
                        document.querySelector('.img').appendChild(img);
                        app.ville = response.name;
                        app.temp = response.main.temp;
                        app.humidity = response.main.humidity;
                        app.desc = response.weather[0].description;
                    })
            }, function (error) {
                alert('Dommage... je ne peux pas te dire ta météo si tu ne partages pas ta position...');

            });
        }
    }
})