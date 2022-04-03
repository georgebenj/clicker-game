$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

var score = 0;
var money = 1000;
var perSecond = 0;
var value = 0;
//shop items
var bees = 0;
var superbees = 0;
var megabees = 0;
var uberbees = 0;
//shop prices
var beeprice = 75;
var superbeeprice = 1000;
var megabeeprice = 12500;
var uberbeeprice = 750000;
//bee values
var beevalue = 2;
var superbeevalue = 30;
var megabeevalue = 400;
var uberbeevalue = 8000;
//upgrades
var clickmultiplier = 1;
var honeyvalue = 300;
var beediscount = 0;
var jarmultiplier = 1;
//upgrade prices
var clickmultiplierprice = 200;
var honeyvalueprice = 2500;
var beediscountprice = 30000;
var jarmultiplierprice = 750000

//jar shop
var jars = 0;
var honeyjars = 0;
var jarprice = 50;
var honeyprice = 1000;

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


function makeHoney(){
  score = score + clickmultiplier
  document.getElementById("score").innerHTML = Math.round(score) + " honey"
}

setInterval(function(){
  score = score + perSecond

  ps.innerHTML = perSecond + "/s"
  document.getElementById("score").innerHTML = Math.round(score) + " honey"
}, 1000) //1000ms = 1s

function buy(a, b, c, item, price){
  if(score >= price){
    score = score - price;
    price = Math.round(price + price * 0.15);

    switch(a){
      case ba1:
        bees++
        beeprice = price;
        perSecond = perSecond + beevalue
        value = bees * beevalue
        break;
      case ba2:
        superbees++
        superbeeprice = price;
        perSecond = perSecond + superbeevalue
        value = superbees * superbeevalue
        break;
      case ba3:
        megabees++
        megabeeprice = price;
        perSecond = perSecond + megabeevalue
        value = megabees * megabeevalue
        break;
      case ba4:
        uberbees++
        uberbeeprice = price;
        perSecond = perSecond + uberbeevalue
        value = uberbees * uberbeevalue
        break;
    }

    document.getElementById("score").innerHTML = Math.round(score) + " honey"
    ps.innerHTML = perSecond + "/s"
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
  if(money >=price){
    money = money - price;
    price = Math.round(price + price * 0.10);

    jars = jars + jarmultiplier;
    document.getElementById("money").innerHTML = Math.round(money) + "₲";
    ja.innerHTML = jars;
  } else { 
    alert("Insufficient money")
  }
}

function craftJarOfHoney(){
  if(score >= honeyprice && jars > 0){
    score = score - honeyprice;
    honeyprice = Math.round(honeyprice + honeyprice * 0.10);
    jars = jars - 1;
    honeyjars = honeyjars + 1;
    
    document.getElementById("score").innerHTML = Math.round(score) + " honey"
    jha.innerHTML = honeyjars;
    ja.innerHTML = jars;
    
  }   else if(jars < 1){
    alert("You need a Jar to craft that!")
  } else if(score < honeyprice){
    alert("You don't have enough Honey!")
  }

}

function sellHoney(){
  if(honeyjars > 0){
    honeyjars = honeyjars - 1;
    money = money + honeyvalue;

    document.getElementById("money").innerHTML = Math.round(money) + "₲";
    jha.innerHTML = honeyjars;

  } else { 
    alert("Insufficient money")
  }
}

function buyUpgrade(a, b, upgrade, price){
  if(money >= price){
    money = money - price;
    price = Math.round(price + price * 0.15)
    steve = upgrade
    switch(upgrade){
      case clickmultiplier:
        clickmultiplier = clickmultiplier + 1;
        steve = clickmultiplier
        break;
      case honeyvalue:
        honeyvalue = Math.round(honeyvalue + honeyvalue * 0.2)
        document.getElementById("sell-value").innerHTML = honeyvalue
        steve = honeyvalue
        break;
      case beediscount:
        beediscount = beediscount + beediscount * 0.1
        upgrade = beediscount;
        steve = beediscount
        break;
      case jarmultiplier:
        jarmultiplier = jarmultiplier + 1
        upgrade = jarmultiplier;
        steve = jarmultiplier
        break;
    }


    document.getElementById("money").innerHTML = Math.round(money) + "₲";

    a.innerHTML = steve 
    b.innerHTML = price
  } else { 
    alert("Insufficient money")
  }
}