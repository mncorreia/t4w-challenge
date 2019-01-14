$(document).ready(function(){    
    var pickerElems = document.querySelectorAll('.datepicker');
    var pickerInstances = M.Datepicker.init(pickerElems, {
        format: 'dd-mm-yyyy',
        defaultDate: new Date()
    });

    var childs_chipsElems = document.getElementById('childs-chips');
    var childs_chipsInstances = M.Chips.init(childs_chipsElems, {
        placeholder: 'Idade das crianças(opcional)',
        secondaryPlaceholder: '+Idades',
        limit: 8,    
        onChipAdd: _onAddChildInput,
        onChipDelete: _onDeleteChildInput,
    })

    function _onAddChildInput(any, other, nd){
        
        let childAdded = any[0].M_Chips.chipsData[any[0].M_Chips.chipsData.length - 1].tag

        $('#childs-chips').append($('<input type="hidden" name="childs">').val(childAdded))
        console.log(childAdded)
        
    }    

    function _onDeleteChildInput(any, other){
        let childDeleted = $(other)[0].textContent.replace("close", "")

        $(`input[name="childs"][value="${childDeleted}]"`).remove()
        console.log(childDeleted)
    }

    function _showOffersData(data){
        if($('.hotels-available').length > 0) $('.hotels-available').remove()
        var results = $('<div class="row hotels-available"></div>')
        data.Hotels.forEach(hotel => {
            var newHotelHtml = `            
                <div class="col s12 m6 l4 red lighten-5"> \
                    <div class="card large hotel-card hoverable"> \
                    <div class="card-image waves-effect waves-block waves-light"> \
                        <img class="activator" src="./images/sample-1.jpg"> \
                        </div> \
                        <div class="card-content"> \
                            <span class="card-title activator grey-text text-darken-4">${hotel.HotelId}<i class="material-icons right">more_vert</i></span>\                    
                        </div> \
                    <div class="card-reveal"> \
                            <span class="card-title grey-text text-darken-4">Confira também:<i class="material-icons right">close</i></span>\
                            \
                        </div> \
                    </div> \
                </div> \
            `
            
            var mainInfo= ` 
                <p>$ ${hotel.Rooms[0].TotalSellingPrice.Value}</p>\
                <ul> \
                <li>Descrição: ${hotel.Rooms[0].BoardDescription}</li> \
                <li>Sobre o quarto: ${hotel.Rooms[0].RoomDescription}</li> \
                <li>Mais informação: ${hotel.Rooms[0].MoreInformation}</li> \
                </ul> \
            `

            
            var bulkedHtml = $(newHotelHtml);
            var moreInfo= ``;
            for(var i = 1; i < hotel.Rooms.length; i++){
                
                moreInfo = moreInfo.concat(`
                    <h6>Quarto ${i + 1} - $${hotel.Rooms[i].TotalSellingPrice.Value}</h6> \
                    <ul> \
                        <li>${hotel.Rooms[i].BoardDescription}</li> \
                        <li>${hotel.Rooms[i].RoomDescription}</li> \
                    <li>${hotel.Rooms[i].MoreInformation}</li> \                   
                    </ul>\
                `) 
            }
            bulkedHtml.children('.card-content').append(mainInfo)     
            bulkedHtml.children('.card-reveal').append(moreInfo)  
            results.append(bulkedHtml)                        
        });        
        $('body').append(results)            
        
        $('.preloader-background').addClass('hide')
    }

    $("form").on("submit", function( event ) {
        event.preventDefault();
        console.log( $( this ).serialize());

        $('.preloader-background').removeClass('hide')
        $.getJSON(`http://localhost:8887/search?` + $(this).serialize(), (data) => {  
            console.log(data);
            _showOffersData(data)
        }).fail((err, xhr, tal) => {
            console.error(err, xhr, tal)
            if(xhr.status == 400){
                var message;
                responseJSON.Error.form.forEach(e => {
                    message += '\n ' + e.msg
                })
                alert(message)
            }
            $('.preloader-background').addClass('hide')
        })
      });

    $("#search-hotel").click((e) => {
        $("form").submit()
    })

});

