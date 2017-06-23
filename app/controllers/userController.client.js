'use strict';

(function () {

   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name') || null;
   var changeP = document.querySelector('#changesp') || null;
   
   var city = document.querySelector('#city') || null;
   var state = document.querySelector('#state') || null;
   var save = document.querySelector('#save') || null;
   
   var apiUrl = appUrl + '/api/:id';
   var mainUserId;

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }
   
   function updateChangesFMe (data) {
      var books = JSON.parse(data);
      console.log(books);
      //if(changeP != null){
         changeP.innerHTML = '';
         for(var a = 0; a < books.length; a++){
            console.log(books[a]);
            /*if(books[a].subtitle !== null)*/ changeP.innerHTML = changeP.innerHTML + '<li><input type="radio" value="' +books[a].user+'*****'+books[a].book.title+'" name="radioChanges" id="radioChange'+a+'">The User '+ books[a].userName +' wants to trade "' +books[a].book.title+'" with you!';
            if(books[a].book.approbed == false) changeP.innerHTML = changeP.innerHTML + 'I do not trade!</li><br>';
            else changeP.innerHTML = changeP.innerHTML + 'I will trade!</li><br>';
            //else myBooks.innerHTML = myBooks.innerHTML + '<li><input type="radio" value="' +books[a].title+'" name="radioMyBook" id="radioBook'+a+'">'+books[a].title+'<img src='+books[a].thumbnail+' class = "miniimg img-rounded"></li><br>';
         }
      //}
   }
   
   function updateGeoLocation (data) {
      var myData = JSON.parse(data);
      document.querySelector('#city').value = myData.city;
      document.querySelector('#state').value = myData.state;
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject, displayName, 'username');
      }

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }

      if (profileRepos !== null) {
         updateHtmlElement(userObject, profileRepos, 'publicRepos');   
      }
      
      mainUserId = userObject.id;
      ajaxFunctions.ajaxRequest('GET', apiUrl+'/changesforme/'+userObject.id, updateChangesFMe);
      ajaxFunctions.ajaxRequest('GET', apiUrl+'/changegetgeo', updateGeoLocation);

   }));
   
   if(changeP != null){
      
      changeP.addEventListener('click', function () {

      var book = document.querySelector('input[name = "radioChanges"]:checked').value;
         ajaxFunctions.ajaxRequest('GET', apiUrl+'/changesa/'+book, function () {
            ajaxFunctions.ajaxRequest('GET', apiUrl+'/changesforme/'+mainUserId, updateChangesFMe);
         });

      }, false);
      
   }
   
   save.addEventListener('click', function () {

      var geolocation = city.value + '*****'+ state.value;
         ajaxFunctions.ajaxRequest('GET', apiUrl+'/changesetgeo/'+geolocation, function () {
            ajaxFunctions.ajaxRequest('GET', apiUrl+'/changegetgeo', updateGeoLocation);
         });

      }, false);
   
   
})();
