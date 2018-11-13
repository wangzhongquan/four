

var gulp = require('gulp'),
//less工具
less = require("gulp-less"),
//css压缩工具
cssmin = require("gulp-minify-css");
//图片压缩工具
var imagemin = require("gulp-imagemin"),
//深度压缩png图片工具,测试作用不大
pngquant = require('imagemin-pngquant'),
//缓存工具
cache = require('gulp-cache'),
//自动前缀工具
autoprefixer = require('gulp-autoprefixer'),
//文件包含
fileinclude = require('gulp-file-include'),
//
clean = require("gulp-clean");


var res = {
	src:'src',
	build:'dist'
}

//编译less, css压缩
gulp.task("csss",['cleanCss'],function(){
	console.log("编译css...");
	gulp.src(res.src+"/css/**/*.less")
			.pipe(less())
			.pipe(autoprefixer({
				browsers: ['last 2 version','safari 5','ie 8','ie 9','opera 12.1'],//版本号设定，autoprefixer会为不同浏览器加上前缀
				cascade: true, //是否美化属性值
				remove:true //是否去掉不必要的前缀
			}))
			.pipe(cssmin())
			.pipe(gulp.dest(res.build+"/css"));
});
gulp.task("cleanCss",function(){
	console.log("清理css...");
	return gulp.src([res.build+"/css/**/*.css"],{ read: false })
			.pipe(clean({ force: true }));
});
gulp.task('watchCss', function () {
	return gulp.watch([res.src+"/css/**/*.less"],["csss"]);
});



//编译images,图片压缩  大于1M的PNG图片会出问题
gulp.task("images",['cleanImage'],function(){
	gulp.src(res.src+"/images/**/!(*.psd)")
			.pipe(
			//	cache(          //缓存图片，仅操作有改动的图片
				imagemin({
				optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
				progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
				multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
				interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
				use: [pngquant()] //使用深度压缩工具压缩png图片
			}))
		//	)
			.pipe(gulp.dest(res.build+"/images"));
});
gulp.task("cleanImage",function(){
	return gulp.src([res.build+"/images/**/*"],{ read: false })
			.pipe(clean({ force: true }));
});
gulp.task('watchImage', function () {
	return gulp.watch([res.src+"/images/**/!(*.psd)"],["images"]);
});



//压缩html
gulp.task("htmls",['cleanHtmls'],function(){
	var options = {
	        removeComments: true,//清除HTML注释
	        collapseWhitespace: true,//压缩HTML
	        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
	        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
	        minifyJS: true,//压缩页面JS
	        minifyCSS: true//压缩页面CSS
	    };
	gulp.src(res.src+'/htmls/**/*.html')
		.pipe( fileinclude({
			prefix:"@@",
			basepath:"@file"
		}))
    //	.pipe(htmlmin(options))
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





gulp.task("cleanAll",function(){
	return gulp.src(res.build+"/*",{read:false}).pipe(clean({force:true}));
});

