'use strict';

(function () {

   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var changeP = document.querySelector('#changesp');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }
   
   function updateChangesFMe (data) {
      var books = JSON.parse(data);
      console.log(books);
      //if(changeP != null){
         changeP.innerHTML = '';
         for(var a = 0; a < books.length; a++){
            /*if(books[a].subtitle !== null)*/ changeP.innerHTML = changeP.innerHTML + '<li><input type="radio" value="' +books[a].book.title+'" name="radioChanges" id="radioChange'+a+'">The User '+ books[a].userName +' wants to trade "' +books[a].book.title+'" with you!</li><br>';
            //else myBooks.innerHTML = myBooks.innerHTML + '<li><input type="radio" value="' +books[a].title+'" name="radioMyBook" id="radioBook'+a+'">'+books[a].title+'<img src='+books[a].thumbnail+' class = "miniimg img-rounded"></li><br>';
         }
      //}
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
      
      ajaxFunctions.ajaxRequest('GET', apiUrl+'/changesforme/'+userObject.id, updateChangesFMe);

   }));
})();
