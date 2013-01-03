module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    watch: {
      coffee: {
        files: '<config:coffee.all.src>',
        tasks: 'coffeeReset'
      }
    },

    coffee: {
      all: {
        src: ['bin/**/*.coffee', 'lib/**/*.coffee', 'test/**/*.coffee'],
        dest: '<%= grunt.task.current.target %>'
      }
    },

    rm: {
      libjs: 'lib/**/*.js',
      testjs: 'test/**/test*.js'
    },

    exec: {
      buster: {
        command: 'node_modules/buster/bin/buster-test --node',
        stdout: true
      }
    }
  });

  // External tasks
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-rm');

  // Tasks
  grunt.registerTask('test', 'exec:buster');
  grunt.registerTask('coffeeReset', 'rm coffee');
};