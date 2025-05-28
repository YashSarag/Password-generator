const passwordLength = document.querySelector('[password-length]');
const inputSlider = document.querySelector('[input-slider]');
const copyMessage = document.querySelector('[copy-message]');
const displayPassword = document.querySelector('[display-password]');

copyMessage.setAttribute('style','scale:0');
passwordLength.innerText = inputSlider.value;


inputSlider.addEventListener('input',()=>{
    passwordLength.innerText = inputSlider.value;
});


async function displayCopyMessage(){
    if(displayPassword.value != ""){
        try{
            await navigator.clipboard.writeText(displayPassword.value).catch((e)=>alert(e))
        }
        catch(e){
            copyMessage.innerText="Failed"
        }
        copyMessage.setAttribute('style','scale:1');
        setTimeout(()=>{
            copyMessage.setAttribute('style','scale:0');
        },1500)
    }
}

// navigator.clipboard.writeText(text)

// displayPassword.value="";

let cnt = 0;

function handleCheckbocCount(event){
    if(event.target.checked){
        cnt++;
        console.log("Count",cnt);
    }else{
        cnt--;
        console.log("Count",cnt);
    }
}

let chekbocCount = document.querySelectorAll('input[type="checkbox');
chekbocCount.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckbocCount)
})

