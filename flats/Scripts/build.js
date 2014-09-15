({
    // with almond.js
    baseUrl: '',
    name: 'libs/almond/almond',
    include: 'require_main',
    mainConfigFile: 'require_main.js',
    out: 'require_main.build.js',
    findNestedDependencies: true

    // without almond.js
    //baseUrl: '',
    //name: 'require_main',
    //mainConfigFile: 'require_main.js',
    //out: 'require_main.build.js',
    //findNestedDependencies: true
})