function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary() {
  const form = document.getElementById('add-form').elements;
  const formValues = [...form].filter(x => {
    return x.localName === 'input' ? true : false;
  });

  const title = formValues[0].value;
  const author = formValues[1].value;
  const pages = formValues[2].value;
  const status = formValues[3].checked;

  return new Book(title, author, pages, status);
}

function initCards() {
  const cardSection = document.getElementById('card-section');
  myLibrary.forEach((element, index) => {
    card = createCard(element, index);
    cardSection.appendChild(card);
  });
}

function createCard(element, index) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.setAttribute('data-index-number', `${index}`);

  for (property in element) {
    let el;
    if (property === 'status') {
      el = createCheckbox(element[property]);
    }
    else {
      el = createParagraph(element[property]);
    }

    if (property === 'title') {
      el.setAttribute('class', 'title');
    }
    else {
      const propertyString = property.toString();
      const label = document.createElement('p');
      label.textContent = `${propertyString.charAt(0).toUpperCase() + propertyString.slice(1)}:`;
      label.classList.add('card-label');
      card.appendChild(label);
    }

    card.appendChild(el);
  }
  card.appendChild(createEditButton(index));
  return card;
}

function createParagraph(value) {
  const element = document.createElement('p');
  element.textContent = value;
  return element;
}

function createCheckbox(status) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = status;
  return checkbox;
}

function createEditButton(index) {
  const button = document.createElement('button');
  button.textContent = 'Edit';
  button.setAttribute('data-index-number', `${index}`);
  button.setAttribute('data-button-type', 'edit');
  button.setAttribute('class', 'edit-btn');
  button.addEventListener('click', showEditForm);
  return button;
}

function showAddForm() {
  const form = document.getElementById('add-form');
  form.parentNode.parentNode.style.display = 'flex';
  form.reset();
  form.style.display = 'flex';
}

function showEditForm() {
  const form = document.getElementById('edit-form');
  form.parentNode.parentNode.style.display = 'flex';
  form.reset();
  
  const index = this.dataset.indexNumber;
  const book = myLibrary[index];
  form.dataset.indexNumber = index;
  populateForm(form, book);
  form.style.display = 'flex';
}

function hideAddForm() {
  const wrapper = document.getElementById("add-form-overlay");
  const form = document.getElementById('add-form');
  wrapper.style.display = 'none';
  form.reset();
  updateCardSection();
}

function hideEditForm() {
  const wrapper = document.getElementById("edit-form-overlay");
  const form = document.getElementById('edit-form');
  wrapper.style.display = 'none';
  form.reset();
  updateCardSection();
}

function populateForm(form, book) {
  form[0].value = book.title;
  form[1].value = book.author;
  form[2].value = book.pages;
  form[3].checked = book.status;
}

function updateCardSection() {
  cardSection.innerHTML = '';
  initCards();
}

let myLibrary = [];
myLibrary.push(new Book('How to avoid climate disaster', 'Bill Gates', '272', 'true'));
myLibrary.push(new Book('Sapiens: od zwierz??t do bog??w', 'Juwal Noach Harari', '544', 'false'));
myLibrary.push(new Book('Steve Jobs', 'Isaacson Walter', '736', 'true'));

const cardSection = document.getElementById('card-section');
initCards();

const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', showAddForm);

const addForm = document.getElementById('add-form');
addForm.addEventListener('submit', _ => {
  myLibrary.push(addBookToLibrary());
  const newCard = createCard(myLibrary.at(-1), myLibrary.length - 1);
  cardSection.appendChild(newCard);
  hideAddForm();
});

const editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', _ => {
  const index = editForm.dataset.indexNumber;
  myLibrary[index].title = editForm[0].value;
  myLibrary[index].author = editForm[1].value;
  myLibrary[index].pages = editForm[2].value;
  myLibrary[index].status = editForm[3].checked;
  hideEditForm();
});

const closeAddForm = document.getElementById('add-form-close');
closeAddForm.addEventListener('click', hideAddForm);

const closeEditForm = document.getElementById('edit-form-close');
closeEditForm.addEventListener('click', hideEditForm)
