import gulp     from 'gulp';
import reqDir   from 'require-dir';

const {
    browsersync: { RunBrowserSync },
    browserify: { CreateBundler },
    vendor: { VendorCompile },
    protractor: { E2ETests },
    inject: { IndexCompile },
    styles: { SassCompile },
    images: { ImgCompile },
    fonts: { FontCompile },
    views: { HtmlCompile },
    watch: { RunWatchers },
    clean: { RunCleanup },
    karma: { RunKarma },
    sync: { Sequence },
    args: { Args }
} = reqDir('./');

gulp.task('compile:img', gulp::ImgCompile);
gulp.task('clean', gulp::RunCleanup);
gulp.task('watch', gulp::RunWatchers);
gulp.task('compile:font', gulp::FontCompile);
gulp.task('compile:css', gulp::SassCompile);
gulp.task('compile:html:views', gulp::HtmlCompile);
gulp.task('compile:html:index', gulp::IndexCompile);
gulp.task('compile:vendor', gulp::VendorCompile);
gulp.task('compile:js', gulp::CreateBundler);
gulp.task('server', RunBrowserSync);
gulp.task('karma', RunKarma);
gulp.task('e2e', E2ETests);

gulp.task('compile:all', (callback) => {
    const seq = new Sequence();
    seq.sync('compile:js', 'compile:html:index')
        .call(gulp, callback);
});

gulp.task('build', (callback) => {
    const seq = new Sequence();
    const args = [
        'compile:font',
        'compile:css',
        'compile:html:views',
        'compile:vendor',
        'compile:img'
    ];
    seq.async(...args)
        .sync('compile:all')
        .call(gulp, callback);
});

gulp.task('default', (callback) => {
    let seq = new Sequence();
    seq = seq.sync('clean', 'build');
    if (Args['update-driver']) {
        seq.async('webdriverUpdate', 'webdriver');
    }
    if (!Args.build) {
        seq.async('server', 'watch');
        if (Args.tests) {
            seq.async('karma');
        }
    } else if (Args.tests) {
        seq.sync('server', 'e2e');
    } else if (Args.server) {
        seq.sync('server');
    }
    seq.call(gulp, callback);
});
