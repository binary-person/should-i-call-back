function appendAlias(carrierName) {
    for (const alias in aliases) {
        if (aliases[alias].includes(carrierName)) {
            return `(${alias}) ${carrierName}`;
        }
    }
    return carrierName;
}

async function lookupPhoneNumber(phoneNumber) {
    let response;
    try {
        response = await (await fetch('https://api.telnyx.com/anonymous/v2/number_lookup/' + phoneNumber)).json();
    } catch (e) {
        return 'Unknown error occurred.'
    }
    if (response.errors) {
        return response.errors[0].detail;
    }
    const data = response.data;
    return {
        display: {
            'Phone type': data.carrier.type || 'Unknown type',
            'Carrier provider': appendAlias(data.carrier.name || 'Unknown carrier'),
            'Phone number': data.phone_number,
            'National format': data.national_format,
            'Country Code': data.country_code
        },
        analysis: analyze(data)
    };
}
