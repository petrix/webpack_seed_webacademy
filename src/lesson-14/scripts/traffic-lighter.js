import '../styles/traffic-lighter.scss';

function trafficLight(parentNode) {
  const ACTIVE_CLASS_NAME = 'light_active';
  let lights = [];
  let activeLightIndex = 0;
  let intervalId = null;
  
  function toggle(lightIndex) {
    // console.log('Test');
    switchOff();
    // console.log(lightIndex);
    activeLightIndex = lightIndex;
    lights[lightIndex].classList.add(ACTIVE_CLASS_NAME);
  }

  function switchOff() {
    for (let i = 0; i < lights.length; i++) {
      lights[i].classList.remove(ACTIVE_CLASS_NAME)
    }
  }

  function handleEvents(){
    for(let i = 0 ; i < lights.length; i++){
      lights[i].addEventListener('click', () => {
        toggle(i);
    // clearInterval(intervalId);

      });
    }
    parentNode.addEventListener('mouseenter', stopAutoSwitch);
    parentNode.addEventListener('mouseleave', startAutoSwitch);
  }
  function stopAutoSwitch(){
    clearInterval(intervalId);
  }
  function startAutoSwitch(){
    clearInterval(intervalId);
    intervalId = setInterval(function() {
      if(activeLightIndex + 1 > 2){
        activeLightIndex = 0;
      } else {
        activeLightIndex++;
      }
      switchOff();
      lights[activeLightIndex].classList.add(ACTIVE_CLASS_NAME);
      // console.log(activeLightIndex);
    },2000);
  }


  function render () {
    const redLight = document.createElement('div');
    const yellowLight = document.createElement('div');
    const greenLight = document.createElement('div');

    redLight.classList.add('light', 'light_red');
    yellowLight.classList.add('light', 'light_yellow');
    greenLight.classList.add('light', 'light_green');

    parentNode.appendChild(redLight);
    parentNode.appendChild(yellowLight);
    parentNode.appendChild(greenLight);
    parentNode.classList.add('traffic-light');

    lights = [redLight, yellowLight, greenLight];
  }
  render();
  handleEvents();
  startAutoSwitch();
}

export { trafficLight };