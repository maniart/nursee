// Variable Object for Patients Directory view
var allergies = {
	
	
	// cache elements
    elements : {
        header: $('body.allergies>header'),
        footer: $('body.allergies>footer'),
        addButton: $('body.allergies span.add-35px'),
        scroll: {
            wrapper: $('body.allergies #pageWrapper'),
            listViewWrapper: $('body.allergies #listViewWrapper'),
            listView: $('body.allergies #listView'),
			listItem: $('body.allergies #listView>li'),
			normalMenu: {
				self: $('body.allergies #listView .normalMenu'),
				item: $('body.allergies #listView .normalMenu>li'),
				primary: $('body.allergies #listView .normalMenu .primary'),
				secondary: $('body.allergies #listView .normalMenu .secondary')
			},
			swipeMenu: {
				self: $('body.allergies #listView .swipeMenu'),
				item: $('body.allergies #listView .swipeMenu>li')
				
			}
        }
        
    },
	// cache touch elements
	touch: {
		backButton : $$('body.allergies>footer>span.back'),
			addButton : $$('body.allergies>header>.add-35px'),
		listItem : $$('body.allergies #listView>li'),
		normalMenu: {
			self: $$('body.allergies #listView .normalMenu'),
			item: $$('body.allergies #listView .normalMenu>li'),
			primary: $$('body.allergies #listView .normalMenu .primary'),
			secondary: $$('body.allergies #listView .normalMenu .secondary')
		},
		swipeMenu: {
			self: $$('body.allergies #listView .swipeMenu'),
			item: $$('body.allergies #listView .swipeMenu>li'),
			edit: $$('body.allergies #listView .swipeMenu>li.edit'),
			del: $$('body.allergies #listView .swipeMenu>li.delete')
		}
	},
    // cache dimensions
    dimensions: {
        header: {
            height: $('body.allergies>header').height(),
            width: $('body.allergies>header').width()
        },
        footer: {
            height: $('body.allergies>footer').height(),
            width: $('body.allergies>footer').width()
        },
        scroll: {
            wrapper: {
                height: $('body.allergies #pageWrapper').height(),
                width: $('body.allergies #pageWrapper').width()
            },
			listViewWrapper: {
				height: $('body.allergies #listViewWrapper').height(),
				width: $('body.allergies #listViewWrapper').width()
			},
			listView: {
				height: $('body.allergies #listView').height(),
				width: $('body.allergies #listView').width()
			},
			listItem: {
				height: $('body.allergies #listView>li').height(),
				width: $('body.allergies #listView>li').width()
			}
        }
    },
	// templates used in this view
	templates: {
		diagnosisItem: '<li class="swipeable slideIn"><ul class="normalMenu"><li class="primary"><span>New Allergy</span></li><li class="secondary severity one">&nbsp;</li><li class="secondary status">Environmental</li></ul><ul class="swipeMenu"><li class="edit icon half">Edit</li><li class="delete icon half">Delete</li></ul></li>',
		diagnosisType: '<ul class="buttons"><li class="tierce">Food</li><li class="tierce">Env.</li><li class="tierce">Drug</li></ul><ul class="buttons"><li class="tierce">Mild</li><li class="tierce">Dangerous</li><li class="tierce">Severe</li></ul>',
		noDiagnosis : '<h1 class="nothingFound">No allergies found.</h1>'

		
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
			this.allergies.elements.scroll.listViewWrapper.append(this.allergies.templates.noDiagnosis);
		}
	}
	
};

// bind gesture events
(function bindGestureEvents(){
 
	
	
	this.allergies.touch.backButton.tap(function(){
        window.app.navigateTo('dashboard');
    });
	
	var i = 0;
	
	this.allergies.touch.addButton.tap(function(){
		
		if($('.nothingFound').length > 0){
			$('.nothingFound').transition({
				y : 600
			},600,'ease',function(){
				$('.nothingFound').remove();
			});
		}
		
		allergies.elements.scroll.listViewWrapper.height('+='+allergies.dimensions.scroll.listItem.height);
		allergies.elements.scroll.listView.prepend(allergies.templates.diagnosisItem);
		
			$('.slideIn').transition({
				marginLeft : 0
				
			},200,'easeInOutSine');
		
		++i;
        allergies.diagnosisVerticalScroll.refresh();
		allergies.diagnosisVerticalScroll.scrollTo(0,0,50,false);
    });
	
	
	
	this.allergies.touch.normalMenu.self.swipeLeft(function(){

		window.app.swipe(this);
	});
	this.allergies.touch.normalMenu.self.swipeRight(function(){

		window.app.swipe(this);
	});
	this.allergies.touch.swipeMenu.self.swipeLeft(function(){
		
		window.app.unswipe(this);
	});
	this.allergies.touch.swipeMenu.self.swipeRight(function(){
		
		window.app.unswipe(this);
	});
	
	
	this.allergies.touch.swipeMenu.del.tap(function(){
		
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
	
	this.allergies.touch.swipeMenu.edit.tap(function(){
		
		var itemToEdit = $(this).closest('li.swipeable').addClass('itemToEdit'),
			swipeMenu = $(this).parent();
		window.app.elements.modal.append(window.app.templates.confirmEdit(itemToEdit.find('.primary>span').text())).append(allergies.templates.diagnosisType).append(window.app.templates.editDiagnosis).append(window.app.templates.confirmation);
		
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
					$('#listView').append('<h1 class="nothingFound">No allergies found.</h1>');
				}
			});
			//window.app.unswipe('.swiped');
			window.app.elements.modal.find('*').remove();
		});
	});
	
	
	
	
	
})();
