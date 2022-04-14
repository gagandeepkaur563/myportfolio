// var canvas = document.querySelector('canvas');
// // console.log(canvas);
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// var c = canvas.getContext("2d");
// c.fillStyle = 'rgba(255 , 0 , 0 , 0.5)';
// // c.fillRect(x,y,width,height);
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0 , 0 , 255 , 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0 , 255 , 0 , 0.5)';
// c.fillRect(300, 300, 100, 100);

// //Line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle = "#fa34a3";
// c.stroke();
// //Arc /circle
// // c.beginPath();
// // c.arc(300, 300, 30, 0, Math.PI*2, false);
// // c.stroke();

// for(var i=0; i<50; i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
// c.arc(x, y, 30, 0, Math.PI*2, false);
// c.strokeStyle= "blue";
// c.stroke();
// }
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 100 / 60);
    };
})();
var c = document.getElementById('canv');
var $ = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var _w = w * 0.5;
var _h = h * 0.5;
var arr = [];
var cnt = 0;

window.addEventListener('load', resize);
window.addEventListener('resize', resize, false);

function resize() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
  c.style.position = 'absolute';
  c.style.left = (window.innerWidth - w) *
    .01 + 'px';
  c.style.top = (window.innerHeight - h) *
    .01 + 'px';
}

function anim() {
  cnt++;
  if (cnt % 6) draw();
  window.requestAnimFrame(anim);
}
anim();

function draw() {

  var splot = {
    x: rng(_w - 900, _w + 900),
    y: rng(_h - 900, _h + 900),
    r: rng(20, 80),
    spX: rng(-1, 1),
    spY: rng(-1, 1)
  };

  arr.push(splot);
  while (arr.length > 100) {
    arr.shift();
  }
  $.clearRect(0, 0, w, h);

  for (var i = 0; i < arr.length; i++) {

    splot = arr[i];;
    $.fillStyle = rndCol();
    $.beginPath();
    $.arc(splot.x, splot.y, splot.r, 0, Math.PI * 2, true);
    $.shadowBlur = 80;
    $.shadowOffsetX = 2;
    $.shadowOffsetY = 2;
    $.shadowColor = rndCol();
    $.globalCompositeOperation = 'lighter';
    $.fill();

    splot.x = splot.x + splot.spX;
    splot.y = splot.y + splot.spY;
    splot.r = splot.r * 0.96;
  }
}

function rndCol() {
  var r = Math.floor(Math.random() * 200);
  var g = Math.floor(Math.random() * 80);
  var b = Math.floor(Math.random() * 120);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



// contact form 
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
// const contactForm = document.getElementById("contact-form");
// const choose = document.getElementById("subject");
const errorElement = document.getElementById("error");
const successMsg = document.getElementById("success-msg");
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", validForm);
// const validate = (e) =>
function validForm(event) {
  event.preventDefault();
  console.log("helloooooooooooooooo");
  if (name.value.length < 1) {
    errorElement.innerHTML = "Please enter your name ";
    return false;
  }

  if (!(email.value.includes(".") && email.value.includes("@"))) {
    errorElement.innerHTML = "Please enter a valid email address.";
    return false;
  }

  if (!emailIsValid(email.value)) {
    errorElement.innerHTML = "Please enter a valid email address.";
    return false;
  }

  if (message.value.length < 15) {
    errorElement.innerHTML = "Please write a longer message.";
    return false;
  }

  errorElement.innerHTML = "";
  successMsg.innerHTML =
    "Thank you! I will get back to you as soon as possible.";

  event.preventDefault();
  setTimeout(function () {
    successMsg.innerHTML = "";
    document.getElementById("contact-form").reset();
  }, 6000);

  return true;
}

const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

submitBtn.addEventListener("click", validForm);
