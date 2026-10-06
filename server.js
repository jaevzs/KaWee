const http=require("http");
const fs=require("fs");
const path=require("path");
const {WebSocketServer}=require("ws");
const crypto=require("crypto");

const PORT=process.env.PORT||3000;
const rooms=new Map();

const questions=[
["Who was the first president of the Philippines?",["Emilio Aguinaldo","Manuel Quezon","Jose Rizal","Andres Bonifacio"],0],
["When was Philippine independence declared from Spain?",["1896","1898","1901","1946"],1],
["Who wrote Noli Me Tangere?",["Jose Rizal","Andres Bonifacio","Emilio Aguinaldo","Marcelo del Pilar"],0],
["Where was Philippine independence proclaimed?",["Kawit, Cavite","Manila","Cebu","Malolos"],0],
["Who founded the Katipunan?",["Andres Bonifacio","Jose Rizal","Emilio Aguinaldo","Apolinario Mabini"],0],
["What ancient writing system was used by Filipinos?",["Baybayin","Cuneiform","Hieroglyphics","Latin"],0],
["Who was the first president of the Commonwealth?",["Manuel Quezon","Sergio Osmeña","Emilio Aguinaldo","Ramon Magsaysay"],0]
];

function code(){return Math.random().toString(36).slice(2,8).toUpperCase()}
function publicState(r){
  const players={};
  for(const [id,p] of r.players)players[id]={id,name:p.name,points:p.points,platform:p.platform};
  return {players,hostId:r.hostId,current:r.answerer,answerer:r.answerer,
    question:r.question?{text:r.question[0],answers:r.question[1]}:null,
    flight:r.flight,started:r.started,stars:r.stars};
}
function broadcast(r,type="state",extra={}){
  const msg=JSON.stringify({type,...extra,state:publicState(r)});
  for(const c of r.clients)c.send(msg);
}
function roomFor(id){for(const r of rooms.values())if(r.players.has(id))return r}

const server=http.createServer((req,res)=>{
  let p=req.url.split("?")[0];
  if(p==="/")p="/index.html";
  const file=path.join(__dirname,"public",p);
  if(!file.startsWith(path.join(__dirname,"public")))return res.end("bad path");
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404);return res.end("Not found")}
    res.writeHead(200,{"Content-Type":file.endsWith(".html")?"text/html":"text/plain"});
    res.end(data);
  });
});
const wss=new WebSocketServer({server});

wss.on("connection",ws=>{
  const id=crypto.randomUUID();ws.id=id;
  ws.send(JSON.stringify({type:"hello",id}));

  ws.on("message",raw=>{
    let m;try{m=JSON.parse(raw)}catch{return}
    if(m.type==="create"){
      const room=code();
      const r={code:room,hostId:id,players:new Map(),clients:new Set(),question:null,answerer:null,flight:null,started:false,stars:{}};
      rooms.set(room,r);r.clients.add(ws);
      r.players.set(id,{id,name:String(m.name||"Player").slice(0,16),points:0,platform:0});
      ws.room=room;ws.send(JSON.stringify({type:"room",room,hostId:id,state:publicState(r)}));return;
    }
    if(m.type==="join"){
      const r=rooms.get(String(m.room||"").toUpperCase());
      if(!r)return ws.send(JSON.stringify({type:"error",message:"Room not found."}));
      if(r.players.size>=4)return ws.send(JSON.stringify({type:"error",message:"Room is full (4 players)."}));
      r.clients.add(ws);r.players.set(id,{id,name:String(m.name||"Player").slice(0,16),points:0,platform:0});
      ws.room=r.code;ws.send(JSON.stringify({type:"room",room:r.code,hostId:r.hostId,state:publicState(r)}));broadcast(r);return;
    }
    const r=rooms.get(ws.room);if(!r)return;
    if(m.type==="start"&&id===r.hostId){
      r.started=true;r.question=questions[Math.floor(Math.random()*questions.length)];r.answerer=null;r.flight=null;
      broadcast(r,"event",{text:"🚀 Game started! Press a buzzer!"});return;
    }
    if(!r.started)return;
    if(m.type==="buzz"&&!r.answerer&&r.question){
      r.answerer=id;broadcast(r,"event",{text:`⚡ ${r.players.get(id).name} got the buzzer!`});return;
    }
    if(m.type==="answer"&&r.answerer===id&&r.question){
      const p=r.players.get(id), choice=Number(m.choice), correct=choice===r.question[2];
      if(correct){
        p.points++;
        r.flight=id;
        broadcast(r,"event",{text:`✅ Correct! ${p.name} +1 point. Hold thrust and release at the right time!`});
      }else{
        r.answerer=null;r.question=questions[Math.floor(Math.random()*questions.length)];
        broadcast(r,"event",{text:"❌ Wrong! Buzzers are open again."});
      }
      return;
    }
    if(m.type==="thrust"&&r.answerer===id&&r.flight===id){
      const p=r.players.get(id);
      if(m.on){
        p._thrust=Date.now();
        return;
      }
      const held=Date.now()-(p._thrust||Date.now());
      p._thrust=0;
      // Timing window: the release must be between 650ms and 1250ms.
      // No progress meter is shown; players judge timing visually.
      if(held>=650&&held<=1250){
        p.platform=Math.min(p.platform+1,5);
        r.flight=null;r.answerer=null;r.question=null;
        if(p.points>=10){
          r.stars[id]=(r.stars[id]||0)+1;
          broadcast(r,"event",{text:`🏆 ${p.name} WON! 10 points reached! +1 ⭐`});
          setTimeout(()=>{
            p.points=0;p.platform=0;r.question=questions[Math.floor(Math.random()*questions.length)];broadcast(r);
          },1800);
        }else{
          r.question=questions[Math.floor(Math.random()*questions.length)];
          broadcast(r,"event",{text:`🚀 ${p.name} landed on the next platform!`});
        }
      }else{
        r.flight=null;r.answerer=null;
        broadcast(r,"event",{text:held<650?"⬇️ Too early! You fall back.":"⬇️ Too late! You miss the platform and fall back."});
        r.question=questions[Math.floor(Math.random()*questions.length)];
        broadcast(r);
      }
    }
  });

  ws.on("close",()=>{
    const r=rooms.get(ws.room);if(!r)return;
    r.clients.delete(ws);r.players.delete(id);
    if(r.hostId===id){const first=r.players.keys().next().value;r.hostId=first}
    if(r.players.size===0)rooms.delete(r.code);else broadcast(r);
  });
});

server.listen(PORT,()=>console.log(`KaWee server running on port ${PORT}`));