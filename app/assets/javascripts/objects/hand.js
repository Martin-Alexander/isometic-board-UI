function Hand() {

  this.mousePosition = { x: null, y: null };
  this.tileOver = { x: null, y: null };
  this.ctrlDown = false;
  this.shiftDown = false;
  
  this.selectedTile;
  this.cityBox = false;
  this.unitBox = false;

  this.click = function() {
    console.log("Click");
  }

  this.render = function() {
    console.log("Render Hand");
  }

  function closeBox() {
    console.log("Close Box");
  }

  function openCityBox() {
    console.log("Open City Box");
  }

  function openUnitBox() {
    console.log("Open Unit Box");
  }
}