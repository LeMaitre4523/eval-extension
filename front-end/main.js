var ipcRenderer = parent.ipcRenderer
ipcRenderer.send("getConfigData", { "botId": parent.currentBotOpenId, "extensionId": "eval-extension" })
var { mode, userid } = {}

ipcRenderer.on("getConfigData", async function(event, data){
    data.mode = mode;
    data.userid = userid;
    console.log(config)
})

ipcRenderer.on("saveConfigData", async function(event,result){
    if (result.success == true){
        let success = document.getElementById("success-msg").style.display = "block";
		setTimeout(function() {
		let success = document.getElementById("success-msg").style.display = "none";
		}, 5000)
    }
})

function save() {
	let opt = document.getElementById("select").value
	if(opt === "User ID") {
		let id = document.getElementById("userId").value
		mode = "userid";
		userid = id;
	} else if(opt === "Administrateur") {
		mode = "admin"
	}
	let config = {"mode": mode,"userid": userid}
	ipcRenderer.send("saveConfigData",{"config":config,"extensionId":"eval-extension","botId":parent.currentBotOpenId})
}

function getOption() {
	let opt = document.getElementById("select").value
	console.log(opt)
	if(opt === "User ID") {
	let divInput = document.getElementById("input-id").innerHTML = `<input id="userId" style="border-bottom: 1px solid  #fff;outline: none;" type="text" placeholder="ID de l\'utilisateur">`;
	if(mode === "userid") {
		document.getElementById("input-id").innerHTML = `<input id="userId" style="border-bottom: 1px solid  #fff;outline: none;" type="text" value="${userid}" placeholder="ID de l\'utilisateur">`;
		}
	}
	if(opt === "Administrateur") {
		document.getElementById("input-id").innerHTML = ``;
	}
}

window.onload = function load() {
	if(mode === "userid") {
		document.getElementById("select").value = "User ID";
		document.getElementById("input-id").innerHTML = `<input id="userId" style="border-bottom: 1px solid  #fff;outline: none;" type="text" value="${userid}" placeholder="ID de l\'utilisateur">`;
	} else if(mode === "admin") {
		document.getElementById("select").value = "Administrateur";
	}
}