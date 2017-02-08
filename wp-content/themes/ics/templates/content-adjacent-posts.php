<?php
$next_post = get_next_post();
$prev_post = get_previous_post();

if (!empty($next_post) || !empty($prev_post)) {
?>
<ul class="post-links post-images">

<?php
	if (!empty($prev_post)) {

		$prev_id = $prev_post->ID;
		$prev_title = $prev_post->post_title;
		$prev_link = $prev_post->guid;

		$html = '<li>';
		$html .= '<a href="' . $prev_link . '" rel="prev">Previous post</a>';
		$html .= '<div class="post-blurb">';
		$html .= get_the_post_thumbnail($prev_id, 'post-feat') != "" ? get_the_post_thumbnail($prev_id, 'post-feat') : '<img src="' . get_template_directory_uri() . "/img/photo-table.jpg" . '" class="attachment-post-feat" alt="Work table with various design tools."/>';
		$html .= '<div class="title-wrap"><time datetime="' . get_the_date("c", $prev_id) . '">' . get_the_date("l, F j, Y", $prev_id) . '</time>';
		$html .= '<h2><a href="' . $prev_link .'">' . $prev_title .'</a></h2>';
		$html .= '<a href="' . $prev_link .'" class="read-more">Read More</a>';
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</li>';
		echo $html;
	} else {
		$html = '<li class="no-posts">';
		$html .= '<div class="post-blurb">';
		$html .= '<div class="title-wrap">';
		$html .= '<h2>You have reached the beginning</h2>';
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</li>';
		echo $html;
	}
	if (!empty($next_post)) {

		$next_id = $next_post->ID;
		$next_title = $next_post->post_title;
		$next_link = $next_post->guid;
		$html = '<li>';
		$html .= '<a href="' . $next_link . '" rel="next">Next post</a>';
		$html .= '<div class="post-blurb">';
		$html .= get_the_post_thumbnail($next_id, 'post-feat') != "" ? get_the_post_thumbnail($next_id, 'post-feat') : '<img src="' . get_template_directory_uri() . "/img/photo-table.jpg" . '" class="attachment-post-feat" alt="Work table with various design tools."/>';
		$html .= '<div class="title-wrap"><time datetime="' . get_the_date("c", $next_id) . '">' . get_the_date("l, F j, Y", $next_id) . '</time>';
		$html .= '<h2><a href="' . $next_link .'">' . $next_title .'</a></h2>';
		$html .= '<a href="' . $next_link .'" class="read-more">Read More</a>';
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</li>';
		echo $html;
	} else {

		$args = array(
			'post_type' => 'page',
			'post_status' => 'publish',
			'meta_query' => array(
				'key' => '_wp_page_template',
				'value' => 'work.php'
			),
			'showposts' => 1
		);
		$workLoop = new WP_Query($args);
		if ($workLoop->have_posts()) { 

			while($workLoop->have_posts()) { $workLoop->the_post();

				$html = '<li class="no-posts">';
				$html .= '<a href="' . get_home_url() . '/#work" rel="next">Check out some of our work</a>';
				$html .= '<div class="post-blurb">';
				$html .= get_the_post_thumbnail($workLoop->ID, 'post-feat') != "" ? get_the_post_thumbnail($workLoop->ID, 'post-feat') : '<img src="' . get_template_directory_uri() . "/img/photo-table.jpg" . '" class="attachment-post-feat" alt="Work table with various design tools."/>';
				$html .= '<div class="title-wrap"><time datetime="' . get_the_date("c", get_the_id()) . '">' . get_the_date("l, F j, Y", get_the_id()) . '</time>';
				$html .= '<h2><a href="' . get_permalink() . '">' . the_title('','',false) . '</a></h2>';
				$html .= '<a href="' . get_permalink() . '" class="read-more">Read More</a>';
				$html .= '</div>';
				$html .= '</div>';
				$html .= '</li>';
				echo $html;

			}
		}

		wp_reset_postdata();
	}
}
?>
</ul>