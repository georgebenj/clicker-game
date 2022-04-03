$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})



  if(localStorage.getItem("gameData")){
    gameData = JSON.parse(localStorage.getItem("gameData"))
  } else {
    gameData = {
      "score" : 0,
      "money" : 100,
      "perSecond" : 0,
      "value" : 0,
      //shop items
      "bees" : 0,
      "superbees" : 0,
      "megabees" : 0,
      "uberbees" : 0,
      //shop prices
      "beeprice" : 75,
      "superbeeprice" : 1000,
      "megabeeprice" : 12500,
      "uberbeeprice" : 750000,
      //bee values
      "beevalue" : 2,
      "superbeevalue" : 30,
      "megabeevalue" : 400,
      "uberbeevalue" : 8000,
      //upgrades
      "clickmultiplier" : 1,
      "honeyvalue" : 300,
      "beediscount" : 0.5,
      "jarmultiplier" : 1,
      //upgrade prices
      "clickmultiplierprice" : 200,
      "honeyvalueprice" : 2500,
      "beediscountprice" : 30000,
      "jarmultiplierprice" : 750000,
    
      //jar shop
      "jars" : 0,
      "honeyjars" : 0,
      "jarprice" : 50,
      "honeyprice" : 1000
    };
  }

  window.onload = function(){
    ps.innerHTML = gameData.perSecond + "/s"
    document.getElementById("score").innerHTML = Math.round(gameData.score) + " honey"

  };





var ps = document.getElementById("perSecond")


//these correspond to a, b and c in the buy function
var ba1 = document.getElementById("bee-amount")
var bc1 = document.getElementById("bee-cost")
var bv1 = document.getElementById("beevalue")

var ba2 = document.getElementById("super-amount")
var bc2 = document.getElementById("super-cost")
var bv2 = document.getElementById("superbeevalue")

var ba3 = document.getElementById("mega-amount")
var bc3 = document.getElementById("mega-cost")
var bv3 = document.getElementById("megabeevalue")

var ba4 = document.getElementById("uber-bee-amount")
var bc4 = document.getElementById("uber-bee-cost")
var bv4 = document.getElementById("uberbeevalue")

var ja = document.getElementById("jar-amount")
var jha = document.getElementById("jarshoney-amount")

var cm = document.getElementById("click-multiplier")
var cmc = document.getElementById("click-multiplier-cost")

var hv = document.getElementById("honey-value")
var hvc = document.getElementById("honey-value-cost")

var bd = document.getElementById("bee-discount")
var bdc = document.getElementById("bee-discount-cost")

var jm = document.getElementById("jar-multiplier")
var jmc = document.getElementById("jar-multiplier-cost")

function saveGame(saveData){
  localStorage.setItem("gameData", JSON.stringify(saveData))
}


function makeHoney(){
  
  gameData.score = gameData.score + gameData.clickmultiplier
  document.getElementById("score").innerHTML = Math.round(gameData.score) + " honey"

}

//Runs every 1000ms (1 Second)
setInterval(function(){
  saveGame(gameData) 
  gameData.score = gameData.score + gameData.perSecond
  

  ps.innerHTML = gameData.perSecond + "/s"
  document.getElementById("score").innerHTML = Math.round(gameData.score) + " honey"


}, 1000) //1000ms = 1s

function buy(a, b, c, item, price){
  if(gameData.score >= price){
    gameData.score = gameData.score - price;
    price = Math.round(price + price * 0.15);

    switch(a){
      case ba1:
        gameData.bees++
        gameData.beeprice = price;
        gameData.perSecond = gameData.perSecond + gameData.beevalue
        value = gameData.bees * gameData.beevalue
        break;
      case ba2:
        gameData.superbees++
        gameData.superbeeprice = price;
        gameData.perSecond = gameData.perSecond + gameData.superbeevalue
        value = gameData.superbees * gameData.superbeevalue
        break;
      case ba3:
        gameData.megabees++
        gameData.megabeeprice = price;
        gameData.perSecond = gameData.perSecond + gameData.megabeevalue
        value = gameData.megabees * gameData.megabeevalue
        break;
      case ba4:
        gameData.uberbees++
        gameData.uberbeeprice = price;
        gameData.perSecond = gameData.perSecond + gameData.uberbeevalue
        value = gameData.uberbees * gameData.uberbeevalue
        break;
    }

    document.getElementById("score").innerHTML = Math.round(gameData.score) + " honey"
    ps.innerHTML = gameData.perSecond + "/s"
    a.innerHTML = item + 1
    b.innerHTML = price
    c.innerHTML = value

  } else {
    switch(a){
      case ba1:
       alert("You don't have enough honey to attract a Bee")
        break;
      case ba2:
        alert("Super bees don't work for free")
        
        break;
      case ba3:
        alert("Mega bees are expensive")
        
        break;
      case ba4:
        alert("Not yet")
       
        break;
    }
  }

}

function buyJar(price){
  if(gameData.money >=price){
    gameData.money = gameData.money - price;
    price = Math.round(price + price * 0.10);

    gameData.jars = gameData.jars + gameData.jarmultiplier;
    document.getElementById("money").innerHTML = Math.round(gameData.money) + "₲";
    ja.innerHTML = gameData.jars;
  } else { 
    alert("Insufficient money")
  }
}

function craftJarOfHoney(){
  if(gameData.score >= gameData.honeyprice && gameData.jars > 0){
    gameData.score = gameData.score - gameData.honeyprice;
    gameData.honeyprice = Math.round(gameData.honeyprice + gameData.honeyprice * 0.10);
    gameData.jars = gameData.jars - 1;
    gameData.honeyjars = gameData.honeyjars + 1;
    
    document.getElementById("score").innerHTML = Math.round(gameData.score) + " honey"
    jha.innerHTML = honeyjars;
    ja.innerHTML = jars;
    
  }   else if(gameData.jars < 1){
    alert("You need a Jar to craft that!")
  } else if(gameData.score < gameData.honeyprice){
    alert("You don't have enough Honey!")
  }

}

function sellHoney(){
  if(gameData.honeyjars > 0){
    gameData.honeyjars = gameData.honeyjars - 1;
    gameData.money = gameData.money + gameData.honeyvalue;

    document.getElementById("money").innerHTML = Math.round(gameData.money) + "₲";
    jha.innerHTML = gameData.honeyjars;

  } else { 
    alert("Insufficient money")
  }
}

function buyUpgrade(a, b, upgrade, price){
  if(gameData.money >= price){
    gameData.money = gameData.money - price;
    price = Math.round(price + price * 0.15)
    steve = upgrade
    switch(upgrade){
      case gameData.clickmultiplier:
        gameData.clickmultiplier = gameData.clickmultiplier + 1;
        steve = gameData.clickmultiplier
        break;
      case gameData.honeyvalue:
        gameData.honeyvalue = Math.round(gameData.honeyvalue + gameData.honeyvalue * 0.2)
        document.getElementById("sell-value").innerHTML = gameData.honeyvalue
        steve = gameData.honeyvalue
        break;
      case gameData.beediscount:
        gameData.beediscount = gameData.beediscount + gameData.beediscount * 0.1
        upgrade = gameData.beediscount;
        steve = gameData.beediscount
        break;
      case gameData.jarmultiplier:
        gameData.jarmultiplier = gameData.jarmultiplier + 1
        upgrade = gameData.jarmultiplier;
        steve = gameData.jarmultiplier
        break;
    }


    document.getElementById("money").innerHTML = Math.round(gameData.money) + "₲";

    a.innerHTML = steve 
    b.innerHTML = price
  } else { 
    alert("Insufficient money")
  }
}