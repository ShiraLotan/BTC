$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "file:///Users/shiralotan/Desktop/Project%20BTC/index.html",
      

        success: function(resualt){
            // console.log(resualt)
            for(let i=0;i<100;i++){
               
                $("#coinsDiv").append(`<span>${resualt[i].name}</br>${resualt[i].symbol}</span>`);

            }
        },
        error: function(resualt){
            alert(`Something went wrong! Please try again. Problem number ${resualt.error}`)/***** Add a resonable message *****/
        }
        

       
    })




})
