(function() {

    var global = {
        loading: document.getElementById('loading'),
        hold: document.getElementsByTagName('body')
    };

    document.addEventListener("DOMContentLoaded", function(event) {
        global.loading.classList.add('complete');
        if(localStorage.getItem('keepTheUser')) {
            global.hold[0].classList.add('static');
        } else {
            localStorage.setItem('keepTheUser', true);
        }
        setTimeout(function(){
            global.hold[0].classList.remove('preload');
        }, 1000);
    });

    // Move Element

    var MoveElement = function() {
        this.speed = 400;
        this.frequency = 20;
        this.links = document.getElementsByClassName('nav-link');

        this.getLinks(this.links);
    };

    MoveElement.prototype.getLinks = function(links){
        for (var i = 0; i < links.length; i++) {
            href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();

            if(href !== null && href.length > 1 && href.substr(0, 1) === '#') {
                this.addListener(i, links);
            }
        }
    };

    MoveElement.prototype.addListener = function(i, links) {
        var that = this;
        links[i].addEventListener('click', function(e){
            that.listener(this);
            e.preventDefault();
        }, false);
    };

    MoveElement.prototype.listener = function(ref){
        var href = ref.attributes.href.nodeValue.toString(),
            target = href.substr(1),
            element = document.getElementById(target);

        this.getCalc(element);

        return false;
    };

    MoveElement.prototype.getCalc = function(element){

        var hopCount = this.speed/this.frequency,
            getScrollTopDocumentAtBegin = this.getScrollTopDocument(),
            gap = (this.getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hopCount;

        for(var i = 1; i <= hopCount; i++) {
            var hopTop = gap * i;
            this.goTo(hopTop, getScrollTopDocumentAtBegin, this.frequency, i);
        }
    };

    MoveElement.prototype.goTo = function(hopTop, topDocument, frequency, i) {
        setTimeout(function(){
            window.scrollTo(0, hopTop + topDocument);
        }, frequency * i);
    };

    MoveElement.prototype.getScrollTopElement = function(e) {
        var top = 0;

        while (e.offsetParent !== undefined && e.offsetParent !== null) {
            top += e.offsetTop + (e.clientTop !== null ? e.clientTop : 0);
            e = e.offsetParent;
        }

        return top;
    };

    MoveElement.prototype.getScrollTopDocument = function(){
        return document.documentElement.scrollTop + document.body.scrollTop;
    };

    new MoveElement();
})();