'use strict';

(function () {

   /*var searchButton = document.querySelector('.btn-add');
   var myBooksButton = document.querySelector('.btn-delete');
   //var clickNbr = document.querySelector('#click-nbr');
   var isearch = document.querySelector('#isearch');*/
   var allBooks = document.querySelector('#allBooks');
   var myChanges = document.querySelector('#mychanges');
   var apiUrl = appUrl + '/api/:id/change';

   function updateSearch (data) {
      var search = JSON.parse(data);
      //console.log(search);
      allBooks.innerHTML = '';
      var count = 1;
      for(var a = 0; a < search.length; a++){
         
         if(search[a].subtitle !== undefined) allBooks.innerHTML = allBooks.innerHTML + '<li><div><input type="radio" value="' +search[a].book.title+"*****"+search[a].user+ "*****"+search[a].userName+ '" name="radioBook" id="radioBook'+a+'">'+search[a].book.title+'<br>Info: '+search[a].book.subtitle+'<br><img src='+search[a].book.thumbnail+' class = "miniimg img-rounded"></div>      </li>';
         else allBooks.innerHTML = allBooks.innerHTML + '<li><div><input type="radio" value="' +search[a].book.title+'*****'+search[a].user +"*****"+search[a].userName+'" name="radioBook" id="radioBook'+a+'">'+search[a].book.title+'<img src='+search[a].book.thumbnail+' class = "miniimg img-rounded"></div>        </li>';
         count++;
      }
     allBooks.innerHTML = allBooks.innerHTML + '';
   }
   
   function updateMyChanges (data) {
      var books = JSON.parse(data);
      console.log(books);
      myChanges.innerHTML = '<h3>THIS ARE MY CHANGES:</h3><br>';
      for(var a = 0; a < books.length; a++){
         /*if(books[a].subtitle !== null)*/ myChanges.innerHTML = myChanges.innerHTML + '<li><input type="radio" value="' +books[a].title+'" name="radioMyBook" id="radioBook'+a+'">'+books[a].title+'<br>From: '+books[a].userName+'</li><br>';
         //else myBooks.innerHTML = myBooks.innerHTML + '<li><input type="radio" value="' +books[a].title+'" name="radioMyBook" id="radioBook'+a+'">'+books[a].title+'<img src='+books[a].thumbnail+' class = "miniimg img-rounded"></li><br>';
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

   /*myBooksButton.addEventListener('click', function () {

      //ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', appUrl+'/api/:id/mybooks', updateMyBooks);
      //});

   }, false);*/
   
   /*if(myBooks !== undefined){
      myBooks.addEventListener('click', function () {

         var book = document.querySelector('input[name = "radioMyBook"]:checked').value;
         //document.querySelector("#login").innerHTML = 'YOU NEED TO LOGIN IN ORDER TO SELECT A PLACE!<br><a href="/auth/github">					<div class="btn" id="login-btn">						<img src="/public/img/github_32px.png" alt="github logo" />						<p>LOGIN WITH GITHUB</p>					</div>				</a>';
         ajaxFunctions.ajaxRequest('GET', apiUrl+'del/'+book, function (){
            ajaxFunctions.ajaxRequest('GET', appUrl+'/api/:id/mybooks', updateMyBooks);
            //ajaxFunctions.ajaxRequest('GET', apiUrl+'get', updateSearch);
         });
      

      }, false);
   }*/

})();
