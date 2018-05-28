let socket;

function init(url){
    socket = new WebSocket(url);
    console.log('browser websocket connecting... to '+url);
}

function registerOpenHandler(handlerFunction){
    socket.onopen=()=>{
        console.log('open connection event');
        handlerFunction();
    };
}
function registerMessageHandler(handlerFunction){
    socket.onmessage=(e)=>{
        console.log('message event ',e.data);
        let data = JSON.parse(e.data);
        handlerFunction(data);
    }
}

function sendMessage(payload){
    socket.send(JSON.stringify(payload));
}

export default {
    init,
    registerOpenHandler,
    registerMessageHandler,
    sendMessage
}