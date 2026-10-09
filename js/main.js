(function(){window.__appReady=1;
var $=function(s){return document.querySelector(s)},$$=function(s){return[].slice.call(document.querySelectorAll(s))};
var R=matchMedia('(prefers-reduced-motion:reduce)').matches,root=document.documentElement.style;
var set=function(k,v){root.setProperty(k,v)},cl=function(v,a,b){return Math.min(b===undefined?1:b,Math.max(a===undefined?0:a,v))};
/* theme: tokens drive CSS; canvases read the same tokens */
var TH={};function readTheme(){var c=getComputedStyle(document.documentElement);['ink','cream','loam'].forEach(function(k){TH[k]=c.getPropertyValue('--'+k).trim()})}
function A(a){var h=TH.ink.replace('#','');return'rgba('+parseInt(h.slice(0,2),16)+','+parseInt(h.slice(2,4),16)+','+parseInt(h.slice(4,6),16)+','+a+')'}
readTheme();
/* per-word + per-atom reveal */
$$('[data-split]').forEach(function(el){var n=0;el.innerHTML=el.textContent.trim().split('|').map(function(l){return l.trim().split(/\s+/).map(function(w){return'<span class="w" style="--i:'+(n++)+'">'+w+'</span>'}).join(' ')}).join('<br>');el.classList.add('rv')});
$$('[data-rev]').forEach(function(el){var i=[].indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',Math.min(i,10)*70+'ms')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
function startReveal(){$$('.rv,[data-rev]').forEach(function(el){R?el.classList.add('in'):io.observe(el)})}

/* loader: ~2.2s count-up that starts only once the page is actually on screen (a preloaded or background tab would otherwise finish unseen), waits for page load (max ~3.2s), then lifts away like a curtain */
(function(){var ld=$('#loader');if(!ld){startReveal();return}
var t0=null,DUR=R?900:2200,pct=$('#ldp'),de=document.documentElement,over=false,seen=false,started=false;
function finish(){if(over)return;over=true;ld.classList.add('out');setTimeout(function(){ld.remove();de.classList.remove('is-loading');startReveal()},R?320:820)}
function tick(now){if(t0===null)t0=now;var e=Math.min(1,(now-t0)/DUR),p=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;
ld.style.setProperty('--ld',p*100+'%');ld.style.setProperty('--lp',p);pct.textContent=String(Math.round(p*100)).padStart(3,'0');
if(e>=1&&(document.readyState==='complete'||now-t0>3200))return finish();requestAnimationFrame(tick)}
function begin(){if(started||!seen||document.hidden)return;started=true;requestAnimationFrame(tick)}
document.addEventListener('visibilitychange',begin);
if('IntersectionObserver' in window){var lio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){seen=true;lio.disconnect();begin()}})});lio.observe(ld)}else{seen=true;begin()}})();
/* theme toggle: saved choice wins, otherwise follow the system */
(function(){var root=document.documentElement,btn=$('#theme'),tc=$('#tc'),mq=matchMedia('(prefers-color-scheme:dark)');
function saved(){try{var t=localStorage.getItem('theme');return t==='dark'||t==='light'?t:null}catch(e){return null}}
function apply(t,persist){root.dataset.theme=t;btn.setAttribute('aria-pressed',String(t==='dark'));btn.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode');
 readTheme();tc.setAttribute('content',TH.cream);if(persist){try{localStorage.setItem('theme',t)}catch(e){}}
 if(typeof fitAll==='function'&&sx){plates();if(R){drawSoil(0);drawCon(0)}}}
btn.addEventListener('click',function(){var next=root.dataset.theme==='dark'?'light':'dark';if(!R){root.classList.add('theme-anim');setTimeout(function(){root.classList.remove('theme-anim')},450)}apply(next,true)});
mq.addEventListener&&mq.addEventListener('change',function(e){if(!saved())apply('light',false)});
btn.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));btn.setAttribute('aria-label',root.dataset.theme==='dark'?'Switch to light mode':'Switch to dark mode');tc.setAttribute('content',TH.cream)})();
/* certificate viewer */
(function(){var dlg=$('#certdlg'),img=$('#certimg'),C={};try{C=JSON.parse($('#certs-json').textContent)}catch(e){}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.view');if(b&&C[b.dataset.cert]){img.src=C[b.dataset.cert];img.alt=b.getAttribute('aria-label')||'Certificate';dlg.showModal()}else if(e.target===dlg)dlg.close()});
$('#certx').addEventListener('click',function(){dlg.close()})})();
/* hamburger mobile nav */
(function(){var btn=$('#burger'),nav=$('#mobileNav'),links=[].slice.call(nav.querySelectorAll('.mnav-link'));
function close(){btn.classList.remove('open');nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open navigation');document.body.style.overflow=''}
function open(){btn.classList.add('open');nav.classList.add('open');btn.setAttribute('aria-expanded','true');btn.setAttribute('aria-label','Close navigation');document.body.style.overflow='hidden'}
btn.addEventListener('click',function(){btn.classList.contains('open')?close():open()});
links.forEach(function(l){l.addEventListener('click',close)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
addEventListener('scroll',function(){if(btn.classList.contains('open'))close()},{passive:true})})();
/* 3D tilt on cards */
var fine=matchMedia('(hover:hover)').matches&&!R;
$$('.card').forEach(function(c){var t=document.createElement('div');t.className='tilt';while(c.firstChild)t.appendChild(c.firstChild);c.appendChild(t);if(!fine)return;var raf;
c.addEventListener('pointermove',function(e){cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.setProperty('--ry',x*22+'deg');t.style.setProperty('--rx',-y*22+'deg');t.style.setProperty('--gx',(x+.5)*100+'%');t.style.setProperty('--gy',(y+.5)*100+'%')})});
c.addEventListener('pointerleave',function(){cancelAnimationFrame(raf);t.style.setProperty('--rx','0deg');t.style.setProperty('--ry','0deg')})});
/* packet camera: pointer, or gyro after opt-in */
var tx=0,ty=0,cxv=0,cyv=0,packVis=false,cam=$('.cam'),gy=$('#gyro');
if(fine)addEventListener('pointermove',function(e){tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1},{passive:true});
if(!R&&matchMedia('(hover:none)').matches&&'DeviceOrientationEvent' in window){gy.hidden=false;gy.addEventListener('click',function(){var ask=window.DeviceOrientationEvent.requestPermission?window.DeviceOrientationEvent.requestPermission():Promise.resolve('granted');ask.then(function(s){if(s!=='granted')return;gy.hidden=true;addEventListener('deviceorientation',function(e){tx=cl((e.gamma||0)/30,-1,1);ty=cl(((e.beta||45)-45)/30,-1,1)})}).catch(function(){})})}
/* canvases */
function rnd(s){return function(){s|=0;s=s+0x6D2B79F5|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function fit(c){var d=Math.min(devicePixelRatio||1,2);c.width=Math.max(1,c.clientWidth*d);c.height=Math.max(1,c.clientHeight*d);var x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);return x}
function plates(){
var INK=TH.ink,RED='#ef493c',CR=TH.cream;
var P={
loan:function(g){g.R(30,40,240,170);g.F(30,40,240,14,INK);g.C(42,47,2.5,CR,CR);g.C(52,47,2.5,CR,CR);g.B(function(x){x.moveTo(92,208);x.bezierCurveTo(100,160,200,160,208,208)});g.C(150,112,28);
 [[112,70,1,1],[188,70,-1,1],[112,140,1,-1],[188,140,-1,-1]].forEach(function(k){g.L([[k[0],k[1]+k[3]*16],[k[0],k[1]],[k[0]+k[2]*16,k[1]]],RED,2.5)});
 g.R(168,238,102,64);g.C(190,262,9);g.L([[208,254],[260,254]]);g.L([[208,266],[250,266]]);g.L([[180,288],[260,288]]);
 g.T('LIVENESS PASS',30,246);g.T('RISK SCORE',30,276,INK,9);g.T('0.18',30,328,RED,46,1);g.T('VIDEO KYC · AUTO DECISION',30,368,INK,8.5)},
mem:function(g){var n=0;for(var r=0;r<8;r++)for(var c=0;c<6;c++){var h=(r*7+c*13+r*c*5)%10,xx=27+c*42,yy=30+r*42;
 if(r<4){if(h<4)g.F(xx,yy,36,36,RED);else if(h<8)g.R(xx,yy,36,36);else g.R(xx,yy,36,36,A(.3))}else{g.R(xx,yy,36,36,A(.18))}}
 g.R(21,24,258,174,RED,2.5);g.T('FIXED MEMORY BUDGET',27,382,INK,9)},
healix:function(g){g.F(54,40,14,44,RED);g.F(39,55,44,14,RED);g.T('15 CLASSES',190,60);g.T('CLINICAL AI',190,76,INK,8.5);
 var p=[[20,190]];for(var i=20;i<260;i+=48){p.push([i+10,190],[i+16,168],[i+23,226],[i+30,148],[i+37,190],[i+48,190])}g.L(p,RED,2.5);
 [70,40,96,26,56].forEach(function(h,i){g.F(30+i*50,350-h,32,h,i==2?RED:INK)});g.T('DISEASE PROBABILITY',30,378)},
ticket:function(g){[40,112,184].forEach(function(y,i){g.R(20,y,130,56);g.L([[32,y+16],[110,y+16]]);g.L([[32,y+30],[132,y+30]]);g.L([[32,y+42],[90,y+42]]);g.R(194,y,86,56,i==1?RED:INK,i==1?2.5:1.5);g.T(['BILLING','TECH','ACCESS'][i],204,y+33,i==1?RED:INK,9);g.L([[150,y+28],[194,y+28]],i==1?RED:INK);g.L([[186,y+23],[194,y+28],[186,y+33]],i==1?RED:INK)});
 g.T('88%',20,326,RED,56,1);g.T('ROUTING ACCURACY',20,362)},
drowsy:function(g){g.C(150,140,86);g.B(function(x){x.ellipse(116,126,17,11,0,0,7)});g.C(116,126,5,INK,INK);g.L([[168,130],[196,130]],INK,3);g.L([[172,136],[168,144]]);g.L([[184,137],[184,146]]);g.L([[196,136],[200,144]]);g.L([[122,180],[178,182]],INK,2.5);
 g.P([[236,40],[266,94],[206,94]],RED,RED);g.T('!',231,86,CR,26,1);
 g.L([[24,300],[70,296],[110,306],[150,330],[190,352],[250,356]],RED,2.5);g.L([[24,336],[276,336]],A(.4));g.T('EAR < 0.2 → ALERT',24,382,INK,9)},
bid:function(g){for(var i=0;i<5;i++){var h=44+i*40;g.F(30+i*50,290-h,36,h,i==4?RED:INK)}
 g.Rot(222,56,-.55,function(){g.F(-34,-14,68,28,INK);g.F(-6,14,12,76,INK)});g.L([[190,112],[270,112]],INK,3);
 g.T('$1,240',30,342,RED,40,1);g.T('LIVE · 3 BIDDERS',30,372)},
samvaad:function(g){g.R(24,36,172,48);g.T('HELLO',40,66,INK,12);g.R(104,100,172,48,INK,1.5,INK);g.T('NAMASTE',120,130,CR,12);g.R(24,164,190,48);g.T('VANAKKAM',40,194,INK,12);
 g.C(64,290,28,RED);g.R(58,274,12,22,RED);g.L([[64,298],[64,308]],RED);g.L([[54,308],[74,308]],RED);[0,1,2].forEach(function(i){g.B(function(x){x.arc(64,286,40+i*14,-.7,.7)},RED)});
 g.T('12+ LANGUAGES',130,296,INK,11);g.T('WHATSAPP · VOICE + TEXT',24,372,INK,9)},
truth:function(g){g.R(40,36,170,230);for(var i=0;i<9;i++){if(i==4)g.F(50,126+0,152,14,'rgba(239,73,60,.28)');g.L([[56,56+i*24],[196-(i%3)*14,56+i*24]])}
 g.C(190,190,38,RED,null,2.5);g.L([[218,218],[264,262]],RED,5);g.R(40,296,220,14);g.F(40,296,180,14,INK);g.T('CREDIBILITY 82',40,336,INK,12);g.T('CONTENT AUTHENTICITY',40,364,INK,9)},
face:function(g){g.C(100,150,42);g.C(86,142,3.5,INK,INK);g.C(114,142,3.5,INK,INK);g.L([[88,170],[112,170]]);
 [[52,96,1,1],[148,96,-1,1],[52,204,1,-1],[148,204,-1,-1]].forEach(function(k){g.L([[k[0],k[1]+k[3]*18],[k[0],k[1]],[k[0]+k[2]*18,k[1]]],RED,2.5)});g.T('JABBAR 0.97',52,86,RED,9);
 g.C(222,190,30,A(.55));g.R(188,156,68,68,A(.55));g.T('UNKNOWN',190,148,INK,9);
 for(var i=0;i<24;i++)g.L([[26+i*10,330],[26+i*10,330-(10+((i*37)%9)*7)]],i%6==0?RED:INK,2);g.T('FACENET EMBEDDING',26,372)},
fruit:function(g){g.C(92,112,46);g.L([[92,66],[100,48]],INK,2.5);g.R(40,52,104,112,RED,2.5);g.T('APPLE 0.98',40,44,RED,9);
 g.C(212,150,38);g.R(170,106,84,86);g.T('ORANGE 0.95',172,98,INK,9);
 g.B(function(x){x.arc(150,212,84,Math.PI*.14,Math.PI*.86)},INK,16);g.R(52,236,196,84,RED,2);g.T('BANANA 0.97',54,230,RED,9);g.T('FRUIT CLASSIFIER',26,372)},
legal:function(g){
 // Document outline
 g.R(30,36,200,260);g.F(30,36,200,20,INK);
 // Text lines simulating legal text
 [70,90,110,130,150,170,190,210].forEach(function(y,i){g.L([[46,y],[i%3===0?216:192,y]],A(.6),1.5)});
 // Highlighted / flagged section
 g.F(46,154,170,14,'rgba(239,73,60,.22)');g.L([[46,154],[216,154],[216,168],[46,168],[46,154]],RED,1.5);
 // Classification label chip
 g.F(46,220,90,26,RED);g.T('CIVIL',52,237,TH.cream,9.5);
 g.R(146,220,86,26);g.T('TAX',152,237,INK,9.5);
 // Model accuracy bars
 g.T('LR',36,310,INK,8.5);g.R(54,300,162,12);g.F(54,300,148,12,RED);
 g.T('RF',36,328,INK,8.5);g.R(54,318,162,12);g.F(54,318,122,12,INK);
 g.T('DT',36,346,INK,8.5);g.R(54,336,162,12);g.F(54,336,104,12,A(.55));
 // TF-IDF label
 g.T('TF-IDF BIGRAMS',36,372,INK,9);g.T('INDIAN LAW NLP',36,388,RED,8.5)},
cert:function(g){g.R(30,50,240,300);g.R(40,60,220,280,A(.3),1);g.T('CERTIFICATE',58,100,INK,10);g.T('OF PARTICIPATION',58,114,INK,8.5);var ln=(g.dt||'').split('|');ln.forEach(function(t,i){g.T(t,58,162+i*38,i?INK:RED,34,1)});g.L([[58,220],[240,220]]);g.L([[58,236],[200,236]]);g.L([[58,252],[170,252]]);g.C(214,306,26,RED,null,2.5);g.C(214,306,17);g.L([[202,330],[196,356]],RED,2.5);g.L([[226,330],[232,356]],RED,2.5);g.T('HACKATHON',58,322,INK,9)},
style:function(g){g.B(function(x){x.arc(150,44,10,Math.PI*.1,Math.PI*1.9)});g.L([[150,60],[150,72]]);g.L([[150,72],[34,128],[266,128],[150,72]]);
 g.L([[112,152],[188,152],[198,206],[250,326],[50,326],[102,206],[112,152]]);g.B(function(x){x.arc(150,152,22,0,Math.PI)});g.L([[100,206],[200,206]],RED,3);
 ['#171717','#8a8f9c','#e7e2d8','#ef493c','#b92725'].forEach(function(c,i){g.F(30+i*52,342,38,32,c);g.R(30+i*52,342,38,32)});g.T('PALETTE + FIT',30,392,INK,9)}
};
$$('canvas.plate').forEach(function(c){var x=fit(c),w=c.clientWidth,h=c.clientHeight,s=Math.min(w/300,h/400);
 x.fillStyle=CR;x.fillRect(0,0,w,h);x.save();x.translate((w-300*s)/2,(h-400*s)/2);x.scale(s,s);x.lineJoin='round';x.lineCap='round';
 var g={R:function(a,b,cw,ch,col,lw,fill){x.strokeStyle=col||INK;x.lineWidth=lw||1.5;if(fill){x.fillStyle=fill;x.fillRect(a,b,cw,ch)}x.strokeRect(a,b,cw,ch)},
 F:function(a,b,cw,ch,col){x.fillStyle=col||INK;x.fillRect(a,b,cw,ch)},
 C:function(cx,cy,r,col,fill,lw){x.beginPath();x.arc(cx,cy,r,0,7);if(fill){x.fillStyle=fill;x.fill()}x.strokeStyle=col||INK;x.lineWidth=lw||1.5;x.stroke()},
 L:function(pts,col,lw){x.beginPath();pts.forEach(function(p,i){i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.strokeStyle=col||INK;x.lineWidth=lw||1.5;x.stroke()},
 P:function(pts,col,fill){x.beginPath();pts.forEach(function(p,i){i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.closePath();x.fillStyle=fill;x.fill();x.strokeStyle=col;x.stroke()},
 B:function(fn,col,lw){x.beginPath();fn(x);x.strokeStyle=col||INK;x.lineWidth=lw||1.5;x.stroke()},
 T:function(t,a,b,col,sz,big){x.fillStyle=col||INK;x.font=big?sz+'px Anton,Impact,sans-serif':(sz||10)+'px "Martian Mono",monospace';x.textBaseline='alphabetic';x.fillText(t,a,b)},
 Rot:function(tx,ty,ang,fn){x.save();x.translate(tx,ty);x.rotate(ang);fn();x.restore()}};
 g.dt=c.dataset.t;(P[c.dataset.k]||function(){})(g);x.restore()})}

var rails=[['#work','#track'],['#hacks','#htrack']].map(function(a){return{stage:$(a[0]),track:$(a[1]),ov:0}});
var soil=$('#soil'),sx,con=$('#contour'),cx;
function fitAll(){lockGeo();sx=fit(soil);cx=fit(con);plates();rails.forEach(function(r){r.stage.classList.remove('static');r.ov=r.track.scrollWidth-innerWidth;if(r.stage.dataset.auto){var st=r.ov<40;r.stage.classList.toggle('static',st);r.stage.style.height=st?'':(innerHeight+r.ov*1.2)+'px';if(st)r.ov=0}});if(R){drawSoil(0);drawCon(0)}}
function drawSoil(t){var w=soil.clientWidth,h=soil.clientHeight,cols=Math.ceil(w/34),rows=Math.ceil(h/30);sx.fillStyle=TH.loam;sx.fillRect(0,0,w,h);sx.lineWidth=1.5;sx.strokeStyle='#ef493c';
for(var j=0;j<rows;j++)for(var i=0;i<cols;i++){var n=j*cols+i,a=Math.sin(t*.0004+n*.7)*.6+.3,px=i*34+17+Math.sin(t*.0003+j)*6,py=j*30+15;sx.globalAlpha=.05+.14*(Math.sin(t*.0006+n*1.3)*.5+.5);sx.beginPath();sx.moveTo(px,py);sx.lineTo(px+Math.cos(a)*10,py+Math.sin(a)*10);sx.stroke()}sx.globalAlpha=1}
function drawCon(t){var w=con.clientWidth,h=con.clientHeight;cx.clearRect(0,0,w,h);cx.lineWidth=1.2;for(var i=0;i<22;i++){cx.strokeStyle=i%5===4?'#ef493c':A(.4);cx.beginPath();for(var x=0;x<=w;x+=12){var y=h*(.12+.8*i/21)+Math.sin(x*.006+t*.0004+i*.5)*22+Math.sin(x*.013-t*.0003+i)*10;x?cx.lineTo(x,y):cx.moveTo(x,y)}cx.stroke()}}
/* scroll choreography */
var heroVis=true,seaVis=false,lastIdx=-1,lastCh=-1;
var ST=['Status: waiting on first print','Status: profile verified','Status: skills stamped','Status: projects attached','Status: packet sealed, ready to ship'];
function prog(el){var r=el.getBoundingClientRect();return cl(-r.top/(r.height-innerHeight))}
function phase(idx){if(idx===lastIdx)return;lastIdx=idx;$$('.cue').forEach(function(c,i){c.classList.toggle('on',i<idx)});$('#status').textContent=ST[idx];$('#f1').textContent=idx>=1?'2023–27':'—';$('#f2').textContent=idx>=1?'8.94 CGPA':'pending';$('#f3').textContent=idx>=3?'Open to roles':'Closed'}
function chap(i){if(i===lastCh)return;lastCh=i;$$('.ch').forEach(function(c,n){c.classList.toggle('on',n===i)})}
var L={s:1,x:0,y:0};
function heroPose(a,p){set('--sky-y',-100*a+'%');set('--photo-scale',1.15-.15*a);set('--scrim',a);set('--hero-meta',1-cl(p*6));set('--ls',1+(L.s-1)*a);set('--lx',L.x*a+'px');set('--ly',L.y*a+'px');heroVis=a<1}
function lockGeo(){var W=$('#lock').offsetWidth,m=innerWidth<800;L.s=m?Math.min(.8,.9*innerWidth/W):Math.min(.5,.44*innerWidth/W);L.x=m?0:(.05*innerWidth+W*L.s/2)-innerWidth/2;L.y=m?.3*innerHeight:.12*innerHeight}
function update(){var p=prog($('#hero')),t=cl((p-.08)/.62);heroPose(t*t*(3-2*t),p);
p=prog($('.ms').closest('.stage'));set('--manifesto-wipe',cl((p-.1)/.75)*100+'%');set('--manifesto-scale',1+.05*p);
rails.forEach(function(r){var q=r.ov>0?prog(r.stage):0;r.stage.style.setProperty('--rail-x',(-q*r.ov)+'px');r.stage.style.setProperty('--rail-meter',q*100+'%')});
p=prog($('.packet').closest('.stage'));var a=cl(p/.12);set('--packet-alpha',a);set('--packet-enter',(1-a)*38+'px');set('--packet-scale',.78+.22*a);set('--packet-cut',cl((p-.86)/.14));set('--packet-meter',p*100+'%');set('--packet-copy-x',(-24*p)+'px');phase(p<.14?0:Math.min(4,1+Math.floor((p-.14)/.86*4)));
p=prog($('#experience'));set('--season-y',(-4+8*p)+'%');set('--season-scale',1.1-.045*p);chap(Math.min(2,Math.floor(p*3)));var r=$('#experience').getBoundingClientRect();seaVis=r.top<innerHeight&&r.bottom>0;var q=$('.cam').closest('.stage').getBoundingClientRect();packVis=q.top<innerHeight&&q.bottom>0}
if(R){lockGeo();heroPose(1,1);[['--manifesto-wipe','100%'],['--packet-alpha',1],['--packet-enter','0px'],['--packet-scale',1],['--packet-cut',1],['--packet-meter','100%']].forEach(function(v){set(v[0],v[1])});phase(4);$$('.ch').forEach(function(c){c.classList.add('on')})}
var tick=false;addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;update()})}},{passive:true});
var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){fitAll();update()},120)});
function loop(t){if(packVis){cxv+=(tx-cxv)*.08;cyv+=(ty-cyv)*.08;cam.style.setProperty('--cam-x',cxv.toFixed(3));cam.style.setProperty('--cam-y',cyv.toFixed(3))}if(heroVis)drawSoil(t);if(seaVis)drawCon(t);requestAnimationFrame(loop)}
(document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){fitAll();if(!R){update();requestAnimationFrame(loop)}});
})();
