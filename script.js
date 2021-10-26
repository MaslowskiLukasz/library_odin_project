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

    for(property in element) {
        let el;
        if(property === 'status') {
            el = createCheckbox(element[property]);
        }
        else {
            el = createParagraph(element[property]);
        }

        if(property === 'title') {
            el.setAttribute('class', 'title');
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
    button.addEventListener('click', showEditForm);
    return button;
}

function showAddForm() {
    const form = document.getElementById('add-form');
    form.style.display = 'flex';
}

function hideAddForm() {
    const form = document.getElementById('add-form');
    form.style.display = 'none';
}

function showEditForm() {
    const form = document.getElementById('add-form');
    const index = this.dataset.indexNumber;
    const book = myLibrary[index];

    console.log(form[0]);
    console.table(book);
    populateForm(form, book);
    showAddForm();
}

function populateForm(form, book) {
    form[0].value = 'kulawy'
}

let myLibrary = [];
myLibrary.push(new Book('title1', 'author1', '321', 'true'));
const cardSection = document.getElementById('card-section');
initCards();

const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', showAddForm);

const formAddBtn = document.getElementById('form-add-btn');
formAddBtn.addEventListener('click', _ => {
    myLibrary.push( addBookToLibrary() );
    const newCard = createCard(myLibrary.at(-1), myLibrary.length-1);
    cardSection.appendChild(newCard);
    hideAddForm();
});