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
let chekkers = document.querySelectorAll('.chekker');

//Change border color on how strong is generated password is...
let passStrength = function () {
    let passLen = genPassText.value.length;
    if (passLen <= 1) {
        genPassText.style.border = '8px solid grey';
    }
    if (passLen > 1 && passLen <= 4) {
        genPassText.style.border = '8px solid firebrick';
    }
    if (passLen > 4 && passLen <= 8) {
        genPassText.style.border = '8px solid coral';
    }
    if (passLen > 8 && passLen <= 12) {
        genPassText.style.border = '8px solid darkseagreen';
    }
    if (passLen > 12) {
        genPassText.style.border = '8px solid green';
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
    let symbArr = '!@#$%^&*()';
    let numArr = '1234567890';
    let upperArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerArr = 'abcdefghijklmnopqrstuvwxyz';
    let numRegEx = /[0-9]/;
    let symbRegEx = /[!@#$%^&*()]/;
    let upperRegEx = /[A-Z]/;
    let lowerRegEx = /[a-z]/;

    for (let i = 0; i < n; i++) {
        let random = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        result.push(random);
    }

    let newResult = result.join('');

    if (n <= 2) {
        // if symbol type is checked but not includes - add symbol to password
        if (num.checked && !passContain(result, numRegEx)) {
            console.log('num: ' + newResult);
            let newVal = newResult.replace(newResult[Math.floor(Math.random() * newResult.length)], numArr[Math.floor(Math.random() * numArr.length)]);
            return newVal;
        }

        if (symb.checked && !passContain(result, symbRegEx)) {
            console.log('symb: ' + newResult);
            let newVal = newResult.replace(newResult[Math.floor(Math.random() * newResult.length)], symbArr[Math.floor(Math.random() * symbArr.length)]);
            return newVal;
        }

        if (upper.checked && !passContain(result, upperRegEx)) {
            let newResult = result.join('');
            console.log('upper: ' + newResult);
            let newVal = newResult.replace(newResult[Math.floor(Math.random() * newResult.length)], upperArr[Math.floor(Math.random() * upperArr.length)]);
            return newVal;
        }

        if (lower.checked && !passContain(result, lowerRegEx)) {
            let newResult = result.join('');
            console.log('lower: ' + newResult);
            let newVal = newResult.replace(newResult[Math.floor(Math.random() * newResult.length)], lowerArr[Math.floor(Math.random() * lowerArr.length)]);
            return newVal;
        }
    }
    if (n >= 4) {
        let symbAll = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()';

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