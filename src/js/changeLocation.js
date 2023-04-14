import getData from "./services";

const changeLocation = (weatherFunc) => {
    const inputCity = document.querySelector('.input-city'),
          yourLocation = document.querySelector('.location__city'),
          btnChangeLocation = document.querySelector('.location__change__btn'),
          btnGetLocation = document.querySelector('.location__get__btn'),
          navLink = document.querySelectorAll('.nav__link');

    const {getLocation, getCityLocation} = getData();

    navLink.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log(e.currentTarget)
            link.classList.add('active');
        })
    })
 
    getLocation().then((res) => {
        if (!localStorage.getItem('city')) {
            setLocationToLocalStorage(res.city, res.lat, res.lon);
            // yourLocation.textContent = `Current location: ${res.city}`;
            weatherFunc(res.lat, res.lon);
        } else {
            // yourLocation.textContent = `Current location: ${localStorage.getItem('city')}`;
            weatherFunc(localStorage.getItem('lat'), localStorage.getItem('lon'));
        }
    })
    
    const setLocationToLocalStorage = (city, lat, lon) => {
      localStorage.setItem('city', city);
      localStorage.setItem('lat', lat);
      localStorage.setItem('lon', lon);
    }
    
    // // Change location toggle
    // btnChangeLocation.addEventListener('click', () => {
    //   document.querySelector('.location__change__wrapper').style.display = 'flex';
    //   btnChangeLocation.style.display = 'none'
    
    // })
    
    // Get location btn
    btnGetLocation.addEventListener('click', () => {
      getLocation().then((res) => {
          setLocationToLocalStorage(res.city, res.lat, res.lon);
          console.log(res.city)
          yourLocation.textContent = `Current location: ${res.city}`;
            weatherFunc(res.lat, res.lon);
      })
    })
    
    // Change location onEnter
    inputCity.addEventListener('keydown', (e) => {
      if (e.keyCode == 13) {
          if (document.querySelector('.errorMessage')) {
              document.querySelector('.errorMessage').remove();
          }
          getCityLocation(inputCity.value).then((res) => {
              if (Object.values(res).length === 1) {
                  const errorMessage = document.createElement('label');
                  errorMessage.classList.add('errorMessage');
                  errorMessage.textContent = 'City not found';
                  inputCity.after(errorMessage)
              } else {
                  setLocationToLocalStorage(res.results[0].name, res.results[0].latitude, res.results[0].longitude);
                  yourLocation.textContent = `Current location: ${res.results[0].name}`;
                    weatherFunc(res.results[0].latitude, res.results[0].longitude)
                //   document.querySelector('.location__change__wrapper').style.display = 'none';
                //   btnChangeLocation.style.display = 'block'
                  clearFindData();
              }
          })
      }
    })
    
    // Find location on input
    inputCity.addEventListener('input', () => {
      
          if (document.querySelector('.errorMessage')) {
              document.querySelector('.errorMessage').remove();
          }
          if (document.querySelector('.finded-city')) {
              document.querySelectorAll('.finded-city').forEach(elem => {
                  elem.remove();
              })
          }
          getCityLocation(inputCity.value).then((res) => {
              if (Object.values(res).length === 1) {
                  const errorMessage = document.createElement('label');
                  errorMessage.classList.add('errorMessage');
                  errorMessage.textContent = 'City not found';
                  inputCity.after(errorMessage)
              } else {
                  res.results.forEach(el => {
                      const div = document.createElement('div');
                      div.classList.add('finded-city');
                      div.textContent = `${el.name}  ${el.country_code}`;
                      document.querySelector('.location__change__find').append(div)
                      div.addEventListener('click', () => {
                          console.log(el)
                          setLocationToLocalStorage(el.name, el.latitude, el.longitude);
                          yourLocation.textContent = `Current location: ${el.name}`;
                            weatherFunc(el.latitude, el.longitude);
                        //   document.querySelector('.location__change__wrapper').style.display = 'none';
                        //   btnChangeLocation.style.display = 'block'
                          clearFindData();
                      })
                  });
              }
          })
    })
    
    const clearFindData = () => {
      if (document.querySelector('.errorMessage')) {
          document.querySelector('.errorMessage').remove();
      }
      if (document.querySelector('.finded-city')) {
          document.querySelectorAll('.finded-city').forEach(elem => {
              elem.remove();
          })
      }
      inputCity.value = '';
    }
}

export default changeLocation;