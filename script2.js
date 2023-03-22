const length = 10;
const barContainer = document.getElementById("barsContainer");
let unsortedArray = new Array();
let generateButton = document.getElementsByClassName("generateArray")[0];
let sortButton = document.getElementsByClassName("sort")[0];
let time = 500;
let heightFactor = 5;

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
  barContainer.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.id = i;
    bar.classList.add("bars");
    bar.style.height = array[i] * heightFactor + "px";
    let text = document.createElement("p");
    text.innerText = array[i];
    text.classList.add("barsTxt");
    bar.appendChild(text);
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
  const bars = document.getElementsByClassName("bars");
  let swap = false;
  console.log(bars[0].childNodes);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap = true;
        // for (let k = 0; k < bars.length; k++) {
        //   if (k !== j && k !== j + 1) {
        //     bars[k].style.backgroundColor = "purple";
        //   }
        // }
        bars[j].style.backgroundColor = "lightGreen";
        bars[j + 1].style.backgroundColor = "lightGreen";
        await sleep(time);
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        // bars[j].style.transform = "translateX(100px)";
        // bars[j + 1].style.transform = "translateX(-100px)";
        bars[j].style.height = arr[j] * heightFactor + "px";
        // document.getElementsByClassName('myClass')[0].childNodes[1].innerHTML)
        bars[j].childNodes[0].innerText = arr[j];
        bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
        bars[j + 1].childNodes[0].innerText = arr[j + 1];

        await sleep(time);
        bars[j].style.backgroundColor = "#cf6bdd";
        bars[j + 1].style.backgroundColor = "#cf6bdd";
      } else {
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";
        await sleep(time);
        bars[j].style.backgroundColor = "#cf6bdd";
        bars[j + 1].style.backgroundColor = "#cf6bdd";
      }
      await sleep(time);
    }
    if (swap === false) return arr;
  }
  return arr;
};

const insertionSort = async (arr) => {
  const bars = document.getElementsByClassName("bars");
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    bars[i].style.backgroundColor = "yellow";
    await sleep(time);
    let j = i - 1;
    while (j > -1 && key < arr[j]) {
      bars[j].style.backgroundColor = "lightGreen";
      bars[j + 1].style.backgroundColor = "lightGreen";
      await sleep(time);
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;

      bars[j].style.height = arr[j] * heightFactor + "px";
      bars[j].childNodes[0].innerText = arr[j];
      bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
      bars[j + 1].childNodes[0].innerText = arr[j + 1];
      j--;
    }
    bars[i].style.backgroundColor = "pink";

    arr[j + 1] = key;
  }
  console.log(arr);
  return arr;
};

function handleFunc() {
  insertionSort(unsortedArray);
  // let data = document.getElementById("getArray");
  // if (data === "") {
  //   //call for generated array
  //   // bubbleSort(unsortedArray);
  //   insertionSort(unsortedArray);
  // } else {
  //   data = data.split(",");
  //   if (data.length() > 30) alert("array size exceed max size of 30.");
  //   else {
  //     unsortedArray = data;
  //     console.log(unsortedArray);
  //     createBars(unsortedArray);
  //     bubbleSort(unsortedArray);
  //   }
  // }
}

sortButton.addEventListener("click", () => handleFunc());
