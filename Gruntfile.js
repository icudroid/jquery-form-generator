'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    concat_sourcemap: {
      options: {
        sourcesContent: true
      },
      target: {
        files: { 
          'dist/jquery-form-generator.js': [

            'src/intro.js',
            'src/const.js',

            'src/generator/table/generator/abstract-generator.js',
            'src/generator/table/generator/abstract-multi-input.js',


            'src/generator/table/generator/static.js',
            'src/generator/table/generator/radio.js',
            'src/generator/table/generator/checkbox.js',

            'src/generator/table/default.js',


            'src/layout/abstract-layout.js',
            'src/generator/abstract-generator.js',
            'src/generator/abstract-input.js',
            'src/generator/abstract-multi-input.js',

            'src/layout/default.js',
            'src/layout/tab.js',
            'src/layout/dialog.js',
            'src/layout/tablable.js',

            'src/generator/actions.js',
            'src/generator/button.js',
            'src/generator/checkbox.js',
            'src/generator/date.js',
            'src/generator/empty.js',
            'src/generator/hidden.js',
            'src/generator/info.js',
            'src/generator/password.js',
            'src/generator/radio.js',
            'src/generator/section.js',
            'src/generator/select.js',
            'src/generator/multi-select.js',
            'src/generator/select2.js',
            'src/generator/static.js',
            'src/generator/text.js',
            'src/generator/textarea.js',
            'src/generator/static-action.js',
            'src/generator/file.js',
            'src/generator/template.js',
            'src/generator/table/table.js',

            'src/generator/step.js',

            'src/default.js',
            'src/static.js',



            'src/form-generator.js'
          ],
          'dist/css/jquery-form-generator.css':[
            'src/css/jquery-form-generator.css',
          ]
        }
      }
    },
    cssmin :{
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/jquery-form-generator.min.css': ['src/css/jquery-form-generator.css']
        }
      }
    },
    uglify: {
      dist: {
        src: 'dist/jquery-form-generator.js',
        dest: 'dist/jquery-form-generator.min.js'
      },
      options: {
        preserveComments: 'some'
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*.js","src/**/*.css"],
        tasks: ["concat_sourcemap"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concat-sourcemap');

  // Default task.
  grunt.registerTask('default', ['concat_sourcemap','cssmin','uglify']);

};
