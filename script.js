$(document).ready(function () {
    var arr = [];
    var favorite = [];
    var FavoriteSymbols = [];

    $("#HomePage").on("click",function(){
      
})

$("#searchId").on("click", function () {
    var userSearch = $("#searchInp").val().toUpperCase()
    for (let i = 0; i < arr.length; i++) {

        if (userSearch == arr[i].symbol) {
            var coinSearch = arr[i]
            $("#coinsDiv").html(`<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                    <h5 class="card-title">${coinSearch.id}  - ${coinSearch.symbol}</h5>
                                    <label class="switch">
                                    <input type="checkbox" id="checkbox" class="${coinSearch.id}" value="false">
                                    <span class="slider round"></span>
                                    <button href="#" class="btn btn-primary collapsible ${coinSearch.id}" data-toggle="collapse">More Info</button>
                                    <div class="content">
                                        <p class="${coinSearch.id}"></p>
                                        </div>
                                    </div>
                                </div>`);

  
        }  
       
        
            

    }
});
  


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
            /*******Go To Home Page Nav Bar Button *******/
            $("#HomePage").on("click",function(){
                location.reload();

            })
            /*******End Go To Home Page Nav Bar Button *******/

                

            /***Toggle input true or false****/
            $("input").on("change", function () {
                if ($(this).is(':checked')) {
                    $(this).attr('value', 'true')





                    let CardFavorite = event.srcElement.parentElement.children[2].classList[3];
                    // console.log(favorite)


                    if (favorite.length < 5) {
                        favorite.push(CardFavorite)

                        $('input[type=checkbox]').click(function () {
                            if ($(this).is(":not(:checked)")) {
                                $(this).prop('value', 'false');
                            }
                            let coinOut = this.classList[0]
                            for (let i = 0; i < favorite.length; i++) {
                                if (coinOut == favorite[i]) {
                                    let index = i
                                    favorite.splice(index, 1)
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
                            alert(`Something went wrong! Please try again. Problem number ${resualt.error}`) /***** Add a resonable message *****/
                        }



                    })
                    /****** End Ajax More Info Request******/
                }




            })

            /****** End More Info Button******/
            
        },
        error: function (resualt) {
            alert(`Something went wrong! Please try again. Problem number ${resualt.error}`) /***** Add a resonable message *****/
        }



    })

    $("#about").on("click", function () {

        $.ajax({
            type: "GET",
            url: "about.html",

            success: function (resualt) {
                

                $("#coinsDiv").html(`<div id="AboutSmallDiv">${resualt}</div>`)

            }
        })




    })

    $("#realTimeReports").on("click", function () {

        $.ajax({
            type: "GET",
            url: "RealTimeReports.html",

            success: function (resualt) {
              

                $("#coinsDiv").html(resualt)

                for (let i = 0; i < arr.length; i++) {

                    for (let j = 0; j < favorite.length; j++) {
                        if (favorite[j] === arr[i].id) {
                            let index = i
                            FavoriteSymbols.push(arr[index].symbol)
                        }
                    }
                }
                /*******Start Coins Table ******/


                setInterval(function(){  },2000)
                $.ajax({
                    type: "GET",
                    url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${FavoriteSymbols[0]},${FavoriteSymbols[1]},${FavoriteSymbols[2]},${FavoriteSymbols[3]},${FavoriteSymbols[4]}&tsyms=USD`,
               
                    success: function (resualt) {
                        // console.log(resualt[FavoriteSymbols.length])
                        if(FavoriteSymbols.length==0){
                            alert("Please Choose At Least One Coin To Show In The Graph")
                            $("#HomePage").click()
                        }else{

                     function SetCoin0(){
                        if(resualt[FavoriteSymbols[0]]==undefined){
                           return 0
                        }else{
                            return resualt[FavoriteSymbols[0]].USD
                        }
                    }

                    function SetCoin1(){
                        if(resualt[FavoriteSymbols[1]]==undefined){
                           return 0
                        }else{
                            return resualt[FavoriteSymbols[1]].USD
                        }
                    }

                    function SetCoin2(){
                        if(resualt[FavoriteSymbols[2]]==undefined){
                           return 0
                        }else{
                            return resualt[FavoriteSymbols[2]].USD
                        }
                    }

                    function SetCoin3(){
                        if(resualt[FavoriteSymbols[3]]==undefined){
                           return 0
                        }else{
                            return resualt[FavoriteSymbols[3]].USD
                        }
                    }

                    function SetCoin4(){
                        if(resualt[FavoriteSymbols[4]]==undefined){
                           return 0
                        }else{
                            return resualt[FavoriteSymbols[4]].USD
                        }
                    }
                        /******CHART ********/


                        var options = {
                            exportEnabled: true,
                            animationEnabled: true,
                            title: {
                                text: "Online Coins Trading Prices"
                            },
                            subtitles: [{
                                text: "Check At any Time How Much Your Coins Worth"
                            }],
                            axisX: {
                                title: "Time"
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
                                    name: `${FavoriteSymbols[0]}`,
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "#,##0 Units",
                                    dataPoints: [{
                                            x: new Date().getSeconds(),
                                            y: SetCoin0()

                                        },

                                    ]
                                },
                                
                                {
                                    type: "spline",
                                    name: `${FavoriteSymbols[1]}`,
                                    axisYType: "secondary",
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "$#,##0.#",
                                    dataPoints: [{
                                            x: new Date().getSeconds(),
                                            y: SetCoin1()

                                        },

                                    ]
                                }, {
                                    type: "spline",
                                    name: `${FavoriteSymbols[2]}`,
                                    axisYType: "secondary",
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "$#,##0.#",
                                    dataPoints: [{
                                            x: new Date().getSeconds(),
                                            y: SetCoin2()

                                        },

                                    ]
                                }, {
                                    type: "spline",
                                    name: `${FavoriteSymbols[3]}`,
                                    axisYType: "secondary",
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "$#,##0.#",
                                    dataPoints: [{
                                            x: new Date().getSeconds(),
                                            y: SetCoin3()

                                        },

                                    ]
                                }, {
                                    type: "spline",
                                    name: `${FavoriteSymbols[4]}`,
                                    axisYType: "secondary",
                                    showInLegend: true,
                                    xValueFormatString: "MMM YYYY",
                                    yValueFormatString: "$#,##0.#",
                                    dataPoints: [{
                                            x: new Date().getSeconds(),
                                            y: SetCoin4()

                                        },

                                    ]
                                }
                            ]
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



                    }
                        /******End CHART *********/
                    }
                })
            
                // })
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