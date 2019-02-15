$(document).ready(function () {
    var arr = [];
    var favorite = [];
    var FavoriteSymbols = [];



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
                                        <input type="checkbox" id="checkbox" class="${resualt[i].id}" value="false">
                                        <span class="slider round"></span>
                                        <button href="#" class="btn btn-primary collapsible ${resualt[i].id}" data-toggle="collapse">More Info</button>
                                        <div class="content">
                                            <p class="${resualt[i].id}"></p>
                                            </div>
                                        </div>
                                    </div>`);

                arr.push(obj(resualt[i].id, resualt[i].symbol))


            }
            
            /***Toggle input true or false****/
            $("input").on("change", function () {
                if ($(this).is(':checked')) {
                    $(this).attr('value', 'true')



                    // $("input").on("change",function(){
                    //     if($(this).attr('value', 'true')){
                    //         $(this).attr('value', 'false')
                    //     }

                    // })

                    let CardFavorite = event.srcElement.parentElement.children[2].classList[3];
                    // console.log(favorite)


                    if (favorite.length < 5) {
                        favorite.push(CardFavorite)

                        $('input[type=checkbox]').click(function(){ 
                            if($(this).is(":not(:checked)"))
                            {
                                $(this).prop('value','false') ; 
                           }
                           let coinOut = this.classList[0]
                           for(let i=0;i<favorite.length;i++){
                               if(coinOut==favorite[i]){
                                   let index = i
                                   favorite.splice(index,1)
                               }
                           }
                        //    console.log(coinOut)
                        })
                        // console.log(favorite)
                    } else {
                        /****************Modal window *********************/
                        // console.log(this.parentElement.children[3].children[0].classList[0])

                        let currentCoin = this.parentElement.children[3].children[0].classList[0];
                        $("#modalContent").html(`If you would like to add coin name: ${currentCoin} please uncheck one coine instead:`)
                        for (let i = 0; i < favorite.length; i++) {
                            $("#modalContent").append(`<div id="CoinModalDiv" class="${favorite[i]}">${favorite[i]}<input type="checkbox" id="inpChbx" checked></div>`)

                        }

                        $("#modallink").click()

                        $(".close-modal").on("click", function () {
                            //   console.log(currentCoin)

                            $(`input:checkbox.${currentCoin}`).prop('checked', false)
                        })

                        $("input").on("change", function () {
                            let removeCoin = this.parentElement.classList[0]

                            for (let i = 0; i < favorite.length; i++) {
                                if (removeCoin == favorite[i]) {
                                    var index = i
                                    favorite.splice(index, 1)
                                    favorite.push(currentCoin)
                                    // console.log(favorite)

                                    alert(`${removeCoin} Has Been Removed`)
                                    $("#AcloseModal").click()

                                    let removedElement = $(`input#checkbox.${removeCoin}:checked`)

                                    $(removedElement).prop('checked', false)


                                    // console.log(removedElement)
                                }
                            }
                        })
                        /**************** End Modal window *********************/

                    }



                } else {
                    // $(input).on("change",function(){
                    //     $(this).attr('value','false')
                    // })

                }


            })


            ///***End Toggle input true or false****/



            /****** More Info Button******/

            $(".collapsible").on("click", function (event) {
                let dateNow = new Date()

                let coinID = event.target.classList[3]
                let SavedCoin = JSON.parse(localStorage.getItem(`${coinID}`))
                console.log(event)

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

    $("#realTimeReports").on("click", function () {

        $.ajax({
            type: "GET",
            url: "RealTimeReports.html",

            success: function (resualt) {
                $(".card").remove()
                $("#coinsDiv").append(resualt)

                for (let i = 0; i < arr.length; i++) {

                    for (let j = 0; j < favorite.length; j++) {
                        if (favorite[j] === arr[i].id) {
                            let index = j
                            FavoriteSymbols.push(arr[index].symbol)

                        }
                    }
                }
                
                /*******Start Coins Table ******/
                $(document).ready(function(){

                $.ajax({
                    type: "GET",
                    url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${FavoriteSymbols[0]},${FavoriteSymbols[1]},${FavoriteSymbols[2]},${FavoriteSymbols[3]},${FavoriteSymbols[4]}&tsyms=USD`,

                    success: function (resualt) {
                        console.log(resualt)


                        /******CHART ********/

                            var options = {
                                exportEnabled: true,
                                animationEnabled: true,
                                title:{
                                    text: "Live Online Traded Coins Prices"
                                },
                                
                                axisX: {
                                    title: "Time"
                                },
                                axisY: {
                                    title: "Price",
                                    titleFontColor: "#4F81BC",
                                    lineColor: "#4F81BC",
                                    labelFontColor: "#4F81BC",
                                    tickColor: "#4F81BC",
                                    includeZero: false
                                },
                                
                                toolTip: {
                                    shared: true
                                },
                                legend: {
                                    cursor: "pointer",
                                    itemclick: toggleDataSeries
                                },

                                data: [{
                                    type: "spline",
                                    name: resualt[0],
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "#,##0 Units",
                                    dataPoints: [
                                        { x: new Date(2016, 0, 1),  y: 120 },
                                        { x: new Date(2016, 1, 1), y: 135 },
                                        { x: new Date(2016, 2, 1), y: 144 },
                                        { x: new Date(2016, 3, 1),  y: 103 },
                                        { x: new Date(2016, 4, 1),  y: 93 },
                                        { x: new Date(2016, 5, 1),  y: 129 },
                                        { x: new Date(2016, 6, 1), y: 143 },
                                        { x: new Date(2016, 7, 1), y: 156 },
                                        { x: new Date(2016, 8, 1),  y: 122 },
                                        { x: new Date(2016, 9, 1),  y: 106 },
                                        { x: new Date(2016, 10, 1),  y: 137 },
                                        { x: new Date(2016, 11, 1), y: 142 }
                                    ]
                                },
                                {
                                    type: "spline",
                                    name: resualt[1],
                                    axisYType: "secondary",
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "$#,##0.#",
                                    dataPoints: [
                                        { x: new Date(2016, 0, 1),  y: 19034.5 },
                                        { x: new Date(2016, 1, 1), y: 20015 },
                                        { x: new Date(2016, 2, 1), y: 27342 },
                                        { x: new Date(2016, 3, 1),  y: 20088 },
                                        { x: new Date(2016, 4, 1),  y: 20234 },
                                        { x: new Date(2016, 5, 1),  y: 29034 },
                                        { x: new Date(2016, 6, 1), y: 30487 },
                                        { x: new Date(2016, 7, 1), y: 32523 },
                                        { x: new Date(2016, 8, 1),  y: 20234 },
                                        { x: new Date(2016, 9, 1),  y: 27234 },
                                        { x: new Date(2016, 10, 1),  y: 33548 },
                                        { x: new Date(2016, 11, 1), y: 32534 }
                                    ]
                                },
                                {
                                    type: "spline",
                                    name: resualt[2],
                                    axisYType: "secondary",
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "$#,##0.#",
                                    dataPoints: [
                                        { x: new Date(2016, 0, 1),  y: 19034.5 },
                                        { x: new Date(2016, 1, 1), y: 20015 },
                                        { x: new Date(2016, 2, 1), y: 27342 },
                                        { x: new Date(2016, 3, 1),  y: 20088 },
                                        { x: new Date(2016, 4, 1),  y: 20234 },
                                        { x: new Date(2016, 5, 1),  y: 29034 },
                                        { x: new Date(2016, 6, 1), y: 30487 },
                                        { x: new Date(2016, 7, 1), y: 32523 },
                                        { x: new Date(2016, 8, 1),  y: 20234 },
                                        { x: new Date(2016, 9, 1),  y: 27234 },
                                        { x: new Date(2016, 10, 1),  y: 33548 },
                                        { x: new Date(2016, 11, 1), y: 32534 }
                                    ]
                                },
                                {
                                    type: "spline",
                                    name: resualt[3],
                                    axisYType: "secondary",
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "$#,##0.#",
                                    dataPoints: [
                                        { x: new Date(2016, 0, 1),  y: 19034.5 },
                                        { x: new Date(2016, 1, 1), y: 20015 },
                                        { x: new Date(2016, 2, 1), y: 27342 },
                                        { x: new Date(2016, 3, 1),  y: 20088 },
                                        { x: new Date(2016, 4, 1),  y: 20234 },
                                        { x: new Date(2016, 5, 1),  y: 29034 },
                                        { x: new Date(2016, 6, 1), y: 30487 },
                                        { x: new Date(2016, 7, 1), y: 32523 },
                                        { x: new Date(2016, 8, 1),  y: 20234 },
                                        { x: new Date(2016, 9, 1),  y: 27234 },
                                        { x: new Date(2016, 10, 1),  y: 33548 },
                                        { x: new Date(2016, 11, 1), y: 32534 }
                                    ]
                                },
                                {
                                    type: "spline",
                                    name: resualt[4],
                                    axisYType: "secondary",
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "$#,##0.#",
                                    dataPoints: [
                                        { x: new Date(2016, 0, 1),  y: 19034.5 },
                                        { x: new Date(2016, 1, 1), y: 20015 },
                                        { x: new Date(2016, 2, 1), y: 27342 },
                                        { x: new Date(2016, 3, 1),  y: 20088 },
                                        { x: new Date(2016, 4, 1),  y: 20234 },
                                        { x: new Date(2016, 5, 1),  y: 29034 },
                                        { x: new Date(2016, 6, 1), y: 30487 },
                                        { x: new Date(2016, 7, 1), y: 32523 },
                                        { x: new Date(2016, 8, 1),  y: 20234 },
                                        { x: new Date(2016, 9, 1),  y: 27234 },
                                        { x: new Date(2016, 10, 1),  y: 33548 },
                                        { x: new Date(2016, 11, 1), y: 32534 }
                                    ]
                                }]
                            };
                            $("#chartContainer").CanvasJSChart(options);
                            
                            function toggleDataSeries(e) {
                                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                    e.dataSeries.visible = false;
                                } else {
                                    e.dataSeries.visible = true;
                                }
                                e.chart.render();
                            }
                            
                            
                        /******End CHART *********/
                    }
                })
            })
                /*******End Start Coins Table ******/






            },
            error: function (resualt) {
                alert("Something Went Wrong! Please use Live Server or try again later ")
            }
        })
    })
    function obj(id, symbol) {
        var obj = {
            'id': id,
            'symbol': symbol.toUpperCase()
        }
        return obj
    }
})

