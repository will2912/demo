class expressError extends Error{
    constructor(stat,message){
        super(message);
        this.stat=stat;
        this.message=message;
    }
}
module.exports=expressError;