const phoneElement = document.querySelector('#phone');
const errorElement = document.querySelector('.error');
const infoElement = document.querySelector('.info');
const dataContainer = document.querySelector('.data-container');
const analysis = document.querySelector('#analysis');
const table = document.querySelector('table');
const nationalLink = document.querySelector('#national-format-link');
const e164Link = document.querySelector('#e164-format-link');

const phoneInput = window.intlTelInput(phoneElement, {
    utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
});

function generateGoogleLink(searchQuery) {
    return 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery);
}

function setError(err) {
    if (err) {
        errorElement.textContent = 'Error: ' + err;
        errorElement.style.display = 'block';
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}
function setInfo(info) {
    if (info) {
        infoElement.textContent = info;
        infoElement.style.display = 'block';
    } else {
        infoElement.textContent = '';
        infoElement.style.display = 'none';
    }
}

function handleSubmit(event) {
    setError();
    setInfo();
    dataContainer.style.display = 'none';
    event.preventDefault();

    lookup();
}

async function lookup(fromHash) {
    const phoneNumber = phoneInput.getNumber();

    if (!fromHash) location.hash = phoneNumber;
    if (!phoneNumber.startsWith('+')) {
        setError('Invalid phone number');
        return;
    }

    setInfo('Loading...');
    const lookup = await lookupPhoneNumber(phoneNumber.slice(1));
    setInfo();

    if (typeof lookup === 'string') {
        setError(lookup);
        return;
    }

    const nationalPhoneFormat = lookup.display['National format'];
    const e164PhoneFormat = lookup.display['Phone number'];
    nationalLink.href = generateGoogleLink(`"${nationalPhoneFormat}"`);
    nationalLink.textContent = nationalPhoneFormat;
    e164Link.href = generateGoogleLink(`"${e164PhoneFormat}"`);
    e164Link.textContent = e164PhoneFormat;

    dataContainer.style.display = 'block';
    displayData(lookup.display);

    analysis.className = lookup.analysis.color;
    analysis.textContent = lookup.analysis.text;
}

function displayData(display) {
    const tbody = document.createElement('tbody');
    table.replaceChildren(tbody);
    for (const prop in display) {
        const tr = document.createElement('tr');
        const left = document.createElement('td');
        const right = document.createElement('td');
        left.className = 'td-left';
        right.className = 'td-right';
        left.textContent = prop;
        right.textContent = display[prop];
        tr.appendChild(left);
        tr.appendChild(right);
        tbody.appendChild(tr);
    }
}

function onHashChange() {
    const hash = location.hash.slice(1);
    if (hash) {
        phoneElement.value = hash;
        lookup(true);
    }
}
phoneInput.promise.then(onHashChange);
window.addEventListener('hashchange', onHashChange);
