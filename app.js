const fetch  = require('node-fetch')

list = [
foo("https://twitter.com/devtheory_/status/1281862289079984128"),
foo("https://twitter.com/USgamernet/status/1232447699275808769"),
foo("https://twitter.com/tataka510/status/1291014161988689920"),
foo("https://twitter.com/yuanchuan23/status/1288838764123443206"),
]

async function foo(x){

	urlx = encodeURIComponent(x)

	urlx = "https://publish.twitter.com/oembed?url=" + urlx

	response = await fetch(urlx)

	resJSON  = await response.json()
	
	console.log(resJSON.author_name)

	return resJSON.html

}

Promise.all(list).then( values => {

	content = "<div style='display:flex;'><div style='margin:auto;'>"
	
	for( x of values )
	content += x + "<br><br>"

	content += "</div></div>"

	server( content, 2 )
  
})

function server(x,n) {

	p = ["","plain","html"]

	const http = require("http")
	const PORT = 8080

	http.createServer(function (req, res) {
		
		res.writeHead(200,{"content-type":`text/${p[n]};charset=utf8`})

		res.end(x)
	  
	}).listen(PORT)

	console.log(`Running at port ${PORT}`)

}
