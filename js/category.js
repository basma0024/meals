async function getCategory() {
    try {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        displayCategories(data.categories); 
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

function displayCategories(categories) { 
    let cartona = "";

    categories.forEach(category => {
        let short = category.strCategoryDescription ? category.strCategoryDescription.slice(0, 120) : "";

        cartona += `
            <div class="col-lg-3">
                <div class="img rounded-3 cursor-pointer " onclick="getMealsByCategory('${category.strCategory}')">
                    <img src="${category.strCategoryThumb}" alt="" class="w-100 rounded-2">
                    <div class="headers rounded-2 p-1 text-center">
                        <h2>${category.strCategory}</h2>
                        <p class="p-1">${short}</p>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("categories-container").innerHTML = cartona;
}

async function getMealsByCategory(category) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        displayMealCards(data.meals); 

        document.getElementById("categories-container").classList.add('d-none');
        document.getElementById("meals-container").classList.remove('d-none');
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

async function getMeals() {
    try {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        displayMealCards(data.meals); 

        
        document.getElementById("categories-container").classList.add('d-none');
        document.getElementById("meals-container").classList.remove('d-none');
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

function displayMealCards(meals) {
    let cartona = "";

    meals.forEach(meal => {
        cartona += `
            <div class="col-lg-3">
                <div class="img rounded-3 cursor-pointer " onclick="getDetails('${meal.idMeal}')">
                    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-2">
                    <div class="headers rounded-2">
                        <h2  class ="s">${meal.strMeal}</h2>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("meals-container").innerHTML = cartona;
}

async function getDetails(mealID) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        displayMealDetails(data.meals[0]);
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}

function displayMealDetails(meal) {

    let ingredients = '';
    let tagsStr = '';

    
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    if (meal.strTags) {
        const tags = meal.strTags.split(",");
        tagsStr = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`).join('');
    }

    let detailsBox = `
        <div class="col-md-4 text-white">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
            </ul>
            <a target="_blank" href="${meal.strSource}" class="btn btn-success mb-4">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger mb-4">Youtube</a>
        </div>`;

    const mealsContainer = document.getElementById('meals-container');
    if (mealsContainer) {
        mealsContainer.innerHTML = detailsBox;
    } else {
        console.error('Meals container not found.');
    }
}

getCategory();





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






