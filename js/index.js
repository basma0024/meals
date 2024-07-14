

$(document).ready(function(){


    $('.loading').fadeOut(2000 , function(){
        $('body').css('overflow', 'auto')
    })

    async function getMeals() {
        try {
            let res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            let data = await res.json();
            console.log(data); 
            displayMeals(data.meals);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    }
    
    function displayMeals(meals) {
        let cartona = "";
        
        for (let i = 0; i < meals.length; i++) {
            cartona += `
            <div class="col-lg-3">
        <div class="img rounded-3 cursor-pointer"  onclick="getDetails(${meals[i].idMeal});">
            
            <img src="${meals[i].strMealThumb}" alt="" class="w-100 rounded-2">
            <div class="headers rounded-2">
            <h2>${meals[i].strMeal}</h2>
            </div>
            </div>
            </div>
            `;
        }
    
        document.getElementById("meals-container").innerHTML = cartona;
    
    }
    
    getMeals(); 
 
})
    
    async function getDetails(mealID) {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
            let data = await res.json();
            console.log(data); 
            displayMealDetails(data.meals[0]); 
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    }
    
    
    
    function displayMealDetails(meal) {
        let ingredients = '';
    
        
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
            }
        }
    
    
        let tagsStr = '';
        if (meal.strTags) {
            const tags = meal.strTags.split(",");
            tagsStr = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`).join('');
        }
    
        
        let cartona = `
            <div class="col-md-4 text-white  ">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white ">
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
                <a target="_blank" href="${meal.strSource}" class="btn btn-success mb-4 ">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger mb-4">Youtube</a>
            </div>`;
    
        
        document.getElementById("meals-container").innerHTML = cartona;
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


