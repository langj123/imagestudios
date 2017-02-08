<div class="author-cont">
	<?php echo get_avatar(get_the_author_meta( 'ID' ), 72); ?>
	<h2 class="user-name"><?php echo get_the_author(); ?></h2>
	<p class="user-role"><?php the_author_meta('nickname'); ?></p>
	<p class="user-bio"><?php if (the_author_meta('user_description')) the_author_meta( 'user_description');?>
		<a href="<?php echo get_author_posts_url( get_the_author_meta('ID')); ?>">More Posts by <?php the_author_meta('first_name' );?></a></p>
</div>