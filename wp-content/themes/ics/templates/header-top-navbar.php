<header id="banner" class="navbar navbar-fixed-top" role="banner">
  <?php roots_header_inside(); ?>
  <div class="navbar-inner">
    <div class="<?php echo WRAP_CLASSES; ?>">
     <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <a class="brand scrollTo" href="<?php echo home_url(); ?>/#home">
        <img src="/img/Logo-Bolt-yellow.png" alt="Image Conscious Studios" />
      </a>
      <nav id="nav-left" class="nav-collapse" role="navigation">
        <?php wp_nav_menu(array('theme_location' => 'left_navigation', 'menu_class' => 'nav')); ?>
      </nav>
      <nav id="nav-right" class="nav-collapse" role="navigation">
        <?php wp_nav_menu(array('theme_location' => 'right_navigation', 'menu_class' => 'nav')); ?>
      </nav>
			<div id="navbar-social">
				<a href="https://twitter.com/ICScreative" target="_blank" class="twitter" rel="nofollow"><img src="/img/Twitter-black.png" alt="Follow us on Twitter"  /> </a>
        <a href="http://www.facebook.com/icscreative" target="_blank" class="facebook" rel="nofollow"><img src="/img/Facebook-black.png" alt="Like ICS on Facebook"  /></a>
        <a href="http://pinterest.com/icscreative/" target="_blank" class="pinterest" rel="nofollow"><img src="/img/Pinterest-black.png" alt="Follow ICS on Pinterest"  /></a>
        <a href="http://instagram.com/icscreative/" target="_blank" class="instagram" rel="nofollow"><img src="/img/Instagram-black.png" alt="Follow ICS on Instagram"  /></a>
			</div>
    </div>
  </div>
</header>
