const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
let item = document.querySelector(".todo-input");
let todoInputBtn = document.querySelector(".todo-input-btn");
let todoList = document.querySelector(".todo-list");
let searchInput = document.querySelector(".search-input");


todoInputBtn.addEventListener("click", () => {
    createItem(item.value);
})

searchInput.addEventListener("input", searchItems);


//display Items

function displayItems(items) {
    let itemsHTML = "";
    items.forEach((item) => {
        itemsHTML += `
        <li class="item">
            <div class="input-controller">
                <textarea class="todo-text" disabled>${item}</textarea>
                <div class="edit-controller">
                    <i class="fa-solid fa-trash delete-btn"></i>
                    <i class="fa-solid fa-pen-to-square edit-btn"></i>
                </div>
                <div class="update-controller">
            <button class="save-btn">Save</button>
            <button class="cancel-btn">Cancel</button>
            </div>
        </div>
        </li>
    `;
    });
    todoList.innerHTML = itemsHTML;
    deleteItem();
    editItem();
    saveItem();
    cancelEditItem();
}

//delete item

function deleteItem() {
    let deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach((db) => {
        db.addEventListener("click", (e) => {
            let itemElement = e.target.closest(".item");
            let index = Array.from(itemElement.parentNode.children).indexOf(itemElement);
            let originalIndex = itemsArray.indexOf(itemsArray.find((item) => item === todoList.children[index].querySelector(".todo-text").value));
            itemsArray.splice(originalIndex, 1);
            localStorage.setItem("items", JSON.stringify(itemsArray));

            if (searchInput.value.trim() !== "") {
                searchItems();
            } else {
                displayItems(itemsArray);
            }
        });
    });
}

// edit item

function editItem() {
    let editBtn = document.querySelectorAll(".edit-btn");
    let updateController = document.querySelectorAll(".update-controller");
    let todoText = document.querySelectorAll(".todo-text");
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            updateController[i].style.display = "flex";
            todoText[i].disabled = false;
            todoText[i].style.boxShadow = "0 0 5px white";
        })
    })
}

//save Item

function saveItem() {
    let SaveBtn = document.querySelectorAll(".save-btn")
    let todoText = document.querySelectorAll(".todo-text");
    SaveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            itemsArray[i] = todoText[i].value;
            localStorage.setItem("items", JSON.stringify(itemsArray));
            displayItems(itemsArray);
        })
    })
}

//cancel edit Item

function cancelEditItem() {
    let cancelBtn = document.querySelectorAll(".cancel-btn");
    let updateController = document.querySelectorAll(".update-controller");
    let todoText = document.querySelectorAll(".todo-text");
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none";
            todoText[i].disabled = true;
            displayItems(itemsArray);
        })
    })
}

function alphaCharacter(str) {
    var regex = /[a-zA-Z]/;
    return regex.test(str);
  }

function createItem(itemValue) {
    let errorMsg = document.querySelector(".error");
    let trimVal = itemValue.trim();
    if (trimVal.length < 5) {
        errorMsg.textContent = "The value should be at least 5 characters long.";
    } else if (!alphaCharacter(itemValue)) {
        errorMsg.textContent = "The value should contain at least one alphabetic character.";
    } else {
        itemsArray.push(trimVal);
        localStorage.setItem("items", JSON.stringify(itemsArray));
        displayItems(itemsArray);
        errorMsg.textContent = "";
        item.value = ""; // Clear the input field
    }
}

//search item

function searchItems() {
    let searchTerm = searchInput.value.toLowerCase();
    let filteredItems = itemsArray.filter(item => item.toLowerCase().includes(searchTerm));
    document.querySelector(".edit-controller")
    displayItems(filteredItems);
}

window.onload = function () {
    displayItems(itemsArray);
}


