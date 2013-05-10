// Variable Object for Patients Directory view
var immunization = {
	
	
	// cache elements
    elements : {
        header: $('body.immunization>header'),
        footer: $('body.immunization>footer'),
        addButton: $('body.immunization span.add-35px'),
        scroll: {
            wrapper: $('body.immunization #pageWrapper'),
            listViewWrapper: $('body.immunization #listViewWrapper'),
            listView: $('body.immunization #listView'),
			listItem: $('body.immunization #listView>li'),
			normalMenu: {
				self: $('body.immunization #listView .normalMenu'),
				item: $('body.immunization #listView .normalMenu>li'),
				primary: $('body.immunization #listView .normalMenu .primary'),
				secondary: $('body.immunization #listView .normalMenu .secondary')
			},
			swipeMenu: {
				self: $('body.immunization #listView .swipeMenu'),
				item: $('body.immunization #listView .swipeMenu>li')
				
			}
        }
        
    },
	// cache touch elements
	touch: {
		backButton : $$('body.immunization>footer>span.back'),
			addButton : $$('body.immunization>header>.add-35px'),
		listItem : $$('body.immunization #listView>li'),
		normalMenu: {
			self: $$('body.immunization #listView .normalMenu'),
			item: $$('body.immunization #listView .normalMenu>li'),
			primary: $$('body.immunization #listView .normalMenu .primary'),
			secondary: $$('body.immunization #listView .normalMenu .secondary')
		},
		swipeMenu: {
			self: $$('body.immunization #listView .swipeMenu'),
			item: $$('body.immunization #listView .swipeMenu>li'),
			edit: $$('body.immunization #listView .swipeMenu>li.edit'),
			del: $$('body.immunization #listView .swipeMenu>li.delete')
		}
	},
    // cache dimensions
    dimensions: {
        header: {
            height: $('body.immunization>header').height(),
            width: $('body.immunization>header').width()
        },
        footer: {
            height: $('body.immunization>footer').height(),
            width: $('body.immunization>footer').width()
        },
        scroll: {
            wrapper: {
                height: $('body.immunization #pageWrapper').height(),
                width: $('body.immunization #pageWrapper').width()
            },
			listViewWrapper: {
				height: $('body.immunization #listViewWrapper').height(),
				width: $('body.immunization #listViewWrapper').width()
			},
			listView: {
				height: $('body.immunization #listView').height(),
				width: $('body.immunization #listView').width()
			},
			listItem: {
				height: $('body.immunization #listView>li').height(),
				width: $('body.immunization #listView>li').width()
			}
        }
    },
	// templates used in this view
	templates: {
		diagnosisItem: '<li class="swipeable slideIn"><ul class="normalMenu"><li class="primary"><span>New Immunization</span></li><li class="secondary status">Acute/Chronic</li></ul><ul class="swipeMenu"><li class="edit icon half">Edit</li><li class="delete icon half">Delete</li></ul></li>',
		diagnosisType: '',
		noDiagnosis : '<h1 class="nothingFound">No immunizationications found.</h1>'

		
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
			this.immunization.elements.scroll.listViewWrapper.append(this.immunization.templates.noDiagnosis);
		}
	}
	
};

// bind gesture events
(function bindGestureEvents(){
 
	
	
	this.immunization.touch.backButton.tap(function(){
        window.app.navigateTo('dashboard');
    });
	
	var i = 0;
	
	this.immunization.touch.addButton.tap(function(){
		
		if($('.nothingFound').length > 0){
			$('.nothingFound').transition({
				y : 600
			},600,'ease',function(){
				$('.nothingFound').remove();
			});
		}
		
		immunization.elements.scroll.listViewWrapper.height('+='+immunization.dimensions.scroll.listItem.height);
		immunization.elements.scroll.listView.prepend(immunization.templates.diagnosisItem);
		
			$('.slideIn').transition({
				marginLeft : 0
				
			},200,'easeInOutSine');
		
		++i;
        immunization.diagnosisVerticalScroll.refresh();
		immunization.diagnosisVerticalScroll.scrollTo(0,0,50,false);
    });
	
	
	
	this.immunization.touch.normalMenu.self.swipeLeft(function(){

		window.app.swipe(this);
	});
	this.immunization.touch.normalMenu.self.swipeRight(function(){

		window.app.swipe(this);
	});
	this.immunization.touch.swipeMenu.self.swipeLeft(function(){
		
		window.app.unswipe(this);
	});
	this.immunization.touch.swipeMenu.self.swipeRight(function(){
		
		window.app.unswipe(this);
	});
	
	
	this.immunization.touch.swipeMenu.del.tap(function(){
		
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
	
	this.immunization.touch.swipeMenu.edit.tap(function(){
		
		var itemToEdit = $(this).closest('li.swipeable').addClass('itemToEdit'),
			swipeMenu = $(this).parent();
		window.app.elements.modal.append(window.app.templates.confirmEdit(itemToEdit.find('.primary>span').text())).append(immunization.templates.diagnosisType).append(window.app.templates.editDiagnosis).append(window.app.templates.confirmation);
		
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
					$('#listView').append('<h1 class="nothingFound">No immunization found.</h1>');
				}
			});
			//window.app.unswipe('.swiped');
			window.app.elements.modal.find('*').remove();
		});
	});
	
	
	
	
	
})();
