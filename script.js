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
let copyText = document.getElementById('copy');
let copyTextMsg = document.getElementById('copyText');

//Change border color on how strong is generated password is...
let passStrength = function () {
    let passLen = genPassText.value.length;
    if (passLen <= 1) {
        genPassText.style.border = '8px solid white';
    }
    if (passLen > 1 && passLen <= 4) {
        genPassText.style.border = '8px solid red';
    }
    if (passLen > 4 && passLen <= 8) {
        genPassText.style.border = '8px solid orange';
    }
    if (passLen > 8 && passLen <= 12) {
        genPassText.style.border = '8px solid green';
    }
    if (passLen > 12) {
        genPassText.style.border = '8px solid Chartreuse';
    }
    return genPassText.style.border;
};

// changing randomChars by each checkbox function
let symbCheck = function () {
    let newVal;
    if (Symb.checked) {
        newVal = randomChars.concat('!@#$%^&*()');
    } else {
        newVal = randomChars.replace('!@#$%^&*()', '');
    }
    randomChars = newVal;
    //genPassText.value = generatePassword(genPassLength.value);
    passStrength();
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
    //genPassText.value = generatePassword(genPassLength.value);
    passStrength();
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
    //genPassText.value = generatePassword(genPassLength.value);
    passStrength();
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
    //genPassText.value = generatePassword(genPassLength.value);
    passStrength();
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

    // if symbol type is checked but not includes - add symbol to password
    while (num.checked && !passContain(result, /[0-9]/)) {
        let num = '1234567890';
        let newResult = result.join('');
        console.log('num: ' + newResult);
        let newVal = newResult.replace(newResult[Math.floor(Math.random() * newResult.length)], num[Math.floor(Math.random() * num.length)]);
        console.log(newVal);
        return newVal;
    }

    while (symb.checked && !passContain(result, /[!@#$%^&*()]/)) {
        let symb = '!@#$%^&*()';
        let newResult = result.join('');
        console.log('symb: ' + newResult);
        let newVal = newResult.replace(newResult[Math.floor(Math.random() * newResult.length)], symb[Math.floor(Math.random() * symb.length)]);
        console.log(newVal);
        return newVal;
    }

    while (upper.checked && !passContain(result, /[A-Z]/)) {
        let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let newResult = result.join('');
        console.log('upper: ' + newResult);
        let newVal = newResult.replace(newResult[Math.floor(Math.random() * newResult.length)], upper[Math.floor(Math.random() * upper.length)]);
        console.log(newVal);
        return newVal;
    }

    while (lower.checked && !passContain(result, /[a-z]/)) {
        let lower = 'abcdefghijklmnopqrstuvwxyz';
        let newResult = result.join('');
        console.log('lower: ' + newResult);
        let newVal = newResult.replace(newResult[Math.floor(Math.random() * newResult.length)], lower[Math.floor(Math.random() * lower.length)]);
        console.log(newVal);
        return newVal;
    }

    return result.join('');
}

// range and input values merge
function rangeValue() {
    genPassLength.value = genRange.value;
    genPassText.value = generatePassword(genPassLength.value);
    passStrength();
}

function lengthValue() {
    genRange.value = genPassLength.value;
    genPassText.value = generatePassword(genPassLength.value);
    passStrength();
}

// tracking range and input values
genRange.addEventListener("input", rangeValue);
genPassLength.addEventListener("input", lengthValue);

// generate password on button click and check if it's not empty
genButton.onclick = (e) => {
    e.preventDefault();
    if (!num.checked && !lower.checked && !upper.checked && !symb.checked) {
        return genPassText.placeholder = 'You must to choose the type!';
    }
    return genPassText.value = generatePassword(genPassLength.value);
};

// check if passwords contains one of checkbox values...
function passContain(text, reg) {
    //let regEx = /[0-9]/;
    return reg.test(text);
}


//Copy the generated password functions + message
let copyFunc = function () {
    copyTextMsg.style.display = 'flex';
};

let copyFuncOut = function () {
    copyTextMsg.style.display = 'none';
};

let copyGenPass = function () {
    if (genPassText.value.length != 0) {
        navigator.clipboard.writeText(genPassText.value);
        genPassText.value = 'SUCCESSFULLY COPIED!';
    } else {
        genPassText.placeholder = 'NOTHING TO COPY!';
    }
};

copyText.addEventListener('mouseover', copyFunc);
copyText.addEventListener('mouseout', copyFuncOut);
copyText.addEventListener('click', copyGenPass);