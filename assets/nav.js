const storage = require('electron-json-storage')

//打开上次关闭时的页面
// storage.get('activeSectionButtonId',function (err,id) {
//     if (err) return console.error(err)
//    
//     //存在的id
//     if (id && id.length) {
//         showMainContent()
//         const section = document.getElementById(id)
//         if (section) section.click()
//        
//     } else {
//         activateDefaultSection()
//         dispalayAbout()
//     }
// })




document.body.addEventListener('click',function (event) {
    if (event.target.dataset.section) {
        handleSectionTrigger(event)
    } else if (event.target.dataset.modal) {
        handleModalTrigger(event)
    } else if (event.target.classList.contains('modal-hied')) {
        hideAllModals()
    }
})

function handleSectionTrigger(event) {
    hideAllSectionsAndDeselectButtons()
    even.target.classList.add('is-selected')
    //通过data-section获取windows,然后字符串连接成windows-section
    const sectionID = event.target.dataset.section+'-section'
    //将现在点击的button保存到内存
    const buttonID = event.target.getAttribute('id')
    storage.set('activeSectionButtonId',buttonID,function (err) {
        if (err) return console.error(err)
    })
}

function activateDefaultSection() {
    //默认
    document.getElementById('button-crawler').onclick(function () {
        console.log('here1');
    });
}
function showMainContent() {
    document.querySelector('.js-nav').classList.add('is-shown')
    document.querySelector('js-content').classList.add('is-shown')
}

function handleModalTrigger(event) {
    hideAllModals()
    const modalID = event.target.dataset.modal+'-modal'
    document.getElementById(modalID).classList.add('is-shown');
}





function displayAbout() {
    document.querySelector('#about-modal').classList.add('is-shown')
}