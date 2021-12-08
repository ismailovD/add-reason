const   sideBarBtn = document.querySelector('.side-bar__btn'),
        sideBar = document.querySelector('.side-bar'), 
        pageContent =document.querySelector('.global__content'), 
        dropdownWindow = document.querySelector('.side-bar__dropdown'),
        dropdownBtn = document.querySelector('.side-bar__dropdown-btn'),
        visitedPage = document.querySelectorAll('.global-item'),
        userDropdown = document.querySelector('.global__auth'),
        userBtn = document.querySelector('.user__dropdown-btn'),
        selectBtns = document.querySelectorAll('.select__btn'),
        sideBarSet = '.side-bar__settings',
        selectParent = '.select',
        selectItems = document.querySelectorAll('.select__item'),
        addReasonContent = document.querySelector('.add-reason'),
        renamePolicy = document.querySelector('.policy__edit-icon'),
        namePolicy = document.querySelector('.policy__name'),
        policyItems = document.querySelectorAll('.commonly__item'),
        policyScroll = document.querySelector('.commonly__list'),
        samplesAdd  = document.querySelectorAll('.commonly__item-plus'),
        reasonList = document.querySelector('.question__list'),
        saveReason = document.querySelector('.add-reason__save'),
        poperBg = document.querySelector('.warning__wrapper'),
        poperClose = document.querySelector('.warning__icon-close'),
        body = document.querySelector('body');
        


sideBarBtn.addEventListener('click', () => {
    sideBar.classList.toggle('active'); 
        if(sideBar.classList.contains('active')){  
            pageContent.style.marginLeft = "275px"; 
            addReasonContent.classList.add('change')
    }else {  
        dropdownWindow.classList.remove('active')
        pageContent.style.marginLeft = "65px";  
        addReasonContent.classList.remove('change')
    }
}); 
dropdownBtn.addEventListener('click', () => {
    dropdownWindow.classList.toggle('active'); 
    if(dropdownWindow.classList.contains('active')){
        sideBar.classList.add('change-height')
    }else sideBar.classList.remove('change-height')
})

userBtn.addEventListener('click', () => {
    userDropdown.classList.toggle('open')
});

visitedPage.forEach(item => {
    item.addEventListener('click', ()=> {
        visitedPage.forEach(elem => {
            elem.classList.remove('visited')
            if(elem.closest(sideBarSet)){
                elem.closest(sideBarSet).classList.remove('visited')
            }
        })
        if(item.closest(sideBarSet)){ 
            item.closest(sideBarSet).classList.add('visited')
        }
        item.classList.add('visited')
    })
})


    
  
selectBtns.forEach(btn => { 
    btn.addEventListener('click', () => {  
        document.querySelectorAll(selectParent).forEach(parent => {
            if(btn.closest(selectParent) != parent){
                parent.classList.remove('show-select')
            }
        })
        btn.closest(selectParent).classList.toggle('show-select') 
    });
})
 
 

selectItems.forEach(item => {
     item.addEventListener('click', () => { 
         if(item.getAttribute('data-status') == "on"){
            createReason (item.getAttribute('data-value'))  
            item.closest(selectParent).classList.remove('show-select');
            item.classList.add('item-selected')
            item.setAttribute('data-status', "off");
         } 
     })
})

saveReason.addEventListener('click', (event) => {
    poperBg.classList.add('show')
    body.style.overflow = "hidden"
})

poperClose.addEventListener('click', () => {
    poperBg.classList.remove('show')
    body.style.overflow = "visible"
})

let itemCount = 4;
function listHeight() {
    if(policyItems.length > itemCount){
        
        let  marginB = window.getComputedStyle(policyItems[0], null).getPropertyValue("margin-bottom"),
            borderSize = parseInt(window.getComputedStyle(policyItems[0], null).getPropertyValue("border").split(' ')[0]),
            heightSum = 0; 
            for(let i = 0; i < itemCount; i++) { 
                heightSum +=  policyItems[i].clientHeight
            } 
        policyScroll.style.height = `${(heightSum + borderSize * 2 * itemCount) + (parseInt(marginB) * (itemCount - 1)) }px`
    }
} 
listHeight() 
window.addEventListener('resize', () => {
    listHeight();
})

function createReason (name) { 
    let reason = document.createElement('li'); 
    reason.classList.add('question__item'); 
    reason.setAttribute('data-id', name)
    reason.innerHTML = `
        <span class="question__delete">
            <svg class="question__delete-icon">
                <use
                    xlink:href="./svg/sprite.svg#x"></use>
            </svg>
        </span>
        <span class="question__name ">
            ${name}
        </span>   
    `
    reasonList.appendChild(reason); 
    delReason()
}

function delReason() {
    let deleteReason = document.querySelectorAll('.question__delete');
    deleteReason.forEach(elem => {
        elem.addEventListener('click', () => {  
            selectItems.forEach(e => { 
                if(e.getAttribute('data-value') == elem.closest('.question__item').getAttribute('data-id')){ 
                    e.setAttribute('data-status', 'on')
                    e.classList.remove('item-selected')
                }
            })
            elem.closest('.question__item').remove(); 
            
        })
    })
}
const   nameReason = document.querySelector('#name-reason'),
        inpExhcange = document.querySelector('#exchange-inp'),
        inpReturn = document.querySelector('#return-inp'),
        collectRadio = document.querySelectorAll('.collection__radio'),
        collectTag =document.querySelector('#tag'),
        collectFront =document.querySelector('#front'),
        collectBack =document.querySelector('#back'),
        collectDefect =document.querySelector('#defect'),
        applicableRadio = document.querySelectorAll('.applicable__radio');


const reasons = {
    damage: {
        name: "Item is damaged",
        exchange: true,
        return: true,
        collection: "yes",
        tag: true,
        front: true,
        back: false,
        defective: false,
        applicable: "all"
    },
    size: {
        name: "Size doesn’t fit",
        exchange: true,
        return: false,
        collection: "no",
        tag: false,
        front: true,
        back: false,
        defective: false,
        applicable: "selected"
    },
    wrong: {
        name: "Wrong product received",
        exchange: false,
        return: true,
        collection: "multiple",
        tag: true,
        front: true,
        back: true,
        defective: false,
        applicable: "all"
    },
    defect: {
        name: "Item is defective",
        exchange: false,
        return: false,
        collection: "no",
        tag: false,
        front: false,
        back: true,
        defective: true,
        applicable: "selected"
    },
}  
samplesAdd.forEach(sample => {
    sample.addEventListener('click', () => {
        let example = sample.closest('.commonly__item').getAttribute('data-reason'); 
        nameReason.value = reasons[example].name;
        inpExhcange.checked = reasons[example].exchange;
        inpReturn.checked = reasons[example].return;
        collectRadio.forEach(collect => {
            if(collect.getAttribute('id') == reasons[example].collection){
                collect.checked = true;
            }
        });
        collectTag.checked = reasons[example].tag;
        collectFront.checked = reasons[example].front;
        collectBack.checked = reasons[example].back;
        collectDefect.checked = reasons[example].defective;
        applicableRadio.forEach(appl => {
            if(appl.getAttribute('id') == reasons[example].applicable){
                appl.checked = true;
            }
        });
    })
})