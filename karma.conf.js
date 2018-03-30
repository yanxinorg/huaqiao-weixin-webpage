// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        client: {
            clearContext: false,    // leave Jasmine Spec Runner output visible in browser
            captureConsole: false,
            runInParent: true
        },
        reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/app/**/*.ts': ['coverage-istanbul']
        },
        // any of these options are valid:
        // https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-api/lib/config.js#L33-L39
        coverageIstanbulReporter: {
            // reports can be any that are listed here:
            // https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
            reports: ['html', 'lcovonly', 'text-summary'],
            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: path.join(__dirname, 'coverage'),
            // Combines coverage information from multiple browsers into one report rather than outputting a report
            // for each browser.
            combineBrowserReports: true,
            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: true,
            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            skipFilesWithNoCoverage: true,
            // Most reporters accept additional config options. You can pass these through the `report-config` option
            'report-config': {
                // all options available at:
                // https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
                html: {
                    // outputs the report in ./coverage/html
                    subdir: 'html'
                }

            }
        },
        angularCli: {
            environment: 'dev'
        },
        // reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
