<div id="blog-items">
<?php
		//display 2 posts
    $args=array(
      'post_type' => 'post',
      'post_status' => 'publish',
      'posts_per_page' => 2,
      'caller_get_posts'=> 1
      );
    $my_query = null;
    $my_query = new WP_Query($args);
    if( $my_query->have_posts() ) {
      while ($my_query->have_posts()) : $my_query->the_post(); ?>
	
				<div class="post-item">
 				 <?='<div class="posttime"><time class="updated" datetime="'. get_the_time('c') .'">'. get_the_date("F").'<br /><span class="postday">'.get_the_date("j").'</span></time></div>';	?>
     	  <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
    	  <?php the_excerpt(); ?>
      	<p><a class="permalink" href="<?php the_permalink() ?>" rel="bookmark" title="Read <?php the_title_attribute(); ?>">Read More &rarr;</a></p>
			</div>
       <?php
      endwhile;
    }
wp_reset_query();  // Restore global post data stomped by the_post().
?>
	<a class="yellow-button" href="/blog">View Blog</a>
	<div class="post-item" id="last-tweet">
		<img src="/img/twitterbird-blogicon.png" alt="Twitter logo" />
		<h3><a href="http://twitter.com/icscreative" target="_blank" rel="nofollow">@icscreative</a></h3>
		<div id="twitter_update_list"></div>
	</div>
</div>
<?php //dynamic_sidebar('sidebar-talk'); ?>
