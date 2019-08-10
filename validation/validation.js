module.exports = {
    validatejson: function (jsonObj) {
        var errDesc = '';
        var objError = {
            validjson: true,
            description: ''
        };

        for (var keyval in jsonObj) {
            if (keyval != 'integrations') {
                objError.validjson = false;
                errDesc += 'integrations Key missing in json.';
            }
            else {
                var innerObj = jsonObj[keyval];
                if (innerObj.hasOwnProperty('All') == false) {
                    objError.validjson = false;
                    errDesc += 'All Key missing in integrations.';
                } else {
                    if (innerObj['All'] = '') {
                        objError.validjson = false;
                        errDesc += 'All Key value missing in integrations.';
                    }
                }

                if (innerObj.hasOwnProperty('Google Analytics') == false) {
                    objError.validjson = false;
                    errDesc += 'Google Analytics Key missing in integrations.';
                } else {
                    if (innerObj['Google Analytics'] = '') {
                        objError.validjson = false;
                        errDesc += 'Google Analytics Key Value missing in integrations.';
                    }
                }

                if (innerObj.hasOwnProperty('Segment.io') == false) {
                    objError.validjson = false;
                    errDesc += 'Segment.io Key missing in integrations.';
                } else {
                    if (innerObj['Segment.io'] = '') {
                        objError.validjson = false;
                        errDesc += 'Segment.io Key value missing in integrations.';
                    }
                }
            }
        }

        objError.description = errDesc;
        return objError;
    }
};
