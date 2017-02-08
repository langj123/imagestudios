<?php /* Start loop */ 

$cat_id = get_cat_id(single_cat_title( '', false )) != 0 ? get_cat_id(single_cat_title( '', false )) : false;
$aut_id = get_user_by('slug', get_query_var('author_name'));


$args = array(
  'post_type' => 'post',
  'showposts' => 6,
  'cat' => $cat_id,
  'author' => $aut_id->ID
);

$post_query = new WP_Query($args);
$y = 0;

?>
<div id="AjaxMore" class="entry-content">
<?php 

  if ($post_query->have_posts()) {

    while ($post_query->have_posts()) { $post_query->the_post(); 

      $postId = $post_query->posts[$y]->ID;
      $post_categories = wp_get_post_categories($postId);
      $cats = '<ul class="post-category-list category-posts">';
      $under_cat = false;
      $excerpt = '<p>' . get_the_excerpt() . '</p>';

      foreach ($post_categories as $id) {
        $catInfo = get_category($id);
        if ($catInfo->slug == 'under-the-hood') {
          // set background color for under the hood section, if customized
          if (function_exists('get_field')) {
            $under_cat = $catInfo->slug;
          }
        } else {
          $cats .= '<li><a href="' . get_category_link($catInfo->term_id) . '">' . $catInfo->name . '</a></li>';
        }
       
      }

      $cats .= '</ul>';

      if (function_exists('get_field')) {
        $blog_post_repeat = get_field('blog_content', $postId);
      }

    if ($y == 0) { 
        $featImage = get_the_post_thumbnail($postId, 'post-feat') != '' ? get_the_post_thumbnail($postId, 'post-feat') : '<img src="' . get_template_directory_uri() . '/img/photo-table-635x480.jpg" class="attachment-post-feat-port" alt="Design table with various tools" />';
    ?>

      <div class="article-head article-feat <?php echo $under_cat; ?>">
        <?php if (!empty($featImage)) { echo $featImage; } ?>
         <div class="head-wrap">
          <?php echo $cats; ?>
          <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          <?php echo $excerpt . '<a href="' . get_permalink($postId) . '" class="read-more">Read</a>'; ?>
         </div>
      </div>
      <ul class="category-list">
        <?php wp_list_categories('orderby=name&title_li='); ?>
      </ul>
    <?php } else {

          $featImage = get_the_post_thumbnail($postId, 'post-feat-port') != '' ? get_the_post_thumbnail($postId, 'post-feat-port') : '<img src="' . get_template_directory_uri() . '/img/photo-table-635x480.jpg" class="attachment-post-feat-port" alt="Design table with various tools"  />';

          $html = '<div class="entry-grid">';
          $html .= '<div class="article-head article ' . $under_cat . '">';
          $html .= $featImage;
          $html .= '</div>';
          $html .= '<div class="article-body article">';
          $html .= '<div class="head-wrap">';
          $html .= $cats;
          $html .= '<h2><a href="' . get_permalink($postId) . '">' . the_title('','',false) . '</a></h2>';
          $html .= $excerpt;
          $html .= '<a href="' . get_permalink($postId) . '" class="read-more">Read</a>';
          $html .= '</div>';
          $html .= '</div>';
          $html .= '</div>';

          echo $html;

    }
  $y++;
  }
}
wp_reset_postdata();
?>
</div><!-- .entry-content -->
<div class="load-more"><button id="LoadMore" data-author="<?php echo $aut_id->ID; ?>" data-category="<?php echo $cat_id; ?>">View More Posts</button></div>
