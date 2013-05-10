// Variable Object for Patients Directory view
var patientsDirectory = {
    // cache elements
    elements : {
        header: $('body.patientsDirectory>header'),
        footer: $('body.patientsDirectory>footer'),
        search: {
            form: $('form#searchPatients'),
            field: $('input#search-term')
        },
        patientsList: {
            wrapper: $('div#listViewWrapper'),
            self: $('div#listViewWrapper ul#listView'),
            item: $('div#listViewWrapper ul#listView li')
        },
        
    },
    // cache dimensions
    dimensions: {
        header: {
            height: $('body.patientsDirectory>header').height(),
            width: $('body.patientsDirectory>header').width()
        },
        footer: {
            height: $('body.patientsDirectory>footer').height(),
            width: $('body.patientsDirectory>footer').width()
        }
    },
    // initiate iScroll instance
    patientsListScroller : new iScroll('listViewWrapper',{
        snap: 'li',
        momentum: true,
        hScrollbar: false,
        vScrollbar: false,
        lockDirection: true
    })
};
// custom css expression for a case-insensitive contains()
jQuery.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || '').toUpperCase().indexOf(m[3].toUpperCase())>=0;
};


// live filter the patients
(function filterPatients(){
    var	form = this.patientsDirectory.elements.search.form,
		input = this.patientsDirectory.elements.search.field,
        list = this.patientsDirectory.elements.patientsList.self;
 
    input.change(function(){
        
        var filter = input.val();
        if(filter){
           list.find('li:not(:Contains(' + filter + '))').slideUp();
           list.find('li:Contains(' + filter + ')').slideDown();
        } else {
           list.find('li').slideDown();
        }
        return false;
        
        });
	
	form.submit(function(){
		input.change();
		return false;
	});
	
})();

// bind gesture events
(function bindGestureEvents(){
 // tap on patient - for now
 $$('div#listViewWrapper ul#listView').tap(function(){
   $('body').transition({
      opacity: 0
   },200,'easeOutQuad', function(){
        window.location = 'dashboard.html';
   });
  });
  $$('input#search-term').tap(function(){
    patientsDirectory.patientsListScroller.scrollTo(0, 0, 50, false);
});
 
})();

(function configureDimensions(){
     // width of search form 
     $('form#searchPatients').css({
        width: (this.patientsDirectory.dimensions.header.width - 60)
      });
 
})();

