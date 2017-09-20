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

		

			<?php if ( in_category( 'tour-date' ) and has_post_thumbnail() ) {
								the_post_thumbnail('event-thumb-big');
			} ?> 

		


		<div class="singleHeader">
			<h1 class="entry-title">
				<?php the_title(); ?>
			</h1>
			<?php the_tags('<div class="theTags">', ', ', '</div>'); ?>
		</div>
		<div class="entry-content">

			<?php the_content(); ?>

			<?php wp_link_pages(array('before' => __('Pages: ','html5reset'), 'next_or_number' => 'number')); ?>


			<?php 
			if ( in_category( 'band' )) { ?>
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
			</div>
			<!-- ssLinkWrapper -->

			<?php } elseif ( in_category( 'tour-date' )) { ?>
			<div id="eventData">

				<?php 

						$tour_facebook = get_post_meta( get_the_ID(), 'Tour Facebook', true );
						if ( ! empty( $tour_facebook ) ) {
							echo '<div><h3><a target="_blank" href="' . $tour_facebook . '">Facebook event</a></h3></div>';
						}


						$tour_date = get_post_meta( get_the_ID(), 'Tour Date', true );
						if ( ! empty( $tour_date ) ) {
							echo '<div><h3>' , $tour_date , '</h3></div>';
		
						}


						$tour_venue = get_post_meta( get_the_ID(), 'Tour Venue', true );
						if ( ! empty( $tour_venue ) ) {
							echo '<div><a target="_blank" href="http://maps.google.com/?q=' . $tour_venue .'"><h3 class="inline">'.$tour_venue . '</h3>';							
						}
						
						$tour_city = get_post_meta( get_the_ID(), 'Tour City', true );
						if ( ! empty( $tour_city ) ) {
							echo ', ' . $tour_city ;						
						}
						
						$tour_country = get_post_meta( get_the_ID(), 'Tour Country', true );
						if ( ! empty( $tour_country ) ) {
							echo ', '. $tour_country;							
						}

						if ( ! empty( $tour_venue ) ) {
							echo '</a></div>';
						}
	
						$tour_price = get_post_meta( get_the_ID(), 'Tour Price', true );
						if ( ! empty( $tour_price ) ) {
							echo '<div>Belépő: ' . $tour_price . '</div>';
							// echo '<a class="sslink" href="' . $tour_venue . '"><img src="' . get_template_directory_uri() . '/icons/youtube.png"></a>';
						}

						
					?>

			</div>
			<!-- eventData -->
			<?php } ?>
		</div>
		<!-- entry-content -->

		



			<?php
				if ( in_category( 'band' )) {
    				$cattt = 'release,tour-date'; //és 
					echo '<h2 class="relatedTitle">Releases</h2>';
				} elseif ( in_category( 'release' ) ||  in_category( 'tour-date' )) {
					echo '<h2 class="relatedTitle">About the band</h2>';
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
    	    			while($loop->have_posts()) : $loop->the_post(); ?>
							<article <?php post_class() ?>>
								<a href="<?php the_permalink() ?>">
									<?php if ( has_post_thumbnail() ) { the_post_thumbnail('homepage-thumb');} ?>
								</a>
								<div class="articleTitle">
									<h2>
										<a href="<?php the_permalink() ?>">
											<?php the_title(); ?>
										</a>
									</h2>
									<?php the_tags('<p class="theTags">', ', ', '</p>'); ?>
					 			</div>
							</article>
						<?php endwhile;
     				}
				} //foreach end
			?>
		</div><!-- relatedWrapper -->

		


	</article>
	<?php //comments_template(); ?>

	<?php endwhile; endif; ?>



	<?php get_sidebar(); ?>

	<?php get_footer(); ?>