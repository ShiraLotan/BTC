$(document).ready(function () {
    var arr = [];
/****** Ajax Progress Bar Functions******/
    $(document).ajaxStart(function(){
        $("#ProgressBar").html(`<div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>
                            </div>`);
      });

      $(document).ajaxComplete(function(){
                            $("#ProgressBar").html(`<div></div>`);
      });

      /******End Ajax Progress Bar Functions******/

      /****** Ajax Homepage Append Coins******/
    $.ajax({

        type: "GET",
        url: "https://api.coingecko.com/api/v3/coins/list",
       


        success: function (resualt) {
            for (let i = 0; i < 100; i++) {
                $("#coinsDiv").append(`<div class="card" style="width: 18rem;">
                                        <div class="card-body">
                                        <h5 class="card-title">${resualt[i].name}  - ${resualt[i].symbol}</h5>
                                        <label class="switch">
                                        <input type="checkbox" id="toggleinp" >
                                        <span class="slider round"></span>
                                        <button href="#" class="btn btn-primary collapsible ${resualt[i].id}" data-toggle="collapse">More Info</button>
                                        <div class="content">
                                            <p class="${resualt[i].id}"></p>
                                            </div>
                                        </div>
                                    </div>`);

                arr.push(resualt[i].id)
            }


            /****** More Info Button******/

            $(".collapsible").on("click", function (event) {

                const element = event.target.parentElement.children[3]
                $(element).toggle("slow")
                let coinID = event.target.classList[3]

                // console.log(event.target.classList[3])

                /****** Ajax More Info Request******/


                $.ajax({

                    type: "GET",
                    url: `https://api.coingecko.com/api/v3/coins/${coinID}`,

                    success: function (resualt) {
                        if (resualt.id == coinID) {
                            $(`p.${coinID}`).html(`<div><img src=${resualt.image.small}></br><span>USD: ${resualt.market_data.current_price.usd}$</span></br><span>EURO: ${resualt.market_data.current_price.eur}&#8364</span></br><span>ILS: ${resualt.market_data.current_price.usd}&#8362</span></div>`)
                            // console.log(resualt.market_data.current_price.usd)
                        }
                    },
                    error: function (resualt) {
                        alert(`Something went wrong! Please try again. Problem number ${resualt.error}`)/***** Add a resonable message *****/
                    }



                })
                            /****** End Ajax More Info Request******/

            })
                        /****** End More Info Button******/

        },
        error: function (resualt) {
            alert(`Something went wrong! Please try again. Problem number ${resualt.error}`)/***** Add a resonable message *****/
        }



    })

    function inpCheckBox() {
        if ($('input[type=checkbox]').prop("checked", true)) {
            console.log("ok")
        } else {
            console.log("Not ok")
        }
    }
})


