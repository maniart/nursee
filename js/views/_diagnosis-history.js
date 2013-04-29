// Variable Object for Patients Directory view
var diagnosisHistory = {
    // we need this for horizontal scroll
    wrapperWidth : 0,
    // cache elements
    elements : {
        header: $('body.diagnosisHistory>header'),
        footer: $('body.diagnosisHistory>footer'),
        addButton: $('body.diagnosisHistory span.add-35px'),
        scroll: {
            wrapper: $('body.diagnosisHistory #pageWrapper')
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
            }
        }
    },
    // initiate iScroll instance
    diagnosisHorizontalScroll : new iScroll('pageWrapper',{
        snap: true,
        momentum: true,
        hScrollbar: false,
        vScrollbar: false,
        lockDirection: true
    })
};

// bind gesture events
(function bindGestureEvents(){
    $$('body.diagnosisHistory>footer>span.back').tap(function(){
        window.app.navigateTo('dashboard');
    });
})();
(function updateLayout(){
    var currentPage = 0;
    if (diagnosisHistory.dimensions.scroll.wrapper.width > 0) {
        var currentPage = - Math.ceil( $('#pageScroller').position().left / diagnosisHistory.diagnosisHorizontalScroll);
    }
    $('#pageScroller').css('width', diagnosisHistory.dimensions.scroll.wrapper.width * 2);
    $('.page').css('width', diagnosisHistory.dimensions.scroll.wrapper.width - 40);
    diagnosisHistory.diagnosisHorizontalScroll.refresh();
    diagnosisHistory.diagnosisHorizontalScroll.scrollToPage(currentPage, 0, 0);
})();



(function configureDimensions(){
     // width of search form 
     $('form#searchPatients').css({
        width: (this.patientsDirectory.dimensions.header.width - 60)
      });
 
})();
