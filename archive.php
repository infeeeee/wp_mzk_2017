<?php
/**
 * @package WordPress
 * @subpackage HTML5-Reset-WordPress-Theme
 * @since HTML5 Reset 2.0
 */
 get_header(); ?>

		<?php if (have_posts()) : ?>

 			<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>

			

			<?php /* If this is a tag archive */  if( is_tag() ) { ?>
				<h2 class="pagetitle"><?php single_tag_title(); ?></h2>

			<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
				<h2 class="pagetitle"><?php _e('Archive for','html5reset'); ?> <?php the_time('F jS, Y'); ?></h2>

			<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
				<h2 class="pagetitle"><?php _e('Archive for','html5reset'); ?> <?php the_time('F, Y'); ?></h2>

			<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
				<h2 class="pagetitle"><?php _e('Archive for','html5reset'); ?> <?php the_time('Y'); ?></h2>

			<?php /* If this is an author archive */ } elseif (is_author()) { ?>
				<h2 class="pagetitle"><?php _e('Author Archive','html5reset'); ?></h2>

			<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				<h2 class="pagetitle"><?php _e('Blog Archives','html5reset'); ?></h2>
			
			<?php } ?>

			
			<?php if ( in_category( 'tour-date' )) { 
				$args = array(
					
					'meta_key' => 'Tour Date',
					'orderby' => 'meta_value',
					'order' => 'ASC'
						);
				query_posts( $args );
			} ?>

			<?php while (have_posts()) : the_post(); ?>
			
			<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

				<?php if ( in_category( 'tour-date' )) { ?>
					

					<div class="articleTitle">
					<a class="eventThumbnail" href="<?php the_permalink() ?>">
						<?php if ( has_post_thumbnail() ) {
								the_post_thumbnail('event-thumb-small');
								} ?> 
					</a>


						<h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
					
						<div class="eventMeta">
							<?php
								$tour_date = get_post_meta( get_the_ID(), 'Tour Date', true );
								$tour_venue = get_post_meta( get_the_ID(), 'Tour Venue', true );
								$tour_city = get_post_meta( get_the_ID(), 'Tour City', true );
								$tour_facebook = get_post_meta( get_the_ID(), 'Tour Facebook', true );
								if ( ! empty( $tour_facebook ) ) {
									echo '<div class="tourDateFacebook"><a target="_blank" href="' . $tour_facebook . '"><img src="' . get_template_directory_uri() . '/icons/facebook.png"></a></div>';
								}
								


								echo '<div class="tourDateData">';
								if ( ! empty( $tour_date )  ) {
									echo $tour_date . '<br>';									
								}


								if ( ! empty( $tour_venue ) and ! empty( $tour_city ) ) {
									echo '<a target="_blank" href="http://maps.google.com/?q=' . $tour_venue .'">'.$tour_venue . ', ' .$tour_city .'</a>';							
								} elseif ( ! empty( $tour_venue ) ) {
									echo '<a target="_blank" href="http://maps.google.com/?q=' . $tour_venue .'">'.$tour_venue . '</a>';
								}
								echo '</div>';

								
							?>
						</div>
					</div>

			<?php } else {?>

				<a href="<?php the_permalink() ?>">
					<?php if ( has_post_thumbnail() ) {
								the_post_thumbnail('homepage-thumb');
								} ?> 
				</a>
				<div class="articleTitle">
					<h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
					<?php the_tags('<p class="theTags">', ', ', '</p>'); ?>			
				</div>
			<?php } ?>

		</article>

				

			<?php endwhile; ?>

			
			
	<?php else : ?>

		<h2><?php _e('Nothing Found','html5reset'); ?></h2>

	<?php endif; ?>



<?php get_footer(); ?>
