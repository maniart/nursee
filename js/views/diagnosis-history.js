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
		diagnosisItem: '<li class="swipeable perspective"><ul class="normalMenu"><li class="primary">New Diagnosis</li><li class="secondary status">Acute/Chronic</li></ul><ul class="swipeMenu"><li class="edit icon half">Edit</li><li class="delete icon half">Delete</li></ul></li>'
	},
    // initiate iScroll instance
    diagnosisVerticalScroll : new iScroll('pageWrapper',{
        snap: 'li',
        momentum: true,
        hScrollbar: false,
        vScrollbar: false,
        lockDirection: true
    })
};

// bind gesture events
(function bindGestureEvents(){
 
	
	this.diagnosisHistory.touch.backButton.tap(function(){
        window.app.navigateTo('dashboard');
    });
	
	var i = 0;
	
	this.diagnosisHistory.touch.addButton.tap(function(){

		diagnosisHistory.elements.scroll.listViewWrapper.height('+='+diagnosisHistory.dimensions.scroll.listItem.height);
		diagnosisHistory.elements.scroll.listView.prepend(diagnosisHistory.templates.diagnosisItem);
		
			$('.perspective').transition({
				scale : '0deg',
				height : '40px'
			},2000,'snap');
		
		++i;
        diagnosisHistory.diagnosisVerticalScroll.refresh();
		diagnosisHistory.diagnosisVerticalScroll.scrollTo(0,0,50,false);
    });
	this.diagnosisHistory.touch.normalMenu.self.swipeLeft(function(){
		
		$(this).transition({
			marginLeft: '-330px'
		},100,function(){
			//alert($(this).parent('li').find('.swipeMenu'));
			
			$(this).parent('li').find('.swipeMenu').transition({
				marginLeft: 0
			},100, 'snap', function(){
				$(this).find('li').css({
					backgroundSize : '25px'
				},100);
			});
			
		});
	});
	this.diagnosisHistory.touch.normalMenu.self.swipeRight(function(){
		
		$(this).transition({
			marginLeft: '-330px'
		},100,function(){
			//alert($(this).parent('li').find('.swipeMenu'));
			
			$(this).parent('li').find('.swipeMenu').transition({
				marginLeft: 0
			},100, 'snap', function(){
				$(this).find('li').css({
					backgroundSize : '25px'
				},100);
			});
			
		});
	});
	this.diagnosisHistory.touch.swipeMenu.self.swipeLeft(function(){
		$(this).transition({
			marginLeft: '330px'
		},100,function(){
			//alert($(this).parent('li').find('.swipeMenu'));
			
			$(this).parent('li').find('.normalMenu').transition({
				marginLeft: 0
			},100, 'snap', function(){
				$(this).next('.swipeMenu').find('li').css({
					backgroundSize : '0px'
				},100);
			});
			
		});
	});
	
	this.diagnosisHistory.touch.swipeMenu.self.swipeRight(function(){
		$(this).transition({
			marginLeft: '330px'
		},100,function(){
			//alert($(this).parent('li').find('.swipeMenu'));
			
			$(this).parent('li').find('.normalMenu').transition({
				marginLeft: 0
			},100, 'snap', function(){
				$(this).next('.swipeMenu').find('li').css({
					backgroundSize : '0px'
				},100);
			});
			
		});
	});

	this.diagnosisHistory.touch.swipeMenu.del.tap(function(){
		
		var itemToRemove = $(this).closest('li.swipeable').addClass('itemToRemove'),
			swipeMenu = $(this).parent();
			
			$.fn.SimpleModal({
				btn_ok: 'Remove',
				model: 'confirm',
					callback: function(){
					swipeMenu.transition({
				scale : .001
				},200,function(){
					itemToRemove.remove();
				});
			},
			title: 'Remove Diagnosis?',
			contents: ''
		}).showModal();
	});
})();
