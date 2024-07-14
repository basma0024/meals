async function getArea() {
    try {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        console.log(data);
        displayMeals(data.meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

function displayMeals(meals) {
    let cartona = "";

    meals.forEach(meal => {
        cartona += `
            <div class="col-lg-3 text-white text-center cursor-pointer " onclick="getMealsByArea('${meal.strArea}')"> 
                <i class="fa-solid fa-house-laptop fa-4x p-1"></i>
                <h3>${meal.strArea}</h3>
            </div>
        `;
    });

    document.getElementById("categories-container").innerHTML = cartona;
}

async function getMealsByArea(area) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
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
                <div class="img rounded-3 cursor-pointer "  onclick="getDetails('${meal.idMeal}')">
                    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-2">
                    <div class="headers rounded-2">
                        <h2 class="s">${meal.strMeal}</h2>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("meals-container").innerHTML = cartona;
}


getArea();



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

    // Update the meals-container with the details box HTML
    const mealsContainer = document.getElementById('meals-container');
    if (mealsContainer) {
        mealsContainer.innerHTML = detailsBox;
    } else {
        console.error('Meals container not found.');
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


