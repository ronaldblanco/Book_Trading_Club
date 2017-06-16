'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   //var clickNbr = document.querySelector('#click-nbr');
   var isearch = document.querySelector('#isearch');
   var sResult = document.querySelector('#sResult');
   var apiUrl = appUrl + '/api/:id/search';

   function updateSearch (data) {
      var search = JSON.parse(data);
      sResult.innerHTML = '';
      for(var a = 0; a < search.length; a++){
         sResult.innerHTML = sResult.innerHTML + '<li><input type="radio" value="' +search[a].title+ '" name="radioBook" id="radioBook'+a+'"><div><img src='+search[a].thumbnail+' class = "miniimg img-rounded"></div>Title: '+search[a].title+' SubTitle: '+search[a].subtitle+'</li>';
      }
      
   }

   //ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateSearch));

   addButton.addEventListener('click', function () {
      
      var book = isearch.value;
      ajaxFunctions.ajaxRequest('GET', apiUrl+'/'+book, updateSearch);

   }, false);

   /*deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);*/

})();
