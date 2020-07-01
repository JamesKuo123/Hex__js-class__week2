document.querySelector('#openPost').addEventListener('click', openModal);
document.querySelectorAll('.modal__shadow').forEach(element => {
    element.addEventListener('click', ifModalShadow);
});
document.querySelectorAll('.closeModal').forEach(element => {
    element.addEventListener('click', closeModal);
});
document.querySelector('#get').addEventListener('click', getDataBtn);
document.querySelector('#post').addEventListener('click', postDataBtn);
document.querySelector('#edit').addEventListener('click', editDataBtn);


function putEventListener() {
    document.querySelectorAll('.delete').forEach(element => {
        element.addEventListener('click', deleteData);
    });
    document.querySelectorAll('.edit').forEach(element => {
        element.addEventListener('click', openModal);
    });
}

function getDataBtn(e) {
    e.preventDefault();
    getData();
}
function postDataBtn(e) {
    e.preventDefault();
    postData();
    closeModal(e);
}
function editDataBtn(e) {
    e.preventDefault();
    patchData();
    closeModal(e);
}
function openModal(e) {
    e.preventDefault();
    let target = e.target.dataset.target;
    document.getElementById(target).classList.add('show');
    if (target == "postModal") {
        clearForm(target);
    } else if(target == "editModal") {
        let whichItem = e.target.closest('.list__item').dataset.id;
        defaultForm(whichItem);
    }
}
function closeModal(e) {
    e.preventDefault();
    e.target.closest('.modal').classList.remove('show');
}
function ifModalShadow(e) {
    if (e.target.classList.contains('modal__shadow')) {
        closeModal(e);
    }
}
function clearForm(target) {
    let target_form = document.getElementById(target).querySelectorAll('input');
    target_form.forEach(element => {
        element.value = '';
    });
}
function defaultForm(id) {
    document.querySelector('#edit_title').value = database[id].title;
    document.querySelector('#edit_category').value = database[id].category;
    document.querySelector('#edit_content').value = database[id].content;
    document.querySelector('#edit_price_ori').value = database[id].origin_price;
    document.querySelector('#edit_price').value = database[id].price;
    document.querySelector('#edit_url').value = database[id].imageUrl[0];
    document.querySelector('#edit_item_id').dataset.editid = id;
    document.querySelector('#edit_item_id').innerHTML = `Editing: Item no. ${Number(id)+1}`
}