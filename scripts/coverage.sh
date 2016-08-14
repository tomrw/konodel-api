PORT=1234 babel-node node_modules/isparta/bin/isparta cover --include '**/*.js' --report text --report html node_modules/mocha/bin/_mocha -- 'src/**/*.js' 'test/**/*.js' --reporter dot
