const dealerWindow = document.querySelector("#dealer-window");
const playerWindow = document.querySelector("#player-window")
const dealerInfo = document.querySelector("#dealer-info");
const playerInfo = document.querySelector("#player-info");
const hitbtn = document.querySelector("#hit");
const standbtn = document.querySelector("#stand");
const inputValue = document.querySelector("#input");
const startGame = document.querySelector("#start-game");
const betBtn= document.querySelector("#submitbtn");
const betMessage = document.querySelector("#game-header");
const dealbtn = document.querySelector("#deal");
const earnings = document.querySelector("#bankmoney");
const rules = document.querySelector('#rule');
const playagain = document.querySelector('#playagain');
const userBank = document.querySelector('#bankmoney');


function dealBtn(){
    let att = dealbtn.getAttribute('id')
   if(att==='deal'){
       dealbtn.removeAttribute('id','deal')
       dealbtn.setAttribute('id','deal-end')
   }else{
       dealbtn.removeAttribute('id','deal-end')
       dealbtn.setAttribute('id','deal')
   }

}


function addRem(){
    let att = startGame.getAttribute('id')
   if(att==='start-game'){
       startGame.removeAttribute('id','start-game')
       startGame.setAttribute('id','end')
   }else{
       startGame.removeAttribute('id','end')
       startGame.setAttribute('id','start-game')
   }

}
let aR = setInterval(addRem,300)
let dR;

function getRanPos(min, max) {
    return Math.random() * (max - min) + min;
}
//disbabled elements at start of game
hit.disabled=true;
stand.disabled=true;
inputValue.disabled=true;
betBtn.disabled=true;
dealbtn.disabled=true;


//use css for styles then import it into javascript using set attribute
//when start button is clicked, modify specified values
startGame.onclick=function(){
    inputValue.disabled=false;
    betBtn.disabled=false;
    startGame.disabled=true;
    betMessage.textContent="Place Bet!"
    betMessage.style.color="yellow";
    betMessage.style.fontWeight="bold";
    betMessage.style.fontSize="4vw"
    rules.textContent=""
    inputValue.focus()
    clearInterval(aR)
    startGame.setAttribute('id','start-game')
    

},{once:true}

let userBet; 

if(!localStorage.getItem('bank')){
    console.log('empty')
    localStorage.setItem('bank',500)
    
}

let bank = +localStorage.getItem('bank')
console.log(bank)
let userMoney =bank
let bet =0;

document.addEventListener('DOMContentLoaded', ()=>{
    console.log('ive been refreshed')
    userBank.textContent=localStorage.getItem('bank')
})

//when bet button is clicked, modify specified values
betBtn.onclick=function(){
    userBet= parseInt(inputValue.value);
    if(userBet>userMoney){
        betMessage.textContent="You don't have enough money!"
        inputValue.value="";
        inputValue.focus();
    }else if(isNaN(userBet)){
        betMessage.textContent="Please enter a number!"
    }
    else{
        betMessage.textContent=`Betting $${userBet}!`;
        earnings.textContent= userMoney - userBet
        bet = +earnings.textContent
        console.log(bet)
        betMessage.style.color="white";
        inputValue.disabled=true;
        betBtn.disabled=true;
        dealbtn.disabled=false;
        inputValue.value="";
         dR = setInterval(dealBtn, 300)
    }   
    
}

//using deck of cards api to get cards
let shuffleCards ='https://deckofcardsapi.com/api/deck/dw242pd2cv6b/shuffle/?deck_count=6'
let drawCard = 'https://deckofcardsapi.com/api/deck/dw242pd2cv6b/draw/?count=4'
let drawOneCard = 'https://deckofcardsapi.com/api/deck/dw242pd2cv6b/draw/?count=1'
let drawFourCards = 'https://deckofcardsapi.com/api/deck/dw242pd2cv6b/draw/?count=4'


let cardDealer=[]
let cardPlayer=[0,0]
async function getCards(){
   let response = await fetch(shuffleCards);
   let data = await response.json();
   console.log(data)
}



