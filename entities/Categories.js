export class Category {
    title;
    id;
    goods;

    constructor(title, id, goods = []) {
        this.goods = goods;
        this.id = id;
        this.title = title;
    }
}