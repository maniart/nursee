document.addEventListener("orientationchange", updateLayout);

// The wrapperWidth before orientationChange. Used to identify the current page number in updateLayout();
wrapperWidth = 0;

var apptListScroll = new iScroll('apptsScroll',{
        snap: 'li',
        momentum: true,
        hScrollbar: false,
        vScrollbar: false,
        lockDirection: true
    }),
    myScroll = new iScroll('pageWrapper', {
       snap: true,
       momentum: true,
       hScrollbar: false,
       vScrollbar: false,
       lockDirection: true
    });
    updateLayout();

function updateLayout() {

    var currentPage = 0,
    wrapperWidth = $('#pageWrapper').width();
    
    if (wrapperWidth > 0) {
        var currentPage = - Math.ceil( $('#pageScroller').position().left / wrapperWidth);
    }

    

    $('#pageScroller').css('width', wrapperWidth * 2);
    $('.page').css('width', wrapperWidth - 40);
    myScroll.refresh();
    myScroll.scrollToPage(currentPage, 0, 0);
}



