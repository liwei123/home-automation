class User {
    _id:string;
    username: string;
    userPassword: string;
    createdDate: Date;

    constructor(
    ){
        this.username = ""
        this.userPassword = ""
        this.createdDate = new Date()
    }
}

export default User;