$(document).ready(function () {
    var arr = [];

    $.ajax({
        type: "GET",
        url: "https://api.coingecko.com/api/v3/coins/list",


        success: function (resualt) {
            // console.log(resualt)
            for (let i = 0; i < 100; i++) {

                $("#coinsDiv").append(`<div class="card" style="width: 18rem;">
                                        <div class="card-body">
                                        <h5 class="card-title">${resualt[i].name}  - ${resualt[i].symbol}</h5>
                                        <label class="switch">
                                        <input type="checkbox">
                                        <span class="slider round"></span>
                                        <button href="#" class="btn btn-primary collapsible" data-toggle="collapse">More Info</button>
                                        <div class="content">
                                            <p class="Paragraphcontent"></p>
                                            </div>
                                        </div>
                                    </div>`);

                arr.push(resualt[i].id)
            }
            console.log(arr)

            $(".collapsible").on("click", function (event) {
                const element = event.target.parentElement.children[3]
                $(element).toggle("slow")

                $.ajax({
                    type: "GET",
                    url: "https://api.coingecko.com/api/v3/coins/bitcoin",

                    success: function (resualt) {
                        $(".Paragraphcontent").html(`<div><img src=${resualt.image.small}></br><span>USD: ${resualt.market_data.current_price.usd}$</span></br><span>EURO: ${resualt.market_data.current_price.eur}&#8364</span></br><span>ILS: ${resualt.market_data.current_price.usd}&#8362</span></div>`)
                        // console.log(resualt.market_data.current_price.usd)

                    }

                    

                })
            })
        },
        error: function (resualt) {
            alert(`Something went wrong! Please try again. Problem number ${resualt.error}`)/***** Add a resonable message *****/
        }



    })



})


