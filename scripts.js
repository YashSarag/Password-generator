let inputSlider = document.querySelector('.slider');
let passworLength = document.querySelector('[password-length');
let displayPassword = document.querySelector('[display-password');
let copyMessage = document.querySelector('[copy-message]');
let checkboxList = document.querySelectorAll('input[type="checkbox"]');
let strength = document.querySelector('[strength]');
let generatePassword = document.querySelector('[generate-password]');
let upper = document.querySelector('[upper]');
let lower = document.querySelector('[lower]');
let number = document.querySelector('[numbers]');
let symbol = document.querySelector('[symbols');


let symbols = '`~!@#$%^&*()-_=+[{]}\\|;:",<.>/?'

let checkCount = 0;

copyMessage.setAttribute('style','scale:0');
setStrength('#c0c0c0');
setPasswordLen();

function setPasswordLen(){
    passworLength.innerText = inputSlider.value;
    const min = parseInt(inputSlider.min);
    const max = parseInt(inputSlider.max);
    const val = parseInt(inputSlider.value);
    console.log(max,min,val ,typeof max)
    inputSlider.style.backgroundSize = (val - min)/(max-min)*100 + '% 100%';
    if(inputSlider.value < checkCount){
        inputSlider.value = checkCount;
        setPasswordLen();
    }
}

function setStrength(color){ //20 8
    strength.setAttribute('style',`background-color: ${color+'90'};box-shadow: 0px 0px 30px 4px ${color+'80'}`)
    
}

async function copyMessageToClipboard(){
    if(displayPassword.value != ""){
        try{
        await navigator.clipboard.writeText(displayPassword.value);
        copyMessage.innerText = 'Copied'
    }
    catch(e){
        copyMessage.innerText = 'Failed'
    }

    copyMessage.setAttribute('style','scale:1');
    setTimeout(()=>{
        copyMessage.setAttribute('style','scale:0');
    },2000)
    }

}

inputSlider.addEventListener('input',setPasswordLen);

function checkboxCount(e){
    if(e.target.checked){
        checkCount++;
    }
    else{
        checkCount--;
    }
    // console.log('cnt: ',checkCount)
    if(inputSlider.value < checkCount){
        inputSlider.value = checkCount;
        setPasswordLen();
    }
}

checkboxList.forEach((checkbox)=>{
    checkbox.addEventListener('change',checkboxCount);
})


function calculateStrength(){    
    const passLen = parseInt(inputSlider.value);
    if(passLen >= 8){
        if(checkCount == 1){
            setStrength('#FF3B30');
        }
        else if(passLen <= 11 && checkCount != 4){
            setStrength('#FF9500');
        }
        else if((passLen <= 11 && checkCount == 4) || ((checkCount == 2 || checkCount == 3) && passLen >= 12) || (checkCount == 4 && passLen <= 15)){
            setStrength('#FFCC00');
        }
        else{
            setStrength('#34C759');
        }
    }
    else{
        setStrength('#FF3B30');
    }

}


function generatePasswordFunc(){
    if(checkCount <= 0) return;

    let password = ""
    let funcArray = []
    if(upper.checked){
        funcArray.push(generateUppercase);
    }
    if(lower.checked){
        funcArray.push(generateLowercase);
    }
    if(number.checked){
        funcArray.push(generateNumber);
    }
    if(symbol.checked){
        funcArray.push(generateSymbol);
    }

    funcArray.forEach((func)=>password += func());

    for(let i = 0; i < parseInt(inputSlider.value) - funcArray.length; i++){
        let index = getRndInteger(0,funcArray.length - 1);
        password += funcArray[index]();
    }

    password = sufflePassword(Array.from(password));
    displayPassword.value = password;
    calculateStrength();
}


generatePassword.addEventListener('click',generatePasswordFunc);


function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min+1) + min);
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,90));
}

function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,122));
}

function generateNumber(){
    return getRndInteger(0,9);
}

function generateSymbol(){
    let index = getRndInteger(0,symbols.length - 1);
    return symbols[index];
}

function sufflePassword(arr){
    for(let i = arr.length-1; i >= 0; i--){
        let j = getRndInteger(0,i);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr.join('');
}




    // if(inputSlider.value >= 8){
    //     if(checkCount == 1){
    //         setStrength('#FF3B30');
    //     }
    //     else if(checkCount == 2){
    //         setStrength('#FF9500');
    //     }
    //     else if(checkCount == 3){
    //         setStrength('#FFCC00');
    //     }
    //     else if(checkCount == 4){
    //         setStrength('#34C759');
    //     }
    // }
    // else{
    //     setStrength('#FF3B30');
    // }