module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
    concat: {
      dist: {
        src: ['app/js/*.js'],
        dest: 'dist/production.js',
      }
    },
    uglify: {
      files: {
        'dist/production.min.js': ['dist/production.js']
      }
    },
    cssmin: {
      target: {
        files: {
          'dist/production.css': ['app/css/*.css']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },
    htmlhint: {
      src: ['app/*.html']

    },
    jshint: {
      all: ['Gruntfile.js', 'app/js/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }

    },
    csslint: {
      src: ['app/css/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.min.html': 'app/*.html'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);


  grunt.registerTask('default', ['htmlhint', 'jshint', 'csslint']);
  grunt.registerTask('build', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'htmlmin']);
};