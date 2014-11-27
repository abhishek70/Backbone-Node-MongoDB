// Setting up the Paginator View
window.Paginator = Backbone.View.extend({

    // Setting CSS Class name
    className: "pagination pagination-centered",

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / 6);

        $(this.el).html('<ul />');

        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#blog/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }
});