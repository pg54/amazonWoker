/**
 * Created by pangang on 2016/11/28.
 */
function Product(name,price) {
    this.name = name;
    this.price = price;

    if (ptice < 0) {
        throw RangeError ('Cannot create product' + this.name + 'with a nagative price');
    }
}

function Food(name,price) {
    Product.call(this,name,price);
    this.category = 'food';
}

function Toy(name,price) {
    Product.call(this,name,price);
    this.category = 'toy';
}

var cheese = new  Food('feta',5);
var fun = new Toy('robot',40);

