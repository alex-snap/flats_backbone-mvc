define(['FlatsManager',
        templates['apps/flats/common/edit'],
		'backbone.syphon'],
function(FlatsManager, FlatEditTpl){
	FlatsManager.module('ContactsApp.Common.Views', function(Views, FlatsManager, Backbone, Marionette, $, _){
		Views.FlatEditForm = Marionette.ItemView.extend({
		    template: FlatEditTpl,
		    ui: {
		        uploadImgContainer  :   '.js-upload-container',
		        submitBtn           :   '.js-submit'
            },
			events: {
			    'click .js-submit'  :   'submitClicked',
			    'click .js-img-add' :   'addImgClicked'
			},
			submitClicked: function (e) {
			    e.preventDefault();
				var data = Backbone.Syphon.serialize(this);
				if (!$(this.ui.submitBtn).is(':disabled')) {
				    this.trigger('form:submit', data);
                }
			},
			addImgClicked: function () {
			    $(this.ui.uploadImgContainer).find('#js-img-input').trigger('click');
			},
			onRender: function () {
			    var uploader = new this.UploadImg();
			    uploader.init.apply(this);
			},

		    // uploader constructor
            // ---------------
			UploadImg: function () {
			    var imgCount = 0,
                    uploadedCount = 0;

			    // init img upload
			    // ----------
			    function init() {
			        var _this = this;
			        $(_this.ui.uploadImgContainer).fileapi({
			            url: '/files/image',
			            accept: 'image/*',
			            multiple: true,
			            maxFiles: 10,
                        autoUpload: true,
			            elements: {
			                emptyQueue: { hide: '.js-img__upload' },
			                list: '.js-img__list',
			                file: {
			                    tpl: '.js-img__tpl',
			                    preview: {
			                        el: '.js-img__tpl__preview',
			                        width: 90,
			                        height: 90
			                    },
			                    upload: { show: '.js-img__progress', hide: '.js-img__complete' },
			                    complete: { hide: '.js-img__progress', show: '.js-img__complete' },
			                    progress: '.js-img__bar'
			                }
			            },
			            onBeforeUpload: function (evt, uiEvt) {
			                $(_this.ui.submitBtn).prop('disabled', true);
			                imgCount = uiEvt.files.length;
			            },
			            onFileComplete: function (evt, uiEvt) {
			                debugger;
			                if (uiEvt.result.success) {
			                    uploadedCount++;
			                    if (imgCount === uploadedCount) {
			                        $(_this.ui.submitBtn).prop('disabled', false);
			                    }
			                }
			            }
			        });
			    }

			    return {
			        init: init
			    }
			}
		});
	});

    return FlatsManager.ContactsApp.Common.Views;
});