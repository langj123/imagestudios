<?php get_header(); ?>
  <?php roots_content_before(); ?>
    <div id="content" class="<?php echo CONTAINER_CLASSES; ?>">
    <?php roots_main_before(); ?>
      <div id="main" role="main">
        <div class="page-header">
          <h1>Whoops.</h1>
					<h2>That page cannot be found</h2>
          <p>If you're lost, try navigating back, or to our home page. Thank you.</p>
        </div>
					<p><a class="yellow-button" href="/">GO HOME</a></p>.
      </div><!-- /#main -->
    <?php roots_main_after(); ?>
    </div><!-- /#content -->
  <?php roots_content_after(); ?>
<?php get_footer(); ?>
