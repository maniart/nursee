// Variable Object for Patients Directory view
var pmh = {
	
	
	// cache elements
    elements : {
        header: $('body.pmh>header'),
        footer: $('body.pmh>footer'),
        addButton: $('body.pmh span.add-35px'),
        scroll: {
            wrapper: $('body.pmh #pageWrapper'),
            listViewWrapper: $('body.pmh #listViewWrapper'),
            listView: $('body.pmh #listView'),
			listItem: $('body.pmh #listView>li'),
			normalMenu: {
				self: $('body.pmh #listView .normalMenu'),
				item: $('body.pmh #listView .normalMenu>li'),
				primary: $('body.pmh #listView .normalMenu .primary'),
				secondary: $('body.pmh #listView .normalMenu .secondary')
			},
			swipeMenu: {
				self: $('body.pmh #listView .swipeMenu'),
				item: $('body.pmh #listView .swipeMenu>li')
				
			}
        }
        
    },
	// cache touch elements
	touch: {
		backButton : $$('body.pmh>footer>span.back'),
			addButton : $$('body.pmh>header>.add-35px'),
		listItem : $$('body.pmh #listView>li'),
		normalMenu: {
			self: $$('body.pmh #listView .normalMenu'),
			item: $$('body.pmh #listView .normalMenu>li'),
			primary: $$('body.pmh #listView .normalMenu .primary'),
			secondary: $$('body.pmh #listView .normalMenu .secondary')
		},
		swipeMenu: {
			self: $$('body.pmh #listView .swipeMenu'),
			item: $$('body.pmh #listView .swipeMenu>li'),
			edit: $$('body.pmh #listView .swipeMenu>li.edit'),
			del: $$('body.pmh #listView .swipeMenu>li.delete')
		}
	},
    // cache dimensions
    dimensions: {
        header: {
            height: $('body.pmh>header').height(),
            width: $('body.pmh>header').width()
        },
        footer: {
            height: $('body.pmh>footer').height(),
            width: $('body.pmh>footer').width()
        },
        scroll: {
            wrapper: {
                height: $('body.pmh #pageWrapper').height(),
                width: $('body.pmh #pageWrapper').width()
            },
			listViewWrapper: {
				height: $('body.pmh #listViewWrapper').height(),
				width: $('body.pmh #listViewWrapper').width()
			},
			listView: {
				height: $('body.pmh #listView').height(),
				width: $('body.pmh #listView').width()
			},
			listItem: {
				height: $('body.pmh #listView>li').height(),
				width: $('body.pmh #listView>li').width()
			}
        }
    },
	// templates used in this view
	templates: {
		diagnosisItem: '<li class="swipeable slideIn"><ul class="normalMenu"><li class="primary"><span>New Medical History item</span></li><li class="secondary status">Cause</li></ul><ul class="swipeMenu"><li class="edit icon half">Edit</li><li class="delete icon half">Delete</li></ul></li>',
		diagnosisType: '',
		noDiagnosis : '<h1 class="nothingFound">No medical record found.</h1>'

		
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
			this.pmh.elements.scroll.listViewWrapper.append(this.pmh.templates.noDiagnosis);
		}
	}
	
};

// bind gesture events
(function bindGestureEvents(){
 
	
	
	this.pmh.touch.backButton.tap(function(){
        window.app.navigateTo('dashboard');
    });
	
	var i = 0;
	
	this.pmh.touch.addButton.tap(function(){
		
		if($('.nothingFound').length > 0){
			$('.nothingFound').transition({
				y : 600
			},600,'ease',function(){
				$('.nothingFound').remove();
			});
		}
		
		pmh.elements.scroll.listViewWrapper.height('+='+pmh.dimensions.scroll.listItem.height);
		pmh.elements.scroll.listView.prepend(pmh.templates.diagnosisItem);
		
			$('.slideIn').transition({
				marginLeft : 0
				
			},200,'easeInOutSine');
		
		++i;
        pmh.diagnosisVerticalScroll.refresh();
		pmh.diagnosisVerticalScroll.scrollTo(0,0,50,false);
    });
	
	
	
	this.pmh.touch.normalMenu.self.swipeLeft(function(){

		window.app.swipe(this);
	});
	this.pmh.touch.normalMenu.self.swipeRight(function(){

		window.app.swipe(this);
	});
	this.pmh.touch.swipeMenu.self.swipeLeft(function(){
		
		window.app.unswipe(this);
	});
	this.pmh.touch.swipeMenu.self.swipeRight(function(){
		
		window.app.unswipe(this);
	});
	
	
	this.pmh.touch.swipeMenu.del.tap(function(){
		
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
	
	this.pmh.touch.swipeMenu.edit.tap(function(){
		
		var itemToEdit = $(this).closest('li.swipeable').addClass('itemToEdit'),
			swipeMenu = $(this).parent();
		window.app.elements.modal.append(window.app.templates.confirmEdit(itemToEdit.find('.primary>span').text())).append(pmh.templates.diagnosisType).append(window.app.templates.editDiagnosis).append(window.app.templates.confirmation);
		
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
					$('#listView').append('<h1 class="nothingFound">No medical history found.</h1>');
				}
			});
			//window.app.unswipe('.swiped');
			window.app.elements.modal.find('*').remove();
		});
	});
	
	
	
	
	
})();
