import '../styles/lighter.scss';
export class Lighter{
    constructor(parentNode, lampColor){
        this.parentNode = parentNode;
        this.lampColor = lampColor;
        this.isActive = false;
        this.render();
        this.handleEvents();
    }
    handleEvents(){
        this.control.addEventListener('click', () => {
            if(this.isActive === false){
                this.activate();
            }else{
                this.deactivate();
            }
        });
    }
    activate(){
        this.lamp.style.backgroundColor = this.lampColor || 'red';
        this.isActive = true;
    }
    deactivate(){
        this.lamp.style.backgroundColor = 'transparent';
        this.isActive = false;
    }
    render(){
        this.lamp = document.createElement('div');
        this.control = document.createElement('button');
        
        this.lamp.classList.add('lighter__lamp');
        this.control.classList.add('lighter__control');
        this.parentNode.classList.add('lighter');
        
        this.parentNode.appendChild(this.lamp);
        this.parentNode.appendChild(this.control);

    }
}