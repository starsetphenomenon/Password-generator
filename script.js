let randomChars = "";

let genPassLength = document.getElementById('genLength');
let genRange = document.getElementById('genRange');
let genPassText = document.getElementById('genPass');
let num = document.getElementById('Num');
let lower = document.getElementById('Lower');
let upper = document.getElementById('Upper');
let symb = document.getElementById('Symb');
let genButton = document.getElementById('genButton');
let myForm = document.getElementById('myForm');

// changing randomChars by each checkbox function
let symbCheck = function () {
    let newVal;
    if (Symb.checked) {
        newVal = randomChars.concat('!@#$%^&*()');
    } else {
        newVal = randomChars.replace('!@#$%^&*()', '');
    }
    randomChars = newVal;
    genPassText.value = generatePassword(genPassLength.value);
    return randomChars;
};

let numCheck = function () {
    let newVal;
    if (num.checked) {
        newVal = randomChars.concat('1234567890');
    } else {
        newVal = randomChars.replace('1234567890', '');
    }
    randomChars = newVal;
    genPassText.value = generatePassword(genPassLength.value);
    return randomChars;
};

let upperCheck = function () {
    let newVal;
    if (upper.checked) {
        newVal = randomChars.concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    } else {
        newVal = randomChars.replace('ABCDEFGHIJKLMNOPQRSTUVWXYZ', '');
    }
    randomChars = newVal;
    genPassText.value = generatePassword(genPassLength.value);
    return randomChars;
};

let lowerCheck = function () {
    let newVal;
    if (lower.checked) {
        newVal = randomChars.concat('abcdefghijklmnopqrstuvwxyz');
    } else {
        newVal = randomChars.replace('abcdefghijklmnopqrstuvwxyz', '');
    }
    randomChars = newVal;
    genPassText.value = generatePassword(genPassLength.value);
    return randomChars;
};

// checkboxes event on check
symb.addEventListener("change", symbCheck);
num.addEventListener("change", numCheck);
upper.addEventListener("change", upperCheck);
lower.addEventListener("change", lowerCheck);

// generate randomly chars from strings
function generatePassword(n) {
    let result = [];

    for (let i = 0; i < n; i++) {
        let random = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        result.push(random);
    }
    return result.join('');
}

// range and input values merge
function rangeValue() {
    genPassLength.value = genRange.value;
    genPassText.value = generatePassword(genPassLength.value);
}

function lengthValue() {
    genRange.value = genPassLength.value;
    genPassText.value = generatePassword(genPassLength.value);
}

// tracking range and input values
genRange.addEventListener("input", rangeValue);
genPassLength.addEventListener("input", lengthValue);

// generate password on button click and check if it's not empty
genButton.onclick = () => {
    if (!num.checked && !lower.checked && !upper.checked && !symb.checked) {
        genPassText.placeholder = 'You must to choose the type!';
    }
    genPassText.value = generatePassword(genPassLength.value);
};