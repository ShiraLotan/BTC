$(document).ready(function () {
    var arr = [];
    var favorite = [];


    /****** Ajax Progress Bar Functions******/
    $(document).ajaxStart(function () {
        $("#ProgressBar").html(`<div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>
                            </div>`);
    });

    $(document).ajaxComplete(function () {
        $("#ProgressBar").html(`<div></div>`);

    });

    /******End Ajax Progress Bar Functions******/
    $(document).ajaxSuccess(function () {
        var AjaxDate = Date.now()
        return AjaxDate
    });
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
                                        <input type="checkbox" id="checkbox">
                                        <span class="slider round"></span>
                                        <button href="#" class="btn btn-primary collapsible ${resualt[i].id}" data-toggle="collapse">More Info</button>
                                        <div class="content">
                                            <p class="${resualt[i].id}"></p>
                                            </div>
                                        </div>
                                    </div>`);

                arr.push(resualt[i].id)


            }
            /***Toggle input true or false****/
            $("input").on("change", function () {
                if ($(this).is(':checked')) {
                    $(this).attr('value', 'true');

                    let CardFavorite = event.srcElement.parentElement.children[2].classList[3];
                    console.log(favorite)


                    if (favorite.length <5 ) {
                        favorite.push(CardFavorite)

                        
                    } else{
                        /****************modal test *********************/
                       
                        /****************modal test *********************/
                    }



                } else {
                    $(this).attr('value', 'false');
                    console.log("False")

                }


            })
            ///***End Toggle input true or false****/



            /****** More Info Button******/

            $(".collapsible").on("click", function (event) {
                let dateNow = new Date()

                let coinID = event.target.classList[3]
                let SavedCoin = JSON.parse(localStorage.getItem(`${coinID}`))
                // console.log(coinID)

                const TwoMin = 120000;
                // console.log(SavedCoin)
                // console.log(dateNow)


                /********Check if user already clicked the coin *******/
                if (SavedCoin !== null && dateNow - SavedCoin.AjaxDate < 120000) {
                    console.log("From Storage")

                    const element = event.target.parentElement.children[3]
                    $(element).toggle("slow")

                    $(`p.${SavedCoin.id}`).html(`<div><img src=${SavedCoin.image.small}></br><span>USD: ${SavedCoin.market_data.current_price.usd}$</span></br><span>EURO: ${SavedCoin.market_data.current_price.eur}&#8364</span></br><span>ILS: ${SavedCoin.market_data.current_price.usd}&#8362</span></div>`)

                }

                /********End Check if user already clicked the coin *******/

                else {

                    /********Take info from API if user not clicked the coin *******/

                    const element = event.target.parentElement.children[3]
                    $(element).toggle("slow")
                    let coinID = event.target.classList[3]

                    /****** Ajax More Info Request******/
                    $.ajax({

                        type: "GET",
                        url: `https://api.coingecko.com/api/v3/coins/${coinID}`,


                        success: function (resualt) {

                            if (resualt.id == coinID) {
                                $(`p.${coinID}`).html(`<div><img src=${resualt.image.small}></br><span>USD: ${resualt.market_data.current_price.usd}$</span></br><span>EURO: ${resualt.market_data.current_price.eur}&#8364</span></br><span>ILS: ${resualt.market_data.current_price.usd}&#8362</span></div>`)

                                resualt.AjaxDate = Date.now()

                                localStorage.setItem(`${coinID}`, JSON.stringify(resualt))

                                console.log("From Ajax")

                            }
                        },

                        error: function (resualt) {
                            alert(`Something went wrong! Please try again. Problem number ${resualt.error}`)/***** Add a resonable message *****/
                        }



                    })
                    /****** End Ajax More Info Request******/
                }

            })

            /****** End More Info Button******/

        },
        error: function (resualt) {
            alert(`Something went wrong! Please try again. Problem number ${resualt.error}`)/***** Add a resonable message *****/
        }



    })


})

