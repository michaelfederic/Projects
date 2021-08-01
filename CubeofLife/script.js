const cube = document.querySelector(".td-figure");
let xAxis = 0;
let yAxis = 0; // rotate cube using WASD keyboard keys

window.onkeydown = (e) => {
  clearInterval(loop);

  if (e.key === "w") {
    xAxis += 1;
    cube.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg) `;
  } else if (e.key === "a") {
    yAxis -= 1;
    cube.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg)`;
  } else if (e.key === "s") {
    xAxis -= 1;
    cube.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg)`;
  } else if (e.key === "d") {
    yAxis += 1;
    cube.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg)`;
  } else {
    return;
  }
}; //loop to rotate cube

let loop = setInterval(() => {
  //xAxis+=.1
  yAxis += 0.1;

  if (yAxis >= 360) {
    yAxis = 0;
  }

  cube.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg)`;
}, 10); //modal functionality

const span = document.querySelector("span");
const modal = document.querySelector(".modal-container");
const modalImage = document.querySelector(".modal-container img");
const images = document.querySelectorAll(".td-figure img");
const modalContent = document.querySelector("#modal-content-text");
const messages = [
  "Beauty of Life",
  "River's Creek",
  "Rushing Waters",
  "Falling Leaves",
  "Majestic Mountain",
  "Summer Green"
];
images.forEach((image) =>
  image.addEventListener("click", function (e) {
    modal.style.display = "block";
    modalImage.setAttribute("src", image.src);
    modalContent.textContent = `${messages[image.id]}`;
  })
);

span.onclick = () => {
  modal.style.display = "none";
};
