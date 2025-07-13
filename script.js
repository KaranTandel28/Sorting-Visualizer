const arrayContainer = document.getElementById('array-container');
let arr = [];
const ARRAY_SIZE = 30;
const DELAY = 100;

function generateArray() {
    arr = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < ARRAY_SIZE; i++) {
        arr[i] = Math.floor(Math.random() * 300) + 20;
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${arr[i]}px`;
        arrayContainer.appendChild(bar);
    }
}

async function bubbleSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = 0; j < arr.length-i-1; j++) {
            bars[j].classList.add('active');
            bars[j+1].classList.add('active');
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                bars[j].style.height = `${arr[j]}px`;
                bars[j+1].style.height = `${arr[j+1]}px`;
            }
            await sleep(DELAY);
            bars[j].classList.remove('active');
            bars[j+1].classList.remove('active');
        }
        bars[arr.length-i-1].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
}

async function selectionSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        bars[minIdx].classList.add('active');
        for (let j = i+1; j < arr.length; j++) {
            bars[j].classList.add('active');
            if (arr[j] < arr[minIdx]) {
                bars[minIdx].classList.remove('active');
                minIdx = j;
                bars[minIdx].classList.add('active');
            }
            await sleep(DELAY);
            bars[j].classList.remove('active');
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            bars[i].style.height = `${arr[i]}px`;
            bars[minIdx].style.height = `${arr[minIdx]}px`;
        }
        bars[minIdx].classList.remove('active');
        bars[i].classList.add('sorted');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate an initial array on load
window.onload = generateArray;