//deal button serves initial cards
dealbtn.addEventListener('click', async function drawCards(){
    let response = await fetch(drawCard)
    let data = await response.json()
    //console.log(data.cards)
    
    let dValue = data.cards[0].value;
    
        document.getElementById('card0').src = data.cards[0].images.png
        document.getElementById('card1').src='https://opengameart.org/sites/default/files/card%20back%20red.png'
        document.getElementById('card0').style.transform=`rotateZ(${Math.floor(Math.random()*10)}deg) translateX(${getRanPos(-50,50)}px)`;
        
        if(dValue==='JACK' || dValue==='QUEEN'||dValue ==="KING"){
            dValue=10

        }else if(dValue==='ACE'){
            dValue=11;
            
        }else{
            dValue=Number(dValue)

        }
        
        cardDealer.push(Number(dValue))
        dealerWindow.textContent=cardDealer[0]
        //------------------player hand---------------------//
        //forl loop to deal initial player hand
    for(let i = 0; i < data.cards.length/2;i++){
        
        let pValue = data.cards[i+2].value;
        document.getElementById(`card${i+2}`).src = data.cards[i+2].images.png
        document.getElementById(`card${i+2}`).style.transform=`rotateZ(${Math.floor(Math.random()*10)}deg) translateX(${getRanPos(-50,50)}px)`;
        //checks the suit of the 2 cards
        if(pValue==='JACK' || pValue==='QUEEN'||pValue ==="KING"){
            cardPlayer[0]+=10
            cardPlayer[1]+=10
        }else if(pValue==='ACE'){
                cardPlayer[0]+=1
                cardPlayer[1]+=11
            
        }else{
            cardPlayer[0] += Number(pValue)
            cardPlayer[1] += Number(pValue)

        }
    }
        //if any duplicates in the array, remove it
        if(cardPlayer[0]===cardPlayer[1]){
            cardPlayer.pop()
            playerWindow.textContent=cardPlayer[0]
        }else{
            playerWindow.textContent=cardPlayer[0]+'/'+cardPlayer[1]
        }


        //check if any card total is 21
        if(cardPlayer[0] ===21 || cardPlayer[1]===21){
            document.getElementById('game-header-message').style.display='block';
            betMessage.textContent="";
            playerWindow.textContent=21;
            hitbtn.disabled=true;
            standbtn.disabled=true;
            playagain.style.display='block'
            playagain.addEventListener('click',()=>{
            location.reload()})
        }

    
    dealbtn.disabled=true
    clearInterval(dR)
    dealbtn.setAttribute('id','deal')
    hitbtn.disabled=false;
    standbtn.disabled=false;
    //console.log(cardPlayer)
 })

//player hits for another card
function greaterThan21(playerTotal){
    let result = playerTotal.length;
    for(let i = 0; i< result ;i++){
        if(playerTotal[i]>21){
            playerTotal.splice(i,1)
            playerWindow.textContent=cardPlayer[0]
        }else{
            playerWindow.textContent=cardPlayer[0],cardPlayer[1]
        }
    }
}
hitbtn.addEventListener('click',async function drawCards(){
    if(cardPlayer.length===1){
    cardPlayer.push(cardPlayer[0])
    //console.log(cardPlayer)
}else{
    cardPlayer=cardPlayer
}
    let response = await fetch(drawOneCard)
    let data = await response.json()
    //console.log(data)
    let card = data.cards[0].value;
    if(card==='JACK' || card==='QUEEN'||card ==="KING"){
        cardPlayer[0]+=10
        cardPlayer[1]+=10
        greaterThan21(cardPlayer)
    }else if(card==='ACE'){
       cardPlayer[0]+=1
       cardPlayer[1]+=11
       playerWindow.textContent=cardPlayer[0]+'/'+cardPlayer[1]
    }else{
        cardPlayer[0]+= +card
        cardPlayer[1]+= +card
        greaterThan21(cardPlayer)
    }
    //console.log(cardPlayer)
    
        if(cardPlayer[0]===21||cardPlayer[1]===21){
            //console.log('you win')
            document.getElementById('game-header-message').style.display='block';
               betMessage.textContent="";
               playerWindow.textContent=21;
               hitbtn.disabled=true;
            standbtn.disabled=true;
            playagain.style.display='block'
            playagain.addEventListener('click',()=>{
            location.reload()})
               
        
    }
        if(cardPlayer[0]>21&&cardPlayer[1]>21){
            //console.log('lost')
        }
    const nCard = document.createElement('img')
    
        nCard.setAttribute('id','new-card')
        nCard.style.transform=`rotateZ(${Math.floor(Math.random()*10)}deg) translateX(${getRanPos(-50,50)}px)`
        nCard.src=data.cards[0].images.png
        playerInfo.appendChild(nCard)
        
        afterHit(cardPlayer,cardDealer)
    
})
getCards()

