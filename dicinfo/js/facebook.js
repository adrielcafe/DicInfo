window.fbAsyncInit = function() {
	FB.init({
		appId      : '119641214875370',
		channelUrl : '//adrielcafe.com/apps/dicinfo/channel.php',
		logging    : true,
		status     : true,
		cookie     : true,
		xfbml      : true
	});
};

(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));

function fbLogin(){
	FB.login(function(response) {
		if (response.authResponse) {
			FB.api('/me', function(response) {
				return true;
			});
		} else
			return false;
	}, {scope: 'publish_stream'});
}

function fbPostTerm(){
	FB.getLoginStatus(function(response){
		if(response.status === 'connected'){
			var msg = 'DicInfo'+
				'\nTermo: '+$('#termTitle').text()+
				'\nDefinição: '+$('#termDescription').text()+
				'\nhttp://adrielcafe.com/apps/dicinfo';
			FB.api('/me/feed', 'post', {			
				message: msg, 
				link: 'http://adrielcafe.com/apps/dicinfo', 
				picture: 'http://adrielcafe.com/apps/dicinfo/images/icon-128.png' 
			}, function(response) {
				if (!response || response.error)
				 	showMsg("Não foi possível conectar com o Facebook");
				else
		 			showMsg("Termo compartilhado com sucesso!");
			});
		} else {
			showMsg("Faça login no Facebook e tente compartilhar novamente");
			fbLogin();
		}
	});
	
	return false;
}