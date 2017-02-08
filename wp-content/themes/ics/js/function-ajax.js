$(document).ready(function() {
	var ppp = 6, /* Posts per page */
	loadBttn = $("#LoadMore"),
	cat = loadBttn.data("category"),
    aut = loadBttn.data("author"),
	pageNumber = 1;


function load_posts(){
    pageNumber++;

    var str = '&author=' + aut + '&cat=' + cat + '&pageNumber=' + pageNumber + '&ppp=' + ppp + '&action=more_post_ajax';
    $.ajax({
        type: "POST",
        dataType: "html",
        url: ajax_posts.ajaxurl,
        data: str,
        success: function(data){
            var $data = $(data);
            if($data.length){
                $("#AjaxMore").append($data);
                $("#LoadMore").attr("disabled",false);
            } else{
                $("#LoadMore").attr("disabled",true);
                $("#LoadMore").text("Sorry, no more posts");
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
        }

    });
    return false;
}

$("#LoadMore").on("click",function(){ // When btn is pressed.
    $("#LoadMore").attr("disabled",true); // Disable the button, temp.
    load_posts();
});
});