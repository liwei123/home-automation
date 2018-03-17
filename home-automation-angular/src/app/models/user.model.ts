class User {
    _id:string;
    username: string;
    password: string;
    date: Date;

    constructor(
    ){
        this.username = ""
        this.password = ""
        this.date = new Date()
    }
}

export default User;