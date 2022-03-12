const listAllBtn = document.getElementById('listAllBtn');
const newBtn = document.getElementById('newBtn');

const listTable = document.getElementById('listTable');
const tableBody = document.getElementById('tableBody');

const newPage = document.getElementById('newPage');
const editPage = document.getElementById('editPage');

const newName = document.getElementById('newName');
const newAge = document.getElementById('newAge');
const newJerseyNumber = document.getElementById('newJerseyNumber');
const newCity = document.getElementById('newCity');
const submitNewPlayerBtn = document.getElementById('submitNewPlayerBtn');

const editName = document.getElementById('editName');
const editAge = document.getElementById('editAge');
const editJerseyNumber = document.getElementById('editJerseyNumber');
const editCity = document.getElementById('editCity');
const submitEditedPlayerBtn = document.getElementById('submitEditedPlayerBtn');

const baseApi = 'https://hockeyplayers.systementor.se/DavidAi/player'

class HockeyPlayer {
    constructor(id, name, age, jerseyNumber, city) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.jerseyNumber = jerseyNumber;
        this.city = city;
    }
}

listAllBtn.addEventListener("click", () => {
    showPage('listTable');
});

newBtn.addEventListener("click", () => {
    showPage('newPage');
});


function showPage(pageId) {
    if (pageId == 'listTable') {
        listTable.style.display = "block";
        newPage.style.display = "none";
        editPage.style.display = "none";
    }
    else if (pageId == 'newPage') {
        listTable.style.display = "none";
        newPage.style.display = "block";
        editPage.style.display = "none";
    }
    else if (pageId == 'editPage') {
        listTable.style.display = "none";
        newPage.style.display = "none";
        editPage.style.display = "block";
    }
}

submitNewPlayerBtn.addEventListener('click', () => {
    const newHockeyPlayer = {
        namn: newName.value,
        age: newAge.value,
        jersey: newJerseyNumber.value,
        born: newCity.value
    };


    const reqParams = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(newHockeyPlayer)
    };
    fetch(baseApi, reqParams)
        .then(response => response.json())
        .then(json => {
            const player = new HockeyPlayer(
                json.id,
                newName.value,
                newAge.value,
                newJerseyNumber.value,
                newCity.value)

            players.push(player);
            console.log(player)
            createTr(player);
            showPage('listTable');
        });
})
submitEditedPlayerBtn.addEventListener("click", () => {

    const editedHockeyPlayer = {
        id: editingHockeyPlayer.id,
        namn: editName.value,
        age: editAge.value,
        jersey: editJerseyNumber.value,
        born: editCity.value
    };
    const reqParams = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(editedHockeyPlayer)
    };



    fetch(baseApi + '/' + editedHockeyPlayer.id, reqParams)
        .then(response => {
            refreshPlayer();
            showPage('listTable');
        });
});

function createTr(HockeyPlayer) {
    let jsCall = `editPlayer(${HockeyPlayer.id})`;
    let template = `<tr>
                        <td>${HockeyPlayer.name}</td>
                        <td>${HockeyPlayer.age}</td>
                        <td>${HockeyPlayer.jerseyNumber}</td>
                        <td>${HockeyPlayer.city}</td>
                        <td><a href="#" onclick="${jsCall}">Edit</td>
                    </tr>`
    tableBody.innerHTML = tableBody.innerHTML + template;
}

let editingHockeyPlayer = null;

function editPlayer(id) {
    editingHockeyPlayer = players.find((player) => player.id == id);

    editName.value = editingHockeyPlayer.name;
    editAge.value = editingHockeyPlayer.age;
    editJerseyNumber.value = editingHockeyPlayer.jerseyNumber;
    editCity.value = editingHockeyPlayer.city;
    showPage('editPage');
}

function refreshPlayer() {
    players = [];
    tableBody.innerHTML = '';

    fetch(baseApi)
        .then(response => response.json())
        .then(array => {
            console.log(array)
            array.forEach(player => {
                player = new HockeyPlayer(
                    player.id,
                    player.namn,
                    player.age,
                    player.jersey,
                    player.born)
                players.push(player)
            });
            players.forEach((player) => {
                createTr(player);
            });
        })
}

let players = [];
refreshPlayer();

showPage('listTable');