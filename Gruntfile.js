module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src_files_js: ['js/*.js', 'plugin.js'],
        src_files_css: ['css/*.css'],
        src_files_html: ['*.html'],
        src_files_images: ['icon.png'],
        src_files_other: ['license.txt', 'README.md', 'functions.php'],
        dest_dir_dev: 'build/dev/',
        dest_dir_rel: 'build/release/',
        dest_dir_dual: 'build/dual/',
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            main: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: '<%= src_files_js %>',
                    dest: '<%= grunt.option("outpath") %>'
                }]
            },
        },
        jshint: {
            main: {
                src: ['<%= src_files_js %>']
            },
        },
        copy: {
            main: {
                expand: true,
                cwd: '',
                src: '<%= src_files_other %>',
                dest: '<%= grunt.option("outpath") %>',
            },
        },
        cssmin: {
            main: {
                options : {
                    report: 'gzip'
                },
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= grunt.option("outpath") %>/css/',
                ext: '.min.css'
            },
        },
        clean: {
            main: {
                src: ['<%= grunt.option("outpath") %>*']
            },
        },
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: 'build/TinyMCE4-ImageFromWeb.<%= pkg.version %>.zip'
                },
                cwd: '<%= grunt.option("outpath") %>',
                src: ['**/*'],
                dest: 'TinyMCE4-ImageFromWeb/',
                expand: true
            },
        },
        csscomb: {
            main: {
                expand: true,
                cwd: 'css/',
                src: ['*.css'],
                dest: 'css/'
            }
        },
        jsonlint: {
            main: {
                src: ['*.json']
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                title: "Project Name" // defaults to the name in package.json, or will use project directory's name
            }
        },
        newer: {
            options: {
                cache: 'node_modules/grunt-newer/.cache/<%= grunt.option("outpath") %>'
            }
        },
        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                },
                expand: true,
                cwd: '',
                src: '<%= src_files_html %>',
                dest: '<%= grunt.option("outpath") %>',
            }
        },
        imagemin: {
            main: {
                expand: true,
                cwd: '',
                src: '<%= src_files_images %>',
                dest: '<%= grunt.option("outpath") %>'
            }
        }
    });
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    //custom task:
    grunt.registerTask('set_option', 'Set a global variable.', function (name, val) {
        grunt.option(name, val);
        if (name === 'outpath') {
            grunt.log.writeln("Output folder is now: " + grunt.option('outpath'));
        } else {
            grunt.log.writeln("Global '" + name + "' is now: " + val);
        }
    });
    //Task Groups:
    grunt.registerTask('prebuild', ['set_option:outpath:project', 'newer:csscomb:main']);
    grunt.registerTask('lint', ['set_option:outpath:project', 'newer:jsonlint:main', 'newer:jshint:main']);
    grunt.registerTask('lint-full', ['jsonlint:main', 'jshint:main']);
    grunt.registerTask('build_dev', ['lint', 'prebuild',  'set_option:outpath:build/dev/', 'newer:copy:main', 'newer:htmlmin:main', 'newer:imagemin:main', 'compress:main']);
    grunt.registerTask('build_release', ['lint', 'prebuild', 'set_option:outpath:build/release/', 'newer:copy:main', 'newer:htmlmin:main', 'newer:imagemin:main', 'newer:uglify:main', 'newer:cssmin:main', 'compress:main']);
    grunt.registerTask('build_dual', ['lint', 'prebuild',  'set_option:outpath:build/dual/', 'newer:uglify:main', 'newer:imagemin:main', 'newer:htmlmin:main', 'newer:copy:main', 'compress']);
    grunt.registerTask('default', ['lint', 'prebuild',  'set_option:outpath:build/dev/', 'newer:copy:main', 'newer:imagemin:main',  'newer:htmlmin:main', 'compress:main', 'set_option:outpath:build/release/', 'newer:copy:main', 'newer:uglify:main', 'newer:cssmin:main',  'newer:htmlmin:main',  'newer:imagemin:main', 'compress:main']);

};
