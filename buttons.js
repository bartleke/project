/*<!Name:Kelsey Bartlett>
<!Class:CS290>
<!Activity: Database Interactions>
<!Credit: Textbook examples>
<!Date:6/1/16>*/

/*document.getElementById('AddEntry').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
	var payload = {};
   	payload.id = this.parentNode.name;
    req.open('POST', 'http://localhost:3000/insert', true);
	req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.result);
        console.log(result);
      } else {
        console.log("Error in network request: " + request.statusText);
      }});
    req.send(null);
    event.preventDefault();
  });
  
document.getElementById('deleteb').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
	var payload = {};
   	payload.id = this.parentNode.name;
    req.open('POST', 'http://localhost:3000/delete', true);
	req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.result);
        console.log(result);
      } else {
        console.log("Error in network request: " + request.statusText);
      }});
    req.send(null);
    event.preventDefault();
  });