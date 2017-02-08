
	<?php if (is_front_page()) { ?></div><!-- /#wrap --> <?php } ?>

  <?php dynamic_sidebar('sidebar-footer'); ?>
	<?php if (!is_front_page()) { ?>
  <?php roots_footer_before(); ?>
	<?php get_template_part('footer', 'common'); ?>
  <?php roots_footer_after(); ?>
  <?php wp_footer(); ?>
  <?php roots_footer(); ?>
	<? } ?>
<script type="text/javascript">
	//Google Analytics 
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-4955966-18']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<!--[if lt IE 9]><script src="/js/css3-mediaqueries.js"></script><![endif]-->
</body>
</html>
