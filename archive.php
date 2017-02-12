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

			

			<?php while (have_posts()) : the_post(); ?>
			
				
				
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



<?php get_footer(); ?>
