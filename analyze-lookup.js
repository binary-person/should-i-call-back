function analyze(data) {
    switch (data.country_code) {
        case 'US':
            return checkRunner(data, USNumberChecks);
        default:
            return checkRunner(data, otherNumberChecks);
    }
}

function checkRunner(data, checks) {
    checks = allNumberChecksPre.concat(checks).concat(allNumberChecksPost);
    for (const check of checks) {
        const result = check(data);
        if (result) return result;
    }
    return other('I am unable to determine whether you should call back.');
}

// all number checks before all other checks //
const allNumberChecksPre = [
    function carrierCheck(data) {
        if (!data.carrier.name) return;
        const doCheck = function (list, generator, defaultMsg) {
            for (const carrier of list) {
                if (data.carrier.name.includes(carrier.name || carrier)) {
                    return generator(carrier.msg || defaultMsg);
                }
            }
        };
        return doCheck(carrierList.trusted, doCallBack, defaultCarrierMessage.trusted)
            || doCheck(carrierList.highRisk, highRisk, defaultCarrierMessage.highRisk)
            || doCheck(carrierList.blacklist, dontCallBack, defaultCarrierMessage.blacklist)
            || undefined;
    }
];

// all number checks after all other checks fail //
const allNumberChecksPost = [
    function landlineCheck(data) {
        if (data.carrier.type === 'fixed line') {
            return highRisk('Call back with caution, as I have not seen this carrier provider before. Fixed line numbers are used by a lot of home phones, businesses, and robocallers. If you do not recognize nor can you find any information on Google about this number, this likely came from a robocaller.', true);
        }
    },
    function voipCheck(data) {
        if (data.carrier.type === 'voip') {
            return highRisk('Call back with caution, as I have not seen this carrier provider before. VOIP numbers are calls made over the internet. If you cannot find information on Google about this number, this likely came from a robocaller.', true);
        }
    },
    function mobileCheck(data) {
        if (data.carrier.type === 'mobile') {
            return doCallBack('Though I have not seen this carrier provider before, because this call was made from a mobile phone, this is likely a legitimate phone call.');
        }
    }
];

// US country number checks //
const USNumberChecks = [
    function formatCheck(data) {
        if (!(data.phone_number.startsWith('+1') && data.phone_number.length === 12)) {
            return dontCallBack('I have not seen US phone numbers that do not fit the US phone number format.');
        }
    },
    function tollFreeCheck(data) {
        const tollFreeAreaCodes = ['800', '888', '877', '866', '855', '844', '833'];
        if (tollFreeAreaCodes.includes(data.phone_number.slice(2, 5))) {
            return other('This is a toll free number. Google who this toll free number belongs to to determine whether you should call back.');
        }
    },
    function blacklistedAreaCodesCheck(data) {
        const blacklistedAreaCodes = ['232', '242', '246', '284', '268', '345', '441', '473', '664', '649', '758', '767', '721', '784', '809', '829', '849', '868', '876', '869'];
        if (blacklistedAreaCodes.includes(data.phone_number.slice(2, 5))) {
            return dontCallBack('A very large number of scam calls originate from this area code.');
        }
    },
    function notInServiceCheck(data) {
        if (!data.carrier.name && !data.carrier.type) {
            return other('This number is likely not in service.');
        }
    }
];

// Other country number checks //
const otherNumberChecks = [
    function mobileCheck(data) {
        if (data.carrier.type === 'mobile') {
            highRisk('If your phone number matches the country code of this phone, call back because the call is made from a mobile phone. Otherwise, ignore this.', true);
        }
    }
];

// responses //
function dontCallBack(reason, override) {
    return { color: 'red', text: override ? reason : 'Do not call back. ' + reason };
}
function highRisk(reason, override) {
    return { color: 'orange', text: override ? reason : 'Call back with caution. ' + reason };
}
function doCallBack(reason, override) {
    return { color: 'green', text: override ? reason : "Call back. " + reason };
}
function other(reason, override) {
    return { color: 'gray', text: override ? reason : reason };
}
