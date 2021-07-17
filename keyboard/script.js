//sets attributes for single characters [A-Z] and [0-9]
let keyText = document.querySelectorAll("p");
for(let i = 0;i<keyText.length;i++){
    let regEx = /[A-Z]/gmi;
    let regExNum = /[0-9]/gmi;
    let key =keyText[i].textContent;

    if(regEx.test(key)&& key.length<2){
        keyText[i].setAttribute("id","Key"+key)
    }else if(regExNum.test(key)&& key.length<2){
        keyText[i].setAttribute("id","Digit"+key)
    }
    
}

//adds event to key down
window.addEventListener("keydown", function (e){
    let keyPress= e.code;
    let para = document.querySelector(`#${keyPress}`)
    if(keyPress===para.getAttribute("id")){
        para.style.transform="scale(1.2)";
        para.style.backgroundColor=`rgba(${ranColor()},${ranColor()},${ranColor()})`;
        para.style.color="yellow";
    }
    
    });
//removes effects after keyup
window.addEventListener("keyup",function(e){
    let keyPress= e.code;
    let para = document.querySelector(`#${keyPress}`)
    if(keyPress===para.getAttribute("id")){
        para.style.transform="scale(1)";
        para.style.transition=".3s"
        para.style.backgroundColor="#abcef1";
        para.style.color="black"
    }


})
//random color picker
function ranColor(){
    return Math.floor(Math.random()*256)
}
//random opacity picker
function ranOpacity(){
    return Math.random();
}

