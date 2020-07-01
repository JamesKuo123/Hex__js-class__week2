var uuid = 'c1755f54-f16e-4c43-9219-49017fb1e8e8';
var token = 'cOeRtZN1wozNp1ED0RadikRxDtUGB1aV80feWVIoc8GvKzJIwyuUzTEkZace';
var apiPath = 'https://course-ec-api.hexschool.io/';
axios.defaults.headers['Authorization'] = `Bearer ${token}`;

// temperary database for data from api
var database = [];


function getData() {
  let api = `${apiPath}api/${uuid}/ec/products`;
  axios.get(api)
    .then(
      function (res) {
        rendor(res.data.data);
        database = res.data.data;
        console.log(database);
      }
    );
}
getData();
function postData() {
  let api = `${apiPath}api/${uuid}/admin/ec/product`
  let data = {
    title: document.querySelector('#post_title').value,
    category: document.querySelector('#post_category').value,
    content: document.querySelector('#post_content').value,
    description: 'description',
    imageUrl: [
      document.querySelector('#post_url').value
    ],
    enabled: true,
    origin_price: document.querySelector('#post_price_ori').value,
    price: document.querySelector('#post_price').value,
    unit: '杯',
  }
  axios.post(api, data)
    .then(
      function (res) {
        getData();
      }
    )
}
function patchData() {
  let whichItem = document.querySelector('#edit_item_id').dataset.editid;
  let id = database[whichItem].id;
  let api = `${apiPath}api/${uuid}/admin/ec/product/${id}`
  let data = {
    title: document.querySelector('#edit_title').value,
    category: document.querySelector('#edit_category').value,
    content: document.querySelector('#edit_content').value,
    description: 'description',
    imageUrl: [
      document.querySelector('#edit_url').value
    ],
    enabled: true,
    origin_price: document.querySelector('#edit_price_ori').value,
    price: document.querySelector('#edit_price').value,
    unit: '杯',
  }
  axios.patch(api, data)
    .then(
      function (res) {
        getData();
      }
    )
}
function deleteData(e) {
  e.preventDefault();
  let whichItem = e.target.closest('.list__item').dataset.id;
  let id = database[whichItem].id;
  let api = `${apiPath}api/${uuid}/admin/ec/product/${id}`
  axios.delete(api)
    .then(
      function (res) {
        console.log(res);
        getData();
      }
    )
}
function rendor(items) {
  document.querySelector('#list').innerHTML = '';
  items.forEach(
    function (item, index) {
      document.querySelector('#list').innerHTML += `
      <li class="list__item" data-id="${index}">
        <img src="${item.imageUrl[0]}" alt="" class="img">
        <div class="list__item__main">
            <div class="list__item__main__text">
                <div class="title">${item.title}</div>
                <div class="category">${item.category}</div>
                <div class="content">${item.content}</div>
            </div>
            <div class="list__item__main__price">
                <div class="ori">$${item.origin_price}</div>
                <div class="now">$${item.price}</div>
            </div>
        </div>
        <div class="btn-group">
            <a href="#" data-target="editModal" class="edit material-icons">edit</a>
            <a href="#" class="delete material-icons">delete</a>
        </div>
      </li>`;
      putEventListener();
    }
  );
}


