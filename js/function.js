var items = [];
var STORAGE_KEY = "lista_spesa_cache";

var shoppingList = document.getElementById("shoppingList");
var modalOverlay = document.getElementById("modalOverlay");
var itemInput = document.getElementById("itemInput");
var btnOpenModal = document.getElementById("btnOpenModal");
var btnConfirm = document.getElementById("btnConfirm");
var btnCancel = document.getElementById("btnCancel");
var btnSave = document.getElementById("btnSave");
var btnClear = document.getElementById("btnClear");
var toast = document.getElementById("toast");

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(function() {
    toast.classList.remove("show");
  }, 2000);
}

function renderList() {
  shoppingList.innerHTML = "";

  if (items.length === 0) {
    var emptyLi = document.createElement("li");
    emptyLi.className = "empty-msg";
    emptyLi.textContent = "The list is empty";
    shoppingList.appendChild(emptyLi);
    return;
  }

  items.forEach(function(itemText, index) {
    var li = document.createElement("li");
    li.className = "item-card";

    var span = document.createElement("span");
    span.className = "item-text";
    span.textContent = itemText;

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
      removeItem(index);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    shoppingList.appendChild(li);
  });
}

function addItem() {
  var text = itemInput.value.trim();
  if (text !== "") {
    items.push(text);
    renderList();
    itemInput.value = "";
    closeModal();
  }
}

function removeItem(index) {
  items.splice(index, 1);
  renderList();
}

function openModal() {
  modalOverlay.classList.add("active");
  itemInput.value = "";
  setTimeout(function() {
    itemInput.focus();
  }, 100);
}

function closeModal() {
  modalOverlay.classList.remove("active");
}

function saveToCache() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    showToast("Saved");
  } catch(e) {
    showToast("Error saving!");
  }
}

function loadFromCache() {
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      items = JSON.parse(saved);
    }
  } catch(e) {
    items = [];
  }
  renderList();
}

function clearAll() {
  if (items.length === 0) return;
  items = [];
  renderList();
  showToast("Empty list!");
}

btnOpenModal.addEventListener("click", openModal);
btnCancel.addEventListener("click", closeModal);
btnConfirm.addEventListener("click", addItem);

itemInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addItem();
  }
});

modalOverlay.addEventListener("click", function(e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

btnSave.addEventListener("click", saveToCache);
btnClear.addEventListener("click", clearAll);

loadFromCache();
