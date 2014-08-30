define(['FlatsManager',
		'app/flats/common/views',
        templates['apps/flats/new/new_layout'],
        'jquery.fileapi'],
function(FlatsManager, CommonViews, LayoutTpl){
    FlatsManager.module('ContactsApp.New.View', function (View, FlatsManager, Backbone, Marionette, $, _) {
        View.Layout = Marionette.LayoutView.extend({
            template: LayoutTpl,
            regions: {
                headerRegion    :   '.fl-new__header',
                mainRegion      :   '.fl-new__main',
                footerRegion    :   '.fl-new__footer'
            }
        });

        View.Flat = CommonViews.FlatEditForm.extend({
            
        });
    });
	return FlatsManager.ContactsApp.New.View;
});