import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

import {TimelineMax} from 'gsap';

import './gsapArray';

var path = Snap.select('#graph');



var newPath = 'M1,257.6l147.1,49.5L276.6,75.6l170,46.5l163.5,177L725,54.5L938.4,1l250.8,199.9L1338.1,1h180.9';
var oldPath = 'M1,257.6l149.5-71.6L280,257.6l166.6-135.5l173.5,69L725,54.5L938.4,1l250.8,199.9L1338.1,1h180.9';


function step1() {
  path.animate({ d: newPath }, 2000, function() {console.log('finished step1!');step2();});
}

function step2() {
  path.animate({ d: oldPath }, 2000, function() {console.log('finished step2!');step1();});
}

step1();


let width = 1300;
let height = 400;

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

canvas.classList.add('supercanvas');
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);

let state1 = [0,110, 150, 310, 350, 300, 0];
let state2 = [310,350, 300, 40, 10, 110, 150];
let state3 = [10,110,50,210,350,100,50];

let uberState = [...state1];

function drawLine(uberState) {

  ctx.clearRect(0,0,width,height);
  ctx.beginPath();

  ctx.moveTo(0, uberState[0]);

  for (let i = 0; i <7; i++) {
    ctx.lineTo(i * width/6, uberState[i]);
  }

  ctx.strokeStyle = '#97DE5B';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.closePath();
}

let tl = new TimelineMax({
  onUpdate: function() {
    drawLine(uberState);
  },
  repeat: -1
});

tl.to(uberState, 2, {endArray: state2})
  .to(uberState, 2 ,{endArray: state3})
  .to(uberState, 2 ,{endArray: state1});

