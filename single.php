<?php
/**
 * @package WordPress
 * @subpackage HTML5-Reset-WordPress-Theme
 * @since HTML5 Reset 2.0
 */
 get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

<article <?php post_class() ?> id="post-
	<?php the_ID(); ?>">


	<div class="singleHeader">
		<h1 class="entry-title">
			<?php the_title(); ?>
		</h1>
		<?php the_tags('<div class="theTags">', ', ', '</div>'); ?>
	</div>
	<div class="entry-content">

		<?php the_content(); ?>

		<?php wp_link_pages(array('before' => __('Pages: ','html5reset'), 'next_or_number' => 'number')); ?>

		<div id="sslinkWrapper">
		<?php 
			$fbvalue = get_post_meta( get_the_ID(), 'Facebook link', true );
			
			if ( ! empty( $fbvalue ) ) {
				echo '<a class="sslink" href="' . $fbvalue . '"><img src="' . get_template_directory_uri() . '/icons/facebook.png"></a>';
			}
			$invalue = get_post_meta( get_the_ID(), 'Instagram link', true );
			
			if ( ! empty( $invalue ) ) {
				echo '<a class="sslink" href="' . $invalue . '"><img src="' . get_template_directory_uri() . '/icons/instagram.png"></a>';
			}
			$scvalue = get_post_meta( get_the_ID(), 'Soundcloud link', true );
			
			if ( ! empty( $scvalue ) ) {
				echo '<a class="sslink" href="' . $scvalue . '"><img src="' . get_template_directory_uri() . '/icons/soundcloud.png"></a>';
			}
			$twvalue = get_post_meta( get_the_ID(), 'Twitter link', true );
			
			if ( ! empty( $twvalue ) ) {
				echo '<a class="sslink" href="' . $twvalue . '"><img src="' . get_template_directory_uri() . '/icons/twitter.png"></a>';
			}
			$ytvalue = get_post_meta( get_the_ID(), 'Youtube link', true );
			
			if ( ! empty( $ytvalue ) ) {
				echo '<a class="sslink" href="' . $ytvalue . '"><img src="' . get_template_directory_uri() . '/icons/youtube.png"></a>';
			}
?>
	</div></div>


	
	
		
		<?php
			if ( in_category( 'band' )) {
    			$cattt = 'release'; //és 
				echo '<h2 class="relatedTitle">Releases</h2>';
			} elseif ( in_category( 'release' ) ||  in_category( 'tour-date' )) {
				echo '<h2>About the band</h2>';
    			$cattt = 'band';
			} 
?>
<div class="relatedWrapper">
	<?php
		$custom_terms = wp_get_post_terms($post->ID, 'artist');

		foreach($custom_terms as $custom_term) {
    		wp_reset_query();
    		$args = array(
				'post_type' => 'post',
				'category_name' => $cattt,
        		'tax_query' => array(
            		array(
                		'taxonomy' => 'artist',
                		'field' => 'slug',
                		'terms' => $custom_term->slug,
            		),
        		),
     		);

    	 	$loop = new WP_Query($args);
     		if($loop->have_posts()) {
	        	//echo '<h2>'.$custom_term->name.'</h2>';

    	    	while($loop->have_posts()) : $loop->the_post(); ?>
		<article>
		<a href="<?php the_permalink() ?>">
			<?php if ( has_post_thumbnail() ) {
							the_post_thumbnail('homepage-thumb');
						} ?>
		</a>

		<div class="articleTitle">
			<h2>
				<a href="<?php the_permalink() ?>">
					<?php the_title(); ?>
				</a>
			</h2>
			<?php the_tags('<p class="theTags">', ', ', '</p>'); ?>
			</article>
			<?php
        		endwhile;
     		}
		}

?>
		</div>
</article>
<?php //comments_template(); ?>

<?php endwhile; endif; ?>



<?php get_sidebar(); ?>

<?php get_footer(); ?>