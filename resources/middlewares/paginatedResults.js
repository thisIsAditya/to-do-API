
 const paginatedResults = (model) =>
 async (req, res, next) => {
    let page;
    let limit;
    if(!req.query.page){
        page = 1
    }
    if(!req.query.limit){
        limit = 25
    }
    page = parseInt(req.query.page);
    limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {}
    if(endIndex < await model.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if(startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    try{
        const paginationParams = {
            limit,
            startIndex
        }
        req.paginationParams = paginationParams;
        req.model = model;
        next()
    } catch (e) {
        console.log(e, "This is error in paginatedresults middleware");
        res.status(500).send({ status : "failed" ,message: e.message})
    }
 }

export default paginatedResults;
