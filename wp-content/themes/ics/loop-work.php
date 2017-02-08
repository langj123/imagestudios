<?php /* Start loop */ ?>
<?php while (have_posts()) : the_post(); ?>
  <?php roots_post_before(); ?>
    <?php roots_post_inside_before(); ?>
			<?php if (!is_front_page()) { ?>
      <? } ?>
			<section class="ninecol last">
      	<?php the_content(); ?>
			</section>
      <?php wp_link_pages(array('before' => '<nav class="pagination">', 'after' => '</nav>')); ?>
    <?php roots_post_inside_after(); ?>
        <header class="page-header threecol first">
          <h2><?php the_title(); ?></h2>
					<h3><?php the_field('sub_heading'); ?></h3>
					<p class="lessmargin"><?php the_field('project_description'); ?></p>
					
					<?php if (get_field('link') != "") { ?>
						<p><a href="<?=the_field('link') ?>" target="_blank">Launch Website</a></p>
					<?php } ?>
<div class="addthis_toolbox addthis_default_style "><p>
<a class="addthis_button_preferred_1"></a>
<a class="addthis_button_preferred_2"></a>
<a class="addthis_button_preferred_3"></a>
<a class="addthis_button_preferred_4"></a>
<a class="addthis_button_compact"></a>
<a class="addthis_counter addthis_bubble_style"></a></p>
</div>
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=xa-5187f7d44aa11995"></script>

					<?php $related = get_field('related_work'); 
					if ($related) { ?>
						<h3 class="noborder">Related Work</h3>
						<ul class="related-work">
							<?php foreach($related as $post) {
								setup_postdata($post); ?>
								<li>
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								</li>
							<? } ?>
						</ul>
						<? wp_reset_postdata();
					} ?>
						<p><a href="/#work" class="back">Back to Grid</a></p>
        </header>
  <?php roots_post_after(); ?>
<?php endwhile; /* End loop */ ?>
