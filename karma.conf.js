// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],
        // frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('@angular/cli/plugins/karma'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-jasmine'),
            require('karma-jasmine-html-reporter'),
            require('karma-typescript')
        ],
        client: {
            clearContext: false,    // leave Jasmine Spec Runner output visible in browser
            captureConsole: false,
            runInParent: true
        },
        files: [
            {pattern: "src/app/base.spec.ts"},
            {pattern: "src/app/**/*.+(ts|html)"}
        ],
        // list of files to exclude
        exclude: [
            "src/app/**/*.module.ts",
            "src/app/tools/map-ali/*.ts",
            "src/app/tools/map-tencent/*.ts",
            "src/app/services/resolvers/**"
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },
        karmaTypescriptConfig: {
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    require('karma-typescript-angular2-transform')
                ]
            },
            compilerOptions: {
                lib: ["es2017", "dom"]
            }
        },
        reporters: ['progress', 'kjhtml', 'karma-typescript'],
        // reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
        /**
         *  参考链接
         *  https://www.npmjs.com/package/karma-coverage-istanbul-reporter
         *  https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-api/lib/config.js#L33-L39
         */
        // coverageIstanbulReporter: {
        //     // reports can be any that are listed here:
        //     // https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
        //     reports: ['html', 'text-summary'],
        //     // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
        //     dir: path.join(__dirname, 'coverage'),
        //     // Combines coverage information from multiple browsers into one report rather than outputting a report
        //     // for each browser.
        //     combineBrowserReports: true,
        //     // if using webpack and pre-loaders, work around webpack breaking the source path
        //     fixWebpackSourcePaths: true,
        //     // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
        //     skipFilesWithNoCoverage: false,
        //     // Most reporters accept additional config options. You can pass these through the `report-config` option
        //     'report-config': {
        //         // all options available at:
        //         // https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
        //         html: {
        //             // outputs the report in ./coverage/html
        //             subdir: 'istanbul'
        //         }
        //     },
        //     // enforce percentage thresholds
        //     // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
        //     thresholds: {
        //         emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        //         global: {           // thresholds for all files
        //             statements: 100,
        //             lines: 100,
        //             branches: 100,
        //             functions: 100
        //         },
        //         each: {             // thresholds per file
        //             statements: 100,
        //             lines: 100,
        //             branches: 100,
        //             functions: 100,
        //             overrides: {
        //                 'baz/component/**/*.js': {
        //                     statements: 98
        //                 }
        //             }
        //         }
        //     }
        // },
        // angularCli: {
        //     environment: 'dev'
        // },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
