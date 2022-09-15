
function popUpGameEnd(){
    const layer = document.querySelector('.gameboard');
    const layerPopUp = document.createElement('div');
    const layerText = document.createElement('div');
    const layerBtn = document.createElement('div');
    const text = document.createElement('p');
    const btn = document.createElement('button');
    text.textContent = 'Congrats For The Win'
    btn.textContent = 'OK';
    text.id ='textPopUp';
    btn.id = 'btnPopUp';
    layerText.className='layerTextPopUp';
    layerBtn.className='layerBtnPopUp';
    layerPopUp.className='layerPopUp';
    layerPopUp.classList.add('deactive');
    
    layerText.append(text);
    layerBtn.append(btn);
    layerPopUp.append(layerText, layerBtn);
    layer.append(layerPopUp);

    btn.onclick = ()=>{
        layerPopUp.classList.remove('active');
        layerPopUp.classList.add('deactive');
    }
    return {
        active: ()=> {
            layerPopUp.classList.remove('deactive');
            layerPopUp.classList.add('active');
            // layerPopUp.style.opacity='1';
        },
        deactive: ()=> {
            // layerPopUp.style.opacity='0';
            layerPopUp.classList.remove('active');
            layerPopUp.classList.add('deactive');
        }
    }
}

export default popUpGameEnd