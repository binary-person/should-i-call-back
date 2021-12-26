const aliases = {
    'AT&T': ['NEW CINGULAR WIRELESS PCS, LLC'],
    'T-Mobile': ['OMNIPOINT COMMUNICATIONS ENTER'],
    'CenturyLink': ['QWEST CORPORATION']
};

const defaultCarrierMessage = {
    trusted: "This carrier's phone numbers are used by a lot of businesses and very few robocallers.",
    highRisk: "This carrier's phone numbers are used by some businesses and some robocallers. Google the number to be sure it belongs to a legitimate business.",
    blacklist: "This carrier's phone numbers are used by very few businesses and a lot of robocallers."
};
const carrierList = {
    trusted: [{
        name: 'NEW CINGULAR WIRELESS PCS, LLC',
        msg: 'This number came from an AT&T customer.'
    }, {
        name: 'OMNIPOINT COMMUNICATIONS ENTER',
        msg: 'This number came from a T-Mobile customer.'
    }, {
        name: 'QWEST CORPORATION',
        msg: 'This number came from a CenturyLink customer.'
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
    }, 'LEVEL 3 COMMUNICATIONS, LLC', 'TELEPORT COMMUNICATIONS GROUP'],
    blacklist: []
};
