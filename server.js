const express=require('express'); const http=require('http'); const {Server}=require('socket.io');
const app=express(), server=http.createServer(app), io=new Server(server); const PORT=process.env.PORT||10000;
app.use(express.static('public'));
const questions=[
['Who is known as the national hero of the Philippines?',['Jose Rizal','Andres Bonifacio','Emilio Aguinaldo','Apolinario Mabini'],0],
['What year did the Philippines declare independence from Spain?',['1896','1898','1901','1935'],1],
['Who founded the Katipunan?',['Jose Rizal','Andres Bonifacio','Antonio Luna','Emilio Jacinto'],1],
['Where was the Philippine Declaration of Independence proclaimed?',['Malolos','Kawit, Cavite','Manila','Cebu'],1],
['Who became the first president of the First Philippine Republic?',['Manuel Quezon','Emilio Aguinaldo','Sergio Osmena','Ramon Magsaysay'],1],
['What was the name of the 1896 secret society that fought Spanish rule?',['La Liga Filipina','Katipunan','Propaganda Movement','Guardia Civil'],1],
['Who wrote Noli Me Tangere?',['Jose Rizal','Marcelo del Pilar','Graciano Lopez Jaena','Antonio Luna'],0],
['What treaty ended the Spanish-American War and transferred the Philippines to the United States?',['Treaty of Paris','Treaty of Manila','Pact of Biak-na-Bato','Treaty of Tordesillas'],0],
['Who is called the Father of the Philippine Revolution?',['Andres Bonifacio','Emilio Aguinaldo','Jose Rizal','Miguel Malvar'],0],
['What city became the capital of the First Philippine Republic?',['Malolos','Manila','Cavite','Vigan'],0]
];
const rooms=new Map(); function code(){return Math.random().toString(36).slice(2,6).toUpperCase()}
io.on('connection',s=>{s.on('join',({room,name})=>{room=(room||code()).toUpperCase(); if(!rooms.has(room)) rooms.set(room,{q:0,deck:[],players:{}}); const r=rooms.get(room); if(Object.keys(r.players).length>=4)return s.emit('errorMsg','Room is full.'); r.players[s.id]={name:(name||'Player').slice(0,16),points:0,stars:0,answered:false,ready:false}; s.join(room); s.data.room=room; io.to(room).emit('state',{players:r.players,room}); s.emit('question',{i:r.q,q:questions[r.q][0],a:shuffle(questions[r.q][1]),correct:questions[r.q][2]});});
s.on('answer',({index,original})=>{const room=s.data.room,r=rooms.get(room); if(!r)return; const p=r.players[s.id]; if(!p||p.answered)return; p.answered=true; const correct=original===questions[r.q][2]; s.emit('answerResult',{correct}); if(correct)s.emit('flightReady'); io.to(room).emit('state',{players:r.players,room});});
s.on('flight',({success})=>{const room=s.data.room,r=rooms.get(room),p=r&&r.players[s.id]; if(!p)return; if(success)p.points++; p.answered=false; if(p.points>=10){p.stars++; io.to(room).emit('winner',{id:s.id,name:p.name,stars:p.stars}); Object.values(r.players).forEach(x=>{x.points=0;x.answered=false});} r.q=(r.q+1)%questions.length; io.to(room).emit('nextQuestion',{q:questions[r.q][0],a:shuffle(questions[r.q][1]),correct:questions[r.q][2]}); io.to(room).emit('state',{players:r.players,room});}); s.on('disconnect',()=>{const room=s.data.room,r=rooms.get(room);if(r){delete r.players[s.id];io.to(room).emit('state',{players:r.players,room});if(!Object.keys(r.players).length)rooms.delete(room)}})});
function shuffle(a){const x=a.map((v,i)=>({v,i})); for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]} return x.map(z=>({text:z.v,original:z.i}))}
server.listen(PORT,()=>console.log('KaWee listening on '+PORT));
