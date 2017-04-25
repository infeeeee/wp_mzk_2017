<?php
/**
 * @package WordPress
 * @subpackage HTML5-Reset-WordPress-Theme
 * @since HTML5 Reset 2.0
 */
 get_header(); ?>



	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

			

				<a href="<?php the_permalink() ?>">
					<?php if ( has_post_thumbnail() ) {
								the_post_thumbnail('homepage-thumb');
								} ?> 
				</a>

				<div class="articleTitle">
					<h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
					<?php the_tags('<p class="theTags">', ', ', '</p>'); ?>
				</div>

			
			
		</article>

	<?php endwhile; ?>

	

	<?php else : ?>

		<h2><?php _e('Nothing Found','html5reset'); ?></h2>

	<?php endif; ?>

<?php if ( is_single() ) { ?>


<?php get_sidebar(); ?>

 <?php } ?>
<?php get_footer(); ?>
