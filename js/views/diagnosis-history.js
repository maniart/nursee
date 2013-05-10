// Variable Object for Patients Directory view
var diagnosisHistory = {
	
	
	// cache elements
    elements : {
        header: $('body.diagnosisHistory>header'),
        footer: $('body.diagnosisHistory>footer'),
        addButton: $('body.diagnosisHistory span.add-35px'),
        scroll: {
            wrapper: $('body.diagnosisHistory #pageWrapper'),
            listViewWrapper: $('body.diagnosisHistory #listViewWrapper'),
            listView: $('body.diagnosisHistory #listView'),
			listItem: $('body.diagnosisHistory #listView>li'),
			normalMenu: {
				self: $('body.diagnosisHistory #listView .normalMenu'),
				item: $('body.diagnosisHistory #listView .normalMenu>li'),
				primary: $('body.diagnosisHistory #listView .normalMenu .primary'),
				secondary: $('body.diagnosisHistory #listView .normalMenu .secondary')
			},
			swipeMenu: {
				self: $('body.diagnosisHistory #listView .swipeMenu'),
				item: $('body.diagnosisHistory #listView .swipeMenu>li')
				
			}
        }
        
    },
	// cache touch elements
	touch: {
		backButton : $$('body.diagnosisHistory>footer>span.back'),
			addButton : $$('body.diagnosisHistory>header>.add-35px'),
		listItem : $$('body.diagnosisHistory #listView>li'),
		normalMenu: {
			self: $$('body.diagnosisHistory #listView .normalMenu'),
			item: $$('body.diagnosisHistory #listView .normalMenu>li'),
			primary: $$('body.diagnosisHistory #listView .normalMenu .primary'),
			secondary: $$('body.diagnosisHistory #listView .normalMenu .secondary')
		},
		swipeMenu: {
			self: $$('body.diagnosisHistory #listView .swipeMenu'),
			item: $$('body.diagnosisHistory #listView .swipeMenu>li'),
			edit: $$('body.diagnosisHistory #listView .swipeMenu>li.edit'),
			del: $$('body.diagnosisHistory #listView .swipeMenu>li.delete')
		}
	},
    // cache dimensions
    dimensions: {
        header: {
            height: $('body.diagnosisHistory>header').height(),
            width: $('body.diagnosisHistory>header').width()
        },
        footer: {
            height: $('body.diagnosisHistory>footer').height(),
            width: $('body.diagnosisHistory>footer').width()
        },
        scroll: {
            wrapper: {
                height: $('body.diagnosisHistory #pageWrapper').height(),
                width: $('body.diagnosisHistory #pageWrapper').width()
            },
			listViewWrapper: {
				height: $('body.diagnosisHistory #listViewWrapper').height(),
				width: $('body.diagnosisHistory #listViewWrapper').width()
			},
			listView: {
				height: $('body.diagnosisHistory #listView').height(),
				width: $('body.diagnosisHistory #listView').width()
			},
			listItem: {
				height: $('body.diagnosisHistory #listView>li').height(),
				width: $('body.diagnosisHistory #listView>li').width()
			}
        }
    },
	// templates used in this view
	templates: {
		diagnosisItem: '<li class="swipeable slideIn"><ul class="normalMenu"><li class="primary"><span>New Diagnosis</span></li><li class="secondary status">Acute/Chronic</li></ul><ul class="swipeMenu"><li class="edit icon half">Edit</li><li class="delete icon half">Delete</li></ul></li>',
		diagnosisType: '<ul class="buttons"><li class="half">Acute</li><li class="half">Chronic</li></ul>',
		noDiagnosis : '<h1 class="nothingFound">No diagnosis record found.</h1>'

		
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
			this.diagnosisHistory.elements.scroll.listViewWrapper.append(this.diagnosisHistory.templates.noDiagnosis);
		}
	}
	
};

// bind gesture events
(function bindGestureEvents(){
 
	
	
	this.diagnosisHistory.touch.backButton.tap(function(){
        window.app.navigateTo('dashboard');
    });
	
	var i = 0;
	
	this.diagnosisHistory.touch.addButton.tap(function(){
		
		if($('.nothingFound').length > 0){
			$('.nothingFound').transition({
				y : 600
			},600,'ease',function(){
				$('.nothingFound').remove();
			});
		}
		
		diagnosisHistory.elements.scroll.listViewWrapper.height('+='+diagnosisHistory.dimensions.scroll.listItem.height);
		diagnosisHistory.elements.scroll.listView.prepend(diagnosisHistory.templates.diagnosisItem);
		
			$('.slideIn').transition({
				marginLeft : 0
				
			},200,'easeInOutSine');
		
		++i;
        diagnosisHistory.diagnosisVerticalScroll.refresh();
		diagnosisHistory.diagnosisVerticalScroll.scrollTo(0,0,50,false);
    });
	
	
	
	this.diagnosisHistory.touch.normalMenu.self.swipeLeft(function(){

		window.app.swipe(this);
	});
	this.diagnosisHistory.touch.normalMenu.self.swipeRight(function(){

		window.app.swipe(this);
	});
	this.diagnosisHistory.touch.swipeMenu.self.swipeLeft(function(){
		
		window.app.unswipe(this);
	});
	this.diagnosisHistory.touch.swipeMenu.self.swipeRight(function(){
		
		window.app.unswipe(this);
	});
	
	
	this.diagnosisHistory.touch.swipeMenu.del.tap(function(){
		
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
	
	this.diagnosisHistory.touch.swipeMenu.edit.tap(function(){
		
		var itemToEdit = $(this).closest('li.swipeable').addClass('itemToEdit'),
			swipeMenu = $(this).parent();
		window.app.elements.modal.append(window.app.templates.confirmEdit(itemToEdit.find('.primary>span').text())).append(diagnosisHistory.templates.diagnosisType).append(window.app.templates.editDiagnosis).append(window.app.templates.confirmation);
		
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
					$('#listView').append('<h1 class="nothingFound">No diagnosis found.</h1>');
				}
			});
			//window.app.unswipe('.swiped');
			window.app.elements.modal.find('*').remove();
		});
	});
	
	
	
	
	
})();
