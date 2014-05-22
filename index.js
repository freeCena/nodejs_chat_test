var net =require('net');
var count=0,
    users={}

var server=net.createServer(function(conn){
	//
	conn.setEncoding('utf8');

	conn.write(
		'\n>welcome to node-chat'+
		'\n>0 other people are connected at this time'+count+
		'\n>please write your name and press enter:\n'
		);
	count++;
		console.log('\033[96m new connection!\033[39m');
	conn.on('close',function(){
		count--;
		delete users[nickname];
			broadcast('\033[90m>'+nickname+' left  the room \033[39m\n');

	});
	var nickname;
	function broadcast(msg,exceptMyself){
  	for (var i in users) {
  		if (!exceptMyself||i!=nickname) {
  			users[i].write(msg);
  		};
  	};

	}
	conn.on('data',function(data){
		data = data.replace('\r\n','');
		console.log(!nickname);

		if (!nickname) {
			if(users[data]){
				conn.write('\033[93m> nickname already in use. try again:\033[39m ');
				return;
			}
			else{
				nickname=data;
				users[nickname]=conn;
				broadcast('\033[90m>'+nickname+' joined the room \033[39m\n');
			}
		}
		else{

					broadcast('\033[96m>'+nickname+':\033[39m'+data+'\n',true);

		}
  		console.log(data);

	});

});
server.listen(3000,function(){
	console.log('\033[96m server listening on *:3000\033[39m');
});