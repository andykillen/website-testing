


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