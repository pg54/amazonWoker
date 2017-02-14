/**
 * Created by pangang on 16/8/28.
 */

window.onload = function () {

    //表格的方法
    var tranIn = document.getElementById('tranIn');
    var dataOut = document.getElementById('dataOut');
    var description = document.getElementById('description').getElementsByTagName('input')[0];
    var packageMain = document.getElementById('packageMain');
    var productMaterial = document.getElementById('productMaterial').getElementsByTagName('input')[0];

// var selling1 = document.getElementById('selling1').getElementsByTagName('input')[0];

    var bigStr;
//
    var sizeInfo = document.getElementById('sizeInfo');

    var addUnit = document.getElementById('addUnit');

//ar info = document.getElementById('setForm');

    var sizeData = ['S','M','L','XL','2XL','3XL','4XL','5XL','6XL','7XL','8XL','9XL','10XL']

//description方法
    description.onblur = function () {
        var packageMain = document.getElementById('packageMain');
        var valueStr = description.value;
        console.log('valueStr========================'+valueStr)
        //截掉首尾单词
        var arr = valueStr.split(' ');
        document.getElementById('packageMain').innerHTML = '1*'+arr[0]+' '+arr[arr.length-1];
    };
    productMaterial.onblur = function () {
        document.getElementById('selling3').innerHTML = '3.';
        var str = document.getElementById('selling3').innerHTML;
        document.getElementById('selling3').innerHTML = str + productMaterial.value;

    }
// selling1.onclick = function () {
//     document.getElementById('selling1').innerHTML += '<li class="choseLI">kkkkkkkkkkkkkkkkkkkkkk</li><li class="choseLI">nnnnnnnnnnnnnnnnnnnn</li><li class="choseLI">pppppppppppppppppppppp</li> ';
//     var arr = document.getElementsByClassName('choseLI');
//     arr.forEach(function () {
//         this.onclick = function () {
//             console.log('uuuuuuuuuuuuuuuuuuuuuuu');
//
//         }
//     })
// }




//增加单位方法
    addUnit.onclick = function () {
        var str = sizeInfo.innerHTML;
        sizeInfo.innerHTML = str + '<input class="sizeUnit">'
    }
//设置表格区域
    setForm.onclick = function () {
        document.getElementById('infoBefore').innerHTML = '';
        var arr = document.getElementsByClassName('sizeUnit');
        var arrdata = new Array;
        //每一行后面M:后面的内容
        var lineStr = '';
        for (var i=0;i<arr.length;i++) {
            var ele = arr[i];
            arrdata[i] ='  '+ ele.value + '  ';
            lineStr += '<input type="text" style="width: 40px" maxlength="3" class="enterIn">cm&nbsp&nbsp';
        }
        //第一行
        var firstLineStr = 'SIZE' + arrdata.join(',') + '<br>';

        var firstChar = document.getElementById('size1').value;
        var lastChar = document.getElementById('size2').value;
        var number1 = sizeData.indexOf(firstChar);
        var number2 = sizeData.indexOf(lastChar);
        console.log(number1);
        console.log(number2);
        var sizeNameArr = sizeData.slice(number1,number2+1);
        //
        var htmlStr = firstLineStr;
        console.log('前'+htmlStr);
        for (var i=0;i<sizeNameArr.length;i++) {
            htmlStr += sizeNameArr[i] + ': ' + lineStr + '<br>';
        }
        console.log('后'+htmlStr);
        document.getElementById('infoBefore').innerHTML= htmlStr;
    }


// tranIn.onclick = function () {
//     var dataStr1 = document.getElementById('infoAfter').innerHTML;
//     console.log(dataStr1);
//     var arr =  dataStr1.match(/\d{1,3}/g);
//     console.log(arr);
//     var newArr = getIn(arr);
//     console.log(newArr);
//     var str1 = chuli(/\d{1,3}|/g,dataStr1,newArr);
//     document.getElementById('new').innerHTML = str1;
//
// };
    dataOut.onclick = function () {

        //除了表格以外的元素
        var mainStr = document.getElementById('mainInfo').innerHTML;
        console.log(mainStr.replace(/<input\w+>/g,''));

        var arr = document.getElementsByClassName('enterIn');
        var arrdata = new Array;
        for (var i=0;i<arr.length;i++) {
            var ele = arr[i];
            arrdata[i] = ele.value + 'cm';
        }
        console.log(arrdata);
        var dataStr = document.getElementById('infoBefore').innerHTML;
        console.log(dataStr);
        //删除<div id="infoBefore">中的input标签
        var strDelInput = dataStr.replace(/<input type="text" style="width: 40px" maxlength="3" class="enterIn">/g,'');
        console.log(strDelInput);
        var textShow = document.getElementById('infoAfter');
        var str11 = chuli(/cm/g,strDelInput,arrdata);
        console.log('str11=========='+str11);
        textShow.innerHTML = str11;
        //获取如 330cm 的数组
        var NoXLArr = str11.match(/\d{1,3}cm/g);
        console.log('NoXLArr======='+NoXLArr);
        //将数组中如220cm处理成22
        var newArr = new Array;
        for (var i=0;i<NoXLArr.length;i++) {
            var str = NoXLArr[i].replace(/cm/,'');
            var number = parseInt(str)/2.54;
            newArr[i] = parseFloat(number).toFixed(2) + 'in';
        }
        console.log('newArr========='+ newArr);
        // var infoEnd = document.getElementById('infoEnd');
        var resultStr = chuli(/\d{1,3}cm/g,str11,newArr);
        console.log('resultStr========='+resultStr);
        textShow.innerHTML =  resultStr;
    }

    function chuli(str,infoBefore,inNumberArr) {
        var textArr = infoBefore.split(str);
        //for循环恢复
        for (var i=0;i<textArr.length;i++) {
            console.log(textArr[i]);
            if (i<=textArr.length-1) {
                bigStr += textArr[i] + inNumberArr[i] ;
                console.log('***' + inNumberArr[i]);
            } else {
                bigStr += textArr[i];
            }
        }
        return bigStr.replace(/d|undefine/g,'');
    }

    function getIn(arr) {
        var newArr = [];
        for (var i=0;i<arr.length;i++) {
            var number = parseInt(arr[i])/2.54;
            newArr[i] = parseFloat(number).toFixed(2) + 'in';
        }
        return newArr;
    }
    
}

