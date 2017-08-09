module.exports = function(grunt) {
	//Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		image_resize: {
			// Gallery
			gallery_thumbs: {
				options: {
					width: 144,
					height: 144,
					overwrite: true
				},
				files: [{
					expand: true,
					cwd: "images/albums/",
					src: "**/*.jpg",
					dest: "images/_generated/albums/",
					rename: function(dest, src) {
						return dest + src.replace('.jpg', '_thumb.jpg');
					}
				}]
			},
			gallery: {
				options: {
					width: 850,
					height: 600,
					overwrite: true
				},
				files: [{
					expand: true,
					cwd: "images/albums/",
					src: "**/*.jpg",
					dest: "images/_generated/albums/"
				}]
			},

			// Stories
			story_retina: {
				options: {
					width: 2880,
					height: 2880,
					overwrite: true
				},
				files: [{
					expand: true,
					cwd: "images/stories/",
					src: "**/*.jpg",
					dest: "images/_generated/stories/",
					rename: function(dest, src) {
						return dest + src.replace('.jpg', '_2880.jpg');
					}
				}]
			},
			story_full: {
				options: {
					width: 1920,
					height: 1920,
					overwrite: true
				},
				files: [{
					expand: true,
					cwd: "images/stories/",
					src: "**/*.jpg",
					dest: "images/_generated/stories/",
					rename: function(dest, src) {
						return dest + src.replace('.jpg', '_1920.jpg');
					}
				}]
			},
			story_medium: {
				options: {
					width: 1366,
					height: 1366,
					overwrite: true
				},
				files: [{
					expand: true,
					cwd: "images/stories/",
					src: "**/*.jpg",
					dest: "images/_generated/stories/",
					rename: function(dest, src) {
						return dest + src.replace('.jpg', '_1366.jpg');
					}
				}]
			},
			story_small: {
				options: {
					width: 850,
					height: 850,
					overwrite: true
				},
				files: [{
					expand: true,
					cwd: "images/stories/",
					src: "**/*.jpg",
					dest: "images/_generated/stories/",
					rename: function(dest, src) {
						return dest + src.replace('.jpg', '_850.jpg');
					}
				}]
			},
			story_mobile: {
				options: {
					width: 420,
					height: 420,
					overwrite: true
				},
				files: [{
					expand: true,
					cwd: "images/stories/",
					src: "**/*.jpg",
					dest: "images/_generated/stories/",
					rename: function(dest, src) {
						return dest + src.replace('.jpg', '_420.jpg');
					}
				}]
			},
		}
	});

	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-image-resize');

	grunt.registerTask('images', ['newer:image_resize']);
};