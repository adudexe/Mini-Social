export class Post{
    constructor(
        public id:string,
        public title:string,
        public content:string,
        public likes:number,
        public timestamp:Date,
        public author:string,
    ){};

    edit(newTitle:string,newContent:string){
        this.title = newTitle;
        this.content = newContent;
        this.timestamp =  new Date();
    }

    like(){
        this.likes += 1;
    }

    unLike(){
        this.likes -= 1;
    }
}