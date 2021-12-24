const aliases = {
    'AT&T': ['NEW CINGULAR WIRELESS PCS, LLC'],
    'T-Mobile': ['OMNIPOINT COMMUNICATIONS ENTER']
};

const carrierList = {
    trusted: [{
        name: 'NEW CINGULAR WIRELESS PCS, LLC',
        msg: 'This number came from an AT&T customer.'
    }, {
        name: 'OMNIPOINT COMMUNICATIONS ENTER',
        msg: 'This number came from a T-Mobile customer.'
    }, {
        name: 'VERIZON',
        msg: 'This number came from a Verizon customer.'
    }, {
        name: 'COMCAST',
        msg: 'This number came from a Comcast customer.'
    }, {
        name: 'BANDWIDTH.COM CLEC, LLC',
        msg: 'BANDWIDTH.COM is a phone number service that has a history of active prevention of spam calls. This is likely a Google Voice number.'
    }],
    highRisk: [{
        name: 'ONVOY, LLC',
        msg: 'ONVOY has a history of allowing spam calls. This likely came from a spam caller.'
    }, {
        name: 'LEVEL 3 COMMUNICATIONS, LLC',
        msg: "LEVEL 3 COMMUNICATIONS phone numbers are used by businesses and scammers. Google the number to be sure it belongs to a legitimate business."
    }],
    blacklist: []
};
