'use strict';

(function () {

   var searchButton = document.querySelector('.btn-add');
   var myBooksButton = document.querySelector('.btn-delete');
   //var clickNbr = document.querySelector('#click-nbr');
   var isearch = document.querySelector('#isearch');
   var sResult = document.querySelector('#sResult');
   var myBooks = document.querySelector('#myBooks');
   
   //var text = document.querySelector('#text');
   
   var apiUrl = appUrl + '/api/:id/search';

   function updateSearch (data) {
      var search = JSON.parse(data);
      sResult.innerHTML = '<h3>NEW SEARCH:</h3><br>';
      for(var a = 0; a < search.length; a++){
         if(search[a].subtitle !== undefined) sResult.innerHTML = sResult.innerHTML + '<li><input type="radio" value="' +search[a].title+"*****"+search[a].subtitle+'*****'+search[a].thumbnail+ '" name="radioBook" id="radioBook'+a+'">'+search[a].title+'<br>Info: '+search[a].subtitle+'<br><img src='+search[a].thumbnail+' class = "miniimg img-rounded"></li><br>';
         else sResult.innerHTML = sResult.innerHTML + '<li><input type="radio" value="' +search[a].title+'*****'+search[a].thumbnail+ '" name="radioBook" id="radioBook'+a+'">'+search[a].title+'<img src='+search[a].thumbnail+' class = "miniimg img-rounded"></li><br>';
      }
      
   }
   
   function updateMyBooks (data) {
      var books = JSON.parse(data);
      console.log(books);
      myBooks.innerHTML = '<h3>THIS IS MY LIBRARY:</h3><br>';
      for(var a = 0; a < books.length; a++){
         if(books[a].subtitle !== null) myBooks.innerHTML = myBooks.innerHTML + '<li><input type="radio" value="' +books[a].title+'" name="radioMyBook" id="radioBook'+a+'">'+books[a].title+'<br>Info: '+books[a].subtitle+'<br><img src='+books[a].thumbnail+' class = "miniimg img-rounded"></li><br>';
         else myBooks.innerHTML = myBooks.innerHTML + '<li><input type="radio" value="' +books[a].title+'" name="radioMyBook" id="radioBook'+a+'">'+books[a].title+'<img src='+books[a].thumbnail+' class = "miniimg img-rounded"></li><br>';
      }
      
   }

   //ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateSearch));

   searchButton.addEventListener('click', function () {
      
      var book = isearch.value;
      ajaxFunctions.ajaxRequest('GET', apiUrl+'/'+book, updateSearch);

   }, false);
   
   sResult.addEventListener('click', function () {

      var book = document.querySelector('input[name = "radioBook"]:checked').value;
      //document.querySelector("#text").value = book;
      
      ajaxFunctions.ajaxRequest('POST', apiUrl+'add?data='+book, function (){
         ajaxFunctions.ajaxRequest('GET', appUrl+'/api/:id/mybooks', updateMyBooks);
         //ajaxFunctions.ajaxRequest('GET', apiUrl+'get', updateSearch);
      });
      

   }, false);

   myBooksButton.addEventListener('click', function () {

      //ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', appUrl+'/api/:id/mybooks', updateMyBooks);
      //});

   }, false);
   
   if(myBooks !== undefined){
      myBooks.addEventListener('click', function () {

         var book = document.querySelector('input[name = "radioMyBook"]:checked').value;
         //document.querySelector("#login").innerHTML = 'YOU NEED TO LOGIN IN ORDER TO SELECT A PLACE!<br><a href="/auth/github">					<div class="btn" id="login-btn">						<img src="/public/img/github_32px.png" alt="github logo" />						<p>LOGIN WITH GITHUB</p>					</div>				</a>';
         ajaxFunctions.ajaxRequest('GET', apiUrl+'del/'+book, function (){
            ajaxFunctions.ajaxRequest('GET', appUrl+'/api/:id/mybooks', updateMyBooks);
            //ajaxFunctions.ajaxRequest('GET', apiUrl+'get', updateSearch);
         });
      

      }, false);
   }

})();
