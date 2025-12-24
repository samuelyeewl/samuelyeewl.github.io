module.exports = function(grunt) {
	//Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		cloudinary: {
			albums: {
				files: [{
					expand: true,
					src: "images/albums/**/*.jpg",
				}],
				options: {
					width: 960,
				},
			},
			stories: {
				files: [{
					expand: true,
					src: "images/stories/**/*.jpg",
				}],
				options: {
					width: 2880,
				},
			}
		},

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
	// grunt.loadNpmTasks('grunt-cloudinary');
	grunt.loadNpmTasks('grunt-image-resize');

	grunt.registerMultiTask('cloudinary', function() {
		var async = require('async');
		var done = this.async();
		var cloudinary = require('cloudinary');
		var options = this.options({
	      account: grunt.file.readJSON('images/cloudinary-account.json')
	    });

	    cloudinary.config({
	      cloud_name: options.account.cloudName,
	      api_key: options.account.apiKey,
	      api_secret: options.account.apiSecret
	    });

	    task_width = this.options().width;
	    tasks = []

	    this.files.forEach(function(list) {
	    	list.src.forEach(function(f) {
	    		var id = f.substr(0, f.lastIndexOf('.')).substr(f.indexOf('/')+1);
	    		tasks.push(function(callback) {
	    			cloudinary.v2.uploader.upload(f, {public_id: id,
	    										  	  transformation: {width: task_width, crop: 'limit', quality: 90},
	    										  	  invalidate: true},
	    				function(error, result) {grunt.log.ok("Uploaded " + result['public_id']);
	    										 callback();});
	    		});
	    	});
	    });
	    async.parallel(tasks, done);
	});

	grunt.registerTask('images', ['newer:image_resize']);
	grunt.registerTask('upload', ['newer:cloudinary']);
};
