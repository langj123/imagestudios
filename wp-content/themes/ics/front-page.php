<?php get_header(); ?>

    <div id="main" class="twelvecol first" role="main">

    <?php
    if (function_exists('get_field')){
        $front_id = get_option('page_on_front');
        $head = get_field('header_copy_main', $front_id);
        $shead = get_field('header_copy_small', $front_id);
        $x = 0;

        $mHead = '<section class="section-' . $x . '">';
        $mHead .= '<header class="main-head">';
        $mHead .= '<div class="head-cont">';
        $mHead .= '<h2>' . $shead . '</h2>';
        $mHead .= '<h1>' . $head . '</h1>';
        $mHead .= '<h3><span>Check Out Our Work</span></h3>';
        $mHead .= '</div><!-- .head-cont -->';
        $mHead .= '<img src="' . get_template_directory_uri() . '/img/shape-circle-w.svg" class="shapes spin" alt="" width="100" />';
        $mHead .= '<img src="' . get_template_directory_uri() . '/img/shape-triangle-w.svg" class="shapes" alt="" width="130" />';
        $mHead .= '</header>';
        $mHead .= '</section>';

        echo $mHead;
        if (have_rows('featured_clients', $front_id)) {
            while (have_rows('featured_clients', $front_id)) {
                $x++;
                the_row();
                $ftitle = get_sub_field('featured_client');
                $fdesc = get_sub_field('featured_client_description');
                $flink = get_sub_field('featured_client_link');
                $fimage = get_sub_field('featured_image')['sizes']['large'];
                $id = str_replace(' ', '_', strtolower($ftitle));

                $feat = '<section class="section-' . $x . '">';
                $feat .= '<div class="feature-client" id="Feat-' . $id . '" style="background-image: url(' . $fimage .')">';
                $feat .= '<div class="feat-cont">';
                $feat .= '<div class="vert-cent">';
                $feat .= '<h2 class="feat-title"><span>' . $ftitle . '</span></h2>';
                $feat .= '<p class="feat-desc">' . $fdesc . '</p>';
                $feat .= '</div>';
                $feat .= '</div>';
                $feat .= '</div><!-- .feature -->';
                $feat .= '</section><!-- section -->';

                echo $feat;
               
                } // end while
        } // end have_rows
    } // end function_exists
    ?>

    </div><!-- /#main -->

<?php get_footer(); ?>
