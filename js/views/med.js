// Variable Object for Patients Directory view
var med = {
	
	
	// cache elements
    elements : {
        header: $('body.med>header'),
        footer: $('body.med>footer'),
        addButton: $('body.med span.add-35px'),
        scroll: {
            wrapper: $('body.med #pageWrapper'),
            listViewWrapper: $('body.med #listViewWrapper'),
            listView: $('body.med #listView'),
			listItem: $('body.med #listView>li'),
			normalMenu: {
				self: $('body.med #listView .normalMenu'),
				item: $('body.med #listView .normalMenu>li'),
				primary: $('body.med #listView .normalMenu .primary'),
				secondary: $('body.med #listView .normalMenu .secondary')
			},
			swipeMenu: {
				self: $('body.med #listView .swipeMenu'),
				item: $('body.med #listView .swipeMenu>li')
				
			}
        }
        
    },
	// cache touch elements
	touch: {
		backButton : $$('body.med>footer>span.back'),
			addButton : $$('body.med>header>.add-35px'),
		listItem : $$('body.med #listView>li'),
		normalMenu: {
			self: $$('body.med #listView .normalMenu'),
			item: $$('body.med #listView .normalMenu>li'),
			primary: $$('body.med #listView .normalMenu .primary'),
			secondary: $$('body.med #listView .normalMenu .secondary')
		},
		swipeMenu: {
			self: $$('body.med #listView .swipeMenu'),
			item: $$('body.med #listView .swipeMenu>li'),
			edit: $$('body.med #listView .swipeMenu>li.edit'),
			del: $$('body.med #listView .swipeMenu>li.delete')
		}
	},
    // cache dimensions
    dimensions: {
        header: {
            height: $('body.med>header').height(),
            width: $('body.med>header').width()
        },
        footer: {
            height: $('body.med>footer').height(),
            width: $('body.med>footer').width()
        },
        scroll: {
            wrapper: {
                height: $('body.med #pageWrapper').height(),
                width: $('body.med #pageWrapper').width()
            },
			listViewWrapper: {
				height: $('body.med #listViewWrapper').height(),
				width: $('body.med #listViewWrapper').width()
			},
			listView: {
				height: $('body.med #listView').height(),
				width: $('body.med #listView').width()
			},
			listItem: {
				height: $('body.med #listView>li').height(),
				width: $('body.med #listView>li').width()
			}
        }
    },
	// templates used in this view
	templates: {
		diagnosisItem: '<li class="swipeable slideIn"><ul class="normalMenu"><li class="primary"><span>New Medication</span></li><li class="secondary status">05.08.2013</li></ul><ul class="swipeMenu"><li class="edit icon half">Edit</li><li class="delete icon half">Delete</li></ul></li>',
		diagnosisType: '',
		noDiagnosis : '<h1 class="nothingFound">No medications found.</h1>'

		
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
			this.med.elements.scroll.listViewWrapper.append(this.med.templates.noDiagnosis);
		}
	}
	
};

// bind gesture events
(function bindGestureEvents(){
 
	
	
	this.med.touch.backButton.tap(function(){
        window.app.navigateTo('dashboard');
    });
	
	var i = 0;
	
	this.med.touch.addButton.tap(function(){
		
		if($('.nothingFound').length > 0){
			$('.nothingFound').transition({
				y : 600
			},600,'ease',function(){
				$('.nothingFound').remove();
			});
		}
		
		med.elements.scroll.listViewWrapper.height('+='+med.dimensions.scroll.listItem.height);
		med.elements.scroll.listView.prepend(med.templates.diagnosisItem);
		
			$('.slideIn').transition({
				marginLeft : 0
				
			},200,'easeInOutSine');
		
		++i;
        med.diagnosisVerticalScroll.refresh();
		med.diagnosisVerticalScroll.scrollTo(0,0,50,false);
    });
	
	
	
	this.med.touch.normalMenu.self.swipeLeft(function(){

		window.app.swipe(this);
	});
	this.med.touch.normalMenu.self.swipeRight(function(){

		window.app.swipe(this);
	});
	this.med.touch.swipeMenu.self.swipeLeft(function(){
		
		window.app.unswipe(this);
	});
	this.med.touch.swipeMenu.self.swipeRight(function(){
		
		window.app.unswipe(this);
	});
	
	
	this.med.touch.swipeMenu.del.tap(function(){
		
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
	
	this.med.touch.swipeMenu.edit.tap(function(){
		
		var itemToEdit = $(this).closest('li.swipeable').addClass('itemToEdit'),
			swipeMenu = $(this).parent();
		window.app.elements.modal.append(window.app.templates.confirmEdit(itemToEdit.find('.primary>span').text())).append(med.templates.diagnosisType).append(window.app.templates.editDiagnosis).append(window.app.templates.confirmation);
		
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
					$('#listView').append('<h1 class="nothingFound">No medications found.</h1>');
				}
			});
			//window.app.unswipe('.swiped');
			window.app.elements.modal.find('*').remove();
		});
	});
	
	
	
	
	
})();
