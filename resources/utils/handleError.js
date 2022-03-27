const handleError = (f) => {
    return function(req, res, next){
        f(req, res, next).catch(e => next(e));
    }
}

export default handleError;