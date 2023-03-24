module.exports = {
    // ...otras configuraciones...
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.js',
      'src/**/*.ts',
    ],
    coverageReporters: ['text', 'lcov'],
  };
  