// Variable Object for Patients Directory view
var lab = {
	
	
	// cache elements
    elements : {
        header: $('body.lab>header'),
        footer: $('body.lab>footer'),
        addButton: $('body.lab span.add-35px'),
        scroll: {
            wrapper: $('body.lab #pageWrapper'),
            listViewWrapper: $('body.lab #listViewWrapper'),
            listView: $('body.lab #listView'),
			listItem: $('body.lab #listView>li'),
			normalMenu: {
				self: $('body.lab #listView .normalMenu'),
				item: $('body.lab #listView .normalMenu>li'),
				primary: $('body.lab #listView .normalMenu .primary'),
				secondary: $('body.lab #listView .normalMenu .secondary')
			},
			swipeMenu: {
				self: $('body.lab #listView .swipeMenu'),
				item: $('body.lab #listView .swipeMenu>li')
				
			}
        }
        
    },
	// cache touch elements
	touch: {
		backButton : $$('body.lab>footer>span.back'),
			addButton : $$('body.lab>header>.add-35px'),
		listItem : $$('body.lab #listView>li'),
		normalMenu: {
			self: $$('body.lab #listView .normalMenu'),
			item: $$('body.lab #listView .normalMenu>li'),
			primary: $$('body.lab #listView .normalMenu .primary'),
			secondary: $$('body.lab #listView .normalMenu .secondary')
		},
		swipeMenu: {
			self: $$('body.lab #listView .swipeMenu'),
			item: $$('body.lab #listView .swipeMenu>li'),
			edit: $$('body.lab #listView .swipeMenu>li.edit'),
			del: $$('body.lab #listView .swipeMenu>li.delete')
		}
	},
    // cache dimensions
    dimensions: {
        header: {
            height: $('body.lab>header').height(),
            width: $('body.lab>header').width()
        },
        footer: {
            height: $('body.lab>footer').height(),
            width: $('body.lab>footer').width()
        },
        scroll: {
            wrapper: {
                height: $('body.lab #pageWrapper').height(),
                width: $('body.lab #pageWrapper').width()
            },
			listViewWrapper: {
				height: $('body.lab #listViewWrapper').height(),
				width: $('body.lab #listViewWrapper').width()
			},
			listView: {
				height: $('body.lab #listView').height(),
				width: $('body.lab #listView').width()
			},
			listItem: {
				height: $('body.lab #listView>li').height(),
				width: $('body.lab #listView>li').width()
			}
        }
    },
	// templates used in this view
	templates: {
		diagnosisItem: '<li class="swipeable slideIn"><ul class="normalMenu"><li class="primary"><span>New Lab record</span></li><li class="secondary status">05.08.2013</li></ul><ul class="swipeMenu"><li class="edit icon half">Edit</li><li class="delete icon half">Delete</li></ul></li>',
		diagnosisType: '',
		noDiagnosis : '<h1 class="nothingFound">No Lab Records found.</h1>'

		
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
			this.lab.elements.scroll.listViewWrapper.append(this.lab.templates.noDiagnosis);
		}
	}
	
};

// bind gesture events
(function bindGestureEvents(){
 
	
	
	this.lab.touch.backButton.tap(function(){
        window.app.navigateTo('dashboard');
    });
	
	var i = 0;
	
	this.lab.touch.addButton.tap(function(){
		
		if($('.nothingFound').length > 0){
			$('.nothingFound').transition({
				y : 600
			},600,'ease',function(){
				$('.nothingFound').remove();
			});
		}
		
		lab.elements.scroll.listViewWrapper.height('+='+lab.dimensions.scroll.listItem.height);
		lab.elements.scroll.listView.prepend(lab.templates.diagnosisItem);
		
			$('.slideIn').transition({
				marginLeft : 0
				
			},200,'easeInOutSine');
		
		++i;
        lab.diagnosisVerticalScroll.refresh();
		lab.diagnosisVerticalScroll.scrollTo(0,0,50,false);
    });
	
	
	
	this.lab.touch.normalMenu.self.swipeLeft(function(){

		window.app.swipe(this);
	});
	this.lab.touch.normalMenu.self.swipeRight(function(){

		window.app.swipe(this);
	});
	this.lab.touch.swipeMenu.self.swipeLeft(function(){
		
		window.app.unswipe(this);
	});
	this.lab.touch.swipeMenu.self.swipeRight(function(){
		
		window.app.unswipe(this);
	});
	
	
	this.lab.touch.swipeMenu.del.tap(function(){
		
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
	
	this.lab.touch.swipeMenu.edit.tap(function(){
		
		var itemToEdit = $(this).closest('li.swipeable').addClass('itemToEdit'),
			swipeMenu = $(this).parent();
		window.app.elements.modal.append(window.app.templates.confirmEdit(itemToEdit.find('.primary>span').text())).append(lab.templates.diagnosisType).append(window.app.templates.editDiagnosis).append(window.app.templates.confirmation);
		
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
					$('#listView').append('<h1 class="nothingFound">No lab records found.</h1>');
				}
			});
			//window.app.unswipe('.swiped');
			window.app.elements.modal.find('*').remove();
		});
	});
	
	
	
	
	
})();
