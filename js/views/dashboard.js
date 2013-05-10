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
// Navigation
$$('body.dashboard footer span.back').tap(function(){
    window.app.navigateTo('index');
});
$$('body.dashboard article#diagnosisHist').tap(function(){
    window.app.navigateTo('diagnosis-history');
});
$$('body.dashboard article#pmh').tap(function(){
    window.app.navigateTo('pmh');
});
$$('body.dashboard article#mdList').tap(function(){
    window.app.navigateTo('med');
});
$$('body.dashboard article#allergies').tap(function(){
    window.app.navigateTo('allergies');
});
$$('body.dashboard article#immunization').tap(function(){
    window.app.navigateTo('immunization');
});
$$('body.dashboard article#labRecords').tap(function(){
    window.app.navigateTo('lab');
});
$$('body.dashboard article#imgRecords').tap(function(){
    window.app.navigateTo('image');
});
$$('body.dashboard article#lifeStyle').tap(function(){
    window.app.navigateTo('lifestyle');
});