/* Author: Greg Opperman

*/
jQuery(document).ready(function(){

    jQuery("#text-2").css({"top":-jQuery("#text-2").height()});

    jQuery(".open-contact").click(function(){
        //jQuery("#text-2").animate({"margin-bottom":-jQuery("#text-2").height()}, 1000);
        jQuery("#text-2").show();
        jQuery("#text-2").animate({"top":0}, 600);
        return false;
      }
    ); //click
    jQuery(".close-contact").click(function(){
        //jQuery("#text-2").animate({"margin-bottom":0}, 900);
        jQuery("#text-2").animate({"top":-jQuery("#text-2").height()}, 600, function(){
            jQuery("#text-2").hide();
        });
        return false;
      }
    ); //click

	//Remove text on click for contact form
  $('.wpcf7-text, .wpcf7-textarea').focus(function() {
		if ($(this).val() == 'name' || $(this).val() == 'business' || $(this).val() == 'email' || $(this).val() == 'subject' || $(this).val() == 'Tell us about your project...') {
      $(this).val("");
		}
  }).blur(function () {
    if ($(this).val() == "") {
      $(this).val($(this).attr("title"));
    }
  });
  $('.open-contact a').attr("onclick", "_gaq.push(['_trackEvent', 'Contact Form', 'Opened', 'Top Navigation']);");
  $('.wpcf7-submit').attr("onclick", "_gaq.push(['_trackEvent', 'Contact Form', 'Submitted', 'Submit Button']);");
}); //document.ready
