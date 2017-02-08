<?php

// Return post entry meta information
function roots_entry_meta() {
  echo '<div id="posttime"><time class="updated" datetime="'. get_the_time('c') .'" pubdate>'. get_the_date("F").'<br /><span id="postday">'.get_the_date("j").'</span></time></div>';
  echo '<p class="byline author vcard">'. __('<span class="black">By</span>', 'roots') .' <a href="'. get_author_posts_url(get_the_author_meta('ID')) .'" rel="author" class="fn">'. get_the_author() .'</a> <span class="black"> in </span>';
	$categories = get_the_category();
	$separator = ', ';
	$output = '';
	if($categories){
		foreach($categories as $category) {
			$output .= '<a href="'.get_category_link($category->term_id ).'" title="' . esc_attr( sprintf( __( "View all posts in %s" ), $category->name ) ) . '">'.$category->cat_name.'</a>'.$separator;
		}
	}
	echo trim($output, $separator);


	echo '</p>';
}
