/**
 * Created by pangang on 2017/1/6.
 */

//下载京东图片


var JDdowner = require('./JDdowner')

var picDown = document.querySelector("#picDown");
var picUrl = document.querySelector("#webSrc").value;

//sku名
var skuNumber = 1000;

picDown.onclick = function () {

    //目标网址 如"https://item.jd.com/10927597800.html"
    var picUrl = document.querySelector("#webSrc").value;
    var picURLs = picUrl.split(";");

    //多个网址
    var urlstr = picUrl


    console.log(picUrl);
    //本地储存目录
    var dir = '/Users/pangang/Desktop/person/crawler/AMAZONimg';

    //路由

    picURLs.forEach(function (url) {
        console.log("每个sku网址:" + url);
        downCount(url);
    })


    //下载对象开始下载
    downCount(picUrl);
    function downCount(picUrl){
        JDdowner.JDdown(picUrl,skuNumber);
        skuNumber++;
    }


}