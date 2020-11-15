/*
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2020 IJSE
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 */

/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/15/20
 **/

/*===============================================================================
 * Global Variables
 *===============================================================================*/

// Todo: add all global variable declaration here
var txtId = document.querySelector('#txt-id');
var txtName = document.querySelector('#txt-name');
var txtAddress = document.querySelector('#txt-address');
var idMessage = document.querySelector('#id-message');
var nameMessage = document.querySelector('#name-message');
var addressMessage = document.querySelector('#address-message');
var tblCustomer = document.querySelector('#tbl-customers');
var btnSave = document.getElementById('btn-save');
var btnClear = document.getElementById('btn-clear');

var validId = false;
var validName = false;
var validAddress = false;
var customers = [];
var isUpdateFunction = false;

/*===============================================================================
 * Init
 *===============================================================================*/

init();

function init() {
    // Todo: add the initialization code if any
    txtId.style.class = 'form-control';
    txtName.style.class = 'form-control';
    txtAddress.style.class = 'form-control';
    nameMessage.style.display = 'none';
    addressMessage.style.display = 'none';

    txtId.focus();
}

/*===============================================================================
 * Event Handlers and Timers
 *===============================================================================*/

// Todo: add all event listeners and handlers here
btnSave.addEventListener("click", validateFieldsAndAdd);
btnClear.addEventListener("click", function () {
    txtId.disabled = false;
});



/*===============================================================================
 * Functions
 *===============================================================================*/

// Todo: add all functions
function validateFieldsAndAdd() {
    var idValue = txtId.value;
    var nameValue = txtName.value;
    var addressValue = txtAddress.value;


    /*===============================================================================
    * ID validation
    *===============================================================================*/
    if (idValue.trim() == "") {
        validId = false;
    }
    if (!(idValue.length == 4)) {
        validId = false;
    } else if (!RegExp("[C][0-9]{3}").test(idValue)) {
        validId = false;
    } else {
        validId = true;
    }
    if (!validId) {
        txtId.focus();
        txtId.style.boxShadow = '0 0 0 0.2rem rgba(255, 0, 0, 0.25)';
        idMessage.style.display = 'block';
    } else {
        txtId.style.borderColor = '#495057';
        idMessage.style.display = 'none';
    }

    /*===============================================================================
    * Name validation
    *===============================================================================*/

    if (nameValue.trim() == "") {
        validName = false;
        nameMessage.innerHTML = 'Name cannot be empty';
    } else if (nameValue.trim().length < 3) {
        validName = false;
        nameMessage.innerHTML = 'Too short name';
    } else if (!RegExp("[A-Za-z ]").test(nameValue) && (RegExp("[^A-Za-z0-9]").test(nameValue))) {
        validName = false;
        nameMessage.innerHTML = 'Name should be contains only letters and spaces';
    } else {
        validName = true;
    }
    if (!validName) {
        if (validId) {
            txtName.focus();
        }
        txtName.style.boxShadow = '0 0 0 0.2rem rgba(255, 0, 0, 0.25)';
        nameMessage.style.display = 'block';
    } else {
        txtName.style.borderColor = '#495057';
        nameMessage.style.display = 'none';
    }

    /*===============================================================================
    * Address validation
    *===============================================================================*/

    if (addressValue.trim() == "") {
        validAddress = false;
        addressMessage.innerHTML = 'Address cannot be empty';
    } else if (addressValue.trim().length < 3) {
        validAddress = false;
        addressMessage.innerHTML = 'Too short address';
    } else if (!RegExp("[A-Za-z ]").test(addressValue)) {
        validAddress = false;
        addressMessage.innerHTML = 'Address should contains letters';
    } else {
        validAddress = true;
    }
    if (!validAddress) {
        if (validName) {
            txtAddress.focus();
        }
        txtAddress.style.boxShadow = '0 0 0 0.2rem rgba(255, 0, 0, 0.25)';
        addressMessage.style.display = 'block';
    } else {
        txtAddress.style.borderColor = '#495057';
        addressMessage.style.display = 'none';
    }

    if (validId && validName && validAddress) {
        for (var i = 0; i < customers.length; i++) {
            if (customers[i].id == txtId.value) {
                customers[i].customerName = nameValue;
                customers[i].address = addressValue;
                isUpdateFunction = true;
                i = customers.length;
            }else {
                isUpdateFunction = false;
            }
        }
        if (!isUpdateFunction) {
            var customer = new Customer(idValue, nameValue, addressValue);
            customers.push(customer);
        }
        resetFields();
        loadTable();
    }
}

function Customer(id, name, address) {
    this.id = id;
    this.customerName = name;
    this.address = address;
}

function loadTable() {

    clearTable();
    if (customers.length > 0) {
        tblCustomer.children[2].style.display = 'none';
        for (var i = 0; i < customers.length; i++) {

            var row = document.createElement('tr');
            var cId = document.createElement('td');
            var cName = document.createElement('td');
            var cAddress = document.createElement('td');
            var divDelete = document.createElement('div');
            var btnDelete = document.createElement('button');
            var img = document.createElement('img');

            row.addEventListener("click", loadDataToForm);

            img.src = "img/trash.png";
            img.style.className = 'main #tbl-customers tbody tr div button img';
            btnDelete.style.className = 'main #tbl-customers tbody tr div button';
            btnDelete.setAttribute('type','button');
            btnDelete.setAttribute('dataToggle','modal')
            btnDelete.setAttribute('dataTarget','#delete-modal')
            btnDelete.append(img);

            cId.innerText = customers[i].id;
            cId.style.textAlign = 'center';
            cName.innerText = customers[i].customerName;
            cAddress.innerText = customers[i].address;
            divDelete.append(btnDelete);
            divDelete.style.height = '100%';
            divDelete.style.display = 'flex';
            divDelete.style.alignItems = 'center';
            divDelete.style.justifyContent = 'center';
            img.addEventListener('mouseover', function (event) {
                event.target.src = "img/trash-hover.png";
            });
            img.addEventListener('mouseleave', function (event) {
                event.target.src = "img/trash.png";
            });
            divDelete.addEventListener('click', function (event) {
                for (var i = 0; i < customers.length; i++) {
                    if (customers[i].id == event.currentTarget.parentNode.children[0].innerText) {
                        customers.splice(i, 1);
                        i = customers.length;
                    }
                }
                event.currentTarget.parentNode.remove();
                console.log("resetField");
                resetFields();

            })

            tblCustomer.children[1].append(row);
            tblCustomer.children[1].children[i].append(cId);
            tblCustomer.children[1].children[i].append(cName);
            tblCustomer.children[1].children[i].append(cAddress);
            tblCustomer.children[1].children[i].append(divDelete);
        }
    } else {
        tblCustomer.children[2].style.display = 'block';
    }
}

function loadDataToForm(event) {
    txtId.value = event.currentTarget.children[0].innerText;
    txtName.value = event.currentTarget.children[1].innerText;
    txtAddress.value = event.currentTarget.children[2].innerText;
    txtId.disabled = true;
}

function clearTable() {
    for (var i = 0; i < customers.length; i++) {
        if (tblCustomer.children[1].hasChildNodes()) {
            tblCustomer.children[1].firstChild.remove();
        }
    }
}
function resetFields(){
    txtId.value = '';
    txtName.value = '';
    txtAddress.value = '';
    txtId.disabled = false;
}