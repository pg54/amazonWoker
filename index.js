/**
 * Created by pangang on 2016/10/12.
 */




const ipc = require('electron').ipcRenderer
const newWin = document.getElementById('newWin');

newWin.addEventListener('click',function () {
    ipc.send('new-windown');
})








