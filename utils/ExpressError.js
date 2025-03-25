class ExpressError extends Error{
    constructor(status_code,msg){
        super();
        this.status=status_code;
        this.message=msg;
    }
}
module.exports=ExpressError