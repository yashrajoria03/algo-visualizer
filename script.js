const length = 10;
const barContainer = document.getElementById("barsContainer");
let unsortedArray = new Array();
let generateButton = document.getElementsByClassName("generateArray")[0];
let sortButton = document.getElementsByClassName("sort")[0];
let time = 100;

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//generating random values
const generateArray = (size) => {
  let array = new Array();
  for (let i = 0; i < size; i++) {
    const value = randomNum(5, 100);
    array.push(value);
  }
  console.log(array);
  return array;
};

//rendering the bars
function createBars(array) {
  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.id = i;
    bar.classList.add("bar");
    bar.style.height = array[i] * 5.5 + "px";
    bar.innerText = array[i];
    barContainer.appendChild(bar);
  }
}

generateButton.addEventListener("click", () => {
  barContainer.innerHTML = "";
  unsortedArray = generateArray(length);
  createBars(unsortedArray);
});

document.addEventListener("DOMContentLoaded", () => {
  unsortedArray = generateArray(length);
  //   console.log(unsortedArray);
  createBars(unsortedArray);
});

//function to add delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//algo for bubble sort
const bubbleSort = async (arr) => {
  const bars = document.getElementsByClassName("bar");
  let swap = false;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap = true;
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "yellow";
          }
        }
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        bars[j].style.backgroundColor = "lightGreen";
        bars[j].style.height = arr[j] * 5.5 + "px";
        bars[j].innerText = arr[j];
        bars[j + 1].style.backgroundColor = "lightGreen";
        bars[j + 1].style.height = arr[j + 1] * 5.5 + "px";
        bars[j + 1].innerText = arr[j + 1];
        await sleep(time);
        bars[j].style.backgroundColor = "yellow";
        bars[j + 1].style.backgroundColor = "yellow";
      } else {
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";
        await sleep(time);
        bars[j].style.backgroundColor = "yellow";
        bars[j + 1].style.backgroundColor = "yellow";
      }
      await sleep(time);
    }
    if (swap === false) return arr;
  }
  return arr;
};

sortButton.addEventListener("click", () => bubbleSort(unsortedArray));
