(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){e.exports=a.p+"static/media/xrp.026fdd6d.svg"},117:function(e,t,a){e.exports={title:"src_title__2DlC4",menuButton:"src_menuButton__-tJv4"}},118:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(9),r=a.n(i),l=a(161),o=a(157),c=a(44),m=a(26),u=a(13),h=a(12),d=a(15),p=a(14),b=a(16),y=a(7),v=a.n(y),g=a(56),w=a.n(g),_={slotAdress:"HMxB2dxizJuonfksbwzwYChX6VaJp9JfUCF3cNduUB3r",makeYourOwnAddress:"AgsCo5c42tc6hEmUHTUMTCxNjNETZXzeyLe6dU3ZJVXQ",reels:5,symbols:[a(96),a(97),a(98),a(99),a(100)],gameMaker:"G251yALHEF2ZJU38BwRNjrZfxmCkDVdvQSpURPATgT3f"},f=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={balance:{integral:0,fraction:0,result:null,reels:a.props.reels,symbols:a.props.symbols?a.props.symbols:5}},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"placeBet",value:function(){this.props.onPlaceBet();var e=Math.random().toString().slice(12);this.setState({gameHash:e});var t=JSON.stringify({gameHash:e,numSymbols:parseInt(this.props.symbols),numReels:parseInt(this.props.reels),gameMaker:this.props.gameMaker});this.sendTransaction({Target:_.slotAdress,Fee:"0.1",Amount:this.props.bet,UserData:t},this.getResult.bind(this))}},{key:"getResult",value:function(){this.sendTransaction({Target:_.slotAdress,Fee:"0.01",SmartContract:{Method:"getResult",NewState:!0}},this.checkResult.bind(this))}},{key:"checkResult",value:function(e){if(e&&e.smart_contract_result.v_string){var t=JSON.parse(e.smart_contract_result.v_string);this.state.gameHash==t.result.gameHash?this.props.callback(e):setTimeout(this.getResult.bind(this),1e3)}else setTimeout(this.getResult.bind(this),1e3)}},{key:"sendTransaction",value:function(e,t){e.Source=window.Base58.decode(window.Cs_PublicKey),e.PrivateKey=window.Base58.decode(window.Cs_PrivateKey);var a=window.SignCS.CreateTransaction(e);this.TransactionFlow(a.Result,t)}},{key:"TransactionFlow",value:function(e,t){window.SignCS.Connect().TransactionFlow(e,t)}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:w.a.play,onClick:this.placeBet.bind(this)},s.a.createElement("div",{className:w.a.but},"Spin")))}}]),t}(s.a.Component),E=a(30),S=a(57),k=a.n(S),O=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={spinning:!1,margin:0,itemHeight:0},a.spin=a.spin.bind(Object(E.a)(a)),a.stop=a.stop.bind(Object(E.a)(a)),a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"startAnimation",value:function(){this.setState({spinning:!0,margin:0})}},{key:"spin",value:function(){setTimeout(this.startAnimation.bind(this),this.props.timer)}},{key:"stop",value:function(){var e=this;this._symbols=[],this.props.symbols.map(function(t,a){return e._symbols.push(s.a.createElement("li",{key:a},s.a.createElement("img",{src:t})))}),this._symbols.sort(function(e,t){return.5-Math.random()}),setTimeout(this.goToReel.bind(this),this.props.timer)}},{key:"goToReel",value:function(){var e=0;this._symbols.map(function(t,a){t.key==this.props.item&&(e=a)}.bind(this));var t=e*this.state.itemheight*-1;this.setState({margin:t+"px",spinning:!1})}},{key:"reset",value:function(){this._symbols=null}},{key:"componentDidMount",value:function(){var e=document.getElementById("firstItem").clientHeight;this.setState({itemheight:e})}},{key:"render",value:function(){var e=this,t="";return this.state.spinning&&(t=k.a.spinning),this._symbols||(this._symbols=[],this.props.symbols.map(function(t,a){return e._symbols.push(s.a.createElement("li",{key:a},s.a.createElement("img",{src:t})))}),this._symbols.sort(function(e,t){return.5-Math.random()})),s.a.createElement("div",{className:k.a.col},s.a.createElement("ul",{className:t,style:{marginTop:this.state.margin}},s.a.createElement("li",{id:"firstItem"},s.a.createElement("img",{src:this.props.symbols[Math.floor(Math.random()*this.props.symbols.length)]})),this._symbols,s.a.createElement("li",{id:"firstItem"},s.a.createElement("img",{src:this.props.symbols[Math.floor(Math.random()*this.props.symbols.length)]})),s.a.createElement("li",{id:"firstItem"},s.a.createElement("img",{src:this.props.symbols[Math.floor(Math.random()*this.props.symbols.length)]}))))}}]),t}(s.a.Component),T=a(58),C=a(60),P=a(37),N=a.n(P),G=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={displayed:!1,topPrizes:[],secondPrizes:[],progressive:1e4,reels:a.props.reels},a.getPrizes(),a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"openPayTable",value:function(){this.setState({displayed:!0})}},{key:"closePayTable",value:function(){this.setState({displayed:!1})}},{key:"getPrizes",value:function(){this.setState({reels:this.props.reels}),this.sendTransaction({Target:_.slotAdress,Fee:"0.01",SmartContract:{Method:"getTopPrizes",NewState:!0,Params:[{K:"INT",V:this.props.symbols.length},{K:"INT",V:this.props.reels}]}},this.updateTopPrizes.bind(this)),this.sendTransaction({Target:_.slotAdress,Fee:"0.01",SmartContract:{Method:"getSecondTierPrizes",NewState:!0,Params:[{K:"INT",V:this.props.symbols.length},{K:"INT",V:this.props.reels}]}},this.updateSecondPrizes.bind(this)),this.sendTransaction({Target:_.slotAdress,Fee:"0.01",SmartContract:{Method:"getProgressiveJackpot",NewState:!0}},this.updateProgressive.bind(this))}},{key:"updateProgressive",value:function(e){this.setState({progressive:e.smart_contract_result.v_double})}},{key:"updateTopPrizes",value:function(e){var t=[];e.smart_contract_result.v_list.map(function(e){t.push(e.v_double_box)}),this.setState({topPrizes:t.reverse()})}},{key:"updateSecondPrizes",value:function(e){console.log(e);var t=[];e.smart_contract_result.v_list.map(function(e){t.push(e.v_double_box)}),this.setState({secondPrizes:t.reverse()})}},{key:"sendTransaction",value:function(e,t){e.Source=window.Base58.decode(window.Cs_PublicKey),e.PrivateKey=window.Base58.decode(window.Cs_PrivateKey);var a=window.SignCS.CreateTransaction(e);this.TransactionFlow(a.Result,t)}},{key:"TransactionFlow",value:function(e,t){window.SignCS.Connect().TransactionFlow(e,t)}},{key:"render",value:function(){var e=this;this.state.reels!=this.props.reels&&this.getPrizes();var t=[N.a.PayTableGrid];return this.state.displayed&&t.push(N.a.PayTableGridOpen),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:N.a.PayTableButton,onClick:this.openPayTable.bind(this)},s.a.createElement("span",null,"Pay Table")),s.a.createElement("div",{className:t.join(" "),onClick:this.closePayTable.bind(this)},s.a.createElement("div",{className:N.a.PROGRESSIVE},"PROGRESSIVE JACKPOT",s.a.createElement("div",null,this.state.progressive," CS ",s.a.createElement("span",null," 10% is paid to game maker"))),s.a.createElement("div",{className:N.a.JACKPOTSYMBOL},s.a.createElement("img",{src:this.props.symbols[0]}),s.a.createElement("dl",null,this.state.topPrizes.map(function(t,a){return s.a.createElement(s.a.Fragment,null,s.a.createElement("dt",null,e.props.reels-a," Pays"),s.a.createElement("dd",null,t," CS"))}))),s.a.createElement("div",{className:N.a.OTHERSYMBOLS},s.a.createElement("div",{className:"images"},this.state.secondPrizes.map(function(t,a){if(a>0)return s.a.createElement("img",{src:e.props.symbols[a]})})),s.a.createElement("dl",null,this.state.secondPrizes.map(function(t,a){return s.a.createElement(s.a.Fragment,null,s.a.createElement("dt",null,e.props.reels-a," Pays"),s.a.createElement("dd",null,t," CS"))})))))}}]),t}(s.a.Component),M=a(31),j=a.n(M),B=a(156),R=a(160),K=a(153),F=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={displayed:!1,name:"",numReels:5,numSymbols:5,symbols:[]},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"openMakeYourOwn",value:function(){this.setState({displayed:!0})}},{key:"closeMakeYourOwn",value:function(){this.setState({displayed:!1})}},{key:"name",value:function(e){this.setState({name:e.target.value})}},{key:"numReels",value:function(e){this.setState({numReels:e.target.value})}},{key:"numSymbols",value:function(e){this.setState({numSymbols:e.target.value})}},{key:"symbols",value:function(e){this.setState({symbols:e.target.value})}},{key:"submitMaker",value:function(){var e=JSON.stringify({symbols:this.state.symbols,numReels:parseInt(this.state.numReels),name:this.state.name});this.sendTransaction({Target:_.makeYourOwnAddress,Fee:"0.1",Amount:1,UserData:e},this.getResult.bind(this))}},{key:"getResult",value:function(e){this.closeMakeYourOwn(),this.props.changeGame(window.Cs_PublicKey)}},{key:"sendTransaction",value:function(e,t){e.Source=window.Base58.decode(window.Cs_PublicKey),e.PrivateKey=window.Base58.decode(window.Cs_PrivateKey);var a=window.SignCS.CreateTransaction(e);this.TransactionFlow(a.Result,t)}},{key:"TransactionFlow",value:function(e,t){window.SignCS.Connect().TransactionFlow(e,t)}},{key:"render",value:function(){var e=[j.a.MakeYourOwn];return this.state.displayed&&e.push(j.a.MakeYourOwnOpen),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:j.a.MakeYourOwnButton,onClick:this.openMakeYourOwn.bind(this)},s.a.createElement("span",null,"MakeYourOwn Slot")),s.a.createElement("div",{className:e.join(" ")},s.a.createElement(K.a,{component:"main",maxWidth:"xl"},s.a.createElement(l.a,null),s.a.createElement("div",{className:j.a.paper},s.a.createElement("h2",null,"Make your own slot"),s.a.createElement("p",null,"By making your own slot your game will automatically be eligble to win part Progressive Jackpot.  If someone wins the progressive while playing your slot.  You get a percentage of the winnings"),s.a.createElement("p",null,"The price is 1 CS to make your slot"),s.a.createElement("div",{className:j.a.form,noValidate:!0},s.a.createElement(R.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"name",label:"Name",name:"name",autoFocus:!0,onChange:this.name.bind(this)}),s.a.createElement(R.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"name",label:"number of reels",name:"number of reels",type:"number",value:this.state.numReels,autoFocus:!0,onChange:this.numReels.bind(this)}),s.a.createElement(R.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"name",label:"number of symbols",name:"number of symbols",type:"number",value:this.state.numSymbols,autoFocus:!0,onChange:this.numSymbols.bind(this)}),s.a.createElement(R.a,{label:"add image location for each symbol seperated by new line",placeholder:"https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg",multiline:!0,fullWidth:!0,rows:this.state.numSymbols,rowsMax:this.state.numSymbols,onChange:this.symbols.bind(this)}),s.a.createElement(B.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:j.a.submit,onClick:this.submitMaker.bind(this)},"Make Slot"),s.a.createElement(B.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",className:j.a.submit,onClick:this.closeMakeYourOwn.bind(this)},"Close Window"))))))}}]),t}(s.a.Component),A=Object(m.f)(F),W=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e)))._reels=[],a.state={lastWin:0,balance:0,bet:1,winnerClassName:v.a.winner},a.getBalance(),a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"getBalance",value:function(){var e=window.Base58.decode(window.Cs_PublicKey);window.SignCS.Connect().WalletBalanceGet(e,function(e){if(e.status.code>0&&"Not found"!=e.status.message)this.setState({balance:"error"});else{var t=parseFloat(e.balance.integral+e.balance.fraction*Math.pow(10,-18)).toFixed(2);this.setState({balance:t})}}.bind(this))}},{key:"spinReels",value:function(){Array.apply(0,Array(parseInt(this.props.reels))).map(function(e,t){this["spinner".concat(t)].spin()}.bind(this)),this.setState({balance:this.state.balance-this.state.bet})}},{key:"result",value:function(e){var t=JSON.parse(e.smart_contract_result.v_string);console.log(t),this.setState({reels:t.result.Reels,lastWin:t.result.win,balance:0}),Array.apply(0,Array(parseInt(this.props.reels))).map(function(e,t){this["spinner".concat(t)].stop()}.bind(this)),this.getBalance(),t.result.resultIsSuccess&&setTimeout(this.winSplash.bind(this),1e3)}},{key:"winSplash",value:function(){this.setState({winnerClassName:v.a.winner+" "+v.a.winActive}),setTimeout(this.stopSplash.bind(this),3e3)}},{key:"stopSplash",value:function(){this.setState({winnerClassName:v.a.winner})}},{key:"betAdd",value:function(){this.setState({bet:this.state.bet+1})}},{key:"betRemove",value:function(){this.setState({bet:this.state.bet-1})}},{key:"render",value:function(){var e=this,t=Array(parseInt(this.props.reels)).fill(0);this.state.reels&&(this.props.reels!=this.state.reels.length&&this.setState({reels:t}),t=this.state.reels,Array.apply(0,Array(parseInt(this.props.reels))).map(function(e,t){this["spinner".concat(t)]&&this["spinner".concat(t)].reset()}.bind(this))),this.props.gameMaker,this.state.gameMaker;var a={"grid-template-columns":Array(this.props.reels).fill("1fr").join(" ")};return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:v.a.gridcontainer},s.a.createElement("div",{className:v.a.SLOTS},s.a.createElement("div",{className:v.a.arrowRight}),s.a.createElement("div",{className:v.a.arrowLeft}),s.a.createElement("div",{className:this.state.winnerClassName},s.a.createElement("span",null," Winner!",s.a.createElement("br",null),this.state.lastWin,"CS")),s.a.createElement("div",{className:v.a.spinnercontainer,style:a},t.map(function(t,a){return s.a.createElement(O,{item:t,ref:function(t){e["spinner".concat(a)]=t},timer:100+100*Math.floor(6*Math.random()),symbols:e.props.symbols})}))),s.a.createElement("div",{className:v.a.Balance},s.a.createElement("div",{className:v.a.topWrap},s.a.createElement("h2",null,"Balance"),s.a.createElement("h3",null,this.state.balance))),s.a.createElement("div",{className:v.a.Win},s.a.createElement("div",{className:v.a.topWrap},s.a.createElement("h2",null,"Last Win"),s.a.createElement("h3",null,this.state.lastWin," CS"))),s.a.createElement("div",{className:v.a.LOGO},s.a.createElement("h1",null,this.props.name,s.a.createElement("em",null,"SLOTS"))),s.a.createElement("div",{className:v.a.PayTable},s.a.createElement(G,{reels:this.props.reels,symbols:this.props.symbols})),s.a.createElement("div",{className:v.a.SPIN},s.a.createElement(f,{reels:this.props.reels,symbols:this.props.symbols.length,gameMaker:this.props.gameMaker,bet:this.state.bet,onPlaceBet:this.spinReels.bind(this),callback:this.result.bind(this)})),s.a.createElement("div",{className:v.a.MakeYourOwn},s.a.createElement(A,{changeGame:this.props.changeGame})),s.a.createElement("div",{className:v.a.Bet},s.a.createElement("div",{className:v.a.topWrap},s.a.createElement("h2",null,"Bet"),s.a.createElement("h3",null,this.state.bet," CS"))),s.a.createElement("div",{className:v.a.Add},s.a.createElement(T.a,{onClick:this.betAdd.bind(this),icon:C.b})),s.a.createElement("div",{className:v.a.Remove},s.a.createElement(T.a,{onClick:this.betRemove.bind(this),icon:C.a}))))}}]),t}(s.a.Component),Y=a(158),x=a(163),I=a(162),L=a(77),z=a.n(L),J=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(h.a)(t,[{key:"changeGame",value:function(e){this.props.changeGame(e.target.value)}},{key:"render",value:function(){return this.props.games.length?s.a.createElement("div",{className:z.a.GamePicker},s.a.createElement(I.a,{htmlFor:"age-helper"},"Pick A Game"),s.a.createElement(Y.a,{onChange:this.changeGame.bind(this),displayEmpty:!0,label:"Pick A Game",placeholder:"Pick A Game"},s.a.createElement(x.a,{value:""},s.a.createElement("em",null,"CS Slots")),this.props.games.map(function(e,t){return s.a.createElement(x.a,{value:e[1].maker},e[1].name)}))):s.a.createElement(s.a.Fragment,null)}}]),t}(s.a.Component),U=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={gameId:null,games:!1},window.Cs_PublicKey&&a.getGames(),a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"sendTransaction",value:function(e,t){e.Source=window.Base58.decode(window.Cs_PublicKey),e.PrivateKey=window.Base58.decode(window.Cs_PrivateKey);var a=window.SignCS.CreateTransaction(e);this.TransactionFlow(a.Result,t)}},{key:"TransactionFlow",value:function(e,t){window.SignCS.Connect().TransactionFlow(e,t)}},{key:"changeGame",value:function(e){this.getGames(),this.setState({gameId:e})}},{key:"getGames",value:function(){this.sendTransaction({Target:_.makeYourOwnAddress,Fee:"0.01",SmartContract:{Method:"getGames",NewState:!0}},this.updateGames.bind(this))}},{key:"updateGames",value:function(e){var t=JSON.parse(e.smart_contract_result.v_string);t=Object.entries(t),this.setState({games:t})}},{key:"render",value:function(){if(!window.Url&&!window.Cs_PrivateKey&&!window.Cs_PublicKey)return s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{to:{pathname:"/login",search:""}}));if(0==this.state.games&&this.getGames(),this.state.gameId){console.log(this.state.gameId);var e=this.state.games;if(e=e.reduce(function(e,t){return t[0]==this.state.gameId&&(e=t),e}.bind(this)),console.log(e[1]),e&&e[1]&&e[1].numReels)return s.a.createElement(s.a.Fragment,null,s.a.createElement(W,{reels:e[1].numReels,name:e[1].name,symbols:e[1].symbols.split("\n"),gameMaker:e[1].maker,changeGame:this.changeGame.bind(this)}),s.a.createElement(J,{games:this.state.games,changeGame:this.changeGame.bind(this)}))}return s.a.createElement(s.a.Fragment,null,s.a.createElement(W,{reels:_.reels,name:"Credits",symbols:_.symbols,gameMaker:_.gameMaker,changeGame:this.changeGame.bind(this)}),s.a.createElement(J,{games:this.state.games,changeGame:this.changeGame.bind(this)}))}}]),t}(s.a.Component),V=a(78),H=a.n(V),q=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={privateKey:"",publicKey:"",nodeUrl:"https://proxy.cap.davidwalsh.dev"},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"privateKey",value:function(e){this.setState({privateKey:e.target.value})}},{key:"publicKey",value:function(e){this.setState({publicKey:e.target.value})}},{key:"nodeUrl",value:function(e){this.setState({nodeUrl:e.target.value})}},{key:"submitLogin",value:function(){window.Url=this.state.nodeUrl,window.Cs_PrivateKey=this.state.privateKey,window.Cs_PublicKey=this.state.publicKey,window.Url&&window.Cs_PrivateKey&&window.Cs_PublicKey&&this.props.history.push("/")}},{key:"render",value:function(){return s.a.createElement("div",{className:v.a.gridcontainer},s.a.createElement("div",{className:v.a.notSlots},s.a.createElement("div",{className:H.a.loginWrap},s.a.createElement(K.a,{component:"main",maxWidth:"xs"},s.a.createElement(l.a,null),s.a.createElement("div",{className:v.a.paper},s.a.createElement("div",{className:v.a.form,noValidate:!0},s.a.createElement(R.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"privateKey",label:"Private Key",name:"privateKey",autoFocus:!0,onChange:this.privateKey.bind(this)}),s.a.createElement(R.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"publicKey",label:"Public Key",name:"publicKey",autoFocus:!0,onChange:this.publicKey.bind(this)}),s.a.createElement(R.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"Node",label:"Node",name:"Node",autoFocus:!0,value:"https://proxy.cap.davidwalsh.dev",onChange:this.nodeUrl.bind(this)}),s.a.createElement(B.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:v.a.submit,onClick:this.submitLogin.bind(this)},"Sign In")))))),s.a.createElement("div",{className:v.a.Balance},s.a.createElement("div",{className:v.a.topWrap},s.a.createElement("h2",null,"Balance"),s.a.createElement("h3",null,"0.00"))),s.a.createElement("div",{className:v.a.Win},s.a.createElement("div",{className:v.a.topWrap},s.a.createElement("h2",null,"Last Win"),s.a.createElement("h3",null,"0.00"))),s.a.createElement("div",{className:v.a.LOGO},s.a.createElement("h1",null,"CS",s.a.createElement("em",null,"SLOTS"))),s.a.createElement("div",{className:v.a.PayTable}),s.a.createElement("div",{className:v.a.MakeYourOwn}),s.a.createElement("div",{className:v.a.SPIN}),s.a.createElement("div",{className:v.a.Bet}))}}]),t}(s.a.Component),Z=a(54),D=a(79),X=Object(D.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:Z.a.A400},background:{default:"#fff"}}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(117);r.a.render(s.a.createElement(o.a,{theme:X},s.a.createElement(l.a,null),s.a.createElement(c.a,{basename:"/"},s.a.createElement("div",null,s.a.createElement(m.b,{path:"/",component:U}),s.a.createElement(m.b,{path:"/login",component:q})))),document.querySelector("#root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},31:function(e,t,a){e.exports={MakeYourOwnButton:"MakeYourOwn_MakeYourOwnButton__29VzK",MakeYourOwn:"MakeYourOwn_MakeYourOwn__14wjT",MakeYourOwnOpen:"MakeYourOwn_MakeYourOwnOpen__2SlhX"}},37:function(e,t,a){e.exports={PayTableButton:"PayTable_PayTableButton__3T5pm",PayTableGrid:"PayTable_PayTableGrid__huca5",PayTableGridOpen:"PayTable_PayTableGridOpen__1h5ZS",PROGRESSIVE:"PayTable_PROGRESSIVE__2eYLL",JACKPOTSYMBOL:"PayTable_JACKPOTSYMBOL__2wqrO",OTHERSYMBOLS:"PayTable_OTHERSYMBOLS__14rRH"}},56:function(e,t,a){e.exports={play:"SendTransaction_play__2CC_H",but:"SendTransaction_but__1fDd-"}},57:function(e,t,a){e.exports={col:"Spinner_col__1cgZV",spinning:"Spinner_spinning__2XuZ7","x-spin":"Spinner_x-spin__178IK"}},7:function(e,t,a){e.exports={gridcontainer:"Game_gridcontainer__3HLxV",SLOTS:"Game_SLOTS__FWyO9",PayTable:"Game_PayTable__1ilGS",MakeYourOwn:"Game_MakeYourOwn__NGXWE",Balance:"Game_Balance__r2zoT",Win:"Game_Win__2OTZX",topWrap:"Game_topWrap__1m6NY",LOGO:"Game_LOGO__3-qnT",SPIN:"Game_SPIN__6BZpN",Bet:"Game_Bet__1jGlO",Add:"Game_Add__14ham",Remove:"Game_Remove__11Kmq",spinnercontainer:"Game_spinnercontainer__1Yjl5",arrowRight:"Game_arrowRight__1qb10",arrowLeft:"Game_arrowLeft__2iGqC",winner:"Game_winner__MgEGD",winActive:"Game_winActive__2n3vt",rotateBackground:"Game_rotateBackground__2j2ko",scaleForeground:"Game_scaleForeground__3jUzx"}},77:function(e,t,a){e.exports={GamePicker:"GamePicker_GamePicker__2xmQe"}},78:function(e,t,a){e.exports={loginWrap:"Login_loginWrap__30vAy"}},91:function(e,t,a){e.exports=a(118)},96:function(e,t,a){e.exports=a.p+"static/media/credits.fb327aab.png"},97:function(e,t,a){e.exports=a.p+"static/media/Litecoin.c151518b.svg"},98:function(e,t,a){e.exports=a.p+"static/media/ether.802c6eac.svg"},99:function(e,t,a){e.exports=a.p+"static/media/Bitcoin.d7876d48.svg"}},[[91,1,2]]]);
//# sourceMappingURL=main.f419dbb7.chunk.js.map