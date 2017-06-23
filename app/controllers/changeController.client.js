'use strict';

(function () {

   /*var searchButton = document.querySelector('.btn-add');
   var myBooksButton = document.querySelector('.btn-delete');
   //var clickNbr = document.querySelector('#click-nbr');
   var isearch = document.querySelector('#isearch');*/
   var allBooks = document.querySelector('#allBooks');
   var myChanges = document.querySelector('#mychanges');
   var myChangesButton = document.querySelector('#myChangesB');
   var apiUrl = appUrl + '/api/:id/change';

   var cont = -1;//-1,3
   var cont1 = 1;
   function colors(){
      //cont = min;
      var colors = ["list-group-item-info","list-group-item-warning","list-group-item-danger","list-group-item-success"];
      cont++;
      if(cont > -1 && cont < 2) return colors[cont];
      else{
         cont = 0;
         return colors[cont];
      } 
   }
   function colors1(){
      //cont = min;
      var colors = ["list-group-item-info","list-group-item-warning","list-group-item-danger","list-group-item-success"];
      cont1++;
      if(cont1 > 0 && cont1 < 4) return colors[cont1];
      else{
         cont1 = 2;
         return colors[cont1];
      } 
   }
   
   function updateSearch (data) {
      var search = JSON.parse(data);
      //console.log(search);
      allBooks.innerHTML = '';
      var count = 1;
      for(var a = 0; a < search.length; a++){
         
         if(search[a].subtitle !== undefined) allBooks.innerHTML = allBooks.innerHTML + '<li><div><input type="radio" value="' +search[a].book.title+"*****"+search[a].user+ "*****"+search[a].userName+ '" name="radioBook" id="radioBook'+a+'">'+search[a].book.title+'<br>Info: '+search[a].book.subtitle+'<br>At '+search[a].geoLocation.city+', ' +search[a].geoLocation.state+'<br><img src='+search[a].book.thumbnail+' class = "miniimg img-rounded"></div>  </li>';
         else allBooks.innerHTML = allBooks.innerHTML + '<li class="list-group-item '+colors()+'"><div><input type="radio" value="' +search[a].book.title+'*****'+search[a].user +"*****"+search[a].userName+'" name="radioBook" id="radioBook'+a+'">'+search[a].book.title+'<br>At '+search[a].geoLocation.city+', ' +search[a].geoLocation.state+'<br><img src='+search[a].book.thumbnail+' class = "miniimg img-rounded"></div>    </li>';
         count++;
      }
     allBooks.innerHTML = allBooks.innerHTML + '';
   }
   
   function updateMyChanges (data) {
      var books = JSON.parse(data);
      console.log(books);
      myChanges.innerHTML = '<div class="alert alert-info"><h3 class="bg-info">THIS ARE MY CHANGES:</h3></div>';
      for(var a = 0; a < books.length; a++){
         /*if(books[a].subtitle !== null)*/ myChanges.innerHTML = myChanges.innerHTML + '<li><input type="radio" value="' +books[a].title+'" name="radioChanges" id="radioChange'+a+'"><p class="bg-primary">"'+books[a].title+'"<br>From: <kbd>'+books[a].userName+'</kbd></p>';
         //else myBooks.innerHTML = myBooks.innerHTML + '<li><input type="radio" value="' +books[a].title+'" name="radioMyBook" id="radioBook'+a+'">'+books[a].title+'<img src='+books[a].thumbnail+' class = "miniimg img-rounded"></li><br>';
         if(books[a].approbed == false) myChanges.innerHTML = myChanges.innerHTML + '<p class="bg-danger">Owner have not approved yet the trade with you!</p></li><br>';
         else if(books[a].approbed == true) myChanges.innerHTML = myChanges.innerHTML + '<p class="bg-success">Owner have approved the trade with you!</p></li><br>';
      }
      
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateSearch));

   /*searchButton.addEventListener('click', function () {
      
      var book = isearch.value;
      ajaxFunctions.ajaxRequest('GET', apiUrl+'/'+book, updateSearch);

   }, false);*/
   
   allBooks.addEventListener('click', function () {

      var book = document.querySelector('input[name = "radioBook"]:checked').value;
      //document.querySelector("#login").innerHTML = 'YOU NEED TO LOGIN IN ORDER TO SELECT A PLACE!<br><a href="/auth/github">					<div class="btn" id="login-btn">						<img src="/public/img/github_32px.png" alt="github logo" />						<p>LOGIN WITH GITHUB</p>					</div>				</a>';
      ajaxFunctions.ajaxRequest('GET', apiUrl+'add/'+book, function (){
         //ajaxFunctions.ajaxRequest('GET', appUrl+'/api/:id/mybooks', updateSearch);
         ajaxFunctions.ajaxRequest('GET', apiUrl+'smy', updateMyChanges);
      });
      

   }, false);

   myChanges.addEventListener('click', function () {

   var book = document.querySelector('input[name = "radioChanges"]:checked').value;
      ajaxFunctions.ajaxRequest('GET', apiUrl+'del/'+book, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl+'smy', updateMyChanges);
      });

   }, false);
   
   myChangesButton.addEventListener('click', function () {

         /*var book = document.querySelector('input[name = "radioMyBook"]:checked').value;
         //document.querySelector("#login").innerHTML = 'YOU NEED TO LOGIN IN ORDER TO SELECT A PLACE!<br><a href="/auth/github">					<div class="btn" id="login-btn">						<img src="/public/img/github_32px.png" alt="github logo" />						<p>LOGIN WITH GITHUB</p>					</div>				</a>';
         ajaxFunctions.ajaxRequest('GET', apiUrl+'del/'+book, function (){
            ajaxFunctions.ajaxRequest('GET', appUrl+'/api/:id/mybooks', updateMyBooks);*/
            //ajaxFunctions.ajaxRequest('GET', apiUrl, updateSearch);
            ajaxFunctions.ajaxRequest('GET', apiUrl+'smy', updateMyChanges);
        // });
      

      }, false);
   

})();
