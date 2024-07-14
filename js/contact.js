
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let ageInput = document.getElementById('age');
let passInput = document.getElementById('pass');
let repassInput = document.getElementById('repass');

let nameAlert = document.querySelector('.nameAlert');
let emailAlert = document.querySelector('.emailAlert');
let phoneAlert = document.querySelector('.phoneAlert');
let ageAlert = document.querySelector('.ageAlert');
let passAlert = document.querySelector('.passAlert');
let repassAlert = document.querySelector('.repassAlert');

function validate(inputId, regexKey, alertElement) {
    let input = document.getElementById(inputId);
    let regex = {
        name: /^[a-zA-Z ]+$/,
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
        password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    };

    let isValid = regex[regexKey].test(input.value);

    if (isValid) {
        alertElement.classList.remove('d-block');
        alertElement.classList.add('d-none');
        input.dataset.valid = 'true'; 
    } else {
        alertElement.classList.remove('d-none');
        alertElement.classList.add('d-block');
        input.dataset.valid = 'false'; 
    }

    checkFormValidity(); 
}


function repasswordValidation() {
    let passValue = passInput.value;
    let repassValue = repassInput.value;

    if (passValue === repassValue) {
        repassAlert.classList.remove('d-block');
        repassAlert.classList.add('d-none');
        repassInput.dataset.valid = 'true'; 
    } else {
        repassAlert.classList.remove('d-none');
        repassAlert.classList.add('d-block');
        repassInput.dataset.valid = 'false'; 
    }

    checkFormValidity(); 
}

function checkFormValidity() {
    let inputs = [nameInput, emailInput, phoneInput, ageInput, passInput, repassInput];
    let isValid = inputs.every(input => input.dataset.valid === 'true');

    let submitButton = document.querySelector('.btn');
    if (isValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}






// jQuery

const iconWidth = $('.sidenav-content').outerWidth(true);
let isOpen = false;

$('#sideNav').css({ left: -iconWidth });

function openNav() {
    $('#sideNav').animate({ left: 0 }, 500, function () {
        $('.i i').addClass('fa-xmark').removeClass('fa-bars');
        $(".links li").each(function (index) {
            $(this).stop().delay(index * 100).animate({
                top: 0,
                opacity: 1
            }, 300);
        });
    });

    isOpen = true;
}

function closeNav() {
    $('#sideNav').animate({ left: -iconWidth }, 500, function () {
        $('.i i').removeClass('fa-xmark').addClass('fa-bars');
    });

    $(".links li").stop().animate({
        top: '100%',
        opacity: 0
    }, 300);

    isOpen = false;
}

$('#sideNav .icon').on('click', function () {
    if (isOpen) {
        closeNav();
    } else {
        openNav();
    }
});

$(".links li").css({
    top: '100%',
    opacity: 0
});

