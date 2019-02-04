$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://api.coingecko.com/api/v3/coins/list",
      

        success: function(resualt){
            // console.log(resualt)
            for(let i=0;i<100;i++){
               
                $("#coinsDiv").append(`<div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${resualt[i].name}  - ${resualt[i].symbol}</h5>
                  <p class="card-text">content</p>
                  <a href="#" class="btn btn-primary">More Info</a>
                </div>
              </div>`);

            }
        },
        error: function(resualt){
            alert(`Something went wrong! Please try again. Problem number ${resualt.error}`)/***** Add a resonable message *****/
        }
        

       
    })




})