function checkCard(card){
    if(card==='JACK'|| card ==='QUEEN' || card==='KING'){
        card = 10;
    }else if(card ==='ACE'){
        card =1
    }else {
        card = +card
    }
    return card
}

let dealerMessage = document.getElementById('bust-message');
function afterHit(playerCard, dealerCard){
    if(playerCard[0]>21 && playerCard[1]<21){
        playerCard.splice(0,1)
        playerWindow.textContent=playerCard[0]
    }else if(playerCard[0]<21 && playerCard[1]>21){
        playerCard.splice(1,1)
        playerWindow.textContent=playerCard[0]
    }else if(playerCard[0]>21 && playerCard[1]>21){
        document.getElementById('bust-message').style.display="block"
            document.getElementById('game-header').style.display="none"
    }else{
        if(playerCard[0]===playerCard[1]){
        playerWindow.textContent=cardPlayer[0];
        }
    }

    //console.log("player total:" +playerCard)
    if(playerCard[0]>21){
        document.getElementById('bust-message').style.display="block"
                document.getElementById('game-header').style.display="none"
                hitbtn.disabled=true;
                standbtn.disabled=true;
                playagain.style.display='block'
                playagain.addEventListener('click',()=>{
                location.reload()
                })
    }
    

}

function compareTotala(playerCardTotal,dealerCardTotal){
    
    //console.log(playerCardTotal)
    playerCardTotal.sort((a,b)=>b-a)
        
        if(playerCardTotal[0]> dealerCardTotal&& playerCardTotal[0]<=21){
            dealerMessage.setAttribute('id','player-message');
            dealerMessage.style.display='block';
            dealerMessage.textContent= 'Player Wins';
        }else if(dealerCardTotal> playerCardTotal[0]&& dealerCardTotal<=21){
            dealerMessage.setAttribute('id','dealer-message');
            dealerMessage.style.display='block';
            dealerMessage.textContent= 'Dealer Wins';
            
        }else if(playerCardTotal[0]>21){
            document.getElementById('bust-message').style.display="block"
            document.getElementById('game-header').style.display="none"
            
        }else if(cardDealer[0]>21){
            dealerMessage.setAttribute('id','player-message');
            dealerMessage.style.display='block';
            dealerMessage.textContent= 'Player Wins';
        }else{
            dealerMessage.setAttribute('id','tie-message');
            dealerMessage.style.display='block';
            dealerMessage.textContent= 'Tie Game';
        }
            betMessage.textContent='';
            hitbtn.disabled=true;
            standbtn.disabled=true;
            playagain.style.display='block'
            playagain.addEventListener('click',()=>{
            location.reload()
            })

}

standbtn.addEventListener('click', async function drawCards(){
    
    let response = await fetch(drawFourCards)
    let data = await response.json()
    //console.log(data.cards)
    let dealerSecondCard = data.cards[0].value

    document.getElementById('card1').src=data.cards[0].images.png

    cardDealer[0]+=checkCard(dealerSecondCard)
    let count = 0;
    
    for(let i = 1;i<4;i++){
        let newcard=document.createElement('img');
        console.log(cardDealer[0])
        if(cardDealer>17)break;
        if(cardDealer[0]<17){
        console.log('i ran')
        cardDealer[0]+=+checkCard(data.cards[i].value)
        
        newcard.setAttribute('id', `card${i}`)
        newcard.src=data.cards[i].images.png
        //console.log(`card${i+4}`)
        dealerInfo.appendChild(newcard)
        document.getElementById(`card${i}`).style.transform=`rotateZ(${Math.floor(Math.random()*15)}deg) translateX(${getRanPos(-300,300)}px)`;
        count++;
        }
        
        //console.log(cardDealer)
        
    }
    console.log('I ran ' +count+' times')
    
    dealerWindow.textContent=cardDealer[0]
    afterHit(cardPlayer,cardDealer)
    compareTotala(cardPlayer,cardDealer)
    standbtn.disabled=true

})





//setInterval(()=>{console.log(storage.bankAcount +=1)},1000)

