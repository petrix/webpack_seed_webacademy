import '../styles/traffic-lighter.scss';

function trafficLight(parentNode) {
  const ACTIVE_CLASS_NAME = 'light_active';
  let lights = [];

  // const lights = parentNode.querySelectorAll('.light');

  // for (let i = 0; i < lights.length; i++) {
  //   lights[i].onclick = toggle;
  // }

  function toggle() {
    // console.log('Test');
    switchOff();
    this.classList.add(ACTIVE_CLASS_NAME);
  }

  function switchOff() {
    for (let i = 0; i < lights.length; i++) {
      lights[i].classList.remove(ACTIVE_CLASS_NAME)
    }
  }

  function handleEvents(){
    for(const light of lights){
      light.addEventListener('click', toggle);
    }
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
}

export { trafficLight };