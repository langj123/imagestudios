<?php
/*
Template Name: Work Page
*/
?>
<?php get_header(); ?>
  <?php roots_content_before(); ?>
    <div id="content" class="twelvecol first">
    <?php roots_main_before(); ?>
      <article id="main" class="twelvecol first" role="main">
        <?php roots_loop_before(); ?>
        <?php get_template_part('loop', 'work'); ?>
        <?php roots_loop_after(); ?>
      </article><!-- /#main -->
    <?php roots_main_after(); ?>
    </div><!-- /#content -->
  <?php roots_content_after(); ?>
<?php get_footer(); ?>
