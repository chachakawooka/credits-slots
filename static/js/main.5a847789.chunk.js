(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(10),r=a.n(i),l=a(148),o=a(144),c=a(38),m=a(25),u=a(18),p=a(12),d=a(20),h=a(19),b=a(21),v=a(7),y=a.n(v),g=a(50),_=a.n(g),E={slotAdress:"8b8A5L8zxpJyWFThm8GPqqWPp9fm1KEUvPsDbaXWykFk",reels:5,symbols:[a(78),a(79),a(80),a(81),a(82)],gameMaker:"G251yALHEF2ZJU38BwRNjrZfxmCkDVdvQSpURPATgT3f"},f=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={balance:{integral:0,fraction:0,result:null,reels:a.props.reels,symbols:a.props.symbols?a.props.symbols:5}},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"placeBet",value:function(){this.props.onPlaceBet();var e=Math.random().toString().slice(5);this.setState({gameHash:e});var t=JSON.stringify({gameHash:e,numSymbols:parseInt(this.props.symbols),numReels:parseInt(this.props.reels),gameMaker:this.props.gameMaker});this.sendTransaction({Target:E.slotAdress,Fee:"0.1",Amount:this.props.bet,UserData:t},this.getResult.bind(this))}},{key:"getResult",value:function(){this.sendTransaction({Target:E.slotAdress,Fee:"0.01",SmartContract:{Method:"getResult",NewState:!0}},this.checkResult.bind(this))}},{key:"checkResult",value:function(e){if(e&&e.smart_contract_result.v_string){console.log(JSON.parse(e.smart_contract_result.v_string));var t=JSON.parse(e.smart_contract_result.v_string);this.state.gameHash==t.result.gameHash?this.props.callback(e):setTimeout(this.getResult.bind(this),1e3)}else setTimeout(this.getResult.bind(this),1e3)}},{key:"sendTransaction",value:function(e,t){e.Source=window.Base58.decode(window.Cs_PublicKey),e.PrivateKey=window.Base58.decode(window.Cs_PrivateKey);var a=window.SignCS.CreateTransaction(e);this.TransactionFlow(a.Result,t)}},{key:"TransactionFlow",value:function(e,t){window.SignCS.Connect().TransactionFlow(e,t)}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:_.a.play,onClick:this.placeBet.bind(this)},s.a.createElement("div",{className:_.a.but},"Spin")))}}]),t}(s.a.Component),S=a(28),w=a(51),T=a.n(w),P=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={spinning:!1,margin:0,itemHeight:0},a.spin=a.spin.bind(Object(S.a)(a)),a.stop=a.stop.bind(Object(S.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"startAnimation",value:function(){this.setState({spinning:!0,margin:0})}},{key:"spin",value:function(){setTimeout(this.startAnimation.bind(this),this.props.timer)}},{key:"stop",value:function(){setTimeout(this.goToReel.bind(this),this.props.timer)}},{key:"goToReel",value:function(){var e=this.props.item*this.state.itemheight*-1;this.setState({margin:e+"px",spinning:!1})}},{key:"componentDidMount",value:function(){var e=document.getElementById("firstItem").clientHeight;this.setState({itemheight:e})}},{key:"render",value:function(){var e="";return this.state.spinning&&(e=T.a.spinning),s.a.createElement("div",{className:T.a.col},s.a.createElement("ul",{className:e,style:{marginTop:this.state.margin}},s.a.createElement("li",{id:"firstItem"},s.a.createElement("img",{src:this.props.symbols[Math.floor(Math.random()*this.props.symbols.length)]})),this.props.symbols.map(function(e,t){return s.a.createElement("li",{className:t+"symbol"},s.a.createElement("img",{src:e}))}),s.a.createElement("li",{id:"firstItem"},s.a.createElement("img",{src:this.props.symbols[Math.floor(Math.random()*this.props.symbols.length)]})),s.a.createElement("li",{id:"firstItem"},s.a.createElement("img",{src:this.props.symbols[Math.floor(Math.random()*this.props.symbols.length)]}))))}}]),t}(s.a.Component),O=a(52),N=a(54),k=a(32),C=a.n(k),B=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={displayed:!1,topPrizes:[],secondPrizes:[],progressive:1e4},a.getPrizes(),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"openPayTable",value:function(){this.setState({displayed:!0})}},{key:"closePayTable",value:function(){this.setState({displayed:!1})}},{key:"getPrizes",value:function(){this.sendTransaction({Target:E.slotAdress,Fee:"0.01",SmartContract:{Method:"getTopPrizes",NewState:!0,Params:[{K:"INT",V:this.props.symbols.length},{K:"INT",V:this.props.reels}]}},this.updateTopPrizes.bind(this)),this.sendTransaction({Target:E.slotAdress,Fee:"0.01",SmartContract:{Method:"getSecondTierPrizes",NewState:!0,Params:[{K:"INT",V:this.props.symbols.length},{K:"INT",V:this.props.reels}]}},this.updateSecondPrizes.bind(this)),this.sendTransaction({Target:E.slotAdress,Fee:"0.01",SmartContract:{Method:"getProgressiveJackpot",NewState:!0}},this.updateProgressive.bind(this))}},{key:"updateProgressive",value:function(e){this.setState({progressive:e.smart_contract_result.v_double})}},{key:"updateTopPrizes",value:function(e){var t=[];e.smart_contract_result.v_list.map(function(e){t.push(e.v_double_box)}),this.setState({topPrizes:t.reverse()})}},{key:"updateSecondPrizes",value:function(e){console.log(e);var t=[];e.smart_contract_result.v_list.map(function(e){t.push(e.v_double_box)}),this.setState({secondPrizes:t.reverse()})}},{key:"sendTransaction",value:function(e,t){e.Source=window.Base58.decode(window.Cs_PublicKey),e.PrivateKey=window.Base58.decode(window.Cs_PrivateKey);var a=window.SignCS.CreateTransaction(e);this.TransactionFlow(a.Result,t)}},{key:"TransactionFlow",value:function(e,t){window.SignCS.Connect().TransactionFlow(e,t)}},{key:"render",value:function(){var e=this,t=[C.a.PayTableGrid];return this.state.displayed&&t.push(C.a.PayTableGridOpen),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:C.a.PayTableButton,onClick:this.openPayTable.bind(this)},s.a.createElement("span",null,"Pay Table")),s.a.createElement("div",{className:t.join(" "),onClick:this.closePayTable.bind(this)},s.a.createElement("div",{className:C.a.PROGRESSIVE},"PROGRESSIVE JACKPOT",s.a.createElement("div",null,this.state.progressive," CS ",s.a.createElement("span",null," 10% is paid to game maker"))),s.a.createElement("div",{className:C.a.JACKPOTSYMBOL},s.a.createElement("img",{src:this.props.symbols[0]}),s.a.createElement("dl",null,this.state.topPrizes.map(function(t,a){return s.a.createElement(s.a.Fragment,null,s.a.createElement("dt",null,e.props.reels-a," Pays"),s.a.createElement("dd",null,t," CS"))}))),s.a.createElement("div",{className:C.a.OTHERSYMBOLS},s.a.createElement("div",{className:"images"},this.state.secondPrizes.map(function(t,a){if(a>0)return s.a.createElement("img",{src:e.props.symbols[a]})})),s.a.createElement("dl",null,this.state.secondPrizes.map(function(t,a){return s.a.createElement(s.a.Fragment,null,s.a.createElement("dt",null,e.props.reels-a," Pays"),s.a.createElement("dd",null,t," CS"))})))))}}]),t}(s.a.Component),K=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e)))._reels=[],a.state={reels:Array(parseInt(e.reels)).fill(0),lastWin:0,balance:0,bet:1,winnerClassName:y.a.winner},a.getBalance(),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"getBalance",value:function(){var e=window.Base58.decode(window.Cs_PublicKey);window.SignCS.Connect().WalletBalanceGet(e,function(e){if(e.status.code>0&&"Not found"!=e.status.message)this.setState({balance:"error"});else{var t=parseFloat(e.balance.integral+e.balance.fraction*Math.pow(10,-18)).toFixed(2);this.setState({balance:t})}}.bind(this))}},{key:"spinReels",value:function(){Array.apply(0,Array(parseInt(this.props.reels))).map(function(e,t){this["spinner".concat(t)].spin(),console.log("what")}.bind(this)),this.setState({balance:this.state.balance-this.state.bet})}},{key:"result",value:function(e){var t=JSON.parse(e.smart_contract_result.v_string);console.log(t),this.setState({reels:t.result.Reels,lastWin:t.result.win,balance:0}),Array.apply(0,Array(parseInt(this.props.reels))).map(function(e,t){this["spinner".concat(t)].stop()}.bind(this)),this.getBalance(),t.result.resultIsSuccess&&setTimeout(this.winSplash.bind(this),1e3)}},{key:"winSplash",value:function(){this.setState({winnerClassName:y.a.winner+" "+y.a.winActive}),setTimeout(this.stopSplash.bind(this),6e3)}},{key:"stopSplash",value:function(){this.setState({winnerClassName:y.a.winner})}},{key:"betAdd",value:function(){this.setState({bet:this.state.bet+1})}},{key:"betRemove",value:function(){this.setState({bet:this.state.bet-1})}},{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:y.a.gridcontainer},s.a.createElement("div",{className:y.a.SLOTS},s.a.createElement("div",{className:y.a.arrowRight}),s.a.createElement("div",{className:y.a.arrowLeft}),s.a.createElement("div",{className:this.state.winnerClassName}),s.a.createElement("div",{className:y.a.spinnercontainer},this.state.reels.map(function(t,a){return s.a.createElement(P,{item:t,ref:function(t){e["spinner".concat(a)]=t},timer:"100",symbols:e.props.symbols})}))),s.a.createElement("div",{className:y.a.Balance},s.a.createElement("div",{className:y.a.topWrap},s.a.createElement("h2",null,"Balance"),s.a.createElement("h3",null,this.state.balance))),s.a.createElement("div",{className:y.a.Win},s.a.createElement("div",{className:y.a.topWrap},s.a.createElement("h2",null,"Last Win"),s.a.createElement("h3",null,this.state.lastWin," CS"))),s.a.createElement("div",{className:y.a.LOGO},s.a.createElement("h1",null,"CS",s.a.createElement("em",null,"SLOTS"))),s.a.createElement("div",{className:y.a.PayTable},s.a.createElement(B,{reels:this.props.reels,symbols:this.props.symbols})),s.a.createElement("div",{className:y.a.SPIN},s.a.createElement(f,{reels:this.props.reels,symbols:this.props.symbols.length,gameMaker:this.props.gameMaker,bet:this.state.bet,onPlaceBet:this.spinReels.bind(this),callback:this.result.bind(this)})),s.a.createElement("div",{className:y.a.Bet},s.a.createElement("div",{className:y.a.topWrap},s.a.createElement("h2",null,"Bet"),s.a.createElement("h3",null,this.state.bet," CS"))),s.a.createElement("div",{className:y.a.Add},s.a.createElement(O.a,{onClick:this.betAdd.bind(this),icon:N.b})),s.a.createElement("div",{className:y.a.Remove},s.a.createElement(O.a,{onClick:this.betRemove.bind(this),icon:N.a}))))}}]),t}(s.a.Component),j=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return window.Url||window.Cs_PrivateKey||window.Cs_PublicKey?s.a.createElement(s.a.Fragment,null,s.a.createElement(K,{reels:E.reels,symbols:E.symbols,gameMaker:E.gameMaker})):s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{to:{pathname:"/login",search:""}}))}}]),t}(s.a.Component),G=a(147),R=a(145),A=a(142),W=a(64),L=a.n(W),F=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={privateKey:"",publicKey:"",nodeUrl:"https://proxy.cap.davidwalsh.dev"},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"privateKey",value:function(e){this.setState({privateKey:e.target.value})}},{key:"publicKey",value:function(e){this.setState({publicKey:e.target.value})}},{key:"nodeUrl",value:function(e){this.setState({nodeUrl:e.target.value})}},{key:"submitLogin",value:function(){window.Url=this.state.nodeUrl,window.Cs_PrivateKey=this.state.privateKey,window.Cs_PublicKey=this.state.publicKey,window.Url&&window.Cs_PrivateKey&&window.Cs_PublicKey&&this.props.history.push("/")}},{key:"render",value:function(){return s.a.createElement("div",{className:y.a.gridcontainer},s.a.createElement("div",{className:y.a.SLOTS},s.a.createElement("div",{className:L.a.loginWrap},s.a.createElement(A.a,{component:"main",maxWidth:"xs"},s.a.createElement(l.a,null),s.a.createElement("div",{className:y.a.paper},s.a.createElement("div",{className:y.a.form,noValidate:!0},s.a.createElement(R.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"privateKey",label:"Private Key",name:"privateKey",autoFocus:!0,onChange:this.privateKey.bind(this)}),s.a.createElement(R.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"publicKey",label:"Public Key",name:"publicKey",autoFocus:!0,onChange:this.publicKey.bind(this)}),s.a.createElement(R.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"Node",label:"Node",name:"Node",autoFocus:!0,value:"https://proxy.cap.davidwalsh.dev",onChange:this.nodeUrl.bind(this)}),s.a.createElement(G.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:y.a.submit,onClick:this.submitLogin.bind(this)},"Sign In")))))),s.a.createElement("div",{className:y.a.Balance},s.a.createElement("div",{className:y.a.topWrap},s.a.createElement("h2",null,"Balance"),s.a.createElement("h3",null,"0.00"))),s.a.createElement("div",{className:y.a.Win},s.a.createElement("div",{className:y.a.topWrap},s.a.createElement("h2",null,"Last Win"),s.a.createElement("h3",null,"0.00"))),s.a.createElement("div",{className:y.a.LOGO},s.a.createElement("h1",null,"CS",s.a.createElement("em",null,"SLOTS"))),s.a.createElement("div",{className:y.a.PayTable}),s.a.createElement("div",{className:y.a.SPIN}),s.a.createElement("div",{className:y.a.Bet}))}}]),t}(s.a.Component),x=a(48),M=a(68),I=Object(M.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:x.a.A400},background:{default:"#fff"}}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(99);r.a.render(s.a.createElement(o.a,{theme:I},s.a.createElement(l.a,null),s.a.createElement(c.a,{basename:"/"},s.a.createElement("div",null,s.a.createElement(m.b,{path:"/",component:j}),s.a.createElement(m.b,{path:"/login",component:F})))),document.querySelector("#root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},32:function(e,t,a){e.exports={PayTableButton:"PayTable_PayTableButton__3T5pm",PayTableGrid:"PayTable_PayTableGrid__huca5",PayTableGridOpen:"PayTable_PayTableGridOpen__1h5ZS",PROGRESSIVE:"PayTable_PROGRESSIVE__2eYLL",JACKPOTSYMBOL:"PayTable_JACKPOTSYMBOL__2wqrO",OTHERSYMBOLS:"PayTable_OTHERSYMBOLS__14rRH"}},50:function(e,t,a){e.exports={play:"SendTransaction_play__2CC_H",but:"SendTransaction_but__1fDd-"}},51:function(e,t,a){e.exports={col:"Spinner_col__1cgZV",spinning:"Spinner_spinning__2XuZ7","x-spin":"Spinner_x-spin__178IK"}},64:function(e,t,a){e.exports={loginWrap:"Login_loginWrap__30vAy"}},7:function(e,t,a){e.exports={gridcontainer:"Game_gridcontainer__3HLxV",SLOTS:"Game_SLOTS__FWyO9",PayTable:"Game_PayTable__1ilGS",Balance:"Game_Balance__r2zoT",Win:"Game_Win__2OTZX",topWrap:"Game_topWrap__1m6NY",LOGO:"Game_LOGO__3-qnT",SPIN:"Game_SPIN__6BZpN",Bet:"Game_Bet__1jGlO",Add:"Game_Add__14ham",Remove:"Game_Remove__11Kmq",spinnercontainer:"Game_spinnercontainer__1Yjl5",arrowRight:"Game_arrowRight__1qb10",arrowLeft:"Game_arrowLeft__2iGqC",winner:"Game_winner__MgEGD",winActive:"Game_winActive__2n3vt",rotateBackground:"Game_rotateBackground__2j2ko",scaleForeground:"Game_scaleForeground__3jUzx"}},73:function(e,t,a){e.exports=a(100)},78:function(e,t,a){e.exports=a.p+"static/media/credits.fb327aab.png"},79:function(e,t,a){e.exports=a.p+"static/media/Litecoin.c151518b.svg"},80:function(e,t,a){e.exports=a.p+"static/media/ether.802c6eac.svg"},81:function(e,t,a){e.exports=a.p+"static/media/Bitcoin.d7876d48.svg"},82:function(e,t,a){e.exports=a.p+"static/media/xrp.026fdd6d.svg"},99:function(e,t,a){e.exports={title:"src_title__2DlC4",menuButton:"src_menuButton__-tJv4"}}},[[73,1,2]]]);
//# sourceMappingURL=main.5a847789.chunk.js.map