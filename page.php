<?php
/**
 * @package WordPress
 * @subpackage HTML5-Reset-WordPress-Theme
 * @since HTML5 Reset 2.0
 */
 get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			
		<article class="post, <?php the_title(); ?>" id="post-<?php the_ID(); ?>">

			<h2><?php the_title(); ?></h2>

		

			<div class="entry">

				<?php the_content(); ?>

				<?php wp_link_pages(array('before' => __('Pages: ','html5reset'), 'next_or_number' => 'number')); ?>

			</div>

			
		</article>
		
	

		<?php endwhile; endif; ?>



<?php get_footer(); ?>
