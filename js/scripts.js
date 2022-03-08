const form = document.getElementById("form");
const inputForm = document.getElementById("input_value");
const cloneContent = document.getElementById("list_clone");
const listContainer = document.getElementById("list_container");
const theme = document.getElementById("change_theme")
const icontheme = document.getElementById("icon_theme")

theme.addEventListener("click", ()=>{
    document.body.classList.toggle("light")
    if(icontheme.src.includes("icon-sun.svg")) icontheme.src = "assets/icons/icon-moon.svg"
    else icontheme.src = "assets/icons/icon-sun.svg"
})

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(!inputForm.value){
        console.log("empty content")
    }else{
        let nodeCloned=cloneContent.cloneNode(true);
        nodeCloned.classList.remove("hidden")
        nodeCloned.classList.add("active")
        nodeCloned.children[0].children[1].textContent=inputForm.value;
        inputForm.value="";
        listContainer.prepend(nodeCloned);
    }
    listContainer.lastElementChild.children[0].children[0].textContent=listContainer.children.length-2;
    
})

listContainer.addEventListener("click", (e)=>{
    if(e.target.classList=="mark"){
        e.target.parentElement.parentElement.classList.add("completed")
        e.target.parentElement.parentElement.classList.remove("active")
        e.target.classList.add("checked")
        e.target.children[0].classList.add("checked")
        e.target.nextElementSibling.classList.add("checked")
    }else if(e.target.classList=="delete_todo"){
        let numberAux=0;
        let copy=0;
        let nameSelected = e.target.parentElement.children[0].children[1].textContent;
        for(const auxTar of listContainer.children){
            numberAux+=1;
            if(nameSelected===auxTar.children[0].children[1].textContent){
                copy=numberAux-1;
            }
        }
        listContainer.removeChild(listContainer.children[copy])
        listContainer.lastElementChild.children[0].children[0].textContent=listContainer.children.length-2;
    }
    if(e.target.classList=="button_clear"){
        for(let i = 0; i < listContainer.children.length; i++){
            let cont=0;
            for(const auxDelete of listContainer.children){
                if(auxDelete.classList[1]=="completed"){
                    listContainer.removeChild(listContainer.children[cont])
                }
                cont+=1;
            }
        }
        listContainer.lastElementChild.children[0].children[0].textContent=listContainer.children.length-2;
    }
})

const todoCont = document.getElementById("todo_content")

todoCont.addEventListener("click", (e)=>{
    for(let i=0; i <e.target.parentElement.children.length; i++){
        if(e.target.parentElement.children[i].classList[1]=="on") e.target.parentElement.children[i].classList.remove("on")
    }
    if(e.target.text==="Active"){
        for(const auxHelp of listContainer.children){
            if(auxHelp.classList[1]=="completed") auxHelp.classList.add("hidden")
            else auxHelp.classList.remove("hidden")
            listContainer.lastElementChild.children[0].children[0].textContent=listContainer.children.length-2;
        }
        cloneContent.classList.add("hidden")
    }else if(e.target.text==="Completed"){
        for(const auxHelp of listContainer.children){
            if(auxHelp.classList[1]=="active") auxHelp.classList.add("hidden")
            else auxHelp.classList.remove("hidden")
            listContainer.lastElementChild.children[0].children[0].textContent=listContainer.children.length-2;
        }
        cloneContent.classList.add("hidden")
    }else{
        for(const auxHelp of listContainer.children){
            if(auxHelp.classList[1]=="hidden" || auxHelp.classList[2]=="hidden") auxHelp.classList.remove("hidden")
            listContainer.lastElementChild.children[0].children[0].textContent=listContainer.children.length-2;
        }
        cloneContent.classList.add("hidden")
    }
    e.target.classList.toggle("on")
})