$(function() {
	var app = {
		pageHome: $('#pageHome'),
		pageTerm: $('#pageTerm'),
		pageAbout: $('#pageAbout'),
		termTitle: $('#termTitle'),
		termDescription: $('#termDescription'),
		dictionary: getDictionary('dictionary.json'),
		addEvents: function(){
			$('#terms ul li a').click(function(e){
				var key = $.trim(this.innerText || this.textContent);
				app.termTitle.text(key);
				app.termDescription.text(app.dictionary[key]);
				$.mobile.changePage(app.pageTerm, {transition: 'slideup'});
		    });

			$('#focusSearch').click(function(e){
		    	$('.ui-input-search .ui-input-text').focus();
			});

			$('#fbPostTerm').click(function(e){
		    	fbPostTerm();
			});
		},
		addTermsToList: function(){
			var keys = keys == null ? app.sortArray(app.dictionary) : keys;
			var li = '';
			for(var key in keys)
				li += '<li class="ui-screen-hidden"><a href="#">'+key+'</a></li>';
			$('#listTerms').append(li);
			$('#listTerms').listview('refresh');
			$('.ui-input-search .ui-input-text').trigger('change');
			keys = null;
			li = null;
		},
		sortArray: function(arr){
			var sortedKeys = new Array();
			var sortedObj = {};
			for (var i in arr)
				sortedKeys.push(i);
			sortedKeys.sort();
			for (var i in sortedKeys)
				sortedObj[sortedKeys[i]] = arr[sortedKeys[i]];
			return sortedObj;
		}
	};
	
	app.addTermsToList();
	app.addEvents();
});

function getDictionary(url){
	var dic;
	$.ajax({
		url: url,  
		dataType: 'json',  
		data: dic,  
		async: false,  
		success: function(json){ dic = json; }  
	});
	return dic;
}

function showMsg(msg){
	$('#dialogInfo h3').html(msg);
	$.mobile.changePage('#dialogInfo', {transition: "pop", role: "dialog", reverse: false});
}