// Variable Object for Patients Directory view
var image = {
	
	
	// cache elements
    elements : {
        header: $('body.image>header'),
        footer: $('body.image>footer'),
        addButton: $('body.image span.add-35px'),
        scroll: {
            wrapper: $('body.image #pageWrapper'),
            listViewWrapper: $('body.image #listViewWrapper'),
            listView: $('body.image #listView'),
			listItem: $('body.image #listView>li'),
			normalMenu: {
				self: $('body.image #listView .normalMenu'),
				item: $('body.image #listView .normalMenu>li'),
				primary: $('body.image #listView .normalMenu .primary'),
				secondary: $('body.image #listView .normalMenu .secondary')
			},
			swipeMenu: {
				self: $('body.image #listView .swipeMenu'),
				item: $('body.image #listView .swipeMenu>li')
				
			}
        }
        
    },
	// cache touch elements
	touch: {
		backButton : $$('body.image>footer>span.back'),
			addButton : $$('body.image>header>.add-35px'),
		listItem : $$('body.image #listView>li'),
		normalMenu: {
			self: $$('body.image #listView .normalMenu'),
			item: $$('body.image #listView .normalMenu>li'),
			primary: $$('body.image #listView .normalMenu .primary'),
			secondary: $$('body.image #listView .normalMenu .secondary')
		},
		swipeMenu: {
			self: $$('body.image #listView .swipeMenu'),
			item: $$('body.image #listView .swipeMenu>li'),
			edit: $$('body.image #listView .swipeMenu>li.edit'),
			del: $$('body.image #listView .swipeMenu>li.delete')
		}
	},
    // cache dimensions
    dimensions: {
        header: {
            height: $('body.image>header').height(),
            width: $('body.image>header').width()
        },
        footer: {
            height: $('body.image>footer').height(),
            width: $('body.image>footer').width()
        },
        scroll: {
            wrapper: {
                height: $('body.image #pageWrapper').height(),
                width: $('body.image #pageWrapper').width()
            },
			listViewWrapper: {
				height: $('body.image #listViewWrapper').height(),
				width: $('body.image #listViewWrapper').width()
			},
			listView: {
				height: $('body.image #listView').height(),
				width: $('body.image #listView').width()
			},
			listItem: {
				height: $('body.image #listView>li').height(),
				width: $('body.image #listView>li').width()
			}
        }
    },
	// templates used in this view
	templates: {
		diagnosisItem: '<li class="swipeable slideIn"><ul class="normalMenu"><li class="primary"><span>New Image Record</span></li></ul><ul class="swipeMenu"><li class="edit icon half">Edit</li><li class="delete icon half">Delete</li></ul></li>',
		diagnosisType: '',
		noDiagnosis : '<h1 class="nothingFound">No imageications found.</h1>'

		
	},
    // initiate iScroll instance
    diagnosisVerticalScroll : new iScroll('pageWrapper',{
        snap: 'li',
        momentum: true,
        hScrollbar: false,
        vScrollbar: false,
        lockDirection: true,
		onBeforeScrollStart: function (e) {
			var target = e.target;
			while (target.nodeType != 1) target = target.parentNode;

			if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
				e.preventDefault();
		}
    }),
	// no record found
	noRecordFound : function(){
		var numDiagnosis = $('.swipeable').length;
		if(numDiagnosis == 0){
			this.image.elements.scroll.listViewWrapper.append(this.image.templates.noDiagnosis);
		}
	}
	
};

// bind gesture events
(function bindGestureEvents(){
 
	
	
	this.image.touch.backButton.tap(function(){
        window.app.navigateTo('dashboard');
    });
	
	var i = 0;
	
	this.image.touch.addButton.tap(function(){
		
		if($('.nothingFound').length > 0){
			$('.nothingFound').transition({
				y : 600
			},600,'ease',function(){
				$('.nothingFound').remove();
			});
		}
		
		image.elements.scroll.listViewWrapper.height('+='+image.dimensions.scroll.listItem.height);
		image.elements.scroll.listView.prepend(image.templates.diagnosisItem);
		
			$('.slideIn').transition({
				marginLeft : 0
				
			},200,'easeInOutSine');
		
		++i;
        image.diagnosisVerticalScroll.refresh();
		image.diagnosisVerticalScroll.scrollTo(0,0,50,false);
    });
	
	
	
	this.image.touch.normalMenu.self.swipeLeft(function(){

		window.app.swipe(this);
	});
	this.image.touch.normalMenu.self.swipeRight(function(){

		window.app.swipe(this);
	});
	this.image.touch.swipeMenu.self.swipeLeft(function(){
		
		window.app.unswipe(this);
	});
	this.image.touch.swipeMenu.self.swipeRight(function(){
		
		window.app.unswipe(this);
	});
	
	
	this.image.touch.swipeMenu.del.tap(function(){
		
		var itemToRemove = $(this).closest('li.swipeable').addClass('itemToRemove'),
			swipeMenu = $(this).parent();
		window.app.elements.modal.append(window.app.templates.confirmRemove(itemToRemove.find('.primary>span').text())).append(window.app.templates.confirmation);
		
		window.app.elements.modal.transition({
			left: 0
		},200, 'ease',function(){
			window.app.elements.modal.find('.confirmation').transition({
				scale : 1
			},200,'ease');
		});
		
		
	});
	
	this.image.touch.swipeMenu.edit.tap(function(){
		
		var itemToEdit = $(this).closest('li.swipeable').addClass('itemToEdit'),
			swipeMenu = $(this).parent();
		window.app.elements.modal.append(window.app.templates.confirmEdit(itemToEdit.find('.primary>span').text())).append(image.templates.diagnosisType).append(window.app.templates.editDiagnosis).append(window.app.templates.confirmation);
		
		window.app.elements.modal.transition({
			left: 0
		},200, 'ease',function(){
			window.app.elements.modal.find('.confirmation').transition({
				scale : 1
			},200,'ease');
		});

				
			
	});
	// confirmation modal : tap cancel
	$$('.cancel').tap(function(){
		window.app.elements.modal.transition({
			left : '-100%'
		},200,'snap', function(){
			//window.app.unswipe('.swiped');
			window.app.elements.modal.find('*').remove();
		});
	});
	// confirmation modal : tap confirm
	$$('.confirm').tap(function(){
		window.app.elements.modal.transition({
			left : '-100%'
		},200,'snap', function(){
			$('.itemToRemove').transition({
				scale : 0
			},200,'snap',function(){
				$(this).remove();
				var numDiagnosis = $('.swipeable').length;
				if(numDiagnosis == 0){
					$('#listView').append('<h1 class="nothingFound">No image records found.</h1>');
				}
			});
			//window.app.unswipe('.swiped');
			window.app.elements.modal.find('*').remove();
		});
	});
	
	
	
	
	
})();
