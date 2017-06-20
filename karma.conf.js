// Karma configuration
// Generated on Mon Jun 19 2017 17:11:01 GMT-0300 (Hora oficial do Brasil)

module.exports = function (config) {
  var configuration = {
    basePath: '',
    frameworks: ['jasmine'],    
    files: [
      'src/js/**/*.js',
      'test/spec/*.js'
    ],
    exclude: [],
    preprocessors: {
      'src/sass/inception.scss': ['scss'],
      'src/**/*.js': ['coverage']
    },
    reporters: ['spec', 'coverage', 'html'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox', 'IE'],
    singleRun: false,
    plugins: [
      'karma-spec-reporter',
      'karma-jasmine',
      'karma-coverage',
      'karma-htmlfile-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-safari-launcher',
      'karma-scss-preprocessor'
    ],
    coverageReporter: {
      type: 'html',
      dir: 'test/coverage/'
    },
    htmlReporter: {
      outputFile: 'test/results/unit-tests.html'
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    concurrency: Infinity
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};