jQuery(document).ready(function(){
  var curCat = $('.current-cat');

  if(curCat) {
    curCat.on('click', function(){
      blogUrl = "blog";
      console.log(window.location.origin);
      window.location = window.location.origin + "/" + blogUrl;
      return false;
    }); 
  }

}); //document.ready
