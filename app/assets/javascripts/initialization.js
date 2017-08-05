function initializeSourceImage() {

  tileImage = document.getElementById("tiles");
  unitImage = document.getElementById("units");
  shieldImage = document.getElementById("shields");
  structureImage = document.getElementById("structures");
}


function intializeCanvas() {

  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");  
  
  canvas.width = 1100;
  canvas.height = 670;

  canvasContext.translate(canvas.width / 2, 50);
}