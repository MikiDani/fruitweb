checkInputs = (inputDatas, mandatory) => {

    let checkTables = {};
    let returnTable = {};

    mandatory.forEach(element => {
        checkTables[element] = 0;
    });

    let n = 0;
    Object.keys(inputDatas).forEach(inputKey => {
        //console.log(n, ". | ", inputKey, " = ", inputDatas[inputKey]);
        Object.keys(checkTables).forEach(checkKey => {
            if (checkKey == inputKey) {
                if (typeof inputDatas[inputKey] != 'undefined') {
                    checkTables[inputKey] = 1;
                    returnTable[inputKey] = inputDatas[inputKey];
                }
            }
        });
        n++;
    });

    //console.log(checkTables);
    let allTrue = true;
    Object.keys(checkTables).forEach(checkKey => {
        if (checkTables[checkKey] != 1) {
            allTrue = false;
        }
    })

    const result = (allTrue) ? returnTable : false;
    return result;
}

module.exports = { checkInputs };