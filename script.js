"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const image = document.createElement('IMG');
image.setAttribute('src', 'bird.jpg');




function drawCell(imageData, x, y, w, h) {
  // get pixel colour
  let index = (x + y * image.width) * 4;
  let red = imageData[index + 0];
  let green = imageData[index + 1];
  let blue = imageData[index + 2];

  /// get brightness
  let brightness = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  //
  let new_width = Math.round((1.0 - brightness / 255) * w);

  // fill background
  // ctx.fillStyle = 'linear-gradient(blue, pink)';
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, w, h);

  // ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 1)`;
  // ctx.fillRect(x, y, w, h);

  //
  let middle_x = x + w / 2;
  let new_x = middle_x - new_width / 2;
  ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 1)`;

  let verticalSpacing = 2;
  let minWidth = 3;

  x = Math.floor(new_x);
  y = Math.round(y + verticalSpacing / 2);
  w = Math.max(Math.round(new_width), minWidth);
  h = Math.round(h - verticalSpacing);

  ctx.fillRect(x, y, w, h);
}


image.addEventListener("load", event => {
  // draw image
  ctx.drawImage(image, 0, 0, image.width, image.height);

  //[r, g, b, a] 0-255
  let imageData = ctx.getImageData(0, 0, image.width, image.height).data;

  // console.log(`value at pixel 0 is ${imageData[0]}`)
  // console.log(`imagedata length: ${imageData.length}`)

  // fill background
  ctx.fillStyle = "white";
  // ctx.fillRect(0, 0, canvas.width, canvas.height)

  // create grid
  let grid_size_x = 12;
  let grid_size_y = 24;
  for (let y = 0; y < image.height; y += grid_size_y) {
    for (let x = 0; x < image.width; x += grid_size_x) {
      // draw cells
      drawCell(imageData, x, y, grid_size_x, grid_size_y);
    }
  }
});
