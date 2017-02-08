<?php /* Start loop */ ?>
<?php while (have_posts()) : the_post();

    $postId = get_the_id();
    $featImage = get_the_post_thumbnail($postId, 'post-feat') != '' ? get_the_post_thumbnail($postId, 'post-feat') : '<img src="' . get_template_directory_uri() . "/img/photo-table.jpg" . '" class="attachment-post-feat" alt="Work table with various design tools."/>';

?>
    <article <?php post_class() ?> id="post-<?php the_ID(); ?>">
      <header class="article-head article-feat <?php if ($under_cat != false) { echo $under_cat; } ?>">
        <?php if (!empty($featImage)) { echo $featImage; } ?>
         <div class="head-wrap">
          <h1><?php the_title(); ?></h1>
          <address>
            <h3 itemprop="name">Image Conscious Studios</h3>
            <p itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"><span itemprop="streetAddress">63 Maverick Square, #9</span><br /><span itemprop="addressLocality">Boston</span>, <span itemprop="addressRegion">MA</span> <span itemprop="postalCode">02128</span>
            <br /><a href="mailto:hello@icscreative.com">hello@icscreative.com</a><br /><a href="tel:6174187437" itemprop="telephone">617-418-7437</a></p>
          </address>

        </div>
      </header>
      <div class="entry-content">
        <?php the_content(); ?>
      </div><!-- .entry-content -->
    </article>
<?php endwhile; /* End loop */ ?>