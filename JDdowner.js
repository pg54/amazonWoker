/**
 * Created by pangang on 2017/1/7.
 */

const fs = require('fs');
const request = require("request");
const cheerio = require("cheerio");
const mkdirp = require('mkdirp');
const iconv = require('iconv-lite');


//sku数组,title数组
var skuItems = [];
var titleItems = [];

function JDdown(url,skuNumber) {
    request({url:url,encoding:null}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var html = iconv.decode(body,"gb2312");
            var $ = cheerio.load(html,{decodeEntities: false})
            //网址分类
            var downArr = $(".dd .item").toArray();
            for (var i = 0; i < downArr.length; i++) {
                var strSku = $(downArr[i]).data("sku");
                var strTitle = $(downArr[i]).data("value");
                //正则替换
                skuItems.push(strSku);
                titleItems.push(strTitle)
            }
        }
        allDown(skuNumber);
    })
}


function allDown(skuNumber) {
    for (var i = 0; i < skuItems.length; i++) {
        var originStr = "https://item.jd.com/sku.html#none";
        var skuStr = originStr.replace(/sku/, skuItems[i]);
        var titleStr = titleItems[i];
        downPicture(skuStr, titleStr,skuNumber);
    }

}

function downPicture(picUrl,title,skuNumber) {
    
//本地储存目录
    var skuStr= skuNumber + "";

    //第二级目录
    var dir = '/Users/pangang/Desktop/person/crawler/AMAZONimg/' +'ATpg' + skuStr + "/" + 'ATpg' + skuStr + "-" + title;

    //第三级目录
    var dir1 = '/Users/pangang/Desktop/person/crawler/AMAZONimg/' +'ATpg' + skuStr + "/" + 'ATpg' + skuStr + "-" + title + "/" + 'ATpg' + skuStr + "-" + title;



//创建目录
    mkdirp(dir, function (err) {
        if (err) {
            console.log(err);
        }
    });

//下载方法
    var download = function (url, dir, filename) {
        request.head(url, function (err, res, body) {
            request(url).pipe(fs.createWriteStream(dir1+ filename));
        })
    };

//发送请求
    request(picUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var imgArr = $("#spec-list .lh img");
            var srcArr = [];
            for (var i = 0; i < imgArr.length; i++) {
                var str = imgArr[i].attribs.src;

                //正则替换
                var str = str.replace(/n5/, "imgzone");
                var originURL = "https:" + str;
                srcArr.push(originURL);
            }
            ;
            for (var j = 0; j < srcArr.length; j++) {
                (function () {
                    var url = srcArr[j];
                    var number = j + 1;
                    var filename = number.toString() + '.jpg';
                    download(url, dir, filename);
                })(j)

            }

        }
    })

}

exports.JDdown = JDdown;





