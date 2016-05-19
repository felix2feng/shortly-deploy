module.exports = function(grunt) {

  grunt.initConfig({
    public: 'public/',
    dist: 'dist/',    

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      js: {
        options: {
        // define a string to put between each file in the concatenated output
          separator: ';'
        },
        // the files to concatenate
        src: ['public/**/*.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      },
      css: {
        src: ['public/**/*.css'],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%=dist%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },

    eslint: {
      target: [
        '*.js'
      ]
    },

    cssmin: {
      minify: {
        src: 'public/*.css',
        dest: '<%=dist%><%= pkg.name %>.min.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      // prodServer: {

      // },
      target: {
        command: 'git add . && git commit -m"upload" && git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('gitPush', [
    'shell'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run([ 'preDeploy', 'gitPush' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('preDeploy', [
    'concat', 'uglify', 'cssmin', 'eslint', 'mochaTest'
  ]);

};
