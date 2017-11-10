//global JSON Results 
var animalResults

document.addEventListener("load", homePageLoad());

function homePageLoad() {

    var location = '35005';
    var animalType = ['dog', 'cat', 'bird', 'smallfurry', 'barnyard']
    var age = 'Young'


    for (var i = 0; i < animalType.length; i++) {
        var url =
            'https://api.petfinder.com/pet.getRandom?key=435c7d11e964556e87d7de00e3333dba&location=' + location +
            '&animal=' + animalType[i] + '&age=' + age + '&count=1&output=full&format=json';


        $.ajax({
            type: 'GET',
            data: {},
            url: url + '&callback=?',
            dataType: 'json',
            success: function (data) {

                var petfinder = data.petfinder.pet;

                console.log(petfinder);

                var infoDiv = $("<div id='animal-div' class='card col-lg-2 col-md-4 col-sm-12 col-xs-12' style='width: 20rem'>")
                var cardBody = $("<div class='card-body'>")
                var name = $("<h4 class='card-title'>" + petfinder.name['$t'] + "</h4>");
                // var animal = $("<div>").html("<b>Animal Type: </b>" + petfinder.animal['$t']);
                // var age = $("<div>").html("<b>Age: </b>" + petfinder.age['$t']);
                // var sex = $("<div>").html("<b>Sex: </b>" + petfinder.sex['$t']);
                // var size = $("<div>").html("<b>Size: </b>" + petfinder.size['$t']);
                var imgAddress = "";

                for (var t = 0; t < petfinder.media.photos.photo.length; t++) {
                    let imgItr = petfinder.media.photos.photo[t].$t;

                    if (imgItr.indexOf(300) >= 0) {
                        imgAddress = petfinder.media.photos.photo[t].$t;
                    }

                }
                var photo = $("<img class='card-img-top'>").attr({
                    src: imgAddress,
                    alt: 'pet image',
                    'data-id': petfinder.id['$t']
                });
                // infoDiv.append(animal)
                // infoDiv.append(name)
                // infoDiv.append(age)
                // infoDiv.append(sex)
                // infoDiv.append(size)
                infoDiv.append(photo)
                infoDiv.append(cardBody)
                cardBody.append(name)

                // return infoHTML;
                $('#petFinderInfo').append(infoDiv);

            }
        })
    }
}


$("#animal-preview-container").on("click", ".card-img-top", function () {

    var animalID = ($(this).data('id'));

    var url =
        'http://api.petfinder.com/pet.get?key=435c7d11e964556e87d7de00e3333dba&id=' + animalID +
        '&format=json';

        singleAnimalResults(url)

})


/*
- on page load find 1 animal of each type available
    - declare and assign default zip
        - this will have the option of being overwritten by google maps
- pass each api return object to homepage.html div
- assign animal id as data attribute for animal pic click function
*/