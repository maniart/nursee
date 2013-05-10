// Variable Object for Patients Directory view
var lifeStyle = {
	
	
	// cache elements
    elements : {
        header: $('body.lifeStyle>header'),
        footer: $('body.lifeStyle>footer'),
        addButton: $('body.lifeStyle span.add-35px'),
        scroll: {
            wrapper: $('body.lifeStyle #pageWrapper'),
            listViewWrapper: $('body.lifeStyle #listViewWrapper'),
            listView: $('body.lifeStyle #listView'),
			listItem: $('body.lifeStyle #listView>li'),
			normalMenu: {
				self: $('body.lifeStyle #listView .normalMenu'),
				item: $('body.lifeStyle #listView .normalMenu>li'),
				primary: $('body.lifeStyle #listView .normalMenu .primary'),
				secondary: $('body.lifeStyle #listView .normalMenu .secondary')
			},
			swipeMenu: {
				self: $('body.lifeStyle #listView .swipeMenu'),
				item: $('body.lifeStyle #listView .swipeMenu>li')
				
			}
        }
        
    },
	// cache touch elements
	touch: {
		backButton : $$('body.lifeStyle>footer>span.back'),
			addButton : $$('body.lifeStyle>header>.add-35px'),
		listItem : $$('body.lifeStyle #listView>li'),
		normalMenu: {
			self: $$('body.lifeStyle #listView .normalMenu'),
			item: $$('body.lifeStyle #listView .normalMenu>li'),
			primary: $$('body.lifeStyle #listView .normalMenu .primary'),
			secondary: $$('body.lifeStyle #listView .normalMenu .secondary')
		},
		swipeMenu: {
			self: $$('body.lifeStyle #listView .swipeMenu'),
			item: $$('body.lifeStyle #listView .swipeMenu>li'),
			edit: $$('body.lifeStyle #listView .swipeMenu>li.edit'),
			del: $$('body.lifeStyle #listView .swipeMenu>li.delete')
		}
	},
    // cache dimensions
    dimensions: {
        header: {
            height: $('body.lifeStyle>header').height(),
            width: $('body.lifeStyle>header').width()
        },
        footer: {
            height: $('body.lifeStyle>footer').height(),
            width: $('body.lifeStyle>footer').width()
        },
        scroll: {
            wrapper: {
                height: $('body.lifeStyle #pageWrapper').height(),
                width: $('body.lifeStyle #pageWrapper').width()
            },
			listViewWrapper: {
				height: $('body.lifeStyle #listViewWrapper').height(),
				width: $('body.lifeStyle #listViewWrapper').width()
			},
			listView: {
				height: $('body.lifeStyle #listView').height(),
				width: $('body.lifeStyle #listView').width()
			},
			listItem: {
				height: $('body.lifeStyle #listView>li').height(),
				width: $('body.lifeStyle #listView>li').width()
			}
        }
    },
	// templates used in this view
	templates: {
		diagnosisItem: '<li class="swipeable slideIn"><ul class="normalMenu"><li class="primary"><span>New Lifestyle Note</span></li></ul><ul class="swipeMenu"><li class="edit icon half">Edit</li><li class="delete icon half">Delete</li></ul></li>',
		diagnosisType: '',
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
			this.lifeStyle.elements.scroll.listViewWrapper.append(this.lifeStyle.templates.noDiagnosis);
		}
	}
	
};

// bind gesture events
(function bindGestureEvents(){
 
	
	
	this.lifeStyle.touch.backButton.tap(function(){
        window.app.navigateTo('dashboard');
    });
	
	var i = 0;
	
	this.lifeStyle.touch.addButton.tap(function(){
		
		if($('.nothingFound').length > 0){
			$('.nothingFound').transition({
				y : 600
			},600,'ease',function(){
				$('.nothingFound').remove();
			});
		}
		
		lifeStyle.elements.scroll.listViewWrapper.height('+='+lifeStyle.dimensions.scroll.listItem.height);
		lifeStyle.elements.scroll.listView.prepend(lifeStyle.templates.diagnosisItem);
		
			$('.slideIn').transition({
				marginLeft : 0
				
			},200,'easeInOutSine');
		
		++i;
        lifeStyle.diagnosisVerticalScroll.refresh();
		lifeStyle.diagnosisVerticalScroll.scrollTo(0,0,50,false);
    });
	
	
	
	this.lifeStyle.touch.normalMenu.self.swipeLeft(function(){

		window.app.swipe(this);
	});
	this.lifeStyle.touch.normalMenu.self.swipeRight(function(){

		window.app.swipe(this);
	});
	this.lifeStyle.touch.swipeMenu.self.swipeLeft(function(){
		
		window.app.unswipe(this);
	});
	this.lifeStyle.touch.swipeMenu.self.swipeRight(function(){
		
		window.app.unswipe(this);
	});
	
	
	this.lifeStyle.touch.swipeMenu.del.tap(function(){
		
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
	
	this.lifeStyle.touch.swipeMenu.edit.tap(function(){
		
		var itemToEdit = $(this).closest('li.swipeable').addClass('itemToEdit'),
			swipeMenu = $(this).parent();
		window.app.elements.modal.append(window.app.templates.confirmEdit(itemToEdit.find('.primary>span').text())).append(lifeStyle.templates.diagnosisType).append(window.app.templates.editDiagnosis).append(window.app.templates.confirmation);
		
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
					$('#listView').append('<h1 class="nothingFound">No lifestyle information found.</h1>');
				}
			});
			//window.app.unswipe('.swiped');
			window.app.elements.modal.find('*').remove();
		});
	});
	
	
	
	
	
})();
