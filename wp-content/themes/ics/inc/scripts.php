<?php
/**
 * Scripts and stylesheets
 *
 * Enqueue stylesheets in the following order:
 * 1. /theme/css/bootstrap.css
 * 2. /theme/css/bootstrap-responsive.css      (if enabled in config.php)
 * 3. /theme/css/app.css
 * 4. /child-theme/style.css                   (if a child theme is activated)
 *
 * Enqueue scripts in the following order:
 * 1. /theme/js/vendor/modernizr-2.5.3.min.js  (in header.php)
 * 2. jquery-1.7.2.min.js via Google CDN       (in header.php)
 * 3. /theme/js/plugins.js
 * 4. /theme/js/main.js
 */

function roots_scripts() {
  wp_enqueue_style('ics-fonts', 'http://fast.fonts.net/cssapi/a7f9c3ff-98cf-4b7f-9b3f-5fd6b84f9966.css', false, null);
  wp_enqueue_style('roots_bootstrap', get_template_directory_uri() . '/css/bootstrap.css', false, null);
  wp_enqueue_style('roots_hellenic', get_template_directory_uri() . '/css/hellenic/hellenic.css', false, null);

  // Load style.css from child theme
  if (is_child_theme()) {
    wp_enqueue_style('roots_child', get_stylesheet_uri(), false, null);
  }

  //UNLESS CSS
  wp_enqueue_style('roots_style', get_template_directory_uri() . '/css/style.css', false, null);

  if (is_single() && comments_open() && get_option('thread_comments')) {
    wp_enqueue_script('comment-reply');
  }

	if (is_front_page()) {

    wp_enqueue_style('home-updates', get_template_directory_uri() . '/css/sass-gen/home-updates.css', false, null);
    wp_register_script('greensock', 'http://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.2/TweenMax.min.js', array('jquery'), '1.0.0', false );
    wp_register_script('greensock-css', 'http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/CSSPlugin.min.js', array('jquery', 'greensock'), '1.0.0', false );
    wp_register_script('greensock-draggable', 'http://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/utils/Draggable.min.js', array('jquery', 'greensock', 'greensock-css'), '1.0.0', false );
    wp_register_script('greensock-throw', get_template_directory_uri() . '/js/_plugins/ThrowProps.js', array('jquery', 'greensock', 'greensock-css', 'greensock-draggable'), '1.0.0', false );
    wp_register_script('features_home', get_template_directory_uri() . '/js/features.js', array('jquery', 'greensock', 'greensock-css', 'greensock-draggable', 'greensock-throw'), '1.0.0', false);

    wp_enqueue_script('greensock');
    wp_enqueue_script('greensock-css');
    wp_enqueue_script('greensock-draggable');
    wp_enqueue_script('features_home');

    // for loading javasript objects
    if (function_exists('get_field')) {
      $front_id = get_option('page_on_front');
      $libs =  get_field('mad_libs', $front_id);
      wp_localize_script('features_home', 'libs', $libs);
    }

	}
}

add_action('wp_enqueue_scripts', 'roots_scripts', 100);
