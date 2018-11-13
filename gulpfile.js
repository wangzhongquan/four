

var gulp = require('gulp'),
less = require("gulp-less"),
cssmin = require("gulp-minify-css");
autoprefixer = require('gulp-autoprefixer'),
fileinclude = require('gulp-file-include'),
clean = require("gulp-clean");

var res = {
	src:'src',
	build:'dist'
}

gulp.task("csss",['cleanCss'],function(){
	gulp.src(res.src+"/css/**/*.less")
			.pipe(less()).pipe(autoprefixer({
				browsers: ['last 2 version','safari 5','ie 8','ie 9','opera 12.1']
			})).pipe(cssmin()).pipe(gulp.dest(res.build+"/css"));
});
gulp.task("cleanCss",function(){
	return gulp.src([res.build+"/css/**/*.css"],{ read: false }).pipe(clean({ force: true }));
});
gulp.task('watchCss', function () {
	return gulp.watch([res.src+"/css/**/*.less"],["csss"]);
});
gulp.task("images",['cleanImage'],function(){
	gulp.src(res.src+"/images/**/!(*.psd)")
			.pipe(gulp.dest(res.build+"/images"));
});
gulp.task("cleanImage",function(){
	return gulp.src([res.build+"/images/**/*"],{ read: false })
			.pipe(clean({ force: true }));
});
gulp.task('watchImage', function () {
	return gulp.watch([res.src+"/images/**/!(*.psd)"],["images"]);
});
gulp.task("htmls",['cleanHtmls'],function(){
	gulp.src(res.src+'/htmls/**/*.html')
		.pipe( fileinclude({
			prefix:"@@",
			basepath:"@file"
		}))
    	.pipe(gulp.dest(res.build+'/htmls'));
});
gulp.task("cleanHtmls",function(){
	return gulp.src([res.build+"/htmls/**/*.html"],{ read: false })
			.pipe(clean({ force: true }));
});
gulp.task('watchHtml', function () {
	return gulp.watch([res.src+'/htmls/**/*.html'],["htmls"]);
});

gulp.task("scripts",['cleanScripts'],function(){
	gulp.src(res.src+"/scripts/**/*.js")
		.pipe(gulp.dest(res.build+"/scripts"));
});

gulp.task("cleanScripts",function(){
	return gulp.src([res.build+"/scripts/**/*.js"],{ read: false })
			.pipe(clean({ force: true }));
});

gulp.task('watchScript', function () {
	return gulp.watch([res.src+"/scripts/**/*.js"],["scripts"]);
});

gulp.task("fonts",['cleanFonts'],function(){
	gulp.src(res.src+"/fonts/**/*")
	.pipe(gulp.dest(res.build+"/fonts"));
});

gulp.task("cleanFonts",function(){
	return gulp.src([res.build+"/fonts/**/*"],{ read: false })
	.pipe(clean({ force: true }));
});

gulp.task('watchFonts', function () {
	return gulp.watch([res.src+"/fonts/**/*"],["fonts"]);
});
gulp.task("default",['watchCss','watchImage','watchHtml','watchScript','watchFonts']);
