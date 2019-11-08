/**
 * Way of building html elements with an object of option
 * 
 * @version 1.1
 * @author Andrew Killen
 */

var Elmnts = {
    elm : false,
    /**
     * Takes an object of values to create a new HTML fragment
     * 
     * @param {object} obj {
     *      'type' : type of tag to create
     *      'class' : string or array of classes
     *      'atts' : object of all possible tag attributes
     *      'html'  : items that should be added as innerHTML
     *      'text'  : text that shouldbe added using innerText
     *      'append' : array of html object fragments or html object fragmenet to append to current object. 
     * }
     * 
     * usage example 
     * 
     * var elm = Elmnts.make({
     *      'type' : 'span',
     *      'text' : 'do something'
     * });
     * 
     * var elm2 =Elmnts.make({
     *      'type' : 'h1',
     *      'apprend: elm
     * });
     */
    make : function(obj){
        // clean anything that was there before
        this.elm = false;
        /**
         * Check if the options object has a type setting.
         * 
         * if there is no type, then we cannot go further and
         * with this.
         */
        if ( "type" in obj ) {
            this.create(obj.type) 
        } else {
             return false ;
        }
        /**
         * If there is a html or text setting in the options object, then apply that to the 
         * element.
         */
        var content = ['html', 'text'];
        for (var i = 0; i < content.length; i++){
            if(content[i] in obj) this[content[i]]( obj[content[i]] );
        }
        /**
         * Check for the atts in the options object and 
         * apply if set.  it just loops them
         */
        if ( "atts" in obj ) {
            for ( property in obj.atts ){
                this.set(property , obj.atts[property]);
            }
        }
        /**
         * Check if there is a class seting in the options object. 
         * 
         * If there is, then check if it is an array or string, if
         * its an array then loop it and add the classed
         */
        if ( "class" in obj ) {
            if(Array.isArray(obj.class)){
                // loop the array
                for(var i = 0; i < obj.class.length; i++){
                    this.class(obj.class[i]);
                }
            }
            else {
                // add the single string
                this.class(obj.class);
            }
        }
        /**
         * If there is an append option, then append that 
         * HTML DOM element to this element
         */
        if ( "append" in obj )  this.append(obj.append);

        /**
         * return the output 
         */
        return this.elm;

    },
    /**
     * creates a html element
     */
    create : function (el){
        this.elm = document.createElement(el);
    },
    /**
     * adds innerHTML
     */
    html : function (html){
        this.elm.innerHTML = html;
    },
    /**
     * adds innerText
     */
    text : function (text){
       // console.log('called');
        this.elm.innerText = text;  
    },
    /**
     * Set's an attribute on the element
     */
    set : function ( attribute, value ){
        this.elm.setAttribute(attribute, value);
    },
    /**
     * appends a class to the current classes
     */
    class : function(value){
        this.elm.classList.add( value );
    },
    /**
     * appends a child DOM object to this DOM object
     */
    append : function ( obj ){
        if( Array.isArray(obj) ){
            for(var i=0;i < obj.length; i++){
                this.elm.appendChild(obj[i]);
            }
        } else {
            this.elm.appendChild(obj);
        }
    }
};



