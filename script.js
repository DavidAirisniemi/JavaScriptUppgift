const listAllBtn = document.getElementById('listAllBtn');
const newBtn = document.getElementById('newBtn');

const listTable = document.getElementById('listTable');
const newPage = document.getElementById('newPage');
const editPage = document.getElementById('editPage');
const tableBody = document.getElementById('tableBody');

const newPlayer = document.getElementById('newPlayer');
const newAge = document.getElementById('newAge');
const newJerseyNumber = document.getElementById('newJerseyNumber');
const newCity = document.getElementById('newCity');

const editPlayer = document.getElementById('editPlayer');
const editAge = document.getElementById('editAge');
const editJerseyNumber = document.getElementById('editJerseyNumber');
const editCity = document.getElementById('editCity');




listAllBtn.addEventListener("click",()=>{ 
    showPage('listTable');    
    });

newBtn.addEventListener("click",()=>{ 
    showPage('newPage');    
});


function showPage(pageId){
    if(pageId == 'listTable'){
        listTable.style.display = "block";
        newPage.style.display = "none";
        editPage.style.display = "none";
    }
    else if(pageId == 'newPage'){
        listTable.style.display = "none";
        newPage.style.display = "block";
        editPage.style.display = "none";
    }
    else if(pageId == 'editPage'){
        listTable.style.display = "none";
        newPage.style.display = "none";
        editPage.style.display = "block";
    }
}

class HockeyPlayer{
    constructor(name,age,jerseyNumber,city){
        this.name = name;
        this.age = age;
        this.jerseyNumber = jerseyNumber;
        this.city = city;
    }
}