const values = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'abcdefghijklmnopqrstuvwxyz',
    '0123456789',
    '!@#$%^&*'
];

const getRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]; 
}

function changeLength(val) {
    document.getElementById('passwordLength').textContent = val;
    const css = `#range::-webkit-slider-runnable-track {background: linear-gradient(to right,  #5BC08E 0%, #5BC08E ${val*100/15}%, rgb(29, 29, 29) ${val*100/15}%, rgb(29, 29, 29) 100%)}`;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
}

function Generate () {
    let password = '';
    const size = Number(document.getElementById('range').value);
    const arr = document.getElementById('restrictions');
    let components = [];
    for (let i = 0; i < 4; ++i) {
        if (arr[i].checked == true) {
            components.push(i);
        }
    }
    if (size == 0 || components.length == 0 || components.length > size) {
        document.getElementById('copy').innerHTML = '';
        document.getElementById('copy').disabled = true;
        document.getElementById('password').innerHTML = '';
        setStrength(0);
        bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast')).show();
        return;
    }
    let randomValues = [];
    for (let i = 0; i < size; ++i) {
        randomValues.push(i < components.length ? getRandom(values[components[i]]) : getRandom(values[getRandom(components)]));
    }
    for (let i = 0; i < size; ++i) {
        const val = getRandom(randomValues);
        password += val;
        randomValues.splice(randomValues.findIndex((x) => x == val), 1);
    }
    const myTooltip = document.getElementById('copy');
    myTooltip.innerHTML = `<img src="./copy-icon.png">`;
    myTooltip.disabled = false;
    myTooltip.setAttribute('data-bs-original-title', 'copy to clipboard');
    document.getElementById('password').innerHTML = password;
    Strength(size, components.length);
}

const colors = ['', '#dc3545', '#fd7e14', '#ffc107', '#198754'];
const strengths = ['', 'WEEK', 'GOOD', 'VERY GOOD', 'STRONG'];
function Strength (x, y) {
    if (x >= 10) {
        setStrength(4);
    }
    else if (x >= 8) {
        setStrength(y == 1 ? 3 : 4);
    }
    else if (x >= 6) {
        setStrength(y == 1 ? 2 : 3);
    }
    else if (x >= 4) {
        setStrength(y == 1 ? 1 : 2);
    }
    else {
        setStrength(1);
    }
}
function setStrength (index) {
    document.getElementById('strength').innerHTML = `<h4 style="color: ${colors[index]}">${strengths[index]}</h4>`;
    document.getElementById('strengthContainer').innerHTML = '';
    for (let i = 0; i < 4; ++i) {
        const box = document.createElement('div');
        box.className = 'strengthBoxes';
        if (i < index) {
            box.style.backgroundColor = colors[i + 1];
        }
        if (index != 0) {
            box.className += ' move';
        }
        document.getElementById('strengthContainer').appendChild(box);
    }
}
setStrength(0);

function copy () {
    const val = document.getElementById('password').textContent;
    const myTooltip = document.getElementById('copy');
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(myTooltip);    
    tooltip.hide();
    myTooltip.setAttribute('data-bs-original-title', 'copied!');
    tooltip.show();
    navigator.clipboard.writeText(val);
    myTooltip.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="color: #5BC08E" width="40" height="40" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
    </svg>`;
    setTimeout(() => {
        myTooltip.innerHTML = `<img src="./copy-icon.png">`;
        tooltip.hide();
        myTooltip.setAttribute('data-bs-original-title', 'copy to clipboard');
        // tooltip.show();
    }, 1000);
}

function check (index) {
    document.getElementById(`check-${index}`).checked ^= 1;
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))