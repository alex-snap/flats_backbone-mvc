define(['FlatsManager',
        'tpl!common/templates/footer.tpl.html',
        'tpl!common/templates/loader.tpl.html',
        'jquery.spin'],
function (FlatsManager, FooterTpl, LoaderTpl) {
    FlatsManager.module('Common.Views', function (Views, FlatsManager, Backbone, Marionette, $, _) {
       
        // view футера
        // --------------
        Views.Footer = Marionette.ItemView.extend({
            template: FooterTpl
        });

        // view preloader
        Views.Loader = Marionette.ItemView.extend({
            template: LoaderTpl,
            ui: {
                loader: '.js-loader'
            },
            message: "Please wait, data is loading.",
            serializeData: function () {
                return {
                    title: this.title,
                    message: Marionette.getOption(this, "message")
                }
            },
            onShow: function () {
                var opts = {
                    lines: 13, // The number of lines to draw
                    length: 10, // The length of each line
                    width: 5, // The line thickness
                    radius: 20, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    color: "#000", // #rgb or #rrggbb
                    speed: 1, // Rounds per second
                    trail: 60, // Afterglow percentage
                    shadow: false, // Whether to render a shadow
                    hwaccel: false, // Whether to use hardware acceleration
                    className: "spinner", // The CSS class to assign to the spinner
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    top: "40px", // Top position relative to parent in px
                    left: "auto" // Left position relative to parent in px
                };
                $(this.ui.loader).spin(opts);
            }
        });

    });

    return FlatsManager.Common.Views;
});