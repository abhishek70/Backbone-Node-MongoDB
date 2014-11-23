var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "about"             : "about",
        "blog"              : "list",
        "blog/page/:page"   : "list",
        "addpost"           : "addpost",
        "post/:id"          : "postDetails",
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function () {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },

    list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var blogList = new PostCollection();
        blogList.fetch({success: function(){
            $("#content").html(new BlogListView({model: blogList, page: p}).el);
        }});
        this.headerView.selectMenuItem('blog-menu');
    },

    addpost: function () {
        var post = new Post();
        $('#content').html(new AddPostView({model: post}).el);
        this.headerView.selectMenuItem('blog-menu');
    },

    postDetails: function (id) {
        var post = new Post({_id: id});
        post.fetch({success: function(){
            $("#content").html(new AddPostView({model: post}).el);
        }});
        this.headerView.selectMenuItem('blog-menu');
    },

});

utils.loadTemplate(['HomeView', 'HeaderView', 'AboutView', 'BlogListItemView', 'AddPostView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});