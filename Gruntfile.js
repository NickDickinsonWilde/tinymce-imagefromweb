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
        uglify: {
            main: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: '<%= src_files_js %>',
                    dest: '<%= grunt.option("outpath") %>',
                    ext: '.min.js'
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
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: ['*.css', '!*.min.css'],
                        dest: '<%= grunt.option("outpath") %>/css/',
                        ext: '.min.css'
                    }]
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
                    archive: 'build/TinyMCE4-ImageFromWeb.<%= pkg.version %>.<%= grunt.option("archive") %>.zip'
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
                cwd: '<%= grunt.option("outpath") %>',
                src: '**/*.html',
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
        },
        uncss: {
            main: {
                options: {
                    report: 'gzip'
                },
                files: {
                    '<%= grunt.option("outpath") %>css/imagefromweb.css' : '<%= src_files_html %>',
                }
            }
        },
        processhtml: {
            main : {
                options: {
                    strip: false
                },
                files: [{
                    expand: true,
                    cwd: '',
                    src: '<%= src_files_html %>',
                    dest: '<%= grunt.option("outpath") %>'
                }]
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
    grunt.registerTask('prebuild', ['set_option:outpath:', 'newer:uncss:main', 'newer:csscomb:main']);
    grunt.registerTask('lint', ['set_option:outpath:', 'newer:jsonlint:main', 'newer:jshint:main']);
    grunt.registerTask('lint_full', ['set_option:outpath:', 'jsonlint:main', 'jshint:main']);
    grunt.registerTask('minify', ['newer:htmlmin:main', 'newer:imagemin:main', 'newer:uglify:main', 'newer:cssmin:main']);
    grunt.registerTask('dev', ['set_option:outpath:build/dev/', 'newer:copy', 'set_option:archive:DEV', 'compress:main']);
    grunt.registerTask('release', ['set_option:outpath:build/release/', 'newer:copy:main', 'newer:processhtml:main', 'minify', 'set_option:archive:RELEASE', 'compress:main']);
    grunt.registerTask('build_dev', ['lint', 'prebuild',  'dev']);
    grunt.registerTask('build_release', ['lint', 'prebuild', 'release']);
    grunt.registerTask('build_dual', ['lint', 'prebuild',  'set_option:outpath:build/dual/', 'newer:copy', 'newer:processhtml:main', 'minify', 'set_option:archive:FULL', 'compress:main']);
    grunt.registerTask('default', ['lint', 'prebuild',  'dev', 'release']);
    //cleanup tasks:
    grunt.registerTask('clean_full', ['set_option:outpath:build/', 'clean']);
    grunt.registerTask('clean_dev', ['set_option:outpath:build/dev/', 'clean']);
    grunt.registerTask('clean_dual', ['set_option:outpath:build/dual/', 'clean']);
    grunt.registerTask('clean_release', ['set_option:outpath:build/release/', 'clean']);

};
