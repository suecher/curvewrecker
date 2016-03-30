module.exports = {
    createResult:function(_result,_errorType,_errprMessage,_body){
        var resultObj = {};
        resultObj.result = _result;
        resultObj.errorType = _errorType;
        resultObj.errprMessage = _errprMessage;
        resultObj.body = _body;
        return resultObj;
    }
};