var testing = {
	tags : ["a","abbr","address","article","aside","audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details","dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "meta", "meter","nav", "noscript", "object", "ol", "optiongroup", "option", "output", "p", "param", "pre", "pogress", "picture", "q", "rp", "rt", "ruby", "s", "samp", "script", "section" , "select", "small", "source", "span", "strong", "span", "sub", "summary", "sup","svg", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "title", "tr","track", "tt", "u", "ul", "var", "video", "wbr"],
	report : {
		altText : [],
		backgroundImageCount : 0,
		badmeta : [],
		badheadigns : [],		
		canonical: {
			entered: "",
			actual:"",
			shortlink: "",
			next: "",
			prev: "",
			amphtml: ""
		},
		charset : "",
		content : "",
		codingStandards: {
			flex : 0,
			grid : 0,
			table : 0,
			float : 0,
			absolute : 0
		},
		html : {},
		schema: {
			json:[],
			itemprop:[],
			itemscope:[]
		},
		languages: [],
		rss : [],
		meta : {
			"facebook" : [],
			"twitter"  : [],
			"article"  : [],
			"msuic"    : [],
			"book"     : [],
			"video"    : [],
			"profile"  : [],
			"others"   : [],
			"al"	   : []
		},
		shareImageDimensions : [],
		responsiveImages: false,
		responsiveImageType : [],
		responsiveImageCount : 0,
		nonResponsiveImages : 0,
		lazyLoadImageCount: 0,
		time: {
			correct:0,
			incorrect:0,
			values: {
				datetime : [],
				node : []	
			}
		},
		links :[],
		sections :{
			nested: 0,
			withoutHeading:0,
			total:0,
		},
		totalcount : 0,
		frameworks : [],
		fonts : [],
		fontSizes : [],
		icons : {
				"count": 0, 
				"sizes":[], 
				"types":{
						"icons" : [],		
						"fontawesome":[]
				}},
		pre : {
				"count":0, 
				"sizes":[], 
				"types":{
						"preload" : [],
						"preconnect" : [],
						"prerender" : [],
						"prefetch" : [],
						"dns-prefetch" : []
					}
		},
		css : {"count": 0, "media":[]},
		prefetch: 0,
		preload: 0,
		preconnect: 0,
		url:'',
		dateRecorded: ''
	},			
	init : function (){
		testing.addHtml();

		for (var j = 0; j < testing.tags.length; j++){
			var elms = document.getElementsByTagName(testing.tags[j]);
			testing.report.html[testing.tags[j]] = {};
			switch(testing.tags[j]){
				case "title":
					testing.dealWithTitle(elms, j);
				break;
				case "img":
					testing.addCountAndFontSizes(elms, j);
					testing.checkResponsiveImages(elms);
					testing.checkLazyLoadImages(elms);
				break;
				case "source":
					testing.addCountAndFontSizes(elms, j);
					testing.checkResposivePicture(elms);
				break;
				case "meta":
					testing.addCountAndFontSizes(elms, j);
					testing.checkMeta(elms);
				break;
				case "link":
					testing.addCountAndFontSizes(elms, j);
					testing.checkLinks(elms);
				break;
				case "script":
					testing.addCountAndFontSizes(elms, j);
					testing.checkScriptsForJsonLD(elms);
				break;
				case "h1":
					testing.addCountAndFontSizes(elms, j);
					testing.isGoodHeadingStructure(elms, "h1");
					
				break;
				case "h2":
				testing.addCountAndFontSizes(elms, j);
				testing.isGoodHeadingStructure(elms, "h2");
				
				break;
				case "h3":
				testing.addCountAndFontSizes(elms, j);
				testing.isGoodHeadingStructure(elms, "h3");
				
				break;
				case "h4":
				testing.addCountAndFontSizes(elms, j);
				testing.isGoodHeadingStructure(elms, "h4");
				
				break;
				case "h5":
				testing.addCountAndFontSizes(elms, j);
				testing.isGoodHeadingStructure(elms, "h5");
				
				break;
				case "h6":
				testing.addCountAndFontSizes(elms, j);
				testing.isGoodHeadingStructure(elms, "h6");
				
				break;
				case "section":
				testing.addCountAndFontSizes(elms, j);
				testing.isSemanticSection(elms, "section");
				
				break;
				case "time":
				testing.addCountAndFontSizes(elms, j);
				testing.checkForDateTime(elms, j);
				break;
				default:
					testing.addCountAndFontSizes(elms, j);

			}
			testing.modernHTMLCheck(elms, j);
			testing.report.totalcount += elms.length;
		}
		testing.jQueryCheck();
		testing.checkForFontAwesome();
		testing.cssValuesExtraction();
		testing.nonResponsiveCount();
		testing.sortFontSizes();
		testing.setPageDetails();
		testing.makeReport();

		
		console.log(testing.report);
	},
	addHtml:function(){
		testing.report.content = document.getElementsByTagName('html')[0].outerHTML;
	},
	checkResposivePicture:function(elms){
		// needs to have a number of this so that its clear how bad it is
		for ( var i = 0; i < elms.length; i++){				
			testing.checkForRetina(elms[i].getAttribute("srcset"))
			if ( elms[i].parentNode.nodeName === "PICTURE" ) {
				testing.report.responsiveImages = true;
				testing.report.responsiveImageCount += 1;
				if(testing.report.responsiveImageType.indexOf("picture") === -1) {
					testing.report.responsiveImageType.push("picture");				      
				}
			}
		}
	},
	checkResponsiveImages:function(elms){
		// needs to have a number of this so that its clear how bad it is
		for ( var i = 0; i < elms.length; i++){
			if(elms[i].parentNode.nodeName === "NOSCRIPT" || elms[i].parentNode.nodeName === "PICTURE" ){
				testing.report.html.img.count -= 1;
			}			

			if ( elms[i].hasAttribute("srcset") ) {
				testing.report.responsiveImages = true;
				testing.report.responsiveImageCount += 1;
				testing.checkForRetina(elms[i].getAttribute("srcset"))
				if(testing.report.responsiveImageType.indexOf("img") === -1) {
					testing.report.responsiveImageType.push("img");				      
				}
			}
			if(elms[i].hasAttribute("alt")){
				testing.report.altText.push( elms[i].getAttribute("alt") );
			}
		}
	},
	checkLazyLoadImages:function(elms){
		// needs to have a number of this so that its clear how bad it is
		for ( var i = 0; i < elms.length; i++){			
			if ( elms[i].hasAttribute("loading") && elms[i].getAttribute("loading") == 'lazy') {
				testing.report.lazyLoadImageCount += 1;
			}				
		}
	},	
	checkForRetina:function(srcset){
		if(srcset == null) {
			return;
		}
		var norm = srcset.replace(/,/g, " ");
		var imgs = norm.split(" ");
		if( imgs.indexOf("2x") > 0 && testing.report.responsiveImageType.indexOf("retina") === -1) {
			testing.report.responsiveImageType.push("retina");		
		}
	},
	checkForDateTime: function(elms, tag){
		for( var i = 0; i < elms.length; i++){
			if( elms[i].hasAttribute("datetime")){
				testing.report.time.correct += 1;
				testing.report.time.values.datetime.push(elms[i].getAttribute("datetime")) ;
			} else if (elms[i].hasChildNodes()) {
				testing.report.time.incorrect += 1;
				elms[i].style.backgroundColor = "red";
				testing.report.time.values.node.push(elms[i].textContent);
			} else {
				testing.report.time.correct += 1;				
				testing.report.time.values.node.push(elms[i].innerText) ;
			}
		}
	},
	modernHTMLCheck : function ( elms, tag){
		for (var i = 0; i < elms.length; i++ ) {
			var displayTypes = ["grid", "flex", "table"]; 
			var check = window.getComputedStyle(elms[i]).getPropertyValue("display");
			if( displayTypes.indexOf( check ) > -1  ){
				testing.report.codingStandards[check] += 1;
			}
			var floats = ["left", "right"];
			var check = window.getComputedStyle(elms[i]).getPropertyValue("float");
			if( floats.indexOf(check) > -1 ){
				testing.report.codingStandards.float += 1;
			}
			var check = window.getComputedStyle(elms[i]).getPropertyValue("position");
			if( check == "absolute" ){
				testing.report.codingStandards.absolute += 1;
			}
		}
	},
	addCountAndFontSizes : function ( elms, tag){
		testing.report.html[testing.tags[tag]]['count'] = elms.length; 
		if( typeof testing.report.html[testing.tags[tag]]['fontsize'] == 'undefined' ){
			testing.report.html[testing.tags[tag]]['fontsize'] = [];
		}
		for (var i = 0; i < elms.length; i++ ) {
			var fontsize =window.getComputedStyle(elms[i]).getPropertyValue("font-size");
			if(  parseInt(fontsize.replace("px", "")) < 13 ){
				elms[i].style.backgroundColor = "red";
			}

			if(testing.report.html[testing.tags[tag]]['fontsize'].indexOf(fontsize) == -1){
				testing.report.html[testing.tags[tag]]['fontsize'].push(fontsize);
			}
			if(elms[i].hasAttribute("itemprop")){
				if( typeof testing.report.schema.itemprop[ testing.tags[tag] ] == 'undefined' ){
					testing.report.schema.itemprop[ testing.tags[tag] ] = [];
				}
				testing.report.schema.itemprop[ testing.tags[tag] ].push( elms[i].getAttribute("itemprop") );
			}
			if(elms[i].hasAttribute("itemscope")){
				if( typeof testing.report.schema.itemscope[ testing.tags[tag] ] == 'undefined' ){
					testing.report.schema.itemscope[ testing.tags[tag] ] = [];
				}
				testing.report.schema.itemscope[ testing.tags[tag] ].push( elms[i].getAttribute("itemscope") );
			}
		}		
	},
	dealWithTitle : function(elms, tag){
		// checking if the title is in a SVG, and then ignoring it.
		testing.report.html[testing.tags[tag]]['count'] = 0;
		for( var n = 0; n < elms.length; n++){
			if(  elms[n].closest("svg") == null ){
				testing.report.html[testing.tags[tag]]['count'] += 1;
			}
		}
	},
	checkForFontAwesome : function ( ) {
		var elms = document.querySelectorAll("[class*='fa-']");
		console.log( " with font awesome : " +elms.length);
		testing.report.icons.types.fontawesome.push({"fontawesome" : elms.length});
	},
	
	jQueryCheck:function (){
		if( typeof window.jQuery != 'undefined' ){
			testing.report.frameworks.push({"jQuery":jQuery.fn.jquery});
		}
	},
	cssValuesExtraction: function (){
		var list = document.getElementsByTagName("*");
		
		for(var i = 0; i < list.length; i++){
			var fonts =window.getComputedStyle(list[i]).getPropertyValue("font-family").split(",");
			for(var j=0; j < fonts.length; j++ ){
				var font = fonts[j].replace(/\"/g, '').trim();		
				if(font != "" && testing.report.fonts.indexOf(font) === -1) {
					testing.report.fonts.push(font);
				}
			}
			var bgImage =window.getComputedStyle(list[i]).getPropertyValue("background-image");
			if(bgImage.indexOf("/") != -1){
				testing.report.backgroundImageCount += 1;
			}
		}
	},
	nonResponsiveCount : function(){
		testing.report.nonResponsiveImages =  (testing.report.backgroundImageCount + testing.report.html.img.count) - testing.report.responsiveImageCount
	},
	checkMeta : function(elms){
		for(var i = 0; i< elms.length; i++){
			if(elms[i].hasAttribute("charset")){
				testing.charset = elms[i].getAttribute("charset");
			}
			if(elms[i].hasAttribute("property")){
				// check for different types with property
				if(elms[i].hasAttribute("name")){
					testing.setBadMeta(elms[i]);
					continue;
				}
				var attr = elms[i].getAttribute("property");
				if(attr.indexOf("fb:")==0 || attr.indexOf("og:")==0){
					testing.report.meta.facebook.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content")
					});
					if(attr == "og:image" || attr == "og:image:url" || attr == "og:image:secure_url"){
						testing.getImageDimensions(testing.getAttribIfKnown(elms[i], "content"), "facebook");
					}
				} else if (attr.indexOf("al:")==0) {
					testing.report.meta.al.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content")
					});
				
				} else if (attr.indexOf("article:")==0) {
					testing.report.meta.article.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content")
					});

				}  else if (attr.indexOf("music:")==0) {
					testing.report.meta.music.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content")
					});
				} else if (attr.indexOf("video:")==0) {
					testing.report.meta.video.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content")
					});
				} else if (attr.indexOf("profile:")==0) {
					testing.report.meta.profile.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content")
					});
				} else if (attr.indexOf("book:")==0) {
					testing.report.meta.book.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content")
					});
				}  else {
					testing.report.meta.others.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content"),
						"itemprop" : testing.getAttribIfKnown(elms[i], "itemprop")
					});
				}
				
			}
			if(elms[i].hasAttribute("name")){
				var attr = elms[i].getAttribute("name");
				
				if(attr.indexOf("og:")==0 || attr.indexOf("fb:")==0){
					testing.setBadMeta(elms[i]);
					continue;
				} else if (attr.indexOf("article:")==0 || attr.indexOf("video:")==0 || attr.indexOf("book:")==0 || attr.indexOf("music:")==0 || attr.indexOf("profile:")==0) {
					// this needs to be double checked. 
					testing.setBadMeta(elms[i]);
					continue;
				} else if(attr.indexOf("twitter:")==0){
					testing.report.meta.twitter.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content")
					});
					if(attr == "twitter:image" ){
						testing.getImageDimensions(testing.getAttribIfKnown(elms[i], "content"), "twitter");
					}
					
				} else {
					testing.report.meta.others.push({
						"propery" : testing.getAttribIfKnown(elms[i], "property"),
						"name" : testing.getAttribIfKnown(elms[i], "name"),
						"content" : testing.getAttribIfKnown(elms[i], "content"),
						"itemprop" : testing.getAttribIfKnown(elms[i], "itemprop")
					});
					if(attr == "image_src" ){
						testing.getImageDimensions(testing.getAttribIfKnown(elms[i], "content"), "image_src");
					}
				}
			}

		}
	},
	setBadMeta:function(elm){
		testing.report.badmeta.push({
			"propery" : testing.getAttribIfKnown(elm, "property"),
			"name" : testing.getAttribIfKnown(elm, "name"),
			"content" : testing.getAttribIfKnown(elm, "content")
		});
	},
	checkLinks : function(elms){
		for(var i = 0; i< elms.length; i++){
			switch(elms[i].getAttribute('rel')){
				case 'shortcut icon':				
					testing.report.icons.types.icons.push({
						"type":"favicon",
						"filetype": testing.getFileTypeFromPath(elms[i].getAttribute('href')),
						"size" : testing.getAttribIfKnown(elms[i])
					});
				break;
				case 'icon':
				case 'apple-touch-icon':
				case 'apple-touch-icon-precomposed':
				case 'apple-touch-startup-image':
				testing.report.icons.types.icons.push({
						"type" : elms[i].getAttribute('rel'),
						"filetype": testing.getFileTypeFromPath(elms[i].getAttribute('href')),
						"size" : testing.getAttribIfKnown(elms[i],"sizes")
					});
				break;
				case 'stylesheet':
					testing.report.css.count += 1;
					testing.report.css.media.push( testing.getAttribIfKnown(elms[i], "media") );
				break;
				case 'preload':
					testing.report.pre.types.preload.push({
						"type":testing.getAttribIfKnown(elms[i], "rel"),
						"filetype": elms[i].getAttribute('href'),
						"as" : testing.getAttribIfKnown(elms[i], "as")
					});
				break;
				case 'preconnect':								
				case 'prerender':
				case 'prefetch':
				case 'dns-prefetch':
					testing.report.pre.types[testing.getAttribIfKnown(elms[i], "rel")].push({
						"type":testing.getAttribIfKnown(elms[i], "rel"),
						"filetype": elms[i].getAttribute('href')						
					});
					testing.report.pre.count += 1;
				break;
				case 'alternate':
				
				if(elms[i].hasAttribute('type') && elms[i].getAttribute('type')=='application/rss+xml'){
					testing.report.rss.push({
						"type":testing.getAttribIfKnown(elms[i], "type"),
						"url": testing.getAttribIfKnown(elms[i], "href")		
					});
				} else {
					testing.report.languages.push({
						"lang":testing.getAttribIfKnown(elms[i], "hreflang"),
						"url": testing.getAttribIfKnown(elms[i], "href"),
						"type" : 	testing.getAttribIfKnown(elms[i], "type"),
					});
				}				
				break;
				case "shortlink":
					testing.report.canonical.shortlink = testing.getAttribIfKnown(elms[i], "href");					
				break;
				case "amphtml":
					testing.report.canonical.amphtml = testing.getAttribIfKnown(elms[i], "href");					
				break;
				case "canonical":
					testing.report.canonical.entered = testing.getAttribIfKnown(elms[i], "href");
					testing.report.canonical.actual = window.location.href;
				break;
				case "prev":
					testing.report.canonical.prev = testing.getAttribIfKnown(elms[i], "href");
					
				break;
				case "next":
					testing.report.canonical.next = testing.getAttribIfKnown(elms[i], "href");
				break;
				default:
				if(elms[i].hasAttribute('type') && elms[i].hasAttribute('type')=='application/rss+xml'){
					testing.report.rss.push({
						"type":testing.getAttribIfKnown(elms[i], "type"),
						"url": testing.getAttribIfKnown(elms[i], "href")		
					});
				} else{
					testing.report.links.push({
						"url": testing.getAttribIfKnown(elms[i], "href"),
						"type" : testing.getAttribIfKnown(elms[i], "rel"),
					});
				}
			}
		}

	},
	getFileTypeFromPath: function(filename){
		filename = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
		if(filename.indexOf("?")> -1){
			splitup = filename.split("?");
			filename = splitup[0];
		} 
		return filename;
	},
	getAttribIfKnown : function(el, attrib){
		if(el.hasAttribute( attrib)){
			return el.getAttribute( attrib);
		} 
		return "";
	},
	checkScriptsForJsonLD : function (elms){
		for(var i = 0; i < elms.length; i++){
			if(elms[i].hasAttribute("type") && elms[i].getAttribute("type") == "application/ld+json"){
				var jsonld = JSON.parse(elms[i].innerText);

				// console.log(jsonld);

				for( s in jsonld){
					// if(testing.report.schema.indexOf(jsonld[s].type) === -1){
					// 	testing.report.schema.push(jsonld[s].type);
					// } else 
					if( typeof jsonld[s]["@type"] != 'undefined' && testing.report.schema.json.indexOf(jsonld[s]["@type"]) === -1){
						testing.report.schema.json.push(jsonld[s]["@type"]);
					}
				}
			}
		}	
	},
	makeReport : function(){
		reporting.init();
	},
	
	sendInfo : function(){

	},
	isGoodHeadingStructure : function(elms, nodeType) {
		for(var i = 0; i <elms.length; i++){
			if((elms[i].closest("header") != null && elms[i].closest("article") != null) || elms[i].closest("article") != null ){
				continue;
			}
			var headings = ["h1", "h2", "h3", "h4", "h5"] ;
			switch(nodeType){
				case "h1":
				for(var j =0; j < headings.length; j++ ){
					if(elms[i].parentNode.closest(headings[j]) != null  ) {
						testing.report.badheadigns.push(
							{
								"basenode": nodeType,
								"parentheading":headings[j]
							}
						);
					}
				}				
				break;
				case "h2":
				headings.shift();
				for(var j =0; j < headings.length; j++ ){
					if(elms[i].parentNode.closest(headings[j]) != null) {
						testing.report.badheadigns.push(
							{
								"basenode": nodeType,
								"parentheading":headings[j]
							}
						);
					}
				}

				break;
				case "h3":
				headings.shift();
				headings.shift();
				for(var j =0; j < headings.length; j++ ){
					if(elms[i].parentNode.closest(headings[j]) != null) {
						testing.report.badheadigns.push(
							{
								"basenode": nodeType,
								"parentheading":headings[j]
							}
						);
					}
				}


				break;
				case "h4":
				headings.shift();
				headings.shift();
				headings.shift();
				for(var j =0; j < headings.length; j++ ){
					if(elms[i].parentNode.closest(headings[j]) != null) {
						testing.report.badheadigns.push(
							{
								"basenode": nodeType,
								"parentheading":headings[j]
							}
						);
					}
				}
				break;
				case "h5":
				headings.shift();
				headings.shift();
				headings.shift();
				headings.shift();
				for(var j =0; j < headings.length; j++ ){
					if(elms[i].parentNode.closest(headings[j]) != null) {
						testing.report.badheadigns.push(
							{
								"basenode": nodeType,
								"parentheading":headings[j]
							}
						);
					}
				}

				break;
				case "h6":
				headings.shift();
				headings.shift();
				headings.shift();
				headings.shift();
				headings.shift();
				for(var j =0; j < headings.length; j++ ){
					if(elms[i].parentNode.closest(headings[j]) != null) {
						testing.report.badheadigns.push(
							{
								"basenode": nodeType,
								"parentheading":headings[j]
							}
						);
					}
				}

				break;
			}
		}
	},
	getImageDimensions : function(url,network){   
		
		var img = new Image();
		img.addEventListener("load", function(){
			testing.report.shareImageDimensions.push({
				"height" : this.naturalHeight ,
				"width" : this.naturalWidth ,
				"network" : network
			})			
		});
		img.src = url;
	},
	sortFontSizes: function(){
		
		for( el in testing.report.html){
			
			if(typeof testing.report.html[el].fontsize == 'undefined'){
				continue;
			}
			for(var i = 0 ; i < testing.report.html[el].fontsize.length; i++ ){						
				var fnt = parseFloat ( testing.report.html[el].fontsize[i].replace(/px/, "") ) ;
				if(testing.report.fontSizes.indexOf(fnt) == -1){
					testing.report.fontSizes.push(fnt);
				}			
			}
		}
		testing.report.fontSizes.sort();
	},
	isSemanticSection : function(elms, tag){
		for( var i = 0; i< elms.length; i++){
			if(elms[i].getElementsByTagName('section').length > 0 ){
				testing.report.sections.nested += 1;
			}
			
			elms[i].classList.add("found-section");				
			var hdcld = elms[i].querySelectorAll("h1,h2,h3,h4,h5,h6");
			for(var j =0; j < hdcld.length; j++){
				if(hdcld[j].closest("section") != hdcld[j].closest("section.found-section")){
					testing.report.sections.withoutHeading +=1;
				}
			}
			
		}
		testing.report.sections.total = elms.length;
	},
	setPageDetails : function (){
		testing.report.url = window.location.href;
		var d = new Date();
		testing.report.dateRecorded = this.getFormattedDate(d);
	},
	getFormattedDate: function (date) {
		var year = date.getFullYear();
	  
		var month = (1 + date.getMonth()).toString();
		month = month.length > 1 ? month : '0' + month;
	  
		var day = date.getDate().toString();
		day = day.length > 1 ? day : '0' + day;
		
		return month + '/' + day + '/' + year;
	  }
}








