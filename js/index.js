let productNameInput = document.getElementById('productName');
let productPriceInput = document.getElementById('productPrice');
let productCategoryInput = document.getElementById('productCategory');
let productDescInput = document.getElementById('productDesc');

let addBtn = document.getElementById('addBtn');

let productsContainer=[];

if(localStorage.getItem('products')!=null){
    productsContainer = JSON.parse(localStorage.getItem('products'));
    display(productsContainer);
}

display(productsContainer);

function validateForm(){
    let nameRegex = /^[A-Z]{1}[A-Za-z0-9]{2,11}/;
    let priceRegex = /^[1-9]{1,6}$/;
    let categoryRegex = /^[A-Z]{1}[A-Za-z]{2,11}/;

    if(nameRegex.test(productNameInput.value) && priceRegex.test(productPriceInput.value) && categoryRegex.test(productCategoryInput.value)){
        return true;
    }

    return false;
}
function addProduct(){

    if(validateForm()){
        let product ={
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value,
        }
    
        productsContainer.push(product);
        localStorage.setItem('products',JSON.stringify(productsContainer));
        display(productsContainer);
        clearForm();
    }
    else{
        alert('wrong inputs');
    }
    
}


function display(products){
    let cartona=``;
        for(let i=0;i <products.length;i++){
            cartona+=`<tr>
            <td>${i}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="setFormForUpdate(${i});" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
        }

        document.getElementById('tableBody').innerHTML = cartona;
}

function clearForm(){
    productNameInput.value = '';
    productPriceInput.value= '';
    productCategoryInput.value= '';
    productDescInput.value= '';
}

function deleteProduct(i){
    productsContainer.splice(i,1);
    localStorage.setItem('products',JSON.stringify(productsContainer));
    display(productsContainer);
    
}

function setFormForUpdate(i){

    addBtn.classList.replace('d-block','d-none');
    document.getElementById('buttons').innerHTML=`<button onclick="updateProduct(${i});" class="btn w-25 btn-warning d-block" id="updateBtn">Update product</button>`;
    productNameInput.value = productsContainer[i].name;
    productPriceInput.value= productsContainer[i].price;
    productCategoryInput.value= productsContainer[i].category;
    productDescInput.value= productsContainer[i].desc;
}

function updateProduct(i){
    productsContainer[i].name =productNameInput.value;
    productsContainer[i].price =productPriceInput.value;
    productsContainer[i].category =productCategoryInput.value;
    productsContainer[i].desc =productDescInput.value;
    
    localStorage.setItem('products',JSON.stringify(productsContainer));
    display(productsContainer);

    document.getElementById('updateBtn').classList.replace('d-block','d-none');
    addBtn.classList.replace('d-none','d-block');

    clearForm();
}
function search (term) { 

    let searchedProducts=[];

    for(let i=0;i <productsContainer.length;i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            searchedProducts.push(productsContainer[i]);
        }
    }
    display(searchedProducts);
}