var reporting = {
	init : function(){
		var frag = document.createDocumentFragment();

		frag.appendChild(reporting.html());
		frag.appendChild(reporting.meta());
		frag.appendChild(reporting.seo());
		//frag.appendChild(reporting.fonts());
		frag.appendChild(reporting.svg());
		frag.appendChild(reporting.analytics());

		var iframe = document.createElement('iframe');
		iframe.id = "reporting";
		iframe.style.width = "660px";
		iframe.style.height = "1000px";
		document.body.appendChild(iframe);

		document.body.insertBefore(iframe, document.body.firstChild);
		

		var doc = document.getElementById("reporting").contentWindow.document.body;
		doc.appendChild(frag);	
	},
	html : function(){
		var headings = [1,2,3,4,5,6];
		var output = [];
		for( var h = 0; h < headings.length; h++ ){
			var hdns = document.getElementsByTagName( 'h' + headings[h] );
			if(typeof hdns == 'undefined' || hdns == null || hdns.length == 0 ){
				continue;
			}
			var vals = [];
			for(var i = 0; i < hdns.length; i++){
			
				vals.push(hdns[i].innerText.trim());
			}
			
			var headingValue = "h"+ headings[h];
			output.push({  title : headingValue, values : vals});
		}		
		
		output.push({  title : "total elements", values : [testing.report.totalcount] });

		output.push({  title : "coding standard", values : [
		   "absolute : " + testing.report.codingStandards.absolute,
		   "float : " + testing.report.codingStandards.float,
		   "CSS grid : " + testing.report.codingStandards.grid,
		   "Flexbox : " + testing.report.codingStandards.flex,
		   "table : " + testing.report.codingStandards.table
		] });

		output.push({  title : "sections", values : [
			"number of sections : " + testing.report.sections.total,
			"nested sections: " + testing.report.sections.nested,
			"Without headings : " + testing.report.sections.withoutHeading
		 ] });

		 output.push({  title : "Alt text", values : testing.report.altText });

		output = reporting.schema(output);
		output = reporting.fonts(output);
		output = reporting.backgroundImages(output);
		output = reporting.badHeadings(output); 
		output = reporting.badMeta(output); 
		output = reporting.canonical(output); 
		output = reporting.css(output); 
		output = reporting.htmlTags(output); 


		var table = Elmnts.make({
			type : "table",
			append : 
			
				reporting.makeMultiRow(output)			
		});
		return table;
	},
	badHeadings: function(output){
		output.push({title:"Bad Headings", values :  testing.report.badheadigns});
		return output;
	},
	badMeta: function(output){
		output.push({title:"Bad meta", values :  testing.report.badmeta});
		return output;
	},
	css : function(output){
		if(testing.report.css.count == 0) {
			return output;
		}
		output.push({title:"CSS count", values :  [testing.report.css.count]});
		output.push({title:"CSS media types", values :  [testing.report.css.media]});
		return output;
	},
	htmlTags : function(output){
		for ( tag in testing.report.html){						
			if( testing.report.html[tag].count > 0 ){
				console.log(testing.report.html[tag]);
				thesize = (testing.report.html[tag].fontsize != null)? testing.report.html[tag].fontsize : [0];
				output.push({title: tag + " : " + testing.report.html[tag].count, values : thesize });
			}
		}
		return output;
	},
	canonical : function(output){
		output.push({title:"Canonicals", values : [
			"canonical : "+ testing.report.canonical.entered,
			"visited : " + testing.report.canonical.actual,
			"amp : " + testing.report.canonical.amphtml ,
			"next : " + testing.report.canonical.next,
			"prev : " + testing.report.canonical.prev ,
			"shortlink : " + testing.report.canonical.shortlink 
		]});
		return output;
	},
	schema: function (output){
		
		var yepnope = (testing.report.schema.itemprop.length > 0 || testing.report.schema.itemscope.length > 0 || testing.report.schema.json.length > 0) ? 'yes' : 'no';					

		output.push({title:"uses schema", values : [yepnope]});

		if(yepnope == 'yes'){
			output.push({title:"itemscope", values :  testing.report.schema.itemscope});
			output.push({title:"itemprop", values :  testing.report.schema.itemprop});
			output.push({title:"json", values :  testing.report.schema.json});
		}

		return output;

	},
	meta : function(){
		var element = document.createElement("h1");
		element.appendChild(document.createTextNode("this is my tes 2"));
		return element;
	},	
	seo : function(){
		var output = [];

		output.push({  title : "Alt text", values : testing.report.altText });

		//  output.push({  title : "Font sizes in pixels", values : testing.report.fontSizes });		

		var table = Elmnts.make({
			type : "table",
			append : 
			
				reporting.makeMultiRow(output)
			
		});
		return table;
	},
	fonts : function(output){
		output.push({title:"fonts", values :  testing.report.fonts});
		output.push({title:"font sizes", values :  testing.report.fontSizes});
		return output;
	},
	svg : function(){
		var element = document.createElement("h1");
		element.appendChild(document.createTextNode("this is my tes 5"));
		return element;
	},
	analytics : function(){
		var element = document.createElement("h1");
		element.appendChild(document.createTextNode("this is my tes 6"));
		return element;
	},
	backgroundImages : function (output){
		output.push({title:"Number of Background Images", values :  [testing.report.backgroundImageCount]});
		
		return output;
	},
	makeMultiRow: function (settings){
		var rows = [];
		
		
		for(var i = 0; i < settings.length; i ++){
			rows.push(
				reporting.makeSimpleTableRow( settings[i].title , reporting.makeList(settings[i].values) )
			);
		}
		return rows;
	},
	makeList:function(values){
		var list = Elmnts.make({
			type : "ul",
			append : reporting.makeListElements(values)				
		});
		return list;
	},
	makeListElements: function(parts){
		var output = [];
		for(var p = 0; p < parts.length; p++){
			output.push(
				Elmnts.make({
					type: "li",
					text : parts[p]
				})
			)
		}
		return output;
	},
	makeSimpleTableRow: function(heading, content){

		// console.log(content);

		var colset = [];
		
		colset.push (
			Elmnts.make({
				type: "th",
				text : heading,
			})
		);
		
		colset.push (
			Elmnts.make({
				type: "td",
				append : content,
			})
		);
			
		var row = Elmnts.make({
			type: "tr",
			append : colset
		});
		return row;
	},
	makeTableRow: function(heading, columns){

		var len = columns.length;
		var counter = 0;
		var colset = [];

		colset.push (
			Elmnts.make({
				type: "th",
				text : heading,
			})
		)
		
		for ( var c = 0; c < columns.length; c++){
				counter += 1;
				var thisType = ( "href" in columns[c] ) ? 'a' : 'p';
				var thisAttrib = (typeof columns[c].href != 'undefined') ? {href:columns[c].href} : {};
				if (len == counter){
					switch(len){
						case 1:
						thisAttrib['colspan'] = 3;
						break;
						case 2:
						thisAttrib['colspan'] = 2;
						break;					
					}
					
				}
				
				colset.push(	
					Elmnts.make({
						type: 'tr',
						append:[
							Elmnts.make({
								type : thisType,
								text : columns[c].text,
								attrib : thisAttrib 
							})
						]						
					})
				);				
			
		}				
		var row = Elmnts.make({
			type: "tr",
			append : colset
		});
		return row;
	}
};
testing.init();
