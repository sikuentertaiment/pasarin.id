
const view = {
	body:find('body'),
	init(){
		this.main.addChild(this.header);
		this.main.addChild(this.content);
		this.main.addChild(this.footer);
		this.body.addChild(this.main);
	},
	main:makeElement('main',{
		style:`
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0px;
			left: 0px;
			display: flex;
			flex-direction: column;
			align-items: center;
		`
	}),
	header:makeElement('header',{
		style:`
			width:100%;
			height:200px;
			display:flex;
			justify-content:center;
			border-bottom:5px solid gainsboro;
			background:deepskyblue;
			color:white;
			border-radius:0 0 20px 20px;
		`,
		innerHTML:`
			<div style="
				height:100%;
				display:flex;
				justify-content:space-around;
				align-items:center;
				flex-direction:column;
				width:100%;
			">
				<div style="
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content:center;
					/*background:#15244e;color:white;*/
					border-bottom:1px solid white;
					gap:2px;
				">
					<div style="
						width:32;
						height:32;
						background:white;
						border-radius:0 50% 50%;
						color:deepskyblue;
						display:flex;
						align-items:center;
						justify-content:center;
						font-weight:bold;
						font-size:11;
					">$p</div>
					<div style="
						cursor:pointer;
						font-size:24px;
						font-family:montserratbold;
					">pasarin<span style=font-size:12px;font-family:montserratregular>.id</span></div>
				</div>
				<div style="
					display: flex;
					justify-content: space-between;
					height: 100%;
					display: flex;
					align-items: center;
					overflow:auto;
					overflow-y:hidden;
				" id=ourmenu class=innerBox>
					<div id=newPost style=padding-left:30px;>
						<img src=./more/media/whiteadd.png class=navimg>
						Post
					</div>
					<div id=displayList>
						<img src=./more/media/whitehome.png class=navimg>
						Beranda
					</div>
					<div id=openMyproject>
						<img src=./more/media/whitetask.png class=navimg>
						Projek
					</div>
					<div id=openInbox>
						<img src=./more/media/whitemsg.png class=navimg>
						Pesan
					</div>
					<div id=openGlobalChat>
						<img src=./more/media/whiteglobe.png class=navimg>
						Forum
					</div>
					<div id=openNotif>
						<img src=./more/media/whitebell.png class=navimg>
						Notif
					</div>
					<div id=openProfile>
						<img src=./more/media/whiteprofile.png class=navimg>
						Profil
					</div>
					<div id=openInfo style=padding-right:30px;>
						<img src=./more/media/whiteinfo.png class=navimg>
						Info
					</div>
				</div>
			</div>
			
		`,
		navEvent(){
			this.findall('#ourmenu div').forEach(button=>{
				button.onclick = ()=>{
					view.content.saveRemove('#chooseType');
					view.content[button.id]([],'loadartikel',true);
				}
			})
		},
		onadded(){
			this.navEvent();
		}
	}),
	content:makeElement('content',{
		className:'innerBox fitborder',
		style:`
			background:white;
			height:100%;
			display:flex;
			align-items: center;
			overflow:hidden;
			flex-direction:column;
			position:relative;
		`,
		innerHTML:`
			<div style="
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px;
				position:sticky;
				top:0;
				overflow:auto;
				height:48px;
				padding-bottom:0;
			">
				<div id=stateLabel
				style="
					margin-left:3%;
					width:100%;
					font-weight:bold;
					color:dimgray;
				"
				>
					Beranda
				</div>
				<div style="
					cursor:pointer;
					display:none;
					margin-right:28px;
				"
				id=searchWare
				>
					<img src=./more/media/search.png class=navimg>
				</div>
				<div style="
					width: 100%;
					display: none;
					justify-content: flex-end;
					margin-right: 3%;
					gap:8px;
				"
				id=reactTo
				>
					<div style=display:flex;>
						<div class="buttonstyled" style="
							border-radius:20px;display:flex;
							align-items:center;gap:5px;background:none;
							font-size:12px;
						" id=view>10 Kali Dibaca</div>
					</div>
					
				</div>
				<div style="
					width: 100%;
					display: none;
					justify-content: flex-end;
					margin-right: 3%;
					gap:8px;
				"
				id=logout
				>
					<div style=display:flex;>
						<div class="buttonstyled" style="
							display: flex;
							align-items: center;
							gap: 5px;
							background: none;
							font-size: 12px;
							font-weight: bold;
							cursor: pointer;
							color:dimgray;
						">
							<img src=./more/media/blueexit.png
							style="
								width:18px;
								height:18px;
							"
							>Keluar
						</div>
					</div>
					
				</div>
			</div>
			<div
			style="
				width:100%;
				height:100%;
				overflow:auto;
				overflow-x:hidden;
				position:relative;
			"
			id=linesparent
			></div>
		`,
		logoutEvent(){
			this.logout.onclick = ()=>{
				app.ls.remove();
				location.reload();
			}
		},
		clearLinesParent(){
			this.linesParent.clear();
		},
		onadded(){
			this.linesParent = this.find('#linesparent');
			this.stateLabel = this.find('#stateLabel');
			this.logout = this.find('#logout');
			this.reactTo = this.find('#reactTo');
			this.searchWare = this.find('#searchWare');
			
			//this.openArticle(app.dataFiktif);
			this.displayList([],'loadloker',true);
			
			//logoutbutton.
			this.logoutEvent();
		},
		displayList(data,nav,boot){
			this.clearLinesParent();
			this.find('#linesparent').addChild(view.searchDiv(nav,boot));
			data.forEach((item,i)=>{
				if(nav==='loadworkers'){
					this.find('#linesparent').addChild(view.lineWorker(item,i+1,(i===data.length-1)?false:true));
				}else this.find('#linesparent').addChild(view.line(item,i+1,(i===data.length-1)?false:true));
			})
			//zerodata handler.
			if(data.length===0){
				this.find('#linesparent').addChild(view.nodata());
			}
			this.stateLabel.innerHTML = 'Beranda';
			this.reactTo.hide();
			this.searchWare.show('flex');
			this.logout.hide();
		},
		newArticle(){
			this.clearLinesParent();
			this.linesParent.addChild(view.articlenew());
			this.stateLabel.innerHTML = 'Artikel Baru';
			this.reactTo.hide();
			this.searchWare.hide();
		},
		newCerpen(){
			this.clearLinesParent();
			this.linesParent.addChild(view.cerpennew());
			this.stateLabel.innerHTML = 'Berita Baru';
			this.reactTo.hide();
			this.searchWare.hide();
		},
		openArticles(){
			this.clearLinesParent();
			this.linesParent.addChild(view.openArticles());
			this.stateLabel.innerHTML = 'Baca Artikel';
			this.reactTo.show('flex');
			this.searchWare.hide();
			this.logout.hide();
		},
		openShortStories(){
			this.clearLinesParent();
			this.linesParent.addChild(view.openShortStories());
			this.stateLabel.innerHTML = 'Baca Berita';
			this.reactTo.show('flex');
			this.searchWare.hide();
			this.logout.hide();
		},
		openJobs(){
			this.clearLinesParent();
			this.linesParent.addChild(view.openJobs());
			this.stateLabel.innerHTML = 'Info Loker';
			this.reactTo.show('flex');
			this.searchWare.hide();
			this.logout.hide();
		},
		openMyproject(data=[],nav='OnGoing',boot){
			if(!app.getInfoLogin()){
				view.content.getIn(()=>{view.content.openMyproject([],'OnGoing',true)});
				return forceRecheck(view.main,'Silahkan Login Lebih Dahulu!');
			}
			this.clearLinesParent();
			if(nav==='loadartikel')nav='OnGoing';
			this.find('#linesparent').addChild(view.myProjectDiv(nav,boot));
			data.forEach((item,i)=>{
				this.find('#linesparent').addChild(view.projectList(item,i+1,(i===data.length-1)?false:true,nav));
			})
			//zerodata handler.
			if(data.length===0){
				this.find('#linesparent').addChild(view.nodata());
			}
			this.stateLabel.innerHTML = 'Projek Kamu';
			this.reactTo.hide();
			this.searchWare.hide();
			this.logout.hide();
		},
		openGlobalChat(){
			if(!app.getInfoLogin()){
				view.content.getIn(()=>{view.content.openGlobalChat()});
				return forceRecheck(view.main,'Silahkan Login Lebih Dahulu!');
			}
			view.main.addChild(view.globalChat(()=>{
				view.content.displayList([],'loadartikel','true');
			}));
		},
		openServices(){
			this.clearLinesParent();
			this.linesParent.addChild(view.openServices());
			this.stateLabel.innerHTML = 'Info Jasa';
			this.reactTo.show('flex');
			this.searchWare.hide();
			this.logout.hide();
		},
		isInProfile(){
			let result = false;
			if(app.getInfoLogin()){
				result = true;
			}
			return result;
		},
		getIn(after,cancel,update){
			view.main.addChild(view.loginBox(after,cancel,update));
		},
		async openProfile(data=[],nav='home',boot,userId){
			if(typeof userId==='object')userId = null;
			let userData;
			if(!this.isInProfile() && !userId){
				return this.getIn(()=>{view.content.openProfile([],'home',false,null)});
			}
			this.clearLinesParent();
			userData = (await app.doglas.do(['database','users',`${userId||app.userData.uid}/public`,'get'])).val();
			console.log(userData);
			if(nav==='loadartikel')nav='home';
			this.linesParent.addChild(view.profileDiv(nav,boot,userId));
			if(nav==='home')this.linesParent.addChild(view.profilePage(userData));
			else if(nav==='statistic')this.linesParent.addChild(view.statistic(userId));
			else if(nav==='followers'||nav==='following'){
				data.forEach((item,i)=>{
					this.find('#linesparent').addChild(view.lineFollow(item,i+1,(i===data.length-1)?false:true));
				})
				if(data.length===0){
					this.find('#linesparent').addChild(view.nodata());
				}
			}
			else if(nav==='saldo'){
				this.linesParent.addChild(view.saldoPage(data));
			}
			else {
				data.forEach((item,i)=>{
					this.find('#linesparent').addChild(view.line(item,i+1,(i===data.length-1)?false:true));
				})
				if(data.length===0){
					this.find('#linesparent').addChild(view.nodata());
				}
			}
			this.stateLabel.innerHTML = 'Profil Pengguna';
			this.reactTo.hide();
			this.searchWare.hide();
			if(userId===app.userData.uid || !userId)this.logout.show('flex');
		},
		newPost(){
			if(!app.getInfoLogin()){
				view.content.getIn(()=>{view.content.newPost()});
				return forceRecheck(view.main,'Silahkan Login Lebih Dahulu!');
			}
			this.addChild(view.newPost());
		},
		newJasa(){
			this.clearLinesParent();
			this.linesParent.addChild(view.jasanew());
			this.stateLabel.innerHTML = 'Post Jasa';
			this.reactTo.hide();
			this.searchWare.hide();
			this.logout.hide();
		},
		newLoker(){
			this.clearLinesParent();
			this.linesParent.addChild(view.lokernew());
			this.stateLabel.innerHTML = 'Post Loker';
			this.reactTo.hide();
			this.searchWare.hide();
			this.logout.hide();
		},
		openNotif(){
			if(!app.getInfoLogin()){
				view.content.getIn(()=>{view.content.openNotif()});
				return forceRecheck(view.main,'Silahkan Login Lebih Dahulu!');
			}
			this.clearLinesParent();
			this.linesParent.addChild(view.notif());
			this.stateLabel.innerHTML = 'Notifmu';
			this.reactTo.hide();
			this.searchWare.hide();
			this.logout.hide();
		},
		openInbox(data=[],nav='bid',boot){
			if(!app.getInfoLogin()){
				view.content.getIn(()=>{view.content.openInbox([],'bid',true)});
				return forceRecheck(view.main,'Silahkan Login Lebih Dahulu!');
			}
			this.clearLinesParent();
			if(nav==='loadartikel')nav='bid';
			this.find('#linesparent').addChild(view.myInboxDiv(nav,boot));
			//update the user bid data.
			//app.userData.bid = (await app.doglas.do(['database','users',`${app.userData.uid}/bid`,'get'])).val();
			app.userData[nav] = data;
			this.linesParent.addChild(view.inbox(nav));
			this.stateLabel.innerHTML = 'Inbox';
			this.reactTo.hide();
			this.searchWare.hide();
			this.logout.hide();
		},
		openInfo(){
			view.main.addChild(view.webInfo());
		}
	}),
	footer:makeElement('footer',{
		
	}),
	myProjectDiv(nav='OnGoing',boot=false){
		return makeElement('div',{
			nav,
			style:`
				width: 100%;
				display: flex;
				overflow: auto;
				background: white;
				align-items: center;
				position:sticky;
				top:0;
				border-radius:10px;
				color:deepskyblue;
			`,
			innerHTML:`
				<div style="
					  width: 100%;
						display: flex;
						justify-content: flex-start;
						/* margin: 2%; */
						background: white;
				" id=berandadivmenu>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=OnGoing
					>
						<img src=./more/media/blueongoing.png class=navimg>
						Berlajalan
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=Finished
					>
						<img src=./more/media/bluefinish.png class=navimg>
						Selesai
					</div>
				</div>
			`,
			buttonSetup(){
				this.findall('#berandadivmenu div').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			onadded(){
				//set the nav.
				//console.log(this.nav);
				this.find('#'+this.nav).style.fontFamily = 'montserratbold';
				this.find('#'+this.nav).style.color = 'dimgray';
				this.find('#'+this.nav).scrollIntoView();
				this.buttonSetup();
				if(boot){
					//console.log('boot is true');
					this[nav]();
				}
			},
			OnGoing(){
				view.addLoading()
				app.doglas.do(['database','users',`${app.userData.uid}/onGoingProjects`,'get','']).then(data=>{
					view.unloading();
					let datacb = data.val()||[];
					view.content.openMyproject(datacb,'OnGoing');
				})
			},
			Finished(){
				view.addLoading();
				app.doglas.do(['database','users',`${app.userData.uid}/onFinishedProjects`,'get','']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					view.content.openMyproject(datacb,'Finished');
				})
			}
		})
	},
	myInboxDiv(nav='bid',boot=false){
		return makeElement('div',{
			nav,
			style:`
				width: 100%;
				display: flex;
				overflow: auto;
				background: white;
				align-items: center;
				position:sticky;
				top:0;
				border-radius:10px;
				color:dimgray;
			`,
			innerHTML:`
				<div style="
					  width: 100%;
						display: flex;
						justify-content: flex-start;
						/* margin: 2%; */
						background: white;
				" id=berandadivmenu>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=bid
					>
						<img src=./more/media/bluetask.png class=navimg>
						Bid
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=inbox
					>
						<img src=./more/media/bluemsg.png class=navimg>
						Inbox
					</div>
				</div>
			`,
			buttonSetup(){
				this.findall('#berandadivmenu div').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			onadded(){
				//set the nav.
				//console.log(this.nav);
				this.find('#'+this.nav).style.fontFamily = 'montserratbold';
				this.find('#'+this.nav).scrollIntoView();
				this.buttonSetup();
				if(boot){
					this[this.nav]();
				}
			},
			bid(){
				view.addLoading();
				app.doglas.do(['database','users',`${app.userData.uid}/bid`,'get']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					view.content.openInbox(datacb,'bid');
					setTimeout(()=>{this.listenerBid(datacb)},2000);
				})
			},
			inbox(){
				view.addLoading();
				app.doglas.do(['database','users',`${app.userData.uid}/inbox`,'get']).then(data=>{
					view.unloading();
					let datacb = data.val()||[];
					view.content.openInbox(datacb,'inbox');
					setTimeout(()=>{this.listenerInbox(datacb)},2000);
				})
			},
			listenerBid(databefore){
				//working auto reload for bidding.
				app.listener.add(`users/${app.userData.uid}/bid`,'biddingList',(snap)=>{
					const datasnap = objToArray(snap.val()||{});
					if(datasnap.length !== databefore.length){
						this.bid();	
					}
				})
			},
			listenerInbox(databefore){
				//working auto reload for inboxList.
				app.listener.add(`users/${app.userData.uid}/inbox`,'inboxList',(snap)=>{
					const datasnap = objToArray(snap.val()||{});
					if(datasnap.length !== databefore.length){
						this.bid();	
					}
				})
			}
		})
	},
	searchDiv(nav='loadartikel',boot=false){
		return makeElement('div',{
			nav,
			style:`
				width: 100%;
				display: flex;
				overflow: auto;
				margin: 2% 0;
				background: white;
				align-items: center;
				position:sticky;
				top:0;
				color:deepskyblue;
				border-radius:10px;
			`,
			innerHTML:`
				<div style="
					  width: 100%;
						display: flex;
						justify-content: flex-start;
						background: white;
				" id=berandadivmenu>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						width: 100%;
						justify-content: center;
						padding: 10px 20px;
					"
					id=loadloker
					>
						<img src=./more/media/bluetask.png class=navimg>
						Projek
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						width: 100%;
						justify-content: center;
						padding: 10px 20px;
					"
					id=loadjasa
					>
						<img src=./more/media/blueservices.png class=navimg>
						Jasa
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px 20px;
						justify-content: center;
					"
					id=loadworkers
					>
						<img src=./more/media/blueworkers.png class=navimg>
						Pekerja
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						width: 100%;
						justify-content: center;
						padding: 10px 20px;
					"
					id=loadproduct
					>
						<img src=./more/media/bluethings.png class=navimg>
						Produk
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px 20px;
						justify-content: center;
					"
					id=loadcerpen
					>
						<img src=./more/media/bluenews.png class=navimg>
						Berita
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px 20px;
						justify-content: center;
					"
					id=loadartikel
					>
						<img src=./more/media/bluewiki.png class=navimg>
						Artikel
					</div>
				</div>
			`,
			buttonSetup(){
				this.findall('#berandadivmenu div').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			onadded(){
				//set the nav.
				this.find('#'+this.nav).style.fontFamily = 'montserratbold';
				this.find('#'+this.nav).style.color = 'dimgray';
				this.find('#'+this.nav).scrollIntoView();
				this.buttonSetup();
				if(boot)this.loadloker();
			},
			loadjasa(){
				view.addLoading();
				app.doglas.do(['database','post','Services','get','']).then(data=>{
					view.unloading();
					let datacb = data.val()||{};
					view.content.displayList(objToArray(datacb),'loadjasa');
				})
			},
			loadcerpen(){
				view.addLoading();
				app.doglas.do(['database','post','ShortStories','get','']).then(data=>{
					view.unloading();
					let datacb = data.val()||{};
					view.content.displayList(objToArray(datacb),'loadcerpen');
				})
			},
			loadartikel(){
				view.addLoading();
				app.doglas.do(['database','post','Articles','get','']).then(data=>{
					view.unloading();
					let datacb = data.val()||{};
					view.content.displayList(objToArray(datacb),'loadartikel');
				})
			},
			loadloker(){
				view.addLoading();
				app.doglas.do(['database','post','Jobs','get','']).then(data=>{
					view.unloading();
					let datacb = data.val()||{};
					view.content.displayList(objToArray(datacb),'loadloker');
				})
			},
			loadproduct(){
				view.addLoading();
				app.doglas.do(['database','post','Products','get','']).then(data=>{
					view.unloading();
					let datacb = data.val()||{};
					view.content.displayList(objToArray(datacb),'loadproduct');
				})
			},
			loadworkers(){
				view.addLoading();
				app.doglas.do(['database','workers','','get','']).then(data=>{
					view.unloading();
					let datacb = data.val()||{};
					view.content.displayList(objToArray(datacb),'loadworkers');
				})
			}
		})
	},
	lineFollow(data,i,bt=true){
		return makeElement('div',{
			className:'lines',
			innerHTML:`
				<div class=item>
					<div class=thumbnail>
						<div>#${i}</div>
					</div>
					<div class=moreinfo>
						<div class=addressinfo style=margin-bottom:8px;>
							<div>
								<img class=profileimg src=${data.profilepicture||app.noProfilePng}>
							</div>
						</div>
						<div class="username title">@${data.username}</div>
					</div>
				</div>
			`,
			onadded(){
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',false,data.id);
				}
			}
		})
	},
	line(data,i,bt=true){
		const Dot = (data.title.length>100)?'...':'';
		return makeElement('div',{
			className:'lines',
			innerHTML:`
				<div class=item>
					<div class=thumbnail>
						<div>#${i}</div>
					</div>
					<div class=moreinfo>
						<div id=fee>
							${data.type==='Jobs'?'Maks':'Min'} Bid Rp ${getPrice(data.maxFee||data.minFee)}
						</div>
						<div class=title>
							${data.title.slice(0,100) + Dot}
						</div>
						<div class=addressinfo>
							<div>
								<img class=profileimg src=${data.profilepicture}>
							</div>
							<div class=username>${data.username},</div>
							<div class=date>${SmartTime(data.time)}</div>
						</div>
						<div class=vshareinfo>
							<div>
								<span style=font-size:11px>${data.view||0} kali dibaca</span>
							</div>
						</div>
					</div>
					<div style="
						height:68px;
						width:30%;
						border-radius:10px;
						margin-right:5px;
						border-right:5px solid whitesmoke;
						border-bottom:5px solid whitesmoke;
					">
						<img src=${data.preview||'./more/media/nothumbnailnew.png'} style="
							height:100%;
							width:100%;
							object-fit:cover;
							border-radius:10px;
						">
					</div>
				</div>
			`,
			onadded(){
				if(data.maxFee||data.minFee){
					this.find('.vshareinfo').remove();
				}else this.find('#fee').remove();
				this.find('.title').onclick = ()=>{
					app.dataContent = data;
					view.content[`open${data.type}`]();
				}
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',false,data.owner);
				}
			},
		})
	},
	lineWorker(data,i,bt=true){
		return makeElement('div',{
			className:'lines',
			innerHTML:`
				<div class=item style=${!bt?'border-bottom:0;':''}>
					<div class=thumbnail>
						<div>#${i}</div>
					</div>
					<div class=moreinfo>
						<div class=addressinfo style=margin-bottom:8px;>
							<div>
								<img class=profileimg src=${data.profilepicture||app.noProfilePng}>
							</div>
						</div>
						<div class="username title">@${data.username}</div>
					</div>
				</div>
			`,
			onadded(){
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',false,data.uid);
				}
			}
		})
	},
	projectList(data,i,bt=true,nav='OnGoing'){
		const Dot = (data.title.length>100)?'...':'';
		return makeElement('div',{
			className:'lines',
			innerHTML:`
				<div class=item style=${!bt?'border-bottom:0;':''}>
					<div class=thumbnail>
						<div>#${i}</div>
					</div>
					<div class=moreinfo>
						<div id=fee>
							Fee Rp ${getPrice(data.fee)}
						</div>
						<div class=title>
							${data.title.slice(0,100) + Dot}
						</div>
						<div class=addressinfo>
							<div>
								<img class=profileimg src=${data.owner===app.userData.uid?data.bidderProfileIdPic:data.profilepicture}>
							</div>
							<div class=username>${data.owner===app.userData.uid?data.bidder:data.username},</div>
							<div class=date>${SmartTime(data.time)}</div>
						</div>
					</div>
					<div style="
						height:68px;
						width:30%;
						border-radius:10px;
						margin-right:5px;
						border-right: 5px solid whitesmoke;
						border-bottom: 5px solid whitesmoke;
					">
						<img src=${data.preview||'./more/media/nothumbnailnew.png'} style="
							height:100%;
							width:100%;
							object-fit:cover;
							border-radius:10px;
						">
					</div>
				</div>
			`,
			onadded(){
				this.find('.title').onclick = ()=>{
					this.chatData = data;
					console.log(nav);
					if(nav==='OnGoing')this.openChat();
					else this.loadInfo();
				}
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',false,data.owner===app.userData.uid?data.bidderProfileId:data.owner);
				}
			},
			loadInfo(){
				view.main.addChild(view.finishedProjectInfo(data));
			},
			openChat(){
				view.main.addChild(view.OnGoingChat(this.chatData,()=>{
					view.content.openMyproject([],'OnGoing',true);
				}));
			}
		})
	},
	articlenew(){
		return makeElement('div',{
			style:`
				margin:3%;
				display:flex;
				flex-direction:column;
				gap:10px;
			`,
			innerHTML:`
				<div style="
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Preview
					</div>
					<div style="
						height:200px;
						width:100%;
						background:whitesmoke;
						border:1px solid #e0e0e0;
						display:flex;
						align-items:center;
						justify-content:center;
						position:relative;
					">
						<div style="
							width:100%;
							height:100%;
						">
							<img id=preview style="
								width:100%;
								height:100%;
								object-fit:cover;
								display:none;
							">
						</div>
						<div style="
							background: white;
							padding: 5px;
							border-radius: 50%;
							border: 1px solid #e0e0e0;
							cursor: pointer;
							position:absolute;
							z-index:1;
						" id=choosePreview class=thebutton>
							<img src=./more/media/plus.png style="
								width:32px;
								height:32px;
							">
						</div>
					</div>
				</div>
				<div style="
					width: 100%;
					justify-content: space-around;
					display: flex;
					gap:10px;
					position:sticky;
					top:0;
					background:white;
				"
				id=newartilebuttons
				>
					<div style=width:100%; class=thebutton id=publish>
						<div class="button buttonstyled" style="
							justify-content:center;display:flex;
							align-items:center;gap:10px;
						">
							<img src=./more/media/whiteupload.png
								style="
									width:16px;
									height:16px;
								"
							>Terbitkan</div>
					</div>
				</div>
				<div style="
					height:20%;
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Judul Artikel
					</div>
					<div style="
						height:100%;
					">
						<textarea placeholder="Tulis Judul Artikel Disini..." style="height:100%;resize:none;border-radius:0;" id=title></textarea>
					</div>
				</div>
				<div style="
					height:500px;
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Isi<span class=star>* <span class=sosmall>min 2000 characters</span></span>
					</div>
					<div style="
						height:100%;
					">
						<textarea placeholder="Tulis Isi Artikel..." style="height:100%;resize:none;border-radius:0 0 20px 20px;" id=description></textarea>
					</div>
				</div>
			`,
			choosePreview(){
				const showPreview = (file)=>{
					this.filepreview = file;
					const fs = new FileReader();
					fs.onload = ()=>{
						this.find('#preview').src = fs.result;
						this.find('#preview').show('block');
					}
					fs.readAsDataURL(file);
				}
				if(!this.preview)this.preview = makeElement('input',{
					type:'file',
					accept:'image/*',
					onchange(){
						const file = this.files[0];
						showPreview(file);
					}
				})
				this.preview.click();
			},
			collectData(){
				const Data = {};
				if(this.filepreview)Data.preview = this.filepreview;
				this.findall('textarea').forEach(input=>{
					Data[input.id] = input.value;
				})
				Object.assign(Data,{
					date:getFullDate(),
					time:getTime(),
					owner:app.userData.uid,
					type:"Articles",
					postId:getUniqueID(),
					username:app.userData.username,
					profilepicture:app.userData.profilepicture||app.noProfilePng,
					more:{
						like:[],
						share:[],
						comments:[],
						view:[]
					}
				})
				return Data;
			},
			setupButton(){
				this.findall('.thebutton').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			addFiles(){

			},
			saveToDraft(){

			},
			publish(){
				const data = this.collectData();
				if(data.description.length<2000)return forceRecheck(view.main,'Maaf Konten Terlalu Sedikit, Dibutuhkan Minimal 2000 Huruf.');
				view.main.addChild(view.loadingPost(data));
			},
			onadded(){
				//console.log('called');
				this.setupButton();
			}
		})
	},
	jasanew(){
		return makeElement('div',{
			style:`
				margin:3%;
				display:flex;
				flex-direction:column;
				gap:10px;
			`,
			innerHTML:`
				<div style="
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Preview
					</div>
					<div style="
						height:200px;
						width:100%;
						background:whitesmoke;
						border:1px solid #e0e0e0;
						display:flex;
						align-items:center;
						justify-content:center;
						position:relative;
					">
						<div style="
							width:100%;
							height:100%;
						">
							<img id=preview style="
								width:100%;
								height:100%;
								object-fit:cover;
								display:none;
							">
						</div>
						<div style="
							background: white;
							padding: 5px;
							border-radius: 50%;
							border: 1px solid #e0e0e0;
							cursor: pointer;
							position:absolute;
							z-index:1;
						" id=choosePreview class=thebutton>
							<img src=./more/media/plus.png style="
								width:32px;
								height:32px;
							">
						</div>
					</div>
				</div>
				<div style="
					width: 100%;
					justify-content: space-around;
					display: flex;
					gap:10px;
					position:sticky;
					top:0;
					background:white;
				"
				id=newartilebuttons
				>
					<div style=width:100%; class=thebutton id=publish>
						<div class="button buttonstyled" style="
							justify-content:center;display:flex;
							align-items:center;gap:10px;
						">
							<img src=./more/media/whiteupload.png
								style="
									width:16px;
									height:16px;
								"
							>Terbitkan</div>
					</div>
				</div>
				<div style="
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Min-Fee
					</div>
					<div>
						<input placeholder="Misal 200.000.00" style="height:100%;border-radius:0;">
					</div>
				</div>
				<div style="
					height:20%;
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Nama Jasa
					</div>
					<div style="
						height:100%;
					">
						<textarea placeholder="Tulis Nama Pekerjaan Disini..." style="height:100%;resize:none;border-radius:0;" id=title></textarea>
					</div>
				</div>
				<div style="
					height:500px;
					display:flex;
					flex-direction:column;
					margin-bottom:20px;
				">
					<div style="
						font-family:montserratbold;
					">
						Deskripsi Dan Persyaratan
					</div>
					<div style=height:100%;>
						<textarea placeholder="Tulis Keterangan Disini..." style="height:100%;resize:none;border-radius:0 0 20px 20px;" id=description></textarea>
					</div>
				</div>
			`,
			choosePreview(){
				const showPreview = (file)=>{
					this.filepreview = file;
					const fs = new FileReader();
					fs.onload = ()=>{
						this.find('#preview').src = fs.result;
						this.find('#preview').show('block');
					}
					fs.readAsDataURL(file);
				}
				if(!this.preview)this.preview = makeElement('input',{
					type:'file',
					accept:'image/*',
					onchange(){
						const file = this.files[0];
						showPreview(file);
					}
				})
				this.preview.click();
			},
			collectData(){
				this.feeInput.value = this.feeInput.value.replaceAll('Rp ','');
				this.feeInput.value = this.feeInput.value.replaceAll('.','');
				const minFee = Number(this.find('input').value);
				const Data = {minFee};
				if(this.filepreview)Data.preview = this.filepreview;
				this.findall('textarea').forEach(input=>{
					Data[input.id] = input.value;
				})
				Object.assign(Data,{
					date:getFullDate(),
					time:getTime(),
					owner:app.userData.uid,
					type:"Services",
					postId:getUniqueID(),
					username:app.userData.username,
					profilepicture:app.userData.profilepicture||app.noProfilePng,
					more:{
						like:[],
						share:[],
						comments:[],
						view:[]
					}
				})
				return Data;
			},
			clearFeeInput(){
				this.feeInput = this.find('input');
				this.feeInput.oninput = (e)=>{
					const prev = this.feeInput.value.replaceAll(e.data,'');
					if(isNaN(e.data) || !e.data){
						if(this.feeInput.value.length===2){
							this.feeInput.value = 'Rp ';
						}else this.feeInput.value = prev;
						return;
					}
					this.feeInput.value = this.feeInput.value.replaceAll('Rp ','');
					this.feeInput.value = this.feeInput.value.replaceAll('.','');
					this.feeInput.value = 'Rp '+getPrice(this.feeInput.value);
				}
			},
			setupButton(){
				this.findall('.thebutton').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			addFiles(){

			},
			saveToDraft(){

			},
			publish(){
				const data = this.collectData();
				view.main.addChild(view.loadingPost(data));
			},
			onadded(){
				this.clearFeeInput();
				this.setupButton();
			}
		})
	},
	lokernew(){
		return makeElement('div',{
			style:`
				margin:3%;
				display:flex;
				flex-direction:column;
				gap:10px;
			`,
			innerHTML:`
				<div style="
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Preview
					</div>
					<div style="
						height:200px;
						width:100%;
						background:whitesmoke;
						border:1px solid #e0e0e0;
						display:flex;
						align-items:center;
						justify-content:center;
						position:relative;
					">
						<div style="
							width:100%;
							height:100%;
						">
							<img id=preview style="
								width:100%;
								height:100%;
								object-fit:cover;
								display:none;
							">
						</div>
						<div style="
							background: white;
							padding: 5px;
							border-radius: 50%;
							border: 1px solid #e0e0e0;
							cursor: pointer;
							position:absolute;
							z-index:1;
						" id=choosePreview class=thebutton>
							<img src=./more/media/plus.png style="
								width:32px;
								height:32px;
							">
						</div>
					</div>
				</div>
				<div style="
					width: 100%;
					justify-content: space-around;
					display: flex;
					gap:10px;
					position:sticky;
					top:0;
					background:white;
				"
				id=newartilebuttons
				>
					<div style=width:100%; class=thebutton id=publish>
						<div class="button buttonstyled" style="
							justify-content:center;display:flex;
							align-items:center;gap:10px;
						">
							<img src=./more/media/whiteupload.png
								style="
									width:16px;
									height:16px;
								"
							>Terbitkan</div>
					</div>
				</div>
				<div style="
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Max-Fee
					</div>
					<div>
						<input placeholder="Misal 200.000.00" style="height:100%;border-radius:0;">
					</div>
				</div>
				<div style="
					height:20%;
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Nama Pekerjaan
					</div>
					<div style="
						height:100%;
					">
						<textarea placeholder="Tulis Nama Pekerjaan Disini..." style="height:100%;resize:none;border-radius:0;" id=title></textarea>
					</div>
				</div>
				<div style="
					height:500px;
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Deskripsi Dan Persyaratan
					</div>
					<div style="
						height:100%;
					">
						<textarea placeholder="Tulis Keterangan Disini..." style="height:100%;resize:none;border-radius:0 0 20px 20px;" id=description></textarea>
					</div>
				</div>
			`,
			choosePreview(){
				const showPreview = (file)=>{
					this.filepreview = file;
					const fs = new FileReader();
					fs.onload = ()=>{
						this.find('#preview').src = fs.result;
						this.find('#preview').show('block');
					}
					fs.readAsDataURL(file);
				}
				if(!this.preview)this.preview = makeElement('input',{
					type:'file',
					accept:'image/*',
					onchange(){
						const file = this.files[0];
						showPreview(file);
					}
				})
				this.preview.click();
			},
			clearFeeInput(){
				this.feeInput = this.find('input');
				this.feeInput.oninput = (e)=>{
					const prev = this.feeInput.value.replaceAll(e.data,'');
					if(isNaN(e.data) || !e.data){
						if(this.feeInput.value.length===2){
							this.feeInput.value = 'Rp ';
						}else this.feeInput.value = prev;
						return;
					}
					this.feeInput.value = this.feeInput.value.replaceAll('Rp ','');
					this.feeInput.value = this.feeInput.value.replaceAll('.','');
					this.feeInput.value = 'Rp '+getPrice(this.feeInput.value);
				}
			},
			collectData(){
				this.feeInput.value = this.feeInput.value.replaceAll('Rp ','');
				this.feeInput.value = this.feeInput.value.replaceAll('.','');
				const maxFee = Number(this.find('input').value);
				const Data = {maxFee};
				if(this.filepreview)Data.preview = this.filepreview;
				this.findall('textarea').forEach(input=>{
					Data[input.id] = input.value;
				})
				Object.assign(Data,{
					date:getFullDate(),
					time:getTime(),
					owner:app.userData.uid,
					type:"Jobs",
					postId:getUniqueID(),
					username:app.userData.username,
					profilepicture:app.userData.profilepicture||app.noProfilePng,
					more:{
						like:[],
						share:[],
						comments:[],
						view:[]
					},
					winner:'unset'
				})
				return Data;
			},
			setupButton(){
				this.findall('.thebutton').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			addFiles(){

			},
			saveToDraft(){

			},
			publish(){
				const data = this.collectData();
				view.main.addChild(view.loadingPost(data));
			},
			onadded(){
				this.clearFeeInput();
				this.setupButton();
			}
		})
	},
	openArticles(){
		const data = app.dataContent;
		return makeElement('div',{
			style:`
				padding:0 3%;
				height:100%;
				overflow:auto;
				display:flex;
				flex-direction:column;
				color:dimgray;
			`,
			innerHTML:`
				<div style="
					display:flex;
					align-items:center;
					gap:8px;
					margin-top:10px;
				">
					<div>
						<img class=profileimg src=./more/media/gemaprofile.png>
					</div>
					<div class=username>${data.username},</div>
					<div class=date>${SmartTime(data.time)}</div>
				</div>
				<div style="
					font-family:montserratbold;
					margin:10px 0;
				">${data.title}</div>
				<div style="
					width:100%;
					margin-bottom:10px;
				">
					<img src=${data.preview||'./more/media/nothumbnailnew.png'} style="
						width:100%;
						height:100%;
						object-fit:cover;
					">
				</div>
				<div style="
					height:100%;
				">
					${data.description.replaceAll('\n','<br>')}
					<div style="
						position:sticky;
						bottom:0;
						width:100%;
						height:50px;
						left:0;
						display:flex;
						margin-top:20px;
						justify-content:center;
					">
						<div style="
							padding:20px;
							padding-bottom:10px;
							background:deepskyblue;
							color:white;
							border-bottom:none;
							border-radius:20px 20px 0 0;
							gap:10px;
							display:flex;
							justify-content:center;
							align-items:center;
							cursor:pointer;
						">
							<img src=./more/media/whitecomment.png style="
								width:24;
								height:24;
							">
							Lihat Komentar
						</div>
					</div>
				</div>
				
			`,
			onadded(){
				//this.generateComment('randomid');
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',false,data.owner);
				}
				this.updateView();
			},
			async updateView(){
				let view = (await app.doglas.do(['database','post',`${data.type}/${data.postId}/view`,'get'])).val()||0;
				view += 1;
				await app.doglas.do(['database','post',`${data.type}/${data.postId}/view`,'set',view]);
			},
			generateComment(articleId){
				this.addChild(makeElement('div',{
					onadded(){
						this.addChild(view.comment(userData.content[articleId].more.comment));
					}
				}))
			}
		})
	},
	openServices(){
		const data = app.dataContent;
		return makeElement('div',{
			style:`
				padding:0 3%;
				height:100%;
				display:flex;
				flex-direction:column;
				overflow:auto;
				color:dimgray;
			`,
			innerHTML:`
				<div style="
					width:100%;
					height:200px;
				">
					<img src=${data.preview||'./more/media/nothumbnailnew.png'} style="
						width:100%;
						height:100%;
						object-fit:cover;
					">
				</div>
				<div style="
					display:flex;
					align-items:center;
					gap:8px;
					margin:20px 0 10px 0;
				">
					<div>
						<img class=profileimg src=${data.profilepicture||app.noProfilePng}>
					</div>
					<div class=username>${data.username},</div>
					<div class=date>${SmartTime(data.time)}</div>
				</div>
				<div id=fee>${data.type==='Jobs'?'Maks Bid':'Min Bid'} Rp ${getPrice(data.maxFee||data.minFee)}</div>
				<div style="
					height:100%;
				">
					<div style="
						font-family:montserratbold;
						margin:10px 0;
					">${data.title}</div>
					<div style="
						margin-bottom:20px;
					">${data.description.replaceAll('\n','<br>')}</div>
				</div>
				<div style="
					position:sticky;
					bottom:0;
					width:100%;
					height:50px;
					left:0;
					display:flex;
					justify-content:center;
				">
					<div style="
						padding:20px;
						padding-bottom:10px;
						background:deepskyblue;
						color:white;
						border-bottom:none;
						border-radius:20px 20px 0 0;
						gap:10px;
						display:${app.userData?data.owner===app.userData.uid?'none':'flex':'flex'};
						justify-content:center;
						align-items:center;
						cursor:pointer;
					" id=dooffers>
						<img src=./more/media/whitebidding.png style="
							width:24;
							height:24;
						">
						Buat Penawaran
					</div>
					<div style="
						padding:20px;
						padding-bottom:10px;
						background:red;
						color:white;
						border-bottom:none;
						border-radius:20px 20px 0 0;
						gap:10px;
						display:${app.userData?data.owner===app.userData.uid?'flex':'none':'none'};
						justify-content:center;
						align-items:center;
						cursor:pointer;
					" id=delete>
						<img src=./more/media/whitedelete.png style="
							width:24;
							height:24;
						">
						Hapus Penawaran
					</div>
				</div>
			`,
			onadded(){
				this.find('#dooffers').onclick = ()=>{
					this.doOffers();
				}
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',false,data.owner);
				}
			},
			doOffers(){
				if(!app.getInfoLogin()){
					view.content.getIn(()=>{
						view.content.openServices();
					});
					return forceRecheck(view.main,'Silahkan Login Terlebih Dahulu!');
				}
				view.main.addChild(view.servicesOfferPage({subject:data.title,minFee:data.minFee,type:data.type,postid:data.postId,owner:data.owner,profilepicture:data.profilepicture,username:data.username,preview:data.preview,postId:data.postId}));
			}
		})
	},
	openJobs(){
		const data = app.dataContent;
		return makeElement('div',{
			style:`
				padding:0 3%;
				height:100%;
				display:flex;
				flex-direction:column;
				overflow:auto;
				color:dimgray;
			`,
			innerHTML:`
				<div style="
					width:100%;
					height:200px;
				">
					<img src=${data.preview||'./more/media/nothumbnailnew.png'} style="
						width:100%;
						height:100%;
						object-fit:cover;
					">
				</div>
				<div style="
					display:flex;
					align-items:center;
					gap:8px;
					margin:20px 0 10px 0;
				">
					<div>
						<img class=profileimg src=${data.profilepicture||app.noProfilePng}>
					</div>
					<div class=username>${data.username},</div>
					<div class=date>${SmartTime(data.time)}</div>
				</div>
				<div id=fee>${data.type==='Jobs'?'Maks Bid':'Min Bid'} Rp ${getPrice(data.maxFee||data.minFee)}</div>
				<div style="
					height:100%;
				">
					<div style="
						font-family:montserratbold;
						margin:10px 0;
					">${data.title}</div>
					<div style="
						margin-bottom:20px;
					">${data.description.replaceAll('\n','<br>')}</div>
				</div>
				<div style="
					position:sticky;
					bottom:0;
					width:100%;
					height:50px;
					left:0;
					display:flex;
					justify-content:center;
				">
					<div style="
						padding:20px;
						padding-bottom:10px;
						background:deepskyblue;
						color:white;
						border-bottom:none;
						border-radius:20px 20px 0 0;
						gap:10px;
						display:${app.userData?data.owner===app.userData.uid?'none':'flex':'flex'};
						justify-content:center;
						align-items:center;
						cursor:pointer;
					" id=dooffers>
						<img src=./more/media/whitebidding.png style="
							width:24;
							height:24;
						">
						Buat Penawaran
					</div>
					<div style="
						padding:20px;
						padding-bottom:10px;
						background:red;
						color:white;
						border-bottom:none;
						border-radius:20px 20px 0 0;
						gap:10px;
						display:${app.userData?data.owner===app.userData.uid?'flex':'none':'none'};
						justify-content:center;
						align-items:center;
						cursor:pointer;
					" id=delete>
						<img src=./more/media/whitedelete.png style="
							width:24;
							height:24;
						">
						Hapus Penawaran
					</div>
				</div>
			`,
			onadded(){
				this.find('#dooffers').onclick = ()=>{this.doOffers()};
				this.find('#delete').onclick = ()=>{this.deletePost()};
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',false,data.owner);
				}
			},
			deletePost(){
				view.main.addChild(view.userRemovePost(data));
			},
			doOffers(){
				if(!app.getInfoLogin()){
					view.content.getIn(()=>{
						view.content.openJobs();
					});
					return forceRecheck(view.main,'Silahkan Login Terlebih Dahulu!');
				}
				view.main.addChild(view.jobsOfferPage({subject:data.title,maxFee:data.maxFee,type:data.type,postid:data.postId,owner:data.owner,profilepicture:data.profilepicture,username:data.username,preview:data.preview,postId:data.postId}));
			}
		})
	},
	userRemovePost(datatoupload){
		return makeElement('div',{
			datatoupload,
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:flex-start;
				justify-content:center;
				background:#00000040;
			`,
			innerHTML:`
				<div style="
					border-radius:0 0 20px 20px;
					background:white;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:3%;
						align-items:center;
						background:whitesmoke;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Proses Uploading
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/close.png class=navimg style=width:16px;height:16px;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:center;
						gap:10px;
					">
						<div id=text>
							Mohon Tunggu Sebentar, Sedang Mengapus Data.
						</div>
					</div>
				</div>
			`,
			handleResponse(x){
				if(!x){
					this.text.innerHTML = 'Data Berhasil Hapus';
				}else{
					this.text.innerHTML = 'Terjadi masalah saat menghapus, coba lagi nanti.';
					this.remove();
				}
			},
			async DoRequest(){
				//send notif to owner.
				const ownerNotifs = (await app.doglas.do(['database','users',`${this.datatoupload.owner}/notif`,'get'])).val()||[];
				ownerNotifs.push({
					profilepicture:app.userData.profilepicture||app.noProfilePng,
					who:'Kamu',
					when:getFullDate(),
					what:`Menghapus postingan ${this.datatoupload.type} ${this.datatoupload.title}`
				})
				await app.doglas.do(['database','users',`${this.datatoupload.owner}/notif`,'set',ownerNotifs]);
				await app.doglas.do(['database','post',`${this.datatoupload.type}/${this.datatoupload.postId}`,'remove']);
				this.handleResponse();
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{
					view.content.displayList([],'loadartikel',true);
					this.remove();
				}
				this.text = this.find('#text');
				this.DoRequest();
			}
		})
	},
	openShortStories(){
		const data = app.dataContent;
		return makeElement('div',{
			style:`
				padding:0 3%;
				height:100%;
				overflow:auto;
				display:flex;
				flex-direction:column;
				color:dimgray;
			`,
			innerHTML:`
				<div style="
					display:flex;
					align-items:center;
					gap:8px;
					margin-top:10px;
				">
					<div>
						<img class=profileimg src=./more/media/gemaprofile.png>
					</div>
					<div class=username>${data.username},</div>
					<div class=date>${SmartTime(data.time)}</div>
				</div>
				<div style="
					font-family:montserratbold;
					margin:10px 0;
				">${data.title}</div>
				<div style="
					width:100%;
					margin-bottom:10px;
				">
					<img src=${data.preview||'./more/media/nothumbnailnew.png'} style="
						width:100%;
						height:100%;
						object-fit:cover;
					">
				</div>
				<div style="
					height:100%;
				">
					${data.description.replaceAll('\n','<br>')}
					<div style="
						position:sticky;
						bottom:0;
						width:100%;
						height:50px;
						left:0;
						display:flex;
						justify-content:center;
					">
						<div style="
							padding:20px;
							padding-bottom:10px;
							background:deepskyblue;
							color:white;
							border:1px solid black;
							border-bottom:none;
							border-radius:20px 20px 0 0;
							gap:10px;
							display:flex;
							justify-content:center;
							align-items:center;
							cursor:pointer;
						">
							Lihat Komentar
						</div>
					</div>
				</div>
			`,
			onadded(){
				//this.generateComment('randomid');
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',false,data.owner);
				}
			},
			generateComment(articleId){
				this.addChild(makeElement('div',{
					onadded(){
						this.addChild(view.comment(userData.content[articleId].more.comment));
					}
				}))
			}
		})
	},
	profilePage(userData){
		if(!userData)userData = app.userData;
		//console.log(userData);
		return makeElement('div',{
			style:`
				border-radius:0 0 20px 20px;
				position:relative;
			`,
			innerHTML:`
				<div style="
					height:150px;
					width:100%;
					background:deepskyblue;
					position:relative;
				">
					<img id=bannerimg style="
						width:100%;
						height:150px;
						object-fit:cover;
					" src="${userData.bannerpic}" ${!userData.bannerpic?'hidden':''}>
					<div style="
						position: absolute;
						top: 0;
						right: 0;
						padding: 10px;
						background: deepskyblue;
						display: ${userData.uid===app.userData.uid?'flex':'none'};
						align-items: center;
						justify-content: center;
						border-radius: 0 0 0 20px;
						border: 2px solid whitesmoke;
						border-right:0;border-top:0;
						cursor:pointer;
					" id=editbanner>
						<img src=./more/media/whiteedit.png style="
							width:24px;
							height:24px;
						">
					</div>
				</div>
				<div id=topFront
				style="
					height: 300px;
					width: 88%;
					position: absolute;
					top: 0;
					left: 0;
					display: flex;
					align-items: center;
					margin: 0 6%;
					justify-content:space-between;
				"
				>
					<div style="
						padding:8px;
						background:white;
						border-radius:50%;
						width:128px;
						height:128px;
						position:relative;
						border:1px solid gainsboro;
					">
						<img src=${userData.profilepicture||app.noProfilePng}
						style="
							width:128px;
							height:128px;
							object-fit:cover;
							border-radius:50%;
						"
						id=profilepicture
						>
						<div style="
							position: absolute;
							bottom: 0;
							right: 0;
							padding: 10px;
							background: deepskyblue;
							border: 2px solid whitesmoke;
							border-left:0;border-top:0;
							border-radius: 50%;
							cursor: pointer;
							display:${userData.uid===app.userData.uid?'':'none'};
						" id=editPicture>
							<img src=./more/media/whiteedit.png style="
								width:24px;
								height:24px;
							">
						</div>
					</div>
					<div style="
						padding:8px 15px;
						background:deepskyblue;
						color:white;
						border:2px solid gainsboro;
						border-top:0;
						border-left:0;
						border-radius:20px;
						display: ${userData.uid===app.userData.uid?'flex':'none'};
						gap:5px;
						cursor:pointer;
					" id=editProfile>
						<img src=./more/media/whiteedit.png
						style="
							width:24px;
							height:24px;
							object-fit:cover;
						"
						>Edit Profil
					</div>
				</div>
				<div
				style="
					top: 0;
					left: 0;
					display: flex;
					flex-direction: column;
					border-bottom: 1px solid whitesmoke;
				"
				>
					<div style="
						margin: 78px 6% 20px 6%;
					" id=info>
						<div style="
							font-family:montserratbold;
						"><span>@${userData.username}</span></div>
						<div style="
							color:gray;
						"><span>${userData.name||'-'}</span></div>
						<div style="
							color:gray;
						"><span>${userData.bio||'-'}</span></div>
						<div style="
							display: flex;
							gap: 10px;
							margin-top:10px;
						">
							<div>
								<div id=followers>[loading...] followers</div>
							</div>
							<div>
								<div id=following>[loading...] following</div>
							</div>
						</div>
					</div>
				</div>
				<div style="
					border-bottom:1px solid whitesmoke;
					display: ${userData.uid===app.userData.uid?'none':'flex'};
					color: white;
					font-family: 'montserratbold';
					overflow:auto;
				">
					<div
					style="
						width:94%;
						height:100%;
						display:flex;
						align-items:center;
						margin:10px 6%;
						gap:8px;
						justify-content:space-around;
					"
					>
						<div>
							<div class="button buttonstyled" style="
								border-radius:20px;display:flex;
								align-items:center;gap:5px;font-size:10px;
							" id=chat>
								<img src=./more/media/whitechat.png
									style="
										width:16px;
										height:16px;
									"
								>CHAT</div>
						</div>
						<div id=follow style="
							display:none;
						">
							<div class="button buttonstyled" style="
								border-radius:20px;display:flex;
								align-items:center;gap:5px;font-size:10px;
							">
								<img src=./more/media/followwhite.png
								style="
									width:16px;
									height:16px;
								"
								>FOLLOW</div>
						</div>
						<div id=unfollow style="
							display:none;
						">
							<div class="button buttonstyled" style="
								border-radius:20px;display:flex;
								align-items:center;gap:5px;font-size:10px;
							">
								<img src=./more/media/unfollow.png
								style="
									width:16px;
									height:16px;
								"
								>UNFOLLOW</div>
						</div>
					</div>
				</div>
			`,
			showDataFollowAndProject(){
				//console.log(userData);
				const following = userData.following?userData.following.length:0;
				const followers = userData.followers?userData.followers.length:0;

				this.find('#followers').innerText = followers+' followers';
				this.find('#following').innerText = following+' following';
			},
			followOnFollow(){
				if(userData.followers && app.getInfoLogin()){
					let following;
					userData.followers.forEach(user=>{
						if(user.id===app.userData.uid){
							following = true;
							return;
						}
					})
					if(following){
						this.unfollowButton.show('flex');
						this.followButton.hide()
					}else{
						this.followButton.show('flex');
					}
				}else{
					this.followButton.show('flex');
				}
			},
			onadded(){
				this.generateMore();
				//this.generateContent();
				
				//setup edit profile.
				this.find('#editProfile').onclick = ()=>{
					this.edit();
				}
				this.find('#editPicture').onclick = ()=>{
					this.editPicture();
				}
				this.find('#editbanner').onclick = ()=>{
					this.editbanner();
				}
				this.find('#chat').onclick = ()=>{
					this.sendmemsg();
				}
				this.followButton = this.find('#follow');
				this.unfollowButton = this.find('#unfollow');
				this.followButton.onclick = ()=>{
					this.followme();
				}
				this.unfollowButton.onclick = ()=>{
					this.unfollow();
				}
				this.showDataFollowAndProject();
				this.followOnFollow();
				//if loading.
				view.unloading();
			},
			async unfollow(){
				if(!app.getInfoLogin()){
					view.content.getIn(()=>{
						view.content.openProfile([],'home',false,userData.uid);
					});
					return forceRecheck(view.main,'Silahkan Login Lebih Dahulu!');
				}
				//get target follow list.
				const followers = (await app.doglas.do(['database','users',`${userData.uid}/public/followers`,'get'])).val()||[];
				
				//time to filter.
				const newFollowers = [];
				followers.forEach(item=>{
					if(item.id!==app.userData.uid){
						newFollowers.push(item);
					}
				})
				await app.doglas.do(['database','users',`${userData.uid}/public/followers`,'set',newFollowers]);
				
				//get this user following list.
				const following = (await app.doglas.do(['database','users',`${app.userData.uid}/public/following`,'get'])).val()||[];
				
				//time to filter.
				const newFollowing = [];
				following.forEach(item=>{
					if(item.id!==userData.uid){
						newFollowing.push(item);
					}
				})
				await app.doglas.do(['database','users',`${app.userData.uid}/public/following`,'set',newFollowing]);

				//notif handling.
				//for him.
				const himnotiflist = (await app.doglas.do(['database','users',`${userData.uid}/notif`,'get'])).val()||[];
				himnotiflist.push({who:app.userData.username,profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what:`Berhenti mengikuti anda.`})
				await app.doglas.do(['database','users',`${userData.uid}/notif`,'set',himnotiflist]);

				//forme.
				const menotiflist = (await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'get'])).val()||[];
				menotiflist.push({who:'Kamu',profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what:`Berhenti mengikuti ${userData.username}`});
				await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'set',menotiflist]);				
				view.content.openProfile([],'home',false,userData.uid);
			},
			generateMore(){
				for(let i in userData.more){
					this.find('#info').addChild(makeElement('div',{
						style:`
							margin-top: 10px;
							border-top: 1px solid whitesmoke;
							padding-top: 2px;
						`,
						innerHTML:`
							<div>${i}</div>
							<div id=infodata
							style="
								display:flex;
								gap:8px;
								overflow:auto;
							"
							>
								<div style="
									padding:2px 5px;
									background:whitesmoke;
									border-radius:20px;
									white-space: nowrap;
								">
									${userData.more[i]}
								</div>
							</div>
						`
					}))
				}
			},
			generateContent(){
				this.addChild(makeElement('div',{
					onadded(){
						userData.content.list.forEach((id,i)=>{
							const borderState = (i==userData.content.length-1)?false:true;
							this.addChild(view.line(userData.content[id],i+1,borderState));
						})
					}
				}))
			},
			edit(){
				view.main.addChild(view.editPop());
			},
			editbanner(){
				view.main.addChild(view.editBanner(this));
			},
			editPicture(){
				view.main.addChild(view.editPic(this));
			},
			async followme(){
				if(!app.getInfoLogin()){
					view.content.getIn(()=>{
						view.content.openProfile([],'home',false,userData.uid);	
					});
					return forceRecheck(view.main,'Silahkan Login Lebih Dahulu!');
				}
				//get target follow list.
				const followers = (await app.doglas.do(['database','users',`${userData.uid}/public/followers`,'get'])).val()||[];
				let blyet = false;
				followers.forEach(item=>{
					if(item.id===app.userData.uid)blyet=true;
				})
				if(!blyet){
					followers.push({
						username:app.userData.username,
						id:app.userData.uid,
						date:getFullDate(),
						time:getTime(),
						profilepicture:app.userData.profilepicture||app.noProfilePng
					})
				}
				//push the data.
				await app.doglas.do(['database','users',`${userData.uid}/public/followers`,'set',followers]);
				//get this user following list.
				const following = (await app.doglas.do(['database','users',`${app.userData.uid}/public/following`,'get'])).val()||[];
				following.push({
					username:userData.username,
					id:userData.uid,
					date:getFullDate(),
					time:getTime(),
					profilepicture:userData.profilepicture||app.noProfilePng
				})
				await app.doglas.do(['database','users',`${app.userData.uid}/public/following`,'set',following]);

				//notif handling.
				//for him.
				const himnotiflist = (await app.doglas.do(['database','users',`${userData.uid}/notif`,'get'])).val()||[];
				himnotiflist.push({who:app.userData.username,profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what:`Mulai mengikuti anda.`})
				await app.doglas.do(['database','users',`${userData.uid}/notif`,'set',himnotiflist]);

				//forme.
				const menotiflist = (await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'get'])).val()||[];
				menotiflist.push({who:'Kamu',profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what:`Mulai mengikuti ${userData.username}`});
				await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'set',menotiflist]);				
				view.content.openProfile([],'home',false,userData.uid);
				//console.log(userData,app.userData);
			},
			async sendmemsg(){
				if(!app.getInfoLogin()){
					view.content.getIn(()=>{this.sendmemsg()});
					return forceRecheck(view.main,'Silahkan Login Lebih Dahulu!');
				}
				const chatList = (await app.doglas.do(['database','users',`${app.userData.uid}/inbox`,'get'])).val()||[];
				
				//case is only checking for user, not with opponent.
				//have to check the opponent.
				let ourRoom;
				const opponentChatList = (await app.doglas.do(['database','users',`${userData.uid}/inbox`,'get'])).val()||[];
				opponentChatList.forEach((item)=>{
					if(item.to===app.userData.uid){
						ourRoom = item;
						return
					}
				})
				
				//checking the chat list.
				//finding the userId. If One, this mean i dont have to create new room
				let room = null;
				chatList.forEach((item)=>{
					//console.log(item.to,userData.uid);
					if(item.to===userData.uid){
						room = item;
						return
					}
				})
				let roomId;
				if(!room){
					//no room found. make new one.
					//send notif to both user.
					//for sender.
					if(!ourRoom)roomId = getUniqueID();
					else roomId = ourRoom.roomId;
					//get sender chat list.
					const chatList = (await app.doglas.do(['database','users',`${app.userData.uid}/inbox`,'get'])).val()||[];
					room = {roomId,to:userData.uid,toProfile:userData.profilepicture||app.noProfilePng,date:getFullDate(),toUsername:userData.username};
					chatList.push(room);
					await app.doglas.do(['database','users',`${app.userData.uid}/inbox`,'set',chatList]);
					//set initial data.
					await app.doglas.do(['database','privateChat',`${roomId}/peoples`,'set',[app.userData.uid,userData.uid]]);
				}

				if(!ourRoom){
					//console.log('Opps, theres no room at this db, so i build one');
					//for reciever.
					if(!roomId)roomId=room.roomId;
					const recieverChatList = (await app.doglas.do(['database','users',`${userData.uid}/inbox`,'get'])).val()||[];
					recieverChatList.push({roomId,to:app.userData.uid,toProfile:app.userData.profilepicture||app.noProfilePng,date:getFullDate(),toUsername:app.userData.username});
					await app.doglas.do(['database','users',`${userData.uid}/inbox`,'set',recieverChatList]);	
				}
				
				view.main.addChild(view.openPrivateChat(room));
				//console.log(userData);
			}
		})
	},
	comment(datacomment){
		return makeElement('div',{
			style:`
				margin-top:10px;
			`,
			onadded(){
				datacomment.forEach((comment,i)=>{
					this.addChild(makeElement('div',{
						style:`
							display:flex;
							gap:10px;
							align-item:center;
							margin-top:8px;
							margin-bottom:${i===datacomment.length-1?20:0}px;
						`,
						innerHTML:`
							<div>
								<img src=${comment.profilepicture||app.noProfilePng}
								style="
									width:24px;
									height:24px;
									border-radius:50%;
									margin-top:8px;
								"
								>
							</div>
							<div>
								<div style="
									display:flex;
									gap:5px;
								">
									<div>${comment.username}</div>
									<div>${comment.date}</div>
								</div>
								<div>${comment.text}</div>
							</div>
						`
					}))
				})
			}
		})
	},
	newPost(){
		return makeElement('div',{
			id:'chooseType',
			style:`
				position:absolute;
				top:0;
				left:0;
				background:rgba(0, 0, 0, 0.25);
				width:100%;
				height:100%;
				display:flex;
				align-items:flex-start;
				z-index:1;
			`,
			innerHTML:`
			<div style="
				background: white;
				width: 92%;
				padding: 4%;
				display: flex;
				flex-direction: column;
				overflow: auto;
				height: 100%;
				padding-top:0;
			">
				<div style="
					font-family:montserratbold;
					display:flex;
					align-items:center;
					justify-content:space-between;
					padding:0 5px;
					position:sticky;
					top:0;
					padding:20px;
					background:white;
					color:dimgray;
				">
					Postingan Baru
					<img src=./more/media/close.png class=navimg style="
						width:16px;
						height:16px;
						cursor:pointer;
					" id=closethis>
				</div>
				<div class=newpostmenu>
					<div id=newJasa class=child>
						<img src=./more/media/blueservices.png>
						<div>
							<div>Jasa</div>
							<div style="font-family:montserratregular">Posting Jasa, Dan Temukan Klienmu!</div>
						</div>
					</div>
					<div id=newLoker class=child>
						<img src=./more/media/bluetask.png>
						<div>
							<div>Projek</div>
							<div style="font-family:montserratregular">Posting Tugasmu, Dan Biarkan Mereka Yang Nyelesain!</div>
						</div>
					</div>
					<div id=newLoker class=child>
						<img src=./more/media/bluethings.png>
						<div>
							<div>Produk</div>
							<div style="font-family:montserratregular">Posting Produkmu, Dan Raih Pembeli!</div>
						</div>
					</div>
					<div id=newCerpen class=child>
						<img src=./more/media/bluenews.png>
						<div>
							<div>News</div>
							<div style="font-family:montserratregular">Posting Berita terbaru, bagikan informasi!</div>
						</div>
					</div>
					<div id=newArticle class=child>
						<img src=./more/media/bluewiki.png>
						<div>
							<div>Artikel</div>
							<div style="font-family:montserratregular">Posting Artikel, Dan Bagikan Pemikiranmu!</div>
						</div>
					</div>
				</div>
			</div>
			`,
			buttonEvent(){
				this.findall('.newpostmenu .child').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
						this.find('#closethis').click();
					}
				})
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{
					this.remove();
				}
				this.buttonEvent();
			},
			newArticle(){
				view.content.newArticle();
			},
			newCerpen(){
				view.content.newCerpen();
			},
			newJasa(){
				view.content.newJasa();
			},
			newLoker(){
				view.content.newLoker();
			}
		})
	},
	loginBox(after,cancel,update=false){
		return makeElement('div',{
			after,
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:flex-start;
				justify-content:center;
				background:#00000040;
				z-index:1;
			`,
			innerHTML:`
				<div style="
					background:white;
					border-radius:0 0 20px 20px;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						color:black;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Login Pasarin
						</div>
						<div id=closethis style="cursor:pointer;background:deepskyblue;border-radius:50%;">
							<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						flex-direction:column;
						gap:10px;
					">
						<div>
							<div>Email</div>
							<div>
								<input placeholder="Masukan Email" style=border-radius:0; type=email id=userEmail>
							</div>
						</div>
						<div>
							<div>Password</div>
							<div>
								<input placeholder="Masukan Password" style=border-radius:0; type=password id=userPass>
							</div>
						</div>
					</div>
					<div style="padding:0 20px;">
						<span style=cursor:pointer; id=lupapassword>Lupa password?</span>
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:center;
						gap:10px;
					" id=buttons>
						<div style="
							width: 100%;
							text-align: center;
							display:flex;
							justify-content:center;
							align-items:center;
							gap:5px;
						" class=button id=goIn>
							<img src=./more/media/whitelogin.png style="
								width:24px;
								height:24px;
							">
							Masuk
						</div>
						<div style="
							width: 100%;
							text-align: center;
							display:${!update?'flex':'none'};
							justify-content:center;
							align-items:center;
							gap:5px;
						" class=button id=goSignin>
							<img src=./more/media/whitesignup.png style="
								width:24px;
								height:24px;
							">
							Daftar
						</div>
					</div>
				</div>
			`,
			buttonEvent(){
				this.findall('#buttons div').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
				//lupa password.
				this.find('#lupapassword').onclick = ()=>{
					this.openPassHelp();
				}
			},
			openPassHelp(){
				view.main.addChild(view.passwordHelper());
			},
			collectData(){
				const data = {};
				this.findall('input').forEach(input=>{
					data[input.id] = input.value;
				})
				if(data.userEmail){
					if(data.userEmail.indexOf('@')!=-1)
						data.uid = data.userEmail.slice(0,data.userEmail.indexOf('@'));
					else data.uid = data.userEmail;
				}
				return data;
			},
			goIn(){
				//time to check user login data.
				const userPData = this.collectData();
				app.checkLogin(userPData,this);
			},
			goSignin(){
				view.main.addChild(view.siginBox());
				this.remove();
			},
			onadded(){
				//close Event.
				this.find('#closethis').onclick = ()=>{
					if(cancel)cancel();
					this.remove()
				}
				this.buttonEvent();
			}
		})
	},
	siginBox(){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				position:absolute;z-index:1;
				display:flex;
				align-items:flex-start;
				justify-content:center;
				background:#00000040;
			`,
			innerHTML:`
				<div style="
					background:white;
					border-radius:0 0 20px 20px;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						color:black;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Akun Baru Pasarin
						</div>
						<div id=closethis style="cursor:pointer;background:deepskyblue;border-radius:50%;">
							<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						flex-direction:column;
						gap:10px;
					" id=form>
						<div id=username>
							<div>Username<span class=star>*</span></div>
							<div>
								<input type=text placeholder="Masukan Username" style=border-radius:0;>
							</div>
						</div>
						<div id=emailuser>
							<div>Email<span class=star>*</span></div>
							<div>
								<input type=email placeholder="Masukan Email" style=border-radius:0;>
							</div>
						</div>
						<div id=userpassone>
							<div>Password<span class=star>* <span class=sosmall>min 6 digits</span></span></div>
							<div>
								<input type=password placeholder="Masukan Password" style=border-radius:0; required>
							</div>
						</div>
						<div id=userpasstwo>
							<div>Ulagi Password<span class=star>* <span class=sosmall>min 6 digits</span></span></div>
							<div>
								<input type=password placeholder="Masukan Password" style=border-radius:0;>
							</div>
						</div>
						<div>
							<div>Daftar Sebagai Pekerja?</div>
							<div>
								<select id=workingform>
									<option selected value=0>Tidak</option>
									<option value=1>Ya</option>
								</select>
							</div>
						</div>
					</div>
					<div style=color:red;padding:20px;>*Dengan mendaftar, anda telah menyetujui semua persyaratan kami.</div>
					<div id=loading style="
						padding:20px;
						display:none;
						align-items:center;
						justify-content:center;
					">
						Menyimpan data anda, tunggu sebentar!
					</div>
					<div id=anounce style="
						padding:20px;
						display:none;
						align-items:center;
						justify-content:center;
					">
						Maaf, ada masalah saat proses penyimpanan data anda!
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:center;
						gap:10px;
					" id=buttons>
						<div style="
							width: 100%;
							text-align: center;
							display:flex;
							justify-content:center;
							align-items:center;
							gap:5px;
						" class=button id=goSignin>
							<img src=./more/media/whitesignup.png style="
								width:24px;
								height:24px;
							">
							Daftar
						</div>
						<div style="
							width: 100%;
							text-align: center;
							display:flex;
							justify-content:center;
							align-items:center;
							gap:5px;
						" class=button id=goIn>
							<img src=./more/media/whitelogin.png style="
								width:24px;
								height:24px;
							">
							Masuk
						</div>
					</div>
				</div>
			`,
			buttonEvent(){
				this.findall('#buttons div').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			goIn(){
				view.main.addChild(view.loginBox());
				this.remove();
			},
			collectData(){
				const datauser = {len:0};
				this.findall('input').forEach(input=>{
					if(input.value.length>0){
						datauser[input.parentElement.parentElement.id] = {input,value:input.value};
						datauser.len += 1;
					}else{
						input.showUp((el)=>{
							el.style.borderColor = 'red';
						},(el)=>{
							el.style.borderColor = '#e0e0e0';
						});
					}
				})
				//get wanna work data.
				datauser.asworker = this.find('#workingform').value;
				return datauser;
			},
			getComplete(validLen){
				const data = this.collectData();
				if(data.len===validLen)return data;
				return false;
			},
			validate(data,rules){
				let index = 0;
				let result = [];
				let back;
				for(let i in data){
					if(i==='len' || i==='asworker')continue;
					result.push(rules[index](data[i],back));
					back = data[i];
					index += 1;
				}
				return result;
			},
			rulesSignIn(){
				return [
					(value,back)=>{
						return true;
					},
					//email rules
					(value,back)=>{
						if(value.value.indexOf('@')===-1){
							value.input.showUp((el)=>{
								el.style.borderColor = 'red';
							},(el)=>{
								el.style.borderColor = '#e0e0e0';
							});
							forceRecheck(view.main,'Email Tidak Valid!');
							return false;
						}return true;
					},
					//password
					(value,back)=>{
						return true;
					},
					//password
					(value,back)=>{
						if(value.value !== back.value){
							value.input.showUp((el)=>{
								el.style.borderColor = 'red';
							},(el)=>{
								el.style.borderColor = '#e0e0e0';
							});
							back.input.showUp((el)=>{
								el.style.borderColor = 'red';
							},(el)=>{
								el.style.borderColor = '#e0e0e0';
							});
							forceRecheck(view.main,'Password Tidak Sama!');
							return false;
						}else if(value.value.length < 6){
							value.input.showUp((el)=>{
								el.style.borderColor = 'red';
							},(el)=>{
								el.style.borderColor = '#e0e0e0';
							});
							back.input.showUp((el)=>{
								el.style.borderColor = 'red';
							},(el)=>{
								el.style.borderColor = '#e0e0e0';
							});
							forceRecheck(view.main,'Password Minimum 6 Digit!');
							return false;
						}
						return true;
					}
				]
			},
			goSignin(){
				const data = this.getComplete(4);
				if(!data)return forceRecheck(view.main,'Lengkapi Data Terlebih Dahulu!');
				//now validating the data.
				const rst = this.validate(data,this.rulesSignIn());
				if(!rst.includes(false))this.completeIt(data);
			},
			hideFormAndButtons(){
				this.find('#form').hide();
				this.find('#buttons').hide();
			},
			showTheAnounce(msg){
				this.find('#loading').hide();
				const anounce = this.find('#anounce');
				anounce.innerText = msg;
				anounce.show('flex');
			},
			completeIt(data){
				this.submitData({
					asworker:data.asworker,
					username:data.username.value,
					password:data.userpassone.value,
					email:data.emailuser.value,
					date:getFullDate(),
					public:{username:data.username.value},
					uid:data.emailuser.value.slice(0,data.emailuser.value.indexOf('@'))
				});
			},
			async regisWorker(data){
				if(data.asworker==='1' || data.asworker){
					await app.doglas.do(['database','workers',data.uid,'set',data.public]);
				}
			},
			submitData(data){
				this.hideFormAndButtons();
				this.find('#loading').show('flex');
				app.doglas.auth.createUserWithEmailAndPassword(data.email,data.password).then(async (retdata)=>{
					delete data.password;
					data.uid = retdata.user.uid;
					data.public.uid = retdata.user.uid;
					app.doglas.do(['database','users',data.uid,'update',data]).then(()=>{
						this.regisWorker(data);
						forceRecheck(view.main,'Berhasil membuat akun, silahkan login!');
						this.goIn();
					})
				}).catch(err=>{
					forceRecheck(view.main,err.message);
					this.goIn();
				})
			},
			onadded(){
				//close Event.
				this.find('#closethis').onclick = ()=>{this.remove()}
				this.buttonEvent();
			}
		})
	},
	cerpennew(){
		return makeElement('div',{
			style:`
				margin:3%;
				display:flex;
				flex-direction:column;
				gap:10px;
			`,
			innerHTML:`
				<div style="
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Preview
					</div>
					<div style="
						height:200px;
						width:100%;
						background:whitesmoke;
						border:1px solid #e0e0e0;
						display:flex;
						align-items:center;
						justify-content:center;
						position:relative;
					">
						<div style="
							width:100%;
							height:100%;
						">
							<img id=preview style="
								width:100%;
								height:100%;
								object-fit:cover;
								display:none;
							">
						</div>
						<div style="
							background: white;
							padding: 5px;
							border-radius: 50%;
							border: 1px solid #e0e0e0;
							cursor: pointer;
							position:absolute;
							z-index:1;
						" id=choosePreview class=thebutton>
							<img src=./more/media/plus.png style="
								width:32px;
								height:32px;
							">
						</div>
					</div>
				</div>
				<div style="
					width: 100%;
					justify-content: space-around;
					display: flex;
					gap:10px;
					position:sticky;
					top:0;
					background:white;
				"
				id=newartilebuttons
				>
					<div style=width:100%; class=thebutton id=publish>
						<div class="button buttonstyled" style="
							justify-content:center;display:flex;
							align-items:center;gap:10px;
						">
							<img src=./more/media/whiteupload.png
								style="
									width:16px;
									height:16px;
								"
							>Terbitkan</div>
					</div>
				</div>
				<div style="
					height:20%;
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Judul Berita
					</div>
					<div style="
						height:100%;
					">
						<textarea placeholder="Tulis Judul Berita Disini..." style="height:100%;resize:none;border-radius:0;" id=title></textarea>
					</div>
				</div>
				<div style="
					height:500px;
					display:flex;
					flex-direction:column;
				">
					<div style="
						font-family:montserratbold;
					">
						Isi<span class=star>* <span class=sosmall>min 1000 characters</span></span>
					</div>
					<div style="
						height:100%;
					">
						<textarea placeholder="Tulis Berita..." style="height:100%;resize:none;border-radius:0 0 20px 20px;" id=description></textarea>
					</div>
				</div>
			`,
			choosePreview(){
				const showPreview = (file)=>{
					this.filepreview = file;
					const fs = new FileReader();
					fs.onload = ()=>{
						this.find('#preview').src = fs.result;
						this.find('#preview').show('block');
					}
					fs.readAsDataURL(file);
				}
				if(!this.preview)this.preview = makeElement('input',{
					type:'file',
					accept:'image/*',
					onchange(){
						const file = this.files[0];
						showPreview(file);
					}
				})
				this.preview.click();
			},
			collectData(){
				const Data = {};
				if(this.filepreview)Data.preview = this.filepreview;
				this.findall('textarea').forEach(input=>{
					Data[input.id] = input.value;
				})
				Object.assign(Data,{
					date:getFullDate(),
					time:getTime(),
					owner:app.userData.uid,
					type:"ShortStories",
					postId:getUniqueID(),
					username:app.userData.username,
					profilepicture:app.userData.profilepicture||app.noProfilePng
				})
				return Data;
			},
			setupButton(){
				this.findall('.thebutton').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			addFiles(){

			},
			saveToDraft(){

			},
			publish(){
				const data = this.collectData();
				if(data.description.length<1000)return forceRecheck(view.main,'Maaf Konten Terlalu Sedikit, Dibutuhkan Minimal 1000 Huruf.');
				view.main.addChild(view.loadingPost(data));
			},
			onadded(){
				//console.log('called');
				this.setupButton();
			}
		})
	},
	notif(){
		return makeElement('div',{
			style:`
				width:96%;
				height:96%;
				gap:12px;
				display:flex;
				flex-direction:column;
				padding:2%;
				overflow:auto;
				cursor:pointer;
			`,
			className:'NotifParent',
			generateNotifList(NotifList){
				for(let i=NotifList.length-1;i>=0;i--){
					const item = NotifList[i];
					this.addChild(makeElement('div',{
						style:`
							width:96%;
							display:flex;
							gap:12px;
							padding:2%;
							align-items:center;
							border-bottom:${i===0?'':'1px solid whitesmoke'};
							color:dimgray;
						`,
						innerHTML:`
							<div style="
								width:10%;
							">
								<img src=${item.profilepicture} style="
									width:32px;
									height:32px;
									border-radius:50%;
									object-fit:cover;
								">
							</div>							
							<div style="
								width:90%;
							">
								<div>${item.who}, ${item.when}</div>
								<div class=bold>${item.what}</div>
							</div>
						`
					}))
				}
				if(NotifList.length===0){
					this.addChild(view.nodata());
				}
			},
			onadded(){
				this.loadNotifData();
			},
			async loadNotifData(){
				view.addLoading();
				const data = (await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'get'])).val()||[];
				view.unloading();
				this.generateNotifList(data);
			},
		})
	},
	loadingPost(datatoupload){
		return makeElement('div',{
			datatoupload,
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:flex-start;
				justify-content:center;
				background:#00000040;
				z-index:1;
			`,
			innerHTML:`
				<div style="
					border-radius:0 0 20px 20px;
					background:white;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:3%;
						align-items:center;
						background:deepskyblue;
						color:white;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Proses Uploading
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:center;
						gap:10px;
					">
						<div id=text>
							Mohon Tunggu Sebentar, Sedang Mengupload Data.
						</div>
					</div>
				</div>
			`,
			handleResponse(x){
				//console.log(x);
				if(!x){
					this.text.innerHTML = 'Data berhasil diupload, menunggu persetujuan dari admin untuk dipublish';
					view.content.displayList([],'loadloker',true);
				}else{
					this.text.innerHTML = 'Terjadi Masalah Saat Mengupload, coba lagi nanti.';
					this.remove();
				}
			},
			async DoRequest(){
				//console.log(this.datatoupload);
				if(this.datatoupload.preview){
					//upload preview file.first.
					const file = await app.doglas.save([getUniqueID(),this.datatoupload.preview,this.datatoupload.preview.contentType]);
					const url = await file.ref.getDownloadURL();
					this.datatoupload.preview = url;
				}
				const x = await app.doglas.do(['database','pending',`${this.datatoupload.type}/${this.datatoupload.postId}`,'set',this.datatoupload]);
				this.handleResponse(x);
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()};
				this.text = this.find('#text');
				this.DoRequest();
			}
		})
	},
	editPop(){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:flex-start;
				justify-content:flex-end;
				background:#00000040;
				z-index:1;
			`,
			innerHTML:`
				<div style="
					background:white;
					height:100%;
					display:flex;
					flex-direction:column;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						background:deepskyblue;color:white;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Edit Profil
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:flex-start;
						gap:10px;
						overflow:auto;
						flex-direction:column;
					" id=datasparent>
						<div>
							<div>Username</div>
							<div>
								<input value=${app.userData.username} readonly id=username>
							</div>
						</div>
						<div>
							<div>Nama</div>
							<div>
								<input placeholder="Masukan Nama Anda" id=name value="${app.userData.name||''}">
							</div>
						</div>
						<div>
							<div>Bio</div>
							<div>
								<input placeholder="Masukan Bio" id=bio value="${app.userData.bio||''}">
							</div>
						</div>
						<div style="
							margin-top:10px;
							display:flex;
							flex-direction:column;
							gap:8px;
							align-items:center;
						">
							<div>Info Tambahan</div>
							<div style="
								cursor:pointer;
								border:1px solid black;
								padding:10px;
								border-radius:50%;
							" id=moreinfobutton>
								<img src=./more/media/plus.png style="
									width:24px;
									height:24px;
								">
							</div>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
					" id=save>
						<div class=button id=goSignin style="
							width: 100%;
							text-align: center;
							border-radius:20px;
							display:flex;
							align-items:center;
							justify-content:center;
							gap:10px;
						">
							<img src=./more/media/whitesave.png style="
								width:24px;
								height:24px;
							">
							Simpan
						</div>
					</div>
				</div>
			`,
			handleResponse(x,data){
				if(!x){
					forceRecheck(view.main,'Berhasil Mengedit Profil');
					Object.assign(app.userData,data);
					view.content.openProfile([],'home',false,null);
					this.remove();
				}
			},
			generateMore(){
				for(let i in app.userData.more){
					this.find('#datasparent').addBefore(makeElement('div',{
						innerHTML:`
							<div>
								<div>${i}</div>
								<div style=display:flex;gap:10px;justify-content:space-between;align-items:center;>
									<input id="${i}" value="${app.userData.more[i]}">
									<div style=cursor:pointer; id=removeitem>
										<img src=./more/media/deleteicon.png style="
											width:24;
											height:24;
										">
									</div>
								</div>
							</div>
						`,
						onadded(){
							this.find('#removeitem').onclick = ()=>{this.remove()};
						}
						
					}),this.find('#datasparent').children[this.find('#datasparent').children.length-1]);
				}
			},
			DoRequest(data){
				app.doglas.do(['database','users',`${app.userData.uid}/public`,'update',data]).then((x)=>{
					this.handleResponse(x,data);
				})
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()};
				this.find('#save').onclick = ()=>{this.save()};
				//this.text = this.find('#text');
				//this.DoRequest();
				this.moreInfo();
				this.generateMore();
			},
			collectData(){
				const userData = {more:{}};
				this.findall('input').forEach((input,i)=>{
					if(input.value.length>0){
						if(i>2){
							userData.more[input.id] = input.value;
						}else userData[input.id] = input.value;
					}
				})
				return userData;
			},
			save(){
				this.DoRequest(this.collectData());
			},
			moreInfo(){
				this.find('#moreinfobutton').onclick = ()=>{
					view.main.addChild(view.moreinfoadd(this));
				}
			},
			add(data){
				this.find('#datasparent').addBefore(makeElement('div',{
					innerHTML:`
						<div>${data.iddata}</div>
						<div>
							<input placeholder="Masukan ${data.iddata}" id="${data.iddata}" value="${data.valuedata}">
						</div>
					`,
				}),this.find('#datasparent').children[this.find('#datasparent').children.length-1]);
				this.find('#moreinfobutton').scrollIntoView();
			}
		})
	},
	nodata(){
		return makeElement('div',{
			innerHTML:`
				<div>
					<img src=./more/media/emptyhere.png style="
						width:200px;
						height:200px;
						object-fit:contain;
					">
				</div>
			`,
			style:`
				width:100%;
				height:80%;
				display:flex;
				align-items:center;
				justify-content:center;
				color:dimgray;
			`
		})
	},
	moreinfoadd(goal){
		return makeElement('div',{
			style:`
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				display:flex;
				justify-content:flex-end;
				align-items:flex-start;
				background:rgba(0, 0, 0, 0.25);
				z-index:1;
			`,
			innerHTML:`
				<div class=innerBox style="
					background:white;
					height:100%;
				">
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						background:deepskyblue;color:white;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Data Tambahan
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
						</div>
					</div>
					<div style="padding:10px 20px;">
						<div>Nama Data</div>
						<div>
							<input placeholder="Masukan Nama Data" id=iddata>
						</div>
					</div>
					<div style="padding:10px 20px;">
						<div>Isi Data</div>
						<div>
							<input placeholder="Masukan Isi Data" id=valuedata>
						</div>
					</div>
					<div style="
						padding:10px 20px;
						display:flex;
						justify-content:center;
						gap:10px;
					" id=thebutton>
						<div class=button id=goSignin style="
							width: 100%;
							text-align: center;
							border-radius:20px;
						">
							Tambah Data
						</div>
					</div>
				</div>
			`,
			collectData(){
				const moreData = {};
				this.findall('input').forEach((input)=>{
					moreData[input.id] = input.value;
				})
				return moreData;
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()};
				this.find('#thebutton').onclick = ()=>{
					goal.add(this.collectData());
					this.remove();
				}
			}
		})
	},
	editPic(profilePage){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:flex-start;
				justify-content:flex-end;
				background:#00000040;
				z-index:1;
			`,
			innerHTML:`
				<div style="
					background:white;
					display:flex;
					flex-direction:column;
					height:100%;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						background:deepskyblue;
						color:white;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Edit Foto Profil
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:flex-start;
						gap:10px;
						overflow:auto;
						flex-direction:column;
					" id=datasparent>
						<div>
							<div>Pilih Foto</div>
							<div>
								<input id=fileimg type=file accept=image/*>
							</div>
						</div>
						<div>
							<div>Preview</div>
							<div
							style="
								display: flex;
								justify-content: center;
								background: whitesmoke;
								padding: 20px 0;
								border: 1px solid #e0e0e0;
							"
							>
								<div style="
									padding:8px;
									background:white;
									border-radius:50%;
									width:128px;
									height:128px;
								">
									<img id=preview src=${app.userData.profilepicture||app.noProfilePng}
									style="
										width:128px;
										height:128px;
										object-fit:cover;
										border-radius:50%;
									"
									>
								</div>
							</div>
						</div>
					</div>
					<div id=upnotice style="
						padding:20px;
						text-align:center;
						display:none;
					">
						Mohon Tunggu, Sedang Mengupload Foto Profil
					</div>
					<div style="
						padding:20px;
						display:flex;
					" id=save>
						<div class=button id=goSignin style="
							width: 100%;
							text-align: center;
							border-radius:20px;
							display:flex;
							align-items:center;
							justify-content:center;
							gap:10px;
						">
							<img src=./more/media/whitesave.png style="
								width:24px;
								height:24px;
							">
							Simpan
						</div>
					</div>
				</div>
			`,
			getfile(){
				const getbutton = this.find('#fileimg');
				getbutton.onchange = ()=>{
					this.file = getbutton.files[0];
					this.showPreview();
				}
			},
			showPreview(){
				const fn = new FileReader();
				fn.onload = ()=>{
					this.preview.src = fn.result;
					this.find('#save').onclick = ()=>{this.save()};
				}
				fn.readAsDataURL(this.file);
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()};
				this.preview = this.find('#preview');
				this.getfile();
				this.upnotice = this.find('#upnotice');
			},
			save(){
				this.find('#datasparent').hide();
				this.upnotice.show('block');
				app.doglas.save([getUniqueID(),this.file,this.file.contentType]).then(async x=>{
					const url = await x.ref.getDownloadURL();
					app.doglas.do(['database','users',`${app.userData.uid}/public`,'update',{profilepicture:url}]).then(x=>{
						profilePage.find('#profilepicture').src = url;
						app.userData.profilepicture = url;
						this.remove();
					})
				})
			}
		})
	},
	editBanner(profilePage){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:flex-start;
				justify-content:flex-end;
				background:#00000040;
				z-index:1;
			`,
			innerHTML:`
				<div style="
					background:white;
					display:flex;
					flex-direction:column;
					height:100%;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						background:deepskyblue;
						color:white;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Edit Foto Banner
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:flex-start;
						gap:10px;
						overflow:auto;
						flex-direction:column;
					" id=datasparent>
						<div>
							<div>Pilih Foto</div>
							<div>
								<input id=fileimg type=file accept=image/*>
							</div>
						</div>
						<div>
							<div>Preview</div>
							<div
							style="
								display: flex;
								justify-content: center;
								background: whitesmoke;
								padding: 20px 0;
								border: 1px solid #e0e0e0;
							"
							>
								<div style="
									padding:8px;
									background:white;
									height:150px;
									width:100%;
								">
									<img id=preview src=${app.userData.bannerpic||app.noProfilePng}
									style="
										height:150px;
										width:100%;
										object-fit:cover;
									"
									>
								</div>
							</div>
						</div>
					</div>
					<div id=upnotice style="
						padding:20px;
						text-align:center;
						display:none;
					">
						Mohon Tunggu, Sedang Mengupload Banner
					</div>
					<div style="
						padding:20px;
						display:flex;
					" id=save>
						<div class=button id=goSignin style="
							width: 100%;
							text-align: center;
							border-radius:20px;
							display:flex;
							align-items:center;
							justify-content:center;
							gap:10px;
						">
							<img src=./more/media/whitesave.png style="
								width:24px;
								height:24px;
							">
							Simpan
						</div>
					</div>
				</div>
			`,
			getfile(){
				const getbutton = this.find('#fileimg');
				getbutton.onchange = ()=>{
					this.file = getbutton.files[0];
					this.showPreview();
				}
			},
			showPreview(){
				const fn = new FileReader();
				fn.onload = ()=>{
					this.preview.src = fn.result;
					this.find('#save').onclick = ()=>{this.save()};
				}
				fn.readAsDataURL(this.file);
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()};
				this.preview = this.find('#preview');
				this.getfile();
				this.upnotice = this.find('#upnotice');
			},
			save(){
				this.find('#datasparent').hide();
				this.upnotice.show('block');
				app.doglas.save([getUniqueID(),this.file,this.file.contentType]).then(async x=>{
					const url = await x.ref.getDownloadURL();
					app.doglas.do(['database','users',`${app.userData.uid}/public`,'update',{bannerpic:url}]).then(x=>{
						const banner = profilePage.find('#bannerimg');
						banner.src = url;
						banner.onload = ()=>{
							banner.removeAttribute('hidden');
							app.userData.bannerpic = url;
						}
						this.remove();
					})
				})
			}
		})
	},
	servicesOfferPage(data){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:flex-start;
				justify-content:flex-end;
				background:#00000040;
			`,
			innerHTML:`
				<div style="
					background:white;
					display:flex;
					flex-direction:column;
					height:100%;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						background:whitesmoke;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Buat Tawaran
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/close.png class=navimg style=width:16px;height:16px;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:flex-start;
						gap:10px;
						overflow:auto;
						flex-direction:column;
					" id=datasparent>
						<div>
							<div>Jasa</div>
							<div>
								<input value="${data.subject}" readonly>
							</div>
						</div>
						<div>
							<div>Ajukan Fee <span class=star>Min Rp${getPrice(data.minFee)}</span></div>
							<div>
								<input type=number id=fee placeholder="Masukan Fee Yang Diinginkan" min=${data.minFee} value=${data.minFee}>
							</div>
						</div>
						<div>
							<div>Deskripsi Anda</div>
							<div>
								<textarea placeholder="Masukan Deskripsi..." id=offerDescription style="height:150px;"></textarea>
							</div>
						</div>
					</div>
					<div id=upnotice style="
						padding:20px;
						text-align:center;
						display:none;
					">
						Mohon Tunggu, Sedang Mengupload Foto Profil
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:center;
						gap:10px;
					" id=save>
						<div class=button id=goSignin style="
							width: 100%;
							text-align: center;
							border-radius:20px;
						">
							Kirim
						</div>
					</div>
				</div>
			`,
			getfile(){
				const getbutton = this.find('#fileimg');
				getbutton.onchange = ()=>{
					this.file = getbutton.files[0];
					this.showPreview();
				}
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()};
				this.upnotice = this.find('#upnotice');
				this.find('#save').onclick = ()=>{
					this.save();
				}
			},
			collectData(){
				const xdata = {
					fee:this.find('#fee').value,
					bidId:data.postId,
					description:this.find('#offerDescription').value,
					bidder:app.userData.username,
					bidderProfileId:app.userData.uid,
					date:getFullDate(),
					time:getTime(),
					owner:data.owner,
					reject:'unset',
					preview:data.preview||'./more/media/nothumbnailnew.png',
					profilepicture:data.profilepicture||app.noProfilePng,
					bidderProfileIdPic:app.userData.profilepicture||app.noProfilePng,
					inbox:[{id:app.userData.uid,profilepicture:app.userData.profilepicture||app.noProfilePng,date:getFullDate(),from:app.userData.username,msg:this.find('#offerDescription').value,time:getTime()}]
				}
				return xdata;
			},
			async handleNotifOwner(){
				let ownerNotif = (await app.doglas.do(['database','users',`${data.owner}/notif`,'get'])).val()||[];
				ownerNotif.push({who:app.userData.username,profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what:`Memberi penawaran ke ${data.subject} sebesar Rp ${getPrice(data.fee)}`});
				if(ownerNotif.length>20){
					const newOwnerNotif = [];
					for(let i=0;i<10;i++){
						newOwnerNotif.push(ownerNotif[i+11]);
					}
					ownerNotif = newOwnerNotif;
				}
				await app.doglas.do(['database','users',`${data.owner}/notif`,'set',ownerNotif]);
			},
			async handleNotifUser(){
				let ownerNotif = (await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'get'])).val()||[];
				ownerNotif.push({who:'Kamu',profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what:`Memberi penawaran ke ${data.subject} sebesar Rp ${getPrice(data.fee)}`});
				if(ownerNotif.length>20){
					const newOwnerNotif = [];
					for(let i=0;i<10;i++){
						newOwnerNotif.push(ownerNotif[i+11]);
					}
					ownerNotif = newOwnerNotif;
				}
				await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'set',ownerNotif]);
			},
			save(){
				
				Object.assign(data,this.collectData());
				//console.log(data);
				//adding bid data to the project.
				app.doglas.do(['database',`bid/${data.type}`,data.bidId,'update',data]).then(async x=>{
					delete data.inbox;
					//get the data first.
					const biddatauser = (await app.doglas.do(['database','users',`${app.userData.uid}/bid`,'get'])).val()||[];
					biddatauser.push(data);
					await app.doglas.do(['database','users',`${app.userData.uid}/bid`,'update',biddatauser]);
					
					//update bid data statistic
					let bidcount = (await app.doglas.do(['database','users',`${app.userData.uid}/statistics/bidcount`,'get'])).val()||0;
					bidcount += 1;
					await app.doglas.do(['database','users',`${app.userData.uid}/statistics/bidcount`,'set',bidcount]);
					
					const biddataowner = (await app.doglas.do(['database','users',`${data.owner}/bid`,'get'])).val()||[];
					biddataowner.push(data);
					await app.doglas.do(['database','users',`${data.owner}/bid`,'update',biddataowner]);
					app.userData.bid = biddatauser;
					//Notif
					this.handleNotifOwner();
					this.handleNotifUser();
					forceRecheck(view.main,'Berhasil mengirim penawaran');
					this.remove();
				})
				
				this.find('#datasparent').hide();
				this.upnotice.show('block');
				
			}
		})
	},
	jobsOfferPage(data){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:flex-start;
				justify-content:flex-end;
				background:#00000040;
				z-index:1;
			`,
			innerHTML:`
				<div style="
					background:white;
					display:flex;
					flex-direction:column;
					height:100%;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						background:whitesmoke;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Buat Tawaran
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/close.png class=navimg style=width:16px;height:16px;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:flex-start;
						gap:10px;
						overflow:auto;
						flex-direction:column;
					" id=datasparent>
						<div>
							<div>Job</div>
							<div>
								<input value="${data.subject}" readonly>
							</div>
						</div>
						<div>
							<div>Ajukan Fee <span class=star>Max Rp${getPrice(data.maxFee)}</span></div>
							<div>
								<input type=number id=fee placeholder="Masukan Fee Yang Diinginkan" max=${data.maxFee} value=${data.maxFee}>
							</div>
						</div>
						<div>
							<div>Deskripsi Anda</div>
							<div>
								<textarea placeholder="Masukan Deskripsi..." id=offerDescription style="height:150px;"></textarea>
							</div>
						</div>
					</div>
					<div id=upnotice style="
						padding:20px;
						text-align:center;
						display:none;
					">
						Mohon Tunggu, Sedang Mengupload Foto Profil
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:center;
						gap:10px;
					" id=save>
						<div class=button id=goSignin style="
							width: 100%;
							text-align: center;
							border-radius:20px;
						">
							Kirim
						</div>
					</div>
				</div>
			`,
			getfile(){
				const getbutton = this.find('#fileimg');
				getbutton.onchange = ()=>{
					this.file = getbutton.files[0];
					this.showPreview();
				}
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()};
				this.upnotice = this.find('#upnotice');
				this.find('#save').onclick = ()=>{
					this.save();
				}
			},
			collectData(){
				console.log(data);
				const xdata = {
					fee:this.find('#fee').value,
					bidId:getUniqueID(),
					description:this.find('#offerDescription').value,
					bidder:app.userData.username,
					bidderProfileId:app.userData.uid,
					date:getFullDate(),
					time:getTime(),
					owner:data.owner,
					ownerUsername:data.username,
					status:'unset',
					preview:data.preview||'./more/media/nothumbnailnew.png',
					profilepicture:data.profilepicture||app.noProfilePng,
					bidderProfileIdPic:app.userData.profilepicture||app.noProfilePng,
					inbox:[{id:app.userData.uid,profilepicture:app.userData.profilepicture||app.noProfilePng,date:getFullDate(),from:app.userData.username,msg:this.find('#offerDescription').value,time:getTime()}]
				}
				console.log(xdata);
				return xdata;
			},
			async handleNotifOwner(){
				let ownerNotif = (await app.doglas.do(['database','users',`${data.owner}/notif`,'get'])).val()||[];
				ownerNotif.push({who:app.userData.username,profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what:`Memberi penawaran ke ${data.subject} sebesar Rp ${getPrice(data.fee)}`});
				if(ownerNotif.length>20){
					const newOwnerNotif = [];
					for(let i=0;i<10;i++){
						newOwnerNotif.push(ownerNotif[i+11]);
					}
					ownerNotif = newOwnerNotif;
				}
				await app.doglas.do(['database','users',`${data.owner}/notif`,'set',ownerNotif]);
			},
			async handleNotifUser(){
				let ownerNotif = (await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'get'])).val()||[];
				ownerNotif.push({who:'Kamu',profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what:`Memberi penawaran ke ${data.subject} sebesar Rp ${getPrice(data.fee)}`});
				if(ownerNotif.length>20){
					const newOwnerNotif = [];
					for(let i=0;i<10;i++){
						newOwnerNotif.push(ownerNotif[i+11]);
					}
					ownerNotif = newOwnerNotif;
				}
				await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'set',ownerNotif]);
			},
			async save(){
				
				Object.assign(data,this.collectData());
				//console.log(data);
				//adding bid data to the project.
				app.doglas.do(['database',`bid/${data.type}`,data.bidId,'update',data]).then(async x=>{
					delete data.inbox;

					//set bidder bid info.
					await app.doglas.do(['database','users',`${app.userData.uid}/bid/${data.bidId}`,'set',data]);

					//for the owner also.
					await app.doglas.do(['database','users',`${data.owner}/bid/${data.bidId}`,'set',data]);
					
					//update bid data statistic
					let bidcount = (await app.doglas.do(['database','users',`${app.userData.uid}/public/statistics/bidcount`,'get'])).val()||0;
					bidcount += 1;
					await app.doglas.do(['database','users',`${app.userData.uid}/public/statistics/bidcount`,'set',bidcount]);
					
					//for owner also
					let ownerbidcount = (await app.doglas.do(['database','users',`${data.owner}/public/statistics/bidcount`,'get'])).val()||0;
					ownerbidcount += 1;
					await app.doglas.do(['database','users',`${data.owner}/public/statistics/bidcount`,'set',ownerbidcount]);

					//Notif
					this.handleNotifOwner();
					this.handleNotifUser();
				
					//update project bidder id.
					this.updateBidderId();
				
					forceRecheck(view.main,'Berhasil mengirim penawaran');
					this.remove();
				})
				
				this.find('#datasparent').hide();
				this.upnotice.show('block');
				
			},
			async updateBidderId(){

				//get Data bidder first.
				let biddata = (await app.doglas.do(['database','post',`${data.type}/${data.postid}/bidder`,'get'])).val()||[];
				//console.log(biddata);
				biddata.push(app.userData.uid);
				await app.doglas.do(['database','post',`${data.type}/${data.postid}/bidder`,'set',biddata]);
				const biddingList =  (await app.doglas.do(['database','post',`${data.type}/${data.postid}/biddingList`,'get'])).val()||[];
				biddingList.push(data.bidId);
				await app.doglas.do(['database','post',`${data.type}/${data.postid}/biddingList`,'set',biddingList]);
			}
		})
	},
	inbox(nav){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				margin-top:10px;
			`,
			async generateChat(){
				if(!app.userData[nav])app.userData[nav] = [];
				if(nav==='inbox'){
					//getting the latest msg from chat.
					app.userData.inbox = (await app.doglas.do(['database','users',`${app.userData.uid}/inbox`,'get'])).val()||[];
				}
				if(app.userData[nav].length===0){
					this.addChild(makeElement('div',{
						innerHTML:`${nav==='bid'?'Anda Belum Melakukan Aktifitas Penawaran!':'Tidak Ada Pesan!'}`,
						style:`
							height:200px;
							display:flex;
							align-items:center;
							justify-content:center;
							padding:20px;
							text-align:center;
						`
					}))
				}else{
					app.userData[nav].forEach(async (bid,i)=>{
						const msgs = (await app.doglas.do(['database','privateChat',`${bid.roomId}/inbox`,'get'])).val()||[];	
						this.addChild(view[`${nav}Item`](i,bid,(i!==app.userData[nav].length-1)?false:true,msgs));
					})	
				}
			},
			onadded(){
				this.generateChat();
			}
		});
	},
	inboxItem(i,data,bt,msgs){
		//console.log(msgs);
		const Dot = '...';
		return makeElement('div',{
			className:'lines',
			innerHTML:`
				<div class=item>
					<div class=thumbnail style="
						background:white;
						margin-left:2%;
					">
						<img class=username src=${data.toProfile||app.noProfilePng} style="
							width:32px;
							height:32px;
							object-fit:cover;
							border-radius:50%;
						">
					</div>
					<div class=moreinfo>
						<div class=title>
							${msgs[msgs.length-1].msg.slice(0,20)+Dot}
						</div>
						<div class=addressinfo>
							<div class=date>${SmartTime(msgs[msgs.length-1].time)}</div>
						</div>
					</div>
					<div style="
						display:flex;
						justify-content:center;
						margin-right:2%;
					">
						<div style="
							padding: 5px;
					    background: whitesmoke;
					    border-radius: 50%;
					    cursor: pointer;
					    border:1px solid gainsboro;
						" id=morebutton>
							<img src=./more/media/moreicon.png style="
								width:24px;
								height:24px;
							">
						</div>
					</div>
				</div>
			`,
			onadded(){
				this.find('.title').onclick = ()=>{
					view.main.addChild(view.openPrivateChat(data));
				}
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',true,data.to);
				}
				this.find('#morebutton').onclick = ()=>{
					this.openMoreMenu();
				}
			},
			openMoreMenu(){
				view.main.addChild(view.moreMenuInbox(data));
			}
		})
	},
	bidItem(i,data,bt){
		const Dot = '...';
		return makeElement('div',{
			className:'lines',
			innerHTML:`
				<div class=item>
					<div class=thumbnail>
						<div>#${i+1}</div>
					</div>
					<div class=moreinfo>
						<div id=fee>
							${data.type} - ${data.type==='Jobs'?'Maks':'Min'} Bid Rp ${getPrice(data.fee)}
						</div>
						<div class=title>
							${data.subject.slice(0,100) + Dot}
						</div>
						<div class=addressinfo>
							<div>
								<img class=profileimg src=${data.owner===app.userData.uid?data.bidderProfileIdPic:data.profilepicture}>
							</div>
							<div class=username>${data.owner===app.userData.uid?data.bidder:data.ownerUsername},</div>
							<div class=date>${SmartTime(data.time)}</div>
						</div>
					</div>
					<div style="
						height:68px;
						width:30%;
						border-radius:10px;
						margin-right:5px;
					">
						<img src=${data.preview||'./more/media/nothumbnailnew.png'} style="
							height:100%;
							width:100%;
							object-fit:cover;
							border-radius:10px;
						">
					</div>
				</div>
			`,
			onadded(){
				this.find('.title').onclick = ()=>{
					view.main.addChild(view.openChatBid(data));
				}
				this.find('.username').onclick = ()=>{
					app.dataContent = data;
					view.addLoading();
					view.content.openProfile([],'home',false,data.owner===app.userData.uid?data.bidderProfileId:data.owner);
				}
			},
			onclick(){
				
			}
		})
	},
	openChatBid(data){
		return makeElement('div',{
			style:`
				position:absolute;
				width:100%;
				height:100%;
				top:0;
				left:0;
				display:flex;
				align-items:center;
				justify-content:flex-end;
				background:rgba(0, 0, 0, 0.4);
			`,
			innerHTML:`
				<div class=innerBox
				style="
					height:100%;
					background:white;
					display:flex;
					flex-direction:column;
				"
				>
					<div style="
						width: 100%;
						min-height: 77px;
						display: flex;
						align-items: center;
						justify-content: space-around;
						background:deepskyblue;
						color:white;
						border-bottom:1px solid gainsboro;
					">
						<div style="
							width:80%;
							display:flex;
							align-items:center;
							gap:10px;
							padding-left:5%;
						">
							<img src=./more/media/whiteloading.png style="
								width:32px;
								height:32px;
								object-fit:cover;
								border-radius:50%;
							">
							<div>
								<div>${data.subject.slice(0,30)+'...'}</div>
								<div>Rp ${getPrice(data.fee)} - ${data.type} - ${SmartTime(data.time)}</div>
							</div>
						</div>
						<div style="
							height: 100%;
							width: 64px;
							display: flex;
							align-items: center;
							justify-content: center;
						">
							<div id=closethis style="cursor:pointer;border-radius:10px;padding:10px;">
								<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
							</div>
						</div>
					</div>
					<div id=userActionBidder style="
				    padding: 2% 0;
				    background: whitesmoke;
				    display: ${data.owner===app.userData.uid?'flex':'none'};
				    gap: 8px;
				    justify-content: space-around;
					">
						<div id=hire style="
							padding: 10px;
					    background: green;
					    color: white;
					    width: 100%;
					    text-align: center;
							cursor:pointer;
							display: flex;
							align-items: center;
							gap: 8px;
							font-weight: bold;
							justify-content: center;
						">
						<img src=./more/media/correct.png
						style="
							width:24px;
							height:24px;
						"
						>Rekrut</div>
						<div id=reject style="
							padding: 10px;
					    background: red;
					    color: white;
					    width: 100%;
					    text-align: center;
							cursor:pointer;
							display: flex;
							align-items: center;
							gap: 8px;
							font-weight: bold;
							justify-content: center;
						">
						<img src=./more/media/closewhite.png
						style="
							width:24px;
							height:24px;
						"
						>
						Tolak</div>
					</div>
					<div style="
						width:90%;
						height:94%;
						background:whitesmoke;
						overflow:auto;
						padding:5%;
						scrollbar-color: gray whitesmoke;
						scrollbar-width: thin;
					" id=boxinbox>
						
					</div>
					<div style="
						width: 94%;
						border-top: 1px solid whitesmoke;
						display: none;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:5px;
						border-top:1px solid gainsboro;
					" id=embedfile>
						<div id=filename></div>
						<div>
							<div id=closeembedfile style=cursor:pointer;>
								<img src=./more/media/close.png style="
									width:16px;
									height:16px;
								">
							</div>
						</div>
					</div>
					<div style="
						width: 94%;
						border-top: 1px solid whitesmoke;
						display: none;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:10px;
						border-top:1px solid gainsboro;
					" id=embedphoto>
						<div id=preview style="
							width:100%;
							height:150px;
							background:whitesmoke;
							border-radius:20px;
							border:1px solid gainsboro;
						">
							<img src=./more/media/gemaprofile.png style="
								width:100%;
								height:100%;
								object-fit:contain;
							">
						</div>
						<div>
							<div id=closeembedphoto style=cursor:pointer;>
								<img src=./more/media/close.png style="
									width:16px;
									height:16px;
								">
							</div>
						</div>
					</div>
					<div style="
						width: 94%;
						/* height: 69px; */
						border-top: 1px solid whitesmoke;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:5px;
						position:relative;
						border-top:1px solid gainsboro;
					">
						<div style="
							background:white;
							width:100%;
							height:100%;
							position:absolute;
							top:0;left:0;
							display:none;
							align-items:center;
							justify-content:center;
						" id=sendingIndicator>
							<img src=./more/media/Loading_icon.gif style="
								width:64px;
								height:64px;
								object-fit:cover;
							"> <span id=text>Mengirim Pesan!</span>
						</div>
						<div style="
							width: 80%;
							/* height: 100%; */
							display: flex;
							align-items: center;
							justify-content: center;
							background: white;
							border-radius: 20px 0 0 20px;
							padding:10px;
							overflow:hidden;
						">
							<textarea style="
								background: white;
								border: none;
								border-radius: 20px 0 0 20px;
								min-height:40px;
								min-width:100%;
								max-width:100%;
							" id=msgbox placeholder="Masukan Teks Disini..."></textarea>
						</div>
						<div style="
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							/* background: whitesmoke; */
							/* border: 1px solid whitesmoke; */
							background: white;
							border-radius: 0 20px 20px 0;
						">
							<div style="cursor:pointer;
								padding:10px;
								background:white;border:1px solid whitesmoke;
								border-radius:10px;
							" id=sendbutton>
								<img src=./more/media/bluesend.png
								style="
									width:32px;
									height:32px;
								"
								>
							</div>
						</div>
						<div style="
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							/* background: whitesmoke; */
							/* border: 1px solid whitesmoke; */
							background: white;
							border-radius: 0 20px 20px 0;
						">
							<div style="cursor:pointer;
								padding:10px;
								background:whitesmoke;
								border-radius:10px;
								border:1px solid gainsboro;
							" id=attachfilebutton>
								<img src=./more/media/attachfile.png
								style="
									width:32px;
									height:32px;
								"
								>
							</div>
						</div>
					</div>
				</div>
			`,
			embedMedia(button){
				const parent = this;
				this.find('#boxinbox').addChild(makeElement('div',{
					style:`
						position: absolute;
						background: white;
						bottom: 0px;
						right: 0px;
						margin-bottom: 100px;
						margin-right: 10px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 15px 10px;
						gap: 10px;
						border-radius: 30px;
						border:1px solid gainsboro;
					`,
					innerHTML:`
						<div style="
							padding:5px;
							cursor:pointer;
						" id=sendphoto>
							<img src=./more/media/blueimage.png style="
								width:32;
								height:32;
							">
						</div>
						<div style="
							padding:5px;
							cursor:pointer;
						" id=senddocument>
							<img src=./more/media/bluedocument.png style="
								width:32;
								height:32;
							">
						</div>
						<div style="
							padding:5px;
							cursor:pointer;
						" id=closethis>
							<img src=./more/media/close.png style="
								width:16;
								height:16;
							">
						</div>
					`,
					onadded(){
						this.findall('div').forEach(div=>{
							if(div.id==='closethis')parent.closethispreview = div;
							div.onclick = ()=>{this[div.id]()};
						})
						button.hide();
					},
					closethis(){
						parent.filebutton.show('flex');
						this.remove();
					},
					senddocument(){
						const onload = ()=>{
							parent.file = this.input.files[0];
							parent.find('#filename').innerText = `File: ${parent.file.name.slice(0,50)}...`;
							parent.find('#embedfile').show('flex');
							this.closethis();
						}
						this.input = makeElement('input',{
							type:'file',
							accept:`application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
											text/plain, application/pdf
							`,
							onchange(){
								onload();
							}
						})
						this.input.click();
					},
					sendphoto(){
						const onload = ()=>{
							parent.file = this.input.files[0];
							const fs = new FileReader();
							fs.onload = ()=>{
								//show the div.
								parent.find('#embedphoto #preview img').src = fs.result;
								parent.find('#embedphoto').show('flex');
							}
							fs.readAsDataURL(parent.file);
							this.closethis();
						}
						this.input = makeElement('input',{
							type:'file',
							accept:`image/png,image/jpeg,image/gif,image/jpg`,
							onchange(){
								onload();
							}
						})
						this.input.click();
					}
				}))
			},
			collectData(){
				const msg = {
					from:app.userData.username,
					date:getFullDate(),
					time:getTime(),
					msg:this.msgbox.value,
					profilepicture:app.userData.profilepicture||app.noProfilePng,
					time:getTime(),
					id:app.userData.uid
				}
				return msg;
			},
			initUserActionToBidder(){
				this.findall('#userActionBidder div').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			hire(){
				//console.log('To Hire ',data);

				//1. add admin.
				//2. set status.
				//3. send notif to others bidder.



				//send notif to people who bidding.
				this.handleNotifToOthers();
			},
			async handleContinueRoom(winner,project){
				//console.log('the project is',project);
				//remove ineficience data.
				delete project.biddingList;
				delete project.bidder;
				delete project.winner;
				
				//getting admin data.
				const admins = (await app.doglas.do(['database','admin','','get'])).val()||{};
				console.log('admins data',admins);
				project.admin = objToArray(admins).getRandom().uid;
				console.log("the admin is ",project.admin);
				
				//updating admin notif.
				const adminNotifs = (await app.doglas.do(['database','admin',`${project.admin}/notif`,'get'])).val()||[];
				adminNotifs.push({
					profilepicture:app.noProfilePng,
					who:'Sistem',
					when:getFullDate(),
					what:`Anda terpilih sebagai admin ${project.type} ${project.title} dari ${project.owner}`
				})
				await app.doglas.do(['database','admin',`${project.admin}/notif`,'set',adminNotifs]);
				
				//set global room //onGoingRoom
				const roomId = getUniqueID();
				//console.log(roomId, 'is room id');
				project.OnGoingRoomId = roomId;
				project.bidderProfileId = winner;
				
				await app.doglas.do(['database','OnGoingRooms',roomId,'set',project]);
				//console.log('global room updateed');
				
				//sign the value of data to project.
				Object.assign(project,data);
				//console.log('the project is',project);
				
				
				//set room for owner.
				const ownerOnGoingProjects = (await app.doglas.do(['database','users',`${app.userData.uid}/onGoingProjects`,'get'])).val()||[];
				//console.log(ownerOnGoingProjects);
				ownerOnGoingProjects.push(project);
				await app.doglas.do(['database','users',`${app.userData.uid}/onGoingProjects`,'set',ownerOnGoingProjects]);

				//set room for the winner
				const winnerOnGoingProjects = (await app.doglas.do(['database','users',`${winner}/onGoingProjects`,'get'])).val()||[];
				//console.log(winnerOnGoingProjects);
				winnerOnGoingProjects.push(project);
				await app.doglas.do(['database','users',`${winner}/onGoingProjects`,'set',winnerOnGoingProjects]);
				
				//set statistic win project.
				let projectWon = (await app.doglas.do(['database','users',`${winner}/public/statistics/projectwon`,'get'])).val()||0;
				projectWon += 1;
				await app.doglas.do(['database','users',`${winner}/public/statistics/projectwon`,'set',projectWon]);
				
				//set statistic ongoing project.
				let ongoingproject = (await app.doglas.do(['database','users',`${winner}/public/statistics/ongoingproject`,'get'])).val()||0;
				ongoingproject += 1;
				await app.doglas.do(['database','users',`${winner}/public/statistics/ongoingproject`,'set',ongoingproject]);
				
				//set room for the admin
				//console.log('winner is',winner);
				const adminOnGoingProjects = (await app.doglas.do(['database','admin',`${project.admin}/OnGoingProjects`,'get'])).val()||[];
				//console.log(adminOnGoingProjects);
				adminOnGoingProjects.push(project);
				await app.doglas.do(['database','admin',`${project.admin}/OnGoingProjects`,'set',adminOnGoingProjects]);
			},
			async setWinner(param){
				await app.doglas.do(['database','post',`${data.type}/${data.postid}/winner`,'set',param]);
				//delete bid history.
				const biddingList = (await app.doglas.do(['database','post',`${data.type}/${data.postid}/biddingList`,'get'])).val()||[];
				//console.log('the list of bid ',biddingList);
				biddingList.forEach(async (bidId)=>{
					//console.log('removing bid data', bidId);
					await app.doglas.get(`bid/${data.type}/${bidId}`).remove();
				})
				const project = (await app.doglas.do(['database','post',`${data.type}/${data.postid}`,'get'])).val();
				
				//remove the project from post global. if type is jobs.
				if(data.type==='Jobs'){
					await app.doglas.do(['database','post',`${data.type}/${data.postid}`,'remove']);
				}
				//console.log('project deleted, post');


				//so far its ok.


				//now time to work on room.
				this.handleContinueRoom(param,project);
			},
			async handleNotifToOthers(){
				//give the indicator.
				const actionIndicator = view.actionIndicator(this);
				view.main.addChild(actionIndicator);
				actionIndicator.find('#text').innerHTML = `Memperoses Rekrutmen Kepada ${data.bidder} sebesar Rp ${getPrice(data.fee)}`;

				//getting peoples id.
				const bidders = (await app.doglas.do(['database','post',`${data.type}/${data.postid}/bidder`,'get'])).val()||[];
				//adding owner id also, we need owner bid also updated.
				bidders.push(app.userData.uid);
				//console.log(bidders);

				bidders.forEach(async bidder=>{
						
					//deleting the bid list from this user.
					const userBidList = (await app.doglas.do(['database','users',`${bidder}/bid`,'get'])).val()||{};
					const userNewBidList = {};
					for(let i in userBidList){
						if(userBidList[i].postid !== data.postid){
							userNewBidList[i] = userBidList[i];
						}
					}
					//console.log('User new bid ',userNewBidList);
					await app.doglas.do(['database','users',`${bidder}/bid`,'set',userNewBidList]);
					
					//get people notif list.
					const notifs = (await app.doglas.do(['database','users',`${bidder}/notif`,'get'])).val()||[];
					notifs.push({who:(bidder===app.userData.uid?'Kamu':app.userData.username),profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),
						what:`Telah menerima penawaran dari ${data.bidderProfileId===bidder?'Kamu':data.bidder} sebesar Rp ${getPrice(data.fee)}`
					});
					//adding notification to user notif list.
					await app.doglas.do(['database','users',`${bidder}/notif`,'set',notifs]);
					//console.log('Adding new notif');

				})

				//remove the projects out from the global db.
				this.setWinner(data.bidderProfileId);
				actionIndicator.find('#text').innerHTML = `Berhasil Menerima Bid Dari ${data.bidder} sebesar ${data.fee}`;
				//this.out();
			},
			async reject(){
				//give the indicator.
				const indicator = view.actionIndicator(this);
				view.main.addChild(indicator);
				await app.doglas.do(['database','bid',`${data.type}/${data.bidId}/reject`,'set','ok']);
				await app.doglas.do(['database','bid',`${data.type}/${data.bidId}`,'remove']);
				
				//for user.
				this.generateNewUserBidData();
				if(objlen(app.userData.bid)===0){
					await app.doglas.do(['database','users',`${app.userData.uid}/bid`,'remove']);
				}else{
					await app.doglas.do(['database','users',`${app.userData.uid}/bid`,'set',app.userData.bid]);
				}
				
				//for bidder
				const bidderBid = (await app.doglas.do(['database','users',`${data.bidderProfileId}/bid`,'get'])).val()||{};
				if(objlen(bidderBid)===0){
					await app.doglas.do(['database','users',`${data.bidderProfileId}/bid`,'remove']);
				}else{
					const bidderNewBid = {};
					for(let i in bidderBid){
						if(bidderBid[i].bidId !== data.bidId){
							bidderNewBid[i] = bidderBid[i];
						}
					}
					await app.doglas.do(['database','users',`${data.bidderProfileId}/bid`,'set',bidderNewBid]);
				}
				//notif
				this.handleNotifOwner(`${data.owner} menolak penawaran kamu sebesar Rp ${getPrice(data.fee)}`);
				this.handleNotifUser(`Kamu menolak penawaran dari ${data.bidder} sebesar Rp ${getPrice(data.fee)}`);
				indicator.find('#text').innerHTML = 'Bidder Berhasil Ditolak!';
			},
			async handleNotifOwner(what){
				let ownerNotif = (await app.doglas.do(['database','users',`${data.bidderProfileId}/notif`,'get'])).val()||[];
				ownerNotif.push({who:app.userData.username,profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what});
				if(ownerNotif.length>20){
					const newOwnerNotif = [];
					for(let i=0;i<10;i++){
						newOwnerNotif.push(ownerNotif[i+11]);
					}
					ownerNotif = newOwnerNotif;
				}
				await app.doglas.do(['database','users',`${data.bidderProfileId}/notif`,'set',ownerNotif]);
			},
			async handleNotifUser(what){
				let ownerNotif = (await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'get'])).val()||[];
				ownerNotif.push({who:'Kamu',profilepicture:app.userData.profilepicture||app.noProfilePng,when:getFullDate(),what});
				if(ownerNotif.length>20){
					const newOwnerNotif = [];
					for(let i=0;i<10;i++){
						newOwnerNotif.push(ownerNotif[i+11]);
					}
					ownerNotif = newOwnerNotif;
				}
				await app.doglas.do(['database','users',`${app.userData.uid}/notif`,'set',ownerNotif]);
			},
			generateNewUserBidData(){
				const bidData = [];
				if(app.userData.bid.length>0){
					app.userData.bid.forEach(bidId=>{
						if(bidId.bidId!==data.bidId){
							bidData.push(bidId);
						}
					})	
				}
				app.userData.bid = bidData;
			},
			moreMenuInit(){
				this.initUserActionToBidder();
			},
			initSendButton(){
				this.find('#sendbutton').onclick = ()=>{
					this.sendMsg();
				}
				this.filebutton.onclick = ()=>{
					this.embedMedia(this.filebutton);
				}
				//closefileembed
				this.find('#closeembedphoto').onclick = ()=>{
					this.embedphoto.hide();
					this.filebutton.show('flex');
				}
				this.find('#closeembedfile').onclick = ()=>{
					this.embedfile.hide();
					this.filebutton.show('flex');
				}
			},
			async sendMsg(){
				const msgData = this.collectData();
				if(msgData.msg.length===0 && !this.file)return;
				
				//give the indicator.
				this.sendingIndicator.show('flex');

				if(this.file){
					//hiding the close button on file preview.
					//console.log(this.closethispreview);
					if(this.closethispreview){
						this.closethispreview.hide();
					}
					//setting the indicator.
					this.sendingIndicator.find('#text').innerText = 'Mengupload File!';
					//console.log('uploading file', this.file);
					const file = await app.doglas.save([this.file.name,this.file,this.file.contentType]);
					const url = await file.ref.getDownloadURL();
					if(url){
						this.sendingIndicator.find('#text').innerText = 'Mengirim Pesan!';
					}
					msgData.file = {
						url,type:this.file.type,
						name:this.file.name,size:this.file.size
					}
					if(msgData.file.type.split('/')[0]==='image'){
						this.embedphoto.hide();
					}else this.embedfile.hide();
				}
				
				//send the msg to the server.
				const inbox = (await app.doglas.do(['database','bid',`${data.type}/${data.bidId}/inbox`,'get'])).val();
				inbox.push(msgData);
				const result = await app.doglas.do(['database','bid',`${data.type}/${data.bidId}/inbox`,'set',inbox]);
				this.putMsg(msgData);
				this.filebutton.show('flex');
				this.file = null;
				//set msgbox value to zero.
				this.msgbox.value = '';

				//hide the sending indicator.
				this.sendingIndicator.hide();
			},
			downKeys:[],
			initEnterSend(){
				this.msgbox.onkeydown = (e)=>{
					if(!this.downKeys.includes(e.key))this.downKeys.push(e.key);
					if(this.downKeys.includes('Enter') && !this.downKeys.includes('Shift')){
						this.sendMsg();
					}
				}
				this.msgbox.onkeyup = (e)=>{
					this.downKeys.pop();
				}
			},
			handleRejectMsg(){
				const indicator = view.actionIndicator(this);
				indicator.find('#topTitle').innerHTML = 'Notifikasi';
				indicator.find('#text').innerHTML = 'Owner Menolak Tawaran Anda';
				view.main.addChild(indicator);
			},
			handleWinMsg(winner){
				const indicator = view.actionIndicator(this);
				indicator.find('#topTitle').innerHTML = 'Notifikasi';
				indicator.find('#text').innerHTML = `Owner Menerima Tawaran ${winner}`;
				view.main.addChild(indicator);
			},
			async removeMyBid(){
				await app.doglas.get(`bid/${data.type}/${data.bidId}`).remove();
				//console.log('Lose, deleting my own bid data');
			},
			listen(){
				app.doglas.get(`bid/${data.type}/${data.bidId}/inbox`).on('value',(x)=>{
					const data = x.val();
					if(!data)return;
					if(data[data.length-1].id!==app.userData.uid){
						this.putMsg(data[data.length-1]);
					}
				})
				if(data.bidderProfileId===app.userData.uid){
					app.doglas.get(`bid/${data.type}/${data.bidId}/reject`).on('value',(x)=>{
						const rejected = x.val();
						//console.log(rejected);
						if(rejected==='unset' || !rejected)return;
						this.handleRejectMsg();
						app.doglas.get(`bid/${data.type}/${data.bidId}/reject`).off('value');
						//remove the listener for the project.
						app.doglas.get(`post/${data.type}/${data.postid}/winner`).off('value');
					})
					app.doglas.get(`post/${data.type}/${data.postid}/winner`).on('value',(x)=>{
						const winner = x.val();
						//console.log(winner);
						if(winner==='unset' || !winner)return;
						if(winner===app.userData.uid){
							this.handleWinMsg('Anda');
						}else{
							this.handleWinMsg(winner);
						}
						app.doglas.get(`post/${data.type}/${data.postid}/winner`).off('value');
					})	
				}
			},
			removeListen(){
				app.doglas.get(`bid/${data.type}/${data.bidId}/inbox`).off('value');
				app.doglas.get(`bid/${data.type}/${data.bidId}/reject`).off('value');
				app.doglas.get(`post/${data.type}/${data.postid}/winner`).off('value');
			},
			init(){
				this.boxinbox = this.find('#boxinbox');
				this.msgbox = this.find('#msgbox');
				this.sendingIndicator = this.find('#sendingIndicator');
				this.showInboxInit();
				this.initSendButton();
				this.initEnterSend();
				this.moreMenuInit();
				setTimeout(()=>{this.listen()},2000);
			},
			async showInboxInit(){
				const inbox = (await app.doglas.do(['database','bid',`${data.type}/${data.bidId}/inbox`,'get'])).val()||[];
				inbox.forEach((item)=>{
					this.putMsg(item);
				})
			},
			putMsg(msg){
				if(this.puttedMsg && this.puttedMsg.time === msg.time)return;
				this.boxinbox.addChild(this.inboxItem(msg));
				this.puttedMsg = msg;
			},
			onCloseClickded(){
				this.removeListen();
				view.content.openInbox([],'bid',true);
				this.remove();
			},
			onadded(){
				//close event.
				this.find('#closethis').onclick = ()=>{this.onCloseClickded()};
				this.embedphoto = this.find('#embedphoto');
				this.embedfile = this.find('#embedfile');
				this.filebutton = this.find('#attachfilebutton');
				this.init();
			},
			inboxItem(item){
				const parent = this;
				return makeElement('div',{
					style:`
						display:flex;
						flex-direction:column;
						align-items:${item.id===app.userData.uid?'flex-end':'flex-start'};
						width:100%;
						gap:5px;
						margin-bottom:15px;
					`,
					innerHTML:`
						<div style="
							display:flex;
						">
							<div style="
								background:white;
								color:black;
								padding:10px;
								font-weight:bold;
								border:1px solid gainsboro;
								border-radius:${item.id===app.userData.uid?'20px 0 20px 20px':'0 20px 20px 20px'};
							">
								<div id=fileembed style="
									display:${item.file?item.file.type.split('/')[0]==='image'?'none':'flex':'none'};
									gap:10px;
									align-items:center;
									justify-content:space-between;
									margin-bottom:10px;
									border-bottom:2px solid ${item.id===app.userData.uid?'whitesmoke':'white'};
									padding-bottom:10px;
								">
									<div style="
										padding: 10px;
										background: whitesmoke;
										border-radius: 10px;
										color:black;
										border:1px solid gainsboro;
									" id=filex>
									-
									</div>
									<div>
										${item.file?item.file.name?item.file.name.slice(0,10):'':''}...
									</div>
									<div>
										<div style="
											padding:5px;
											border-radius:10px;
											cursor:pointer;
											background:whitesmoke;
											border:1px solid gainsboro;
										" id=downloadbutton>
											<img src=./more/media/downloadmedia.png style="
												width:24;
												height:24;
											">
										</div>
									</div>
								</div>
								<div id=photoembed style="
									display:${item.file?item.file.type.split('/')[0]==='image'?'flex':'none':'none'};
									width:100%;
									height:150px;
									margin-bottom:10px;
									border-radius:20px;
									background:whitesmoke;
									overflow:hidden;
									cursor:pointer;
								">
									<img src="${item.file?item.file.url:''}" style="
										width:100%;
										height:100%;
										object-fit:contain;
									" id=imgpreviewbutton>
								</div>
								${item.msg.length>0?item.msg.replaceAll('\n','<br>'):''}
							</div>
						</div>
						<div><span style=font-size:10px;>${SmartTime(item.time)}</span></div>
					`,
					onadded(){
						this.scrollIntoView();
						this.find('#downloadbutton').onclick = ()=>{this.setupDownload()};
						this.find('#imgpreviewbutton').onclick = ()=>{this.bigPreview()};
						if(item.file){
							const spliteditem = item.file.name.split('.');
							this.find('#filex').innerText = spliteditem[spliteditem.length-1];
							//console.log(spliteditem);
						}
					},
					setupDownload(){
						if(item.file && item.file.url)open(item.file.url,'_blank');
					},
					bigPreview(){
						view.main.addChild(view.bigImgPreview(item.file.url));
					}
				})
			}
		})
	},
	OnGoingChat(data,customCloseThis){
		return makeElement('div',{
			style:`
				position:absolute;
				width:100%;
				height:100%;
				top:0;
				left:0;
				display:flex;
				align-items:center;
				justify-content:flex-end;
				background:rgba(0, 0, 0, 0.4);
				z-index:1;
			`,
			innerHTML:`
				<div class=innerBox
				style="
					height:100%;
					background:white;
					display:flex;
					flex-direction:column;
					position:relative;
				" id=parent
				>
					<div style="
						width: 100%;
						min-height: 77px;
						display: flex;
						align-items: center;
						justify-content: space-around;
						background:deepskyblue;
						color:white;
						border-bottom:1px solid gainsboro;
					">
						<div style="
							width:80%;
							display:flex;
							align-items:center;
							gap:10px;
							padding-left:5%;
						">
							<img src=./more/media/whiteloading.png style="
								width:32px;
								height:32px;
								object-fit:cover;
								border-radius:50%;
							">
							<div>
								<div>${data.subject.slice(0,30)+'...'}</div>
								<div>Rp ${getPrice(data.fee)} - ${data.type} - ${SmartTime(data.time)}</div>
							</div>
						</div>
						<div style="
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
						">
							<div id=moremenu style="cursor:pointer;
								border-radius:50%;
							">
								<img src=./more/media/info.png class=navimg style=width:32;height:32;>
							</div>
						</div>
						<div style="
							height: 100%;
							width: 64px;
							display: flex;
							align-items: center;
							justify-content: center;
						">
							<div id=closethis style="cursor:pointer;">
								<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
							</div>
						</div>
					</div>
					<div style="
						width:90%;
						height:94%;
						background:whitesmoke;
						overflow:auto;
						padding:5%;
						  scrollbar-color: gray whitesmoke;
						  scrollbar-width: thin;
					" id=boxinbox>
						
					</div>

					<div style="
						width: 94%;
						border-top: 1px solid whitesmoke;
						display: none;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:5px;
						border-top:1px solid gainsboro;
					" id=embedfile>
						<div id=filename></div>
						<div>
							<div id=closeembedfile style=cursor:pointer;>
								<img src=./more/media/close.png style="
									width:16px;
									height:16px;
								">
							</div>
						</div>
					</div>
					<div style="
						width: 94%;
						border-top: 1px solid whitesmoke;
						display: none;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:10px;
						border-top:1px solid gainsboro;
					" id=embedphoto>
						<div id=preview style="
							width:100%;
							height:150px;
							background:whitesmoke;
							border-radius:20px;
							border:1px solid gainsboro;
						">
							<img src=./more/media/gemaprofile.png style="
								width:100%;
								height:100%;
								object-fit:contain;
							">
						</div>
						<div>
							<div id=closeembedphoto style=cursor:pointer;>
								<img src=./more/media/close.png style="
									width:16px;
									height:16px;
								">
							</div>
						</div>
					</div>
					<div style="
						width: 94%;
						/* height: 69px; */
						border-top: 1px solid whitesmoke;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:5px;
						position:relative;
						border-top:1px solid gainsboro;
					">
						<div style="
							background:white;
							width:100%;
							height:100%;
							position:absolute;
							top:0;left:0;
							display:none;
							align-items:center;
							justify-content:center;
						" id=sendingIndicator>
							<img src=./more/media/Loading_icon.gif style="
								width:64px;
								height:64px;
								object-fit:cover;
							"> <span id=text>Mengirim Pesan!</span>
						</div>
						<div style="
							width: 80%;
							/* height: 100%; */
							display: flex;
							align-items: center;
							justify-content: center;
							background: white;
							border-radius: 20px 0 0 20px;
							padding:10px;
							overflow:hidden;
						">
							<textarea style="
								background: white;
								border: none;
								border-radius: 20px 0 0 20px;
								min-height:40px;
								min-width:100%;
								max-width:100%;
							" id=msgbox placeholder="Masukan Teks Disini..."></textarea>
						</div>
						<div style="
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							/* background: whitesmoke; */
							/* border: 1px solid whitesmoke; */
							background: white;
							border-radius: 0 20px 20px 0;
						">
							<div style="cursor:pointer;
								padding:10px;
								border:1px solid whitesmoke;
								border-radius:10px;
							" id=sendbutton>
								<img src=./more/media/bluesend.png
								style="
									width:32px;
									height:32px;
								"
								>
							</div>
						</div>
						<div style="
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							/* background: whitesmoke; */
							/* border: 1px solid whitesmoke; */
							background: white;
							border-radius: 0 20px 20px 0;
						">
							<div style="cursor:pointer;
								padding:10px;
								background:whitesmoke;
								border-radius:10px;
								border:1px solid gainsboro;
							" id=attachfilebutton>
								<img src=./more/media/attachfile.png
								style="
									width:32px;
									height:32px;
								"
								>
							</div>
						</div>
					</div>
				</div>
			`,
			embedMedia(button){
				const parent = this;
				this.find('#boxinbox').addChild(makeElement('div',{
					style:`
						position: absolute;
						background: white;
						bottom: 0px;
						right: 0px;
						margin-bottom: 100px;
						margin-right: 10px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 15px 10px;
						gap: 10px;
						border-radius: 30px;
						border:1px solid gainsboro;
					`,
					innerHTML:`
						<div style="
							padding:5px;
							cursor:pointer;
						" id=sendphoto>
							<img src=./more/media/blueimage.png style="
								width:32;
								height:32;
							">
						</div>
						<div style="
							padding:5px;
							cursor:pointer;
						" id=senddocument>
							<img src=./more/media/bluedocument.png style="
								width:32;
								height:32;
							">
						</div>
						<div style="
							padding:5px;
							cursor:pointer;
						" id=closethis>
							<img src=./more/media/close.png style="
								width:16;
								height:16;
							">
						</div>
					`,
					onadded(){
						this.findall('div').forEach(div=>{
							if(div.id==='closethis')parent.closethispreview = div;
							div.onclick = ()=>{this[div.id]()};
						})
						button.hide();
					},
					closethis(){
						parent.filebutton.show('flex');
						this.remove();
					},
					senddocument(){
						const onload = ()=>{
							parent.file = this.input.files[0];
							parent.find('#filename').innerText = `File: ${parent.file.name.slice(0,50)}...`;
							parent.find('#embedfile').show('flex');
							this.closethis();
						}
						this.input = makeElement('input',{
							type:'file',
							accept:`application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
											text/plain, application/pdf
							`,
							onchange(){
								onload();
							}
						})
						this.input.click();
					},
					sendphoto(){
						const onload = ()=>{
							parent.file = this.input.files[0];
							const fs = new FileReader();
							fs.onload = ()=>{
								//show the div.
								parent.find('#embedphoto #preview img').src = fs.result;
								parent.find('#embedphoto').show('flex');
							}
							fs.readAsDataURL(parent.file);
							this.closethis();
						}
						this.input = makeElement('input',{
							type:'file',
							accept:`image/png,image/jpeg,image/gif,image/jpg`,
							onchange(){
								onload();
							}
						})
						this.input.click();
					}
				}))
			},
			collectData(){
				const msg = {
					from:app.userData.username,
					date:getFullDate(),
					time:getTime(),
					msg:this.msgbox.value,
					profilepicture:app.userData.profilepicture||app.noProfilePng,
					time:getTime(),
					id:app.userData.uid
				}
				return msg;
			},
			initUserActionToBidder(){
				this.findall('#userActionBidder div').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			moreMenuInit(){
				//this.initUserActionToBidder();
				this.find('#moremenu').onclick = async ()=>{
					this.parent.addChild(view.openLoading());
					//getting the newest data.
					Object.assign(data,(await app.doglas.do(['database','OnGoingRooms',`${data.OnGoingRoomId}`,'get'])).val()||{});
					view.main.addChild(view.moremenubid(data));
					this.parent.saveRemove('#openloading');
				}
			},
			initSendButton(){
				this.find('#sendbutton').onclick = ()=>{
					this.sendMsg();
				}
				this.filebutton.onclick = ()=>{
					this.embedMedia(this.filebutton);
				}
				//closefileembed
				this.find('#closeembedphoto').onclick = ()=>{
					this.embedphoto.hide();
					this.filebutton.show('flex');
				}
				this.find('#closeembedfile').onclick = ()=>{
					this.embedfile.hide();
					this.filebutton.show('flex');
				}
			},
			async sendMsg(){

				const msgData = this.collectData();
				if(msgData.msg.length===0 && !this.file)return;
				
				//give the indicator.
				this.sendingIndicator.show('flex');

				if(this.file){
					//hiding the close button on file preview.
					//console.log(this.closethispreview);
					if(this.closethispreview){
						this.closethispreview.hide();
					}
					//setting the indicator.
					this.sendingIndicator.find('#text').innerText = 'Mengupload File!';
					//console.log('uploading file', this.file);
					const file = await app.doglas.save([this.file.name,this.file,this.file.contentType]);
					const url = await file.ref.getDownloadURL();
					if(url){
						this.sendingIndicator.find('#text').innerText = 'Mengirim Pesan!';
					}
					msgData.file = {
						url,type:this.file.type,
						name:this.file.name,size:this.file.size
					}
					if(msgData.file.type.split('/')[0]==='image'){
						this.embedphoto.hide();
					}else this.embedfile.hide();
				}
				
				//send the msg to the server.
				const inbox = (await app.doglas.do(['database','OnGoingRooms',`${data.OnGoingRoomId}/inbox`,'get'])).val()||[];
				inbox.push(msgData);
				const result = await app.doglas.do(['database','OnGoingRooms',`${data.OnGoingRoomId}/inbox`,'set',inbox]);
				this.putMsg(msgData);
				this.filebutton.show('flex');
				this.file = null;
				//set msgbox value to zero.
				this.msgbox.value = '';

				//hide the sending indicator.
				this.sendingIndicator.hide();
			},
			downKeys:[],
			initEnterSend(){
				this.msgbox.onkeydown = (e)=>{
					if(!this.downKeys.includes(e.key))this.downKeys.push(e.key);
					if(this.downKeys.includes('Enter') && !this.downKeys.includes('Shift')){
						this.sendMsg();
					}
				}
				this.msgbox.onkeyup = (e)=>{
					this.downKeys.pop();
				}
			},
			removeListen(){
				app.doglas.get(`OnGoingRooms/${data.OnGoingRoomId}/inbox`).off('value');
			},
			listen(){
				app.doglas.get(`OnGoingRooms/${data.OnGoingRoomId}/inbox`).on('value',(x)=>{
					const data = x.val();
					if(!data)return;
					if(data[data.length-1].id!==app.userData.uid){
						this.putMsg(data[data.length-1]);
					}
				})
				app.doglas.get(`OnGoingRooms`).on('child_removed',(x)=>{
					const data = x.val();
					console.log(date);
				})
			},
			init(){
				this.boxinbox = this.find('#boxinbox');
				this.msgbox = this.find('#msgbox');
				this.sendingIndicator = this.find('#sendingIndicator');
				this.showInboxInit();
				this.initSendButton();
				this.initEnterSend();
				this.moreMenuInit();
				setTimeout(()=>{this.listen()},2000);
			},
			async showInboxInit(){
				const inbox = (await app.doglas.do(['database','OnGoingRooms',`${data.OnGoingRoomId}/inbox`,'get'])).val()||[];
				inbox.forEach((item)=>{
					this.putMsg(item);
				})
			},
			putMsg(msg){
				if(this.puttedMsg && this.puttedMsg.time === msg.time)return;
				this.boxinbox.addChild(this.inboxItem(msg));
				this.puttedMsg = msg;
			},
			onCloseClickded(){
				if(customCloseThis){
					customCloseThis();
				}else view.content.openInbox();
				this.remove();
			},
			onadded(){
				//close event.
				this.find('#closethis').onclick = ()=>{this.onCloseClickded()};
				this.embedphoto = this.find('#embedphoto');
				this.embedfile = this.find('#embedfile');
				this.filebutton = this.find('#attachfilebutton');
				this.parent = this.find('#parent');
				this.init();
			},
			getRole(item){
				let role = '';
				if(item.id===data.admin)role='Admin';
				else if(item.id===data.owner)role='Owner';
				else if(item.id===data.bidderProfileId)role='Worker';
				return role;
			},
			inboxItem(item){
				const role = this.getRole(item);
				const parent = this;
				return makeElement('div',{
					style:`
						display:flex;
						flex-direction:column;
						align-items:${item.id===app.userData.uid?'flex-end':'flex-start'};
						width:100%;
						gap:5px;
						margin-bottom:15px;
					`,
					innerHTML:`
						<div style="font-weight:bold;${!this.puttedMsg?'':this.puttedMsg.from===item.from?'display:none;':''}"><span class=username>@${item.from}: ${role}</span></div>
						<div style="
							display:flex;
						">
							<div style="
								padding:8px;
								width:32px;
								height:32px;
								border-radius:50%;
								background:whitesmoke;
								display:${item.id===app.userData.uid?'none':'block'};
							">
								<img src=${item.profilepicture} style="
									width:100%;
									height:100%;
									border-radius:50%;x
									object-fit:cover;
									${!this.puttedMsg?'':this.puttedMsg.id===item.id?'display:none;':''}
								">
							</div>
							<div style="
								background:white;
								color:black;
								padding:10px;
								font-weight:bold;
								border:1px solid gainsboro;
								border-radius:${item.id===app.userData.uid?'20px 0 20px 20px':'0 20px 20px 20px'};
							">
								<div id=fileembed style="
									display:${item.file?item.file.type.split('/')[0]==='image'?'none':'flex':'none'};
									gap:10px;
									align-items:center;
									justify-content:space-between;
									margin-bottom:10px;
									border-bottom:2px solid ${item.id===app.userData.uid?'whitesmoke':'white'};
									padding-bottom:10px;
								">
									<div style="
										padding: 10px;
										background: whitesmoke;
										border-radius: 10px;
										color:black;
										border:1px solid gainsboro;
									" id=filex>
									-
									</div>
									<div>
										${item.file?item.file.name?item.file.name.slice(0,10):'':''}...
									</div>
									<div>
										<div style="
											padding:5px;
											border-radius:10px;
											cursor:pointer;
											background:whitesmoke;
											border:1px solid gainsboro;
										" id=downloadbutton>
											<img src=./more/media/downloadmedia.png style="
												width:24;
												height:24;
											">
										</div>
									</div>
								</div>
								<div id=photoembed style="
									display:${item.file?item.file.type.split('/')[0]==='image'?'flex':'none':'none'};
									width:100%;
									height:150px;
									margin-bottom:10px;
									border-radius:20px;
									background:whitesmoke;
									overflow:hidden;
									cursor:pointer;
								">
									<img src="${item.file?item.file.url:''}" style="
										width:100%;
										height:100%;
										object-fit:contain;
									" id=imgpreviewbutton>
								</div>
								${item.msg.length>0?item.msg.replaceAll('\n','<br>'):''}
							</div>

							<div style="
								padding:8px;
								border-radius:50%;
								background:whitesmoke;
								width:32px;
								height:32px;
								display:${item.id===app.userData.uid?'block':'none'};
							">
								<img src=${item.profilepicture} style="
									width:100%;
									height:100%;
									border-radius:50%;
									object-fit:cover;
									${!this.puttedMsg?'':this.puttedMsg.id===item.id?'display:none;':''}
								">
							</div>
						</div>
						<div style="
							margin-${item.id===app.userData.uid?'right':'left'}:48px;
						"><span style=font-size:10px;>${SmartTime(item.time)}</span></div>
					`,
					onadded(){
						this.scrollIntoView();
						this.find('#downloadbutton').onclick = ()=>{this.setupDownload()};
						this.find('#imgpreviewbutton').onclick = ()=>{this.bigPreview()};
						this.find('.username').onclick = ()=>{
							view.addLoading();
							view.content.openProfile([],'home',false,item.id);
							parent.remove();
						}
						if(item.file){
							const spliteditem = item.file.name.split('.');
							this.find('#filex').innerText = spliteditem[spliteditem.length-1];
							//console.log(spliteditem);
						}
					},
					setupDownload(){
						if(item.file && item.file.url)open(item.file.url,'_blank');
					},
					bigPreview(){
						view.main.addChild(view.bigImgPreview(item.file.url));
					}
				})
			}
		})
	},
	moremenubid(data){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:flex-start;
				justify-content:flex-end;
				background:#00000040;
				z-index:1;
			`,
			innerHTML:`
				<div style="
					background:white;
					height:100%;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						background:whitesmoke;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						">
							Project Info
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/close.png class=navimg style=width:16px;height:16px;>
						</div>
					</div>
					<div id=hiredMsg style="display:none;padding:20px;">
						<div>Berhasil menerima pembidder, silahkan lanjutkan percakapan atau aktifitas lain</div>
					</div>
					<div id=rejectedMsg style="display:none;padding:20px;">
						<div>Berhasil mereject pembidder, pembidder akan diblock untuk kembali membidder dan percakapan sebelumnya akan di hapus</div>
					</div>
					<div style="
						    padding: 20px;
								display: flex;
								flex-direction: column;
								gap: 5px
					">
						<div><b>Admin</b></div>
						<div>
							<input value=${data.admin} readonly>
						</div>
						<div><b>Owner</b></div>
						<div>
							<input value=${data.username} readonly>
						</div>
						<div><b>Bidder</b></div>
						<div>
							<input value=${data.bidder} readonly>
						</div>
						<div><b>Fee</b></div>
						<div>
							<input value="Rp ${getPrice(data.fee)}" readonly>
						</div>
						<div><b>Status</b></div>
						<div>
							<input value="${data.finished?'Selesai':'Sedang Berlangsung'}" readonly>
						</div>
						<div><b>Status Pembayaran</b></div>
						<div>
							<input value="${data.paid?'Dibayar':'Belum Dibayar'}" readonly>
						</div>
					</div>
					<div style="
						padding:20px;
						display:none;
						justify-content:center;
						gap:10px;
					" id=buttonsMenu>
						<div
						style="
							width:94%;
							height:100%;
							display:flex;
							align-items:center;
							gap:8px;
							justify-content:space-around;
							flex-direction:column;
						"
						>
							<div><b>Admin Kontrol</b></div>
							<div style="width:100%">
								<div class="button buttonstyled" style="
									border-radius:20px;display:flex;
									align-items:center;gap:5px;justify-content:center;
									background:green;color:white;
								" id=hire>
									<img src=./more/media/hired.png
										style="
											width:16px;
											height:16px;
										"
									>Selesai</div>
							</div>
							<div style="width:100%">
								<div class="button buttonstyled" style="
									border-radius:20px;display:flex;
									align-items:center;gap:5px;
									justify-content:center;
									background:red;color:white;
								" id=reject>
									<img src=./more/media/rejection.png
										style="
											width:16px;
											height:16px;
										"
									>Batalkan</div>
							</div>
						</div>
					</div>
				</div>
			`,
			buttonsEvent(){
				this.findall('.button').forEach(button=>{
					button.onclick = ()=>{this[button.id]()};
				})
			},
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()}
				this.buttonsMenu = this.find('#buttonsMenu');
				this.buttonsEvent();
			},
			hire(){
				//console.log('To Hire ',data);
				this.buttonsMenu.changeTo(this.find('#hiredMsg'),'flex');
			},
			async reject(){
				//console.log('To Reject ',data);
				const deleteR = await app.doglas.do(['database','bid',`${data.type}/${data.bidId}`,'remove']);
				//console.log(deleteR);
				//for user.
				this.generateNewUserBidData();
				//console.log(app.userData.bid);
				const saveBidUser = await app.doglas.do(['database','users',`${data.bidderProfileId}/bid`,'update',app.userData.bid]);
				//console.log(saveBidUser);
			},
			generateNewUserBidData(){
				const bidData = [];
				if(app.userData.bid.length>0){
					app.userData.bid.forEach(bidId=>{
						//console.log(bidId);
						if(bidId.bidId!=data.bidId)bidData.push(bidId);
					})	
				}
				app.userData.bid = bidData;
			}
		})
	},
	actionIndicator(chatpage){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				position:absolute;
				z-index:1;
				display:flex;
				align-items:flex-start;
				justify-content:flex-end;
				background:#00000040;
			`,
			innerHTML:`
				<div style="
					border-radius:0 0 20px 20px;
					background:white;
				" class=innerBox>
					<div style="
						width:94%;
						display:flex;
						justify-content:space-between;
						padding:0 3%;
						height:77px;
						align-items:center;
						background:whitesmoke;
					">
						<div style="
							font-family:montserratbold;
							margin-left:5px;
						" id=topTitle>
							Loading...
						</div>
						<div id=closethis style="cursor:pointer;">
							<img src=./more/media/close.png class=navimg style=width:16px;height:16px;>
						</div>
					</div>
					<div style="
						padding:20px;
						display:flex;
						justify-content:center;
						gap:10px;
					">
						<div id=text>
							Memproses Penolakan.
						</div>
					</div>
				</div>
			`,
			onadded(){
				this.find('#closethis').onclick = ()=>{
					chatpage.remove();
					view.content.openInbox([],'bid',true);
					this.remove();
				}
			}
		})
	},
	globalChat(customCloseThis){
		return makeElement('div',{
			style:`
				position:absolute;
				width:100%;
				height:100%;
				top:0;
				left:0;
				display:flex;
				align-items:center;
				justify-content:flex-end;
				background:#00000066;
				z-index:1;
			`,
			innerHTML:`
				<div class=innerBox
				style="
					height:100%;
					background:white;
					display:flex;
					flex-direction:column;
				"
				>
					<div style="
						width: 100%;
						min-height: 77px;
						display: flex;
						align-items: center;
						justify-content: space-around;
						background:deepskyblue;
						color:white;
						border-bottom:1px solid gainsboro;
					">
						<div style="
							width:80%;
							display:flex;
							align-items:center;
							gap:10px;
							padding-left:5%;
						">
							<img src=./more/media/whiteglobe.png style="
								width:32px;
								height:32px;
								object-fit:cover;
								border-radius:50%;
							">
							<div>Pasarin Forum</div>
						</div>
						<div style="
							height: 100%;
							width: 64px;
							display: flex;
							align-items: center;
							justify-content: center;
						">
							<div id=closethis style="cursor:pointer;border-radius:10px;padding:10px;">
								<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
							</div>
						</div>
					</div>
					<div style="
						width:90%;
						height:94%;
						background:whitesmoke;
						overflow:auto;
						padding:5%;
						  scrollbar-color: gray whitesmoke;
						  scrollbar-width: thin;
					" id=boxinbox>
						
					</div>
					<div style="
						width: 94%;
						border-top: 1px solid whitesmoke;
						display: none;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:5px;
						border-top:1px solid gainsboro;
					" id=embedfile>
						<div id=filename></div>
						<div>
							<div id=closeembedfile style=cursor:pointer;>
								<img src=./more/media/close.png style="
									width:16px;
									height:16px;
								">
							</div>
						</div>
					</div>
					<div style="
						width: 94%;
						border-top: 1px solid whitesmoke;
						display: none;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:10px;
						border-top:1px solid gainsboro;
					" id=embedphoto>
						<div id=preview style="
							width:100%;
							height:150px;
							background:whitesmoke;
							border-radius:20px;
							border:1px solid gainsboro;
						">
							<img src=./more/media/gemaprofile.png style="
								width:100%;
								height:100%;
								object-fit:contain;
							">
						</div>
						<div>
							<div id=closeembedphoto style=cursor:pointer;>
								<img src=./more/media/close.png style="
									width:16px;
									height:16px;
								">
							</div>
						</div>
					</div>
					<div style="
						width: 94%;
						/* height: 69px; */
						border-top: 1px solid whitesmoke;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:5px;
						position:relative;
						border-top:1px solid gainsboro;
					">
						<div style="
							background:white;
							width:100%;
							height:100%;
							position:absolute;
							top:0;left:0;
							display:none;
							align-items:center;
							justify-content:center;
						" id=sendingIndicator>
							<img src=./more/media/Loading_icon.gif style="
								width:64px;
								height:64px;
								object-fit:cover;
							"> <span id=text>Mengirim Pesan!</span>
						</div>
						<div style="
							width: 80%;
							/* height: 100%; */
							display: flex;
							align-items: center;
							justify-content: center;
							background: white;
							border-radius: 20px 0 0 20px;
							padding:10px;
							overflow:hidden;
						">
							<textarea style="
								background: white;
								border: none;
								border-radius: 20px 0 0 20px;
								min-height:40px;
								max-width:100%;
								min-width:100%;
							" id=msgbox placeholder="Masukan Teks Disini..."></textarea>
						</div>
						<div style="
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							/* background: whitesmoke; */
							/* border: 1px solid whitesmoke; */
							background: white;
							border-radius: 0 20px 20px 0;
						">
							<div style="cursor:pointer;
								padding:10px;
								background:white;
								border:1px solid whitesmoke;
								border-radius:10px;
							" id=sendbutton>
								<img src=./more/media/bluesend.png
								style="
									width:32px;
									height:32px;
								"
								>
							</div>
						</div>
						<div style="
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							/* background: whitesmoke; */
							/* border: 1px solid whitesmoke; */
							background: white;
							border-radius: 0 20px 20px 0;
						">
							<div style="cursor:pointer;
								padding:10px;
								background:whitesmoke;
								border-radius:10px;
								border:1px solid gainsboro;
							" id=attachfilebutton>
								<img src=./more/media/attachfile.png
								style="
									width:32px;
									height:32px;
								"
								>
							</div>
						</div>
					</div>
				</div>
			`,
			embedMedia(button){
				const parent = this;
				this.find('#boxinbox').addChild(makeElement('div',{
					style:`
						position: absolute;
						background: white;
						bottom: 0px;
						right: 0px;
						margin-bottom: 100px;
						margin-right: 10px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 15px 10px;
						gap: 10px;
						border-radius: 30px;
						border:1px solid gainsboro;
					`,
					innerHTML:`
						<div style="
							padding:5px;
							cursor:pointer;
						" id=sendphoto>
							<img src=./more/media/blueimage.png style="
								width:32;
								height:32;
							">
						</div>
						<div style="
							padding:5px;
							cursor:pointer;
						" id=senddocument>
							<img src=./more/media/bluedocument.png style="
								width:32;
								height:32;
							">
						</div>
						<div style="
							padding:5px;
							cursor:pointer;
						" id=closethis>
							<img src=./more/media/close.png style="
								width:16;
								height:16;
							">
						</div>
					`,
					onadded(){
						this.findall('div').forEach(div=>{
							if(div.id==='closethis')parent.closethispreview = div;
							div.onclick = ()=>{this[div.id]()};
						})
						button.hide();
					},
					closethis(){
						parent.filebutton.show('flex');
						this.remove();
					},
					senddocument(){
						const onload = ()=>{
							parent.file = this.input.files[0];
							parent.find('#filename').innerText = `File: ${parent.file.name.slice(0,50)}...`;
							parent.find('#embedfile').show('flex');
							this.closethis();
						}
						this.input = makeElement('input',{
							type:'file',
							accept:`application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
											text/plain, application/pdf
							`,
							onchange(){
								onload();
							}
						})
						this.input.click();
					},
					sendphoto(){
						const onload = ()=>{
							parent.file = this.input.files[0];
							const fs = new FileReader();
							fs.onload = ()=>{
								//show the div.
								parent.find('#embedphoto #preview img').src = fs.result;
								parent.find('#embedphoto').show('flex');
							}
							fs.readAsDataURL(parent.file);
							this.closethis();
						}
						this.input = makeElement('input',{
							type:'file',
							accept:`image/png,image/jpeg,image/gif,image/jpg`,
							onchange(){
								onload();
							}
						})
						this.input.click();
					}
				}))
			},
			collectData(){
				const msg = {
					id:app.userData.uid,
					from:app.userData.username,
					date:getFullDate(),
					time:getTime(),
					msg:this.msgbox.value,
					profilepicture:app.userData.profilepicture||app.noProfilePng,
					time:getTime()
				}
				return msg;
			},
			initSendButton(){
				this.find('#sendbutton').onclick = ()=>{
					this.sendMsg();
				}
				this.filebutton.onclick = ()=>{
					this.embedMedia(this.filebutton);
				}
				//closefileembed
				this.find('#closeembedphoto').onclick = ()=>{
					this.embedphoto.hide();
					this.filebutton.show('flex');
				}
				this.find('#closeembedfile').onclick = ()=>{
					this.embedfile.hide();
					this.filebutton.show('flex');
				}
			},
			async sendMsg(){
				const msgData = this.collectData();
				if(msgData.msg.length===0 && !this.file)return;
				
				//give the indicator.
				this.sendingIndicator.show('flex');

				if(this.file){
					//hiding the close button on file preview.
					//console.log(this.closethispreview);
					if(this.closethispreview){
						this.closethispreview.hide();
					}
					//setting the indicator.
					this.sendingIndicator.find('#text').innerText = 'Mengupload File!';
					//console.log('uploading file', this.file);
					const file = await app.doglas.save([this.file.name,this.file,this.file.contentType]);
					const url = await file.ref.getDownloadURL();
					if(url){
						this.sendingIndicator.find('#text').innerText = 'Mengirim Pesan!';
					}
					msgData.file = {
						url,type:this.file.type,
						name:this.file.name,size:this.file.size
					}
					if(msgData.file.type.split('/')[0]==='image'){
						this.embedphoto.hide();
					}else this.embedfile.hide();
				}
				
				//send the msg to the server.
				let inbox = (await app.doglas.do(['database','globalGroupChat',``,'get'])).val()||[];
				if(inbox.length>=30){
					//slicing the array cause i wanna protect the size.
					inbox = inbox.slice(19,30);
				}
				inbox.push(msgData);
				const result = await app.doglas.do(['database','globalGroupChat',``,'set',inbox]);
				this.putMsg(msgData);
				this.filebutton.show('flex');
				this.file = null;
				//set msgbox value to zero.
				this.msgbox.value = '';

				//hide the sending indicator.
				this.sendingIndicator.hide();
			},
			downKeys:[],
			initEnterSend(){
				this.msgbox.onkeydown = (e)=>{
					if(!this.downKeys.includes(e.key))this.downKeys.push(e.key);
					if(this.downKeys.includes('Enter') && !this.downKeys.includes('Shift')){
						this.sendMsg();
					}
				}
				this.msgbox.onkeyup = (e)=>{
					this.downKeys.pop();
				}
			},
			listen(){
				app.doglas.get(`globalGroupChat`).on('value',(x)=>{
					const data = x.val();
					if(!data)return;
					if(data[data.length-1].id!==app.userData.uid){
						this.putMsg(data[data.length-1]);
					}
				})
			},
			init(){
				this.boxinbox = this.find('#boxinbox');
				this.msgbox = this.find('#msgbox');
				this.sendingIndicator = this.find('#sendingIndicator');
				this.showInboxInit();
				this.initSendButton();
				this.initEnterSend();
				setTimeout(()=>{this.listen()},2000);
			},
			async showInboxInit(){
				const inbox = (await app.doglas.do(['database','globalGroupChat',``,'get'])).val()||[];
				inbox.forEach((item)=>{
					this.putMsg(item);
				})
			},
			putMsg(msg){
				if(this.puttedMsg && this.puttedMsg.time === msg.time)return;
				this.boxinbox.addChild(this.inboxItem(msg));
				this.puttedMsg = msg;
			},
			removeListen(){
				app.doglas.get(`globalGroupChat`).off('value');
			},
			onCloseClickded(){
				//if(customCloseThis){
					//customCloseThis();
				//}else view.content.openInbox();
				//delete the event
				this.removeListen();
				this.remove();
			},
			onadded(){
				//close event.
				this.find('#closethis').onclick = ()=>{this.onCloseClickded()};
				this.embedphoto = this.find('#embedphoto');
				this.embedfile = this.find('#embedfile');
				this.filebutton = this.find('#attachfilebutton');
				this.init();
			},
			inboxItem(item){
				const parent = this;
				return makeElement('div',{
					style:`
						display:flex;
						flex-direction:column;
						align-items:${item.id===app.userData.uid?'flex-end':'flex-start'};
						width:100%;
						gap:5px;
						margin-bottom:15px;
					`,
					innerHTML:`
						<div style="font-weight:bold;${!this.puttedMsg?'':this.puttedMsg.id===item.id?'display:none;':''}"><span class=username>@${item.from}</span></div>
						<div style="
							display:flex;
						">
							<div style="
								padding:8px;
								width:32px;
								height:32px;
								border-radius:50%;
								background:whitesmoke;
								display:${item.id===app.userData.uid?'none':'block'};
							">
								<img src=${item.profilepicture} style="
									width:100%;
									height:100%;
									border-radius:50%;x
									object-fit:cover;
									border:2px solid gainsboro;
									${!this.puttedMsg?'':this.puttedMsg.id===item.id?'display:none;':''}
								">
							</div>
							<div style="
								background:white;
								color:black;
								padding:10px;
								font-weight:bold;
								border:1px solid gainsboro;
								border-radius:${item.id===app.userData.uid?'20px 0 20px 20px':'0 20px 20px 20px'};
							">
								<div id=fileembed style="
									display:${item.file?item.file.type.split('/')[0]==='image'?'none':'flex':'none'};
									gap:10px;
									align-items:center;
									justify-content:space-between;
									margin-bottom:10px;
									border-bottom:2px solid ${item.id===app.userData.uid?'whitesmoke':'white'};
									padding-bottom:10px;
								">
									<div style="
										padding: 10px;
										background: whitesmoke;
										border-radius: 10px;
										color:black;
										border:1px solid gainsboro;
									" id=filex>
									-
									</div>
									<div>
										${item.file?item.file.name?item.file.name.slice(0,10):'':''}...
									</div>
									<div>
										<div style="
											padding:5px;
											border-radius:10px;
											cursor:pointer;
											background:whitesmoke;
											border:1px solid gainsboro;
										" id=downloadbutton>
											<img src=./more/media/downloadmedia.png style="
												width:24;
												height:24;
											">
										</div>
									</div>
								</div>
								<div id=photoembed style="
									display:${item.file?item.file.type.split('/')[0]==='image'?'flex':'none':'none'};
									width:100%;
									height:150px;
									margin-bottom:10px;
									border-radius:20px;
									background:whitesmoke;
									overflow:hidden;
									cursor:pointer;
								">
									<img src="${item.file?item.file.url:''}" style="
										width:100%;
										height:100%;
										object-fit:contain;
									" id=imgpreviewbutton>
								</div>
								${item.msg.length>0?item.msg.replaceAll('\n','<br>'):''}
							</div>

							<div style="
								padding:8px;
								border-radius:50%;
								background:whitesmoke;
								width:32px;
								height:32px;
								display:${item.id===app.userData.uid?'block':'none'};
							">
								<img src=${item.profilepicture} style="
									width:100%;
									height:100%;
									border-radius:50%;
									object-fit:cover;
									border:2px solid gainsboro;
									${!this.puttedMsg?'':this.puttedMsg.id===item.id?'display:none;':''}
								">
							</div>
						</div>
						<div style="
							margin-${item.id===app.userData.uid?'right':'left'}:48px;
						"><span style=font-size:10px;>${SmartTime(item.time)}</span></div>
					`,
					onadded(){
						this.scrollIntoView();
						this.find('#downloadbutton').onclick = ()=>{this.setupDownload()};
						this.find('#imgpreviewbutton').onclick = ()=>{this.bigPreview()};
						this.find('.username').onclick = ()=>{
							view.addLoading();
							view.content.openProfile([],'home',false,item.id);
							parent.remove();
						}
						if(item.file){
							const spliteditem = item.file.name.split('.');
							this.find('#filex').innerText = spliteditem[spliteditem.length-1];
							//console.log(spliteditem);
						}
					},
					setupDownload(){
						if(item.file && item.file.url)open(item.file.url,'_blank');
					},
					bigPreview(){
						view.main.addChild(view.bigImgPreview(item.file.url));
					}
				})
			}
		})
	},
	openLoading(){
		return makeElement('div',{
			id:'openLoading',
			style:`
				background:white;
				width:100%;
				height:100%;
				display:flex;
				align-items:center;
				justify-content:center;
				position:absolute;
				top:0;left:0;
				z-index:1;
			`,
			innerHTML:`
				<div style="
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
				">
					<img src=./more/media/Loading_icon.gif
					style="
						width: 30%;
						height: 30%;
						object-fit: cover;
						margin-top:100px;
					"
					>
					Tunggu Sebentar!
				</div>
			`
		})
	},
	addLoading(){
		this.content.addChild(view.openLoading());
	},
	unloading(){
		this.content.saveRemove('#openLoading');
	},
	openPrivateChat(room){
		return makeElement('div',{
			style:`
				position:absolute;
				width:100%;
				height:100%;
				top:0;
				left:0;
				display:flex;
				align-items:center;
				justify-content:flex-end;
				background:rgba(0, 0, 0, 0.4);
				z-index:1;
			`,
			innerHTML:`
				<div class=innerBox
				style="
					height:100%;
					background:white;
					display:flex;
					flex-direction:column;
				"
				>
					<div style="
						width: 100%;
						min-height: 77px;
						display: flex;
						align-items: center;
						justify-content: space-around;
						background:deepskyblue;
						color:white;
						border-bottom:1px solid gainsboro;
					">
						<div style="
							width:80%;
							display:flex;
							align-items:center;
							gap:10px;
							padding-left:5%;
						" class=username>
							<img src=${room.toProfile||app.noProfilePng} style="
								width:32px;
								height:32px;
								object-fit:cover;
								border-radius:50%;
								padding:2px;
								background:white;
							">
							<div>${room.toUsername}</div>
						</div>
						<div style="
							height: 100%;
							width: 64px;
							display: flex;
							align-items: center;
							justify-content: center;
						">
							<div id=closethis style="cursor:pointer;border-radius:10px;padding:10px;">
								<img src=./more/media/whiteclose.png class=navimg style=width:32;height:32;>
							</div>
						</div>
					</div>
					<div style="
						width:90%;
						height:94%;
						background:whitesmoke;
						overflow:auto;
						padding:5%;
						  scrollbar-color: gray whitesmoke;
						  scrollbar-width: thin;
					" id=boxinbox>
						
					</div>
					<div style="
						width: 94%;
						border-top: 1px solid whitesmoke;
						display: none;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:5px;
						border-top:1px solid gainsboro;
					" id=embedfile>
						<div id=filename></div>
						<div>
							<div id=closeembedfile style=cursor:pointer;>
								<img src=./more/media/close.png style="
									width:16px;
									height:16px;
								">
							</div>
						</div>
					</div>
					<div style="
						width: 94%;
						border-top: 1px solid whitesmoke;
						display: none;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:10px;
						border-top:1px solid gainsboro;
					" id=embedphoto>
						<div id=preview style="
							width:100%;
							height:150px;
							background:whitesmoke;
							border-radius:20px;
							border:1px solid gainsboro;
						">
							<img src=./more/media/gemaprofile.png style="
								width:100%;
								height:100%;
								object-fit:contain;
							">
						</div>
						<div>
							<div id=closeembedphoto style=cursor:pointer;>
								<img src=./more/media/close.png style="
									width:16px;
									height:16px;
								">
							</div>
						</div>
					</div>
					<div style="
						width: 94%;
						/* height: 69px; */
						border-top: 1px solid whitesmoke;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 3%;
						background: white;
						gap:5px;
						position:relative;
						border-top:1px solid gainsboro;
					">
						<div style="
							background:white;
							width:100%;
							height:100%;
							position:absolute;
							top:0;left:0;
							display:none;
							align-items:center;
							justify-content:center;
						" id=sendingIndicator>
							<img src=./more/media/Loading_icon.gif style="
								width:64px;
								height:64px;
								object-fit:cover;
							"> <span id=text>Mengirim Pesan!</span>
						</div>
						<div style="
							width: 80%;
							/* height: 100%; */
							display: flex;
							align-items: center;
							justify-content: center;
							background: white;
							border-radius: 20px 0 0 20px;
							padding:10px;
							overflow:hidden;
						">
							<textarea style="
								background: white;
								border: none;
								border-radius: 20px 0 0 20px;
								min-height:40px;
								max-width:100%;
								min-width:100%;
							" id=msgbox placeholder="Masukan Teks Disini..."></textarea>
						</div>
						<div style="
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							/* background: whitesmoke; */
							/* border: 1px solid whitesmoke; */
							background: white;
							border-radius: 0 20px 20px 0;
						">
							<div style="cursor:pointer;
								padding:10px;
								background:white;border:1px solid whitesmoke;
								border-radius:10px;
							" id=sendbutton>
								<img src=./more/media/bluesend.png
								style="
									width:32px;
									height:32px;
								"
								>
							</div>
						</div>
						<div style="
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							/* background: whitesmoke; */
							/* border: 1px solid whitesmoke; */
							background: white;
							border-radius: 0 20px 20px 0;
						">
							<div style="cursor:pointer;
								padding:10px;
								background:whitesmoke;
								border-radius:10px;
								border:1px solid gainsboro;
							" id=attachfilebutton>
								<img src=./more/media/attachfile.png
								style="
									width:32px;
									height:32px;
								"
								>
							</div>
						</div>
					</div>
				</div>
			`,
			embedMedia(button){
				const parent = this;
				this.find('#boxinbox').addChild(makeElement('div',{
					style:`
						position: absolute;
						background: white;
						bottom: 0px;
						right: 0px;
						margin-bottom: 100px;
						margin-right: 10px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 15px 10px;
						gap: 10px;
						border-radius: 30px;
						border:1px solid gainsboro;
					`,
					innerHTML:`
						<div style="
							padding:5px;
							cursor:pointer;
						" id=sendphoto>
							<img src=./more/media/blueimage.png style="
								width:32;
								height:32;
							">
						</div>
						<div style="
							padding:5px;
							cursor:pointer;
						" id=senddocument>
							<img src=./more/media/bluedocument.png style="
								width:32;
								height:32;
							">
						</div>
						<div style="
							padding:5px;
							cursor:pointer;
						" id=closethis>
							<img src=./more/media/close.png style="
								width:16;
								height:16;
							">
						</div>
					`,
					onadded(){
						this.findall('div').forEach(div=>{
							if(div.id==='closethis')parent.closethispreview = div;
							div.onclick = ()=>{this[div.id]()};
						})
						button.hide();
					},
					closethis(){
						parent.filebutton.show('flex');
						this.remove();
					},
					senddocument(){
						const onload = ()=>{
							parent.file = this.input.files[0];
							parent.find('#filename').innerText = `File: ${parent.file.name.slice(0,50)}...`;
							parent.find('#embedfile').show('flex');
							this.closethis();
						}
						this.input = makeElement('input',{
							type:'file',
							accept:`application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
											text/plain, application/pdf
							`,
							onchange(){
								onload();
							}
						})
						this.input.click();
					},
					sendphoto(){
						const onload = ()=>{
							parent.file = this.input.files[0];
							const fs = new FileReader();
							fs.onload = ()=>{
								//show the div.
								parent.find('#embedphoto #preview img').src = fs.result;
								parent.find('#embedphoto').show('flex');
							}
							fs.readAsDataURL(parent.file);
							this.closethis();
						}
						this.input = makeElement('input',{
							type:'file',
							accept:`image/png,image/jpeg,image/gif,image/jpg`,
							onchange(){
								onload();
							}
						})
						this.input.click();
					}
				}))
			},
			async fixRoom(){
				//case is only checking for user, not with opponent.
				//have to check the opponent.
				let ourRoom;
				const opponentChatList = (await app.doglas.do(['database','users',`${room.to}/inbox`,'get'])).val()||[];
				opponentChatList.forEach((item)=>{
					if(item.to===app.userData.uid){
						ourRoom = item;
						return
					}
				})
				let roomId;
				if(!ourRoom){
					//console.log('Opps, theres no room at this db, so i build one');
					//for reciever.
					if(!roomId)roomId=room.roomId;
					const recieverChatList = (await app.doglas.do(['database','users',`${room.to}/inbox`,'get'])).val()||[];
					recieverChatList.push({roomId,to:app.userData.uid,toProfile:app.userData.profilepicture||app.noProfilePng,date:getFullDate(),toUsername:app.userData.username});
					await app.doglas.do(['database','users',`${room.to}/inbox`,'set',recieverChatList]);	
				}
			},
			collectData(){
				const msg = {
					from:app.userData.username,
					date:getFullDate(),
					time:getTime(),
					msg:this.msgbox.value,
					profilepicture:app.userData.profilepicture||app.noProfilePng,
					time:getTime(),
					id:app.userData.uid
				}
				return msg;
			},
			initSendButton(){
				this.find('#sendbutton').onclick = ()=>{
					this.sendMsg();
				}
				this.filebutton.onclick = ()=>{
					this.embedMedia(this.filebutton);
				}
				//closefileembed
				this.find('#closeembedphoto').onclick = ()=>{
					this.embedphoto.hide();
					this.filebutton.show('flex');
				}
				this.find('#closeembedfile').onclick = ()=>{
					this.embedfile.hide();
					this.filebutton.show('flex');
				}
			},
			async sendMsg(){

				this.fixRoom();


				const msgData = this.collectData();
				if(msgData.msg.length===0 && !this.file)return;
				
				//give the indicator.
				this.sendingIndicator.show('flex');

				if(this.file){
					//hiding the close button on file preview.
					//console.log(this.closethispreview);
					if(this.closethispreview){
						this.closethispreview.hide();
					}
					//setting the indicator.
					this.sendingIndicator.find('#text').innerText = 'Mengupload File!';
					//console.log('uploading file', this.file);
					const file = await app.doglas.save([this.file.name,this.file,this.file.contentType]);
					const url = await file.ref.getDownloadURL();
					if(url){
						this.sendingIndicator.find('#text').innerText = 'Mengirim Pesan!';
					}
					msgData.file = {
						url,type:this.file.type,
						name:this.file.name,size:this.file.size
					}
					if(msgData.file.type.split('/')[0]==='image'){
						this.embedphoto.hide();
					}else this.embedfile.hide();
				}
				
				//send the msg to the server.
				const inbox = (await app.doglas.do(['database','privateChat',`${room.roomId}/inbox`,'get'])).val()||[];
				inbox.push(msgData);
				const result = await app.doglas.do(['database','privateChat',`${room.roomId}/inbox`,'set',inbox]);
				this.putMsg(msgData);
				this.filebutton.show('flex');
				this.file = null;
				//set msgbox value to zero.
				this.msgbox.value = '';

				//hide the sending indicator.
				this.sendingIndicator.hide();
			},
			downKeys:[],
			initEnterSend(){
				this.msgbox.onkeydown = (e)=>{
					if(!this.downKeys.includes(e.key))this.downKeys.push(e.key);
					if(this.downKeys.includes('Enter') && !this.downKeys.includes('Shift')){
						this.sendMsg();
					}
				}
				this.msgbox.onkeyup = (e)=>{
					this.downKeys.pop();
				}
			},
			listen(){
				app.doglas.get(`privateChat/${room.roomId}/inbox`).on('value',(x)=>{
					const data = x.val();
					if(!data)return;
					if(data[data.length-1].id!==app.userData.uid){
						this.putMsg(data[data.length-1]);
					}
				})
			},
			removeListen(){
				app.doglas.get(`privateChat/${room.roomId}/inbox`).off('value');
			},
			init(){
				this.boxinbox = this.find('#boxinbox');
				this.sendingIndicator = this.find('#sendingIndicator');
				this.msgbox = this.find('#msgbox');
				this.showInboxInit();
				this.initSendButton();
				this.initEnterSend();
				setTimeout(()=>{this.listen()},2000);
			},
			async showInboxInit(){
				const inbox = (await app.doglas.do(['database','privateChat',`${room.roomId}/inbox`,'get'])).val();
				inbox.forEach((item)=>{
					this.putMsg(item);
				})
			},
			putMsg(msg){
				if(this.puttedMsg && this.puttedMsg.time === msg.time)return;
				this.boxinbox.addChild(this.inboxItem(msg));
				this.puttedMsg = msg;
			},
			onCloseClickded(){
				this.removeListen();
				view.content.openInbox([],'inbox',true);
				this.remove();
			},
			onadded(){
				//close event.
				this.find('#closethis').onclick = ()=>{this.onCloseClickded()};
				this.embedphoto = this.find('#embedphoto');
				this.embedfile = this.find('#embedfile');
				this.filebutton = this.find('#attachfilebutton');
				this.find('.username').onclick = ()=>{
					view.addLoading();
					view.content.openProfile([],'home',false,room.to);
					this.remove();
				}
				this.init();
			},
			inboxItem(item){
				const parent = this;
				return makeElement('div',{
					style:`
						display:flex;
						flex-direction:column;
						align-items:${item.id===app.userData.uid?'flex-end':'flex-start'};
						width:100%;
						gap:5px;
						margin-bottom:15px;
					`,
					innerHTML:`
						<div style="
							display:flex;
						">
							<div style="
								background:white;
								color:black;
								padding:10px;
								font-weight:bold;
								border:1px solid gainsboro;
								border-radius:${item.id===app.userData.uid?'20px 0 20px 20px':'0 20px 20px 20px'};
							">
								<div id=fileembed style="
									display:${item.file?item.file.type.split('/')[0]==='image'?'none':'flex':'none'};
									gap:10px;
									align-items:center;
									justify-content:space-between;
									margin-bottom:10px;
									border-bottom:2px solid ${item.id===app.userData.uid?'whitesmoke':'white'};
									padding-bottom:10px;
								">
									<div style="
										padding: 10px;
										background: whitesmoke;
										border-radius: 10px;
										color:black;
										border:1px solid gainsboro;
									" id=filex>
									-
									</div>
									<div>
										${item.file?item.file.name?item.file.name.slice(0,10):'':''}...
									</div>
									<div>
										<div style="
											padding:5px;
											border-radius:10px;
											cursor:pointer;
											background:whitesmoke;
											border:1px solid gainsboro;
										" id=downloadbutton>
											<img src=./more/media/downloadmedia.png style="
												width:24;
												height:24;
											">
										</div>
									</div>
								</div>
								<div id=photoembed style="
									display:${item.file?item.file.type.split('/')[0]==='image'?'flex':'none':'none'};
									width:100%;
									height:150px;
									margin-bottom:10px;
									border-radius:20px;
									background:whitesmoke;
									overflow:hidden;
									cursor:pointer;
								">
									<img src="${item.file?item.file.url:''}" style="
										width:100%;
										height:100%;
										object-fit:contain;
									" id=imgpreviewbutton>
								</div>
								${item.msg.length>0?item.msg.replaceAll('\n','<br>'):''}
							</div>
						</div>
						<div><span style=font-size:10px;>${SmartTime(item.time)}</span></div>
					`,
					onadded(){
						this.scrollIntoView();
						this.find('#downloadbutton').onclick = ()=>{this.setupDownload()};
						this.find('#imgpreviewbutton').onclick = ()=>{this.bigPreview()};
						if(item.file){
							const spliteditem = item.file.name.split('.');
							this.find('#filex').innerText = spliteditem[spliteditem.length-1];
							//console.log(spliteditem);
						}
					},
					setupDownload(){
						if(item.file && item.file.url)open(item.file.url,'_blank');
					},
					bigPreview(){
						view.main.addChild(view.bigImgPreview(item.file.url));
					}
				})
			}
		})
	},
	moreMenuInbox(toRemove){
		return makeElement('div',{
			style:`
				width: 100%;
		    height: 100%;
		    background: #00000036;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    position: absolute;
		    top: 0px;
		    left: 0px;
			`,
			innerHTML:`
				<div style="
					position:relative;
					background: white;
			    width: 200px;
			    height: 200px;
			    border-radius: 10px;
			    padding: 20px;
			    padding-top: 10px;
			    overflow:auto;
			    display:flex;
			    flex-direction:column;
			    gap:10px;
				">
					<div style="
						position:absolute;
						right:0;top:0;
						background:deepskyblue;
						border-radius:10px;
						z-index:1;
						cursor:pointer;
					" id=closethis>
						<div>
							<img src=./more/media/whiteclose.png
							style="
								width:32;
								height:32;
							"
							>
						</div>
					</div>
					<div style="
						text-align: center;
				    margin-bottom: 20px;
				    border-bottom: 1px solid whitesmoke;
				    padding-bottom: 5px;
				    position:sticky;top:0;
					"><b>More Menu!</b></div>
					<div class=action style="
						display: flex;
				    align-items: center;
				    /* height: 100%; */
				    background: whitesmoke;
				    padding: 10px;
				    border-radius: 20px;
				    cursor: pointer;
						border:1px solid gainsboro;
					" id=removeChat>
						<div style="
							display: flex;
					    gap: 10px;
					    justify-content: center;
					    align-items: center;
						">
							<img src=./more/media/deleteicon.png style="
								width:24px;
								height:24px;
							">
							Hapus
						</div>
					</div>
					<div class=action style="
						display: flex;
				    align-items: center;
				    /* height: 100%; */
				    background: whitesmoke;
				    padding: 10px;
				    border-radius: 20px;
				    cursor: pointer;
						border:1px solid gainsboro;
					" id=reportChat>
						<div style="
							display: flex;
					    gap: 10px;
					    justify-content: center;
					    align-items: center;
						">
							<img src=./more/media/megaphone.png style="
								width:24px;
								height:24px;
							">
							Laporkan
						</div>
					</div>
				</div>
			`,
			onadded(){
				this.find('#closethis').onclick = ()=>{
					this.remove();
				}
				this.findall('.action').forEach((button)=>{
					button.onclick = ()=>{this[button.id]();}
				})
			},
			async removeChat(){
				//remove that chat from user db.
				//console.log(toRemove);
				const chatList = (await app.doglas.do(['database','users',`${app.userData.uid}/inbox`,'get'])).val()||[];
				//filtering chat list.
				const newChatList = [];
				chatList.forEach((item)=>{
					if(item.roomId!==toRemove.roomId){
						newChatList.push(item);
					}
				})
				//now its time to remove.
				await app.doglas.do(['database','users',`${app.userData.uid}/inbox`,'set',newChatList]);
				view.content.openInbox([],'inbox',true);
				this.remove();
			},
			reportChat(){
				//reporting this chat to admin.
			}
		})
	},
	profileDiv(nav='home',boot=false,userId){
		console.log(userId);
		return makeElement('div',{
			nav,
			style:`
				width: 100%;
				display: flex;
				overflow: auto;
				background: white;
				align-items: center;
				position:sticky;
				top:0;
				z-index:1;
				color:deepskyblue;
				border-radius:0 0 10px 10px;
				margin-bottom:10px;
			`,
			innerHTML:`
				<div style="
					  width: 100%;
						display: flex;
						justify-content: flex-start;
						/* margin: 2%; */
						background: white;
				" id=berandadivmenu>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=home
					>
						<img src=./more/media/bluehome.png class=navimg>
						Beranda
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=article
					>
						<img src=./more/media/bluewiki.png class=navimg>
						Artikel
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=jobs
					>
						<img src=./more/media/bluetask.png class=navimg>
						Loker
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=services
					>
						<img src=./more/media/blueservices.png class=navimg>
						Jasa
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=news
					>
						<img src=./more/media/bluenews.png class=navimg>
						news
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=statistic
					>
						<img src=./more/media/bluestats.png class=navimg>
						Statistik
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=followers
					>
						<img src=./more/media/bluefollow.png class=navimg>
						Followers
					</div>
					<div style="
						display: flex;
						cursor: pointer;
						height: 100%;
						width: 100%;
						gap:8px;
						padding: 10px;
						justify-content: center;
					"
					id=following
					>
						<img src=./more/media/bluefollow.png class=navimg>
						Following
					</div>
					<div style="
						display: flex;
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=tesmon
					>
						<img src=./more/media/bluestar.png class=navimg>
						Testimoni
					</div>
					<div style="
						display: ${userId===app.userData.uid||!userId?'flex':'none'};
						gap: 8px;
						cursor: pointer;
						height: 100%;
						width: 100%;
						padding: 10px;
						justify-content: center;
					"
					id=saldo
					>
						<img src=./more/media/yourmoney.png class=navimg>
						Saldo
					</div>
				</div>
			`,
			buttonSetup(){
				this.findall('#berandadivmenu div').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			onadded(){
				//set the nav.
				//console.log(this.nav);
				//fix userIdNullBug
				if(!userId)userId=app.userData.uid;
				this.find('#'+this.nav).style.color = 'dimgray';
				this.find('#'+this.nav).style.fontFamily = 'montserratbold';
				this.find('#'+this.nav).scrollIntoView();
				this.buttonSetup();
			},
			home(){
				view.addLoading();
				view.content.openProfile([],'home',false,userId);
			},
			article(){
				view.addLoading();
				app.doglas.do(['database','post','Articles','get','']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					//filtering
					const fixdata = [];
					datacb.forEach(item=>{
						if(item.owner===userId)fixdata.push(item);
					})
					view.content.openProfile(fixdata,'article',false,userId);
				})
			},
			jobs(){
				view.addLoading();
				app.doglas.do(['database','post','Jobs','get','']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					//filtering
					const fixdata = [];
					datacb.forEach(item=>{
						if(item.owner===userId)fixdata.push(item);
					})
					view.content.openProfile(fixdata,'jobs',false,userId);
				})
			},
			services(){
				view.addLoading();
				app.doglas.do(['database','post','Services','get','']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					//filtering
					const fixdata = [];
					datacb.forEach(item=>{
						if(item.owner===userId)fixdata.push(item);
					})
					view.content.openProfile(fixdata,'services',false,userId);
				})
			},
			statistic(){
				view.addLoading();
				app.doglas.do(['database','users',`${app.userData.uid}/public/statistic`,'get','']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					view.content.openProfile(datacb,'statistic',false,userId);
				})
			},
			tesmon(){
				view.addLoading();
				app.doglas.do(['database','users',`${app.userData.uid}/public/tesmon`,'get','']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					view.content.openProfile(datacb,'tesmon',false,userId);
				})
			},
			followers(){
				view.addLoading();
				app.doglas.do(['database','users',`${userId||app.userData.uid}/public/followers`,'get','']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					view.content.openProfile(datacb,'followers',false,userId);
				})
			},
			following(){
				view.addLoading();
				app.doglas.do(['database','users',`${userId||app.userData.uid}/public/following`,'get','']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					view.content.openProfile(datacb,'following',false,userId);
				})
			},
			news(){
				view.addLoading();
				app.doglas.do(['database','post','ShortStories','get','']).then(data=>{
					view.unloading();
					let datacb = objToArray(data.val()||{});
					//filtering
					const fixdata = [];
					datacb.forEach(item=>{
						if(item.owner===userId)fixdata.push(item);
					})
					view.content.openProfile(fixdata,'news',false,userId);
				})
			},
			saldo(){
				view.addLoading();
				app.doglas.do(['database','users',`${app.userData.uid}/money`,'get']).then(data=>{
					view.unloading();
					let datacb = getPrice(data.val()||0);
					view.content.openProfile(datacb,'saldo',false,userId);
				})
			}
		})
	},
	statistic(userId){
		return makeElement('div',{
			style:`
				overflow:auto;
				font-weight:bold;
				padding:2%;
				border-radius: 10px;
				background:deepskyblue;
				color:white;
				border-bottom:5px solid gainsboro;
			`,
			innerHTML:`
				<div style="
					display:flex;
					justify-content:space-between;
					align-items:center;
					border-bottom:1px solid whitesmoke;
					gap:10px;
					padding:10px 0;
				">
					<div>Total Bid</div>
					<div style=display:flex;gap:8px;>
						<div id=bidcount class=divitem>-</div>
						Kali
					</div>
				</div>
				<div style="
					display:flex;
					justify-content:space-between;
					align-items:center;
					border-bottom:1px solid whitesmoke;
					gap:10px;
					padding:10px 0;
				">
					<div>Menang Bid</div>
					<div style=display:flex;gap:8px;>
						<div id=projectwon class=divitem>-</div>
						Kali
					</div>
				</div>
				<div style="
					display:flex;
					justify-content:space-between;
					align-items:center;
					border-bottom:1px solid whitesmoke;
					gap:10px;
					padding:10px 0;
				">
					<div>Selesai</div>
					<div style=display:flex;gap:8px;>
						<div id=projectfinished class=divitem>-</div>
						Kali
					</div>
				</div>
				<div style="
					display:flex;
					justify-content:space-between;
					border-bottom:1px solid whitesmoke;
					align-items:center;
					gap:10px;
					padding:10px 0;
				">
					<div>Batal</div>
					<div style=display:flex;gap:8px;>
						<div id=projectcancelled class=divitem>-</div>
						Kali
					</div>
				</div>
				<div style="
					display:flex;
					justify-content:space-between;
					align-items:center;
					gap:10px;
					padding:10px 0;
				">
					<div>Sedang Berjalan</div>
					<div style=display:flex;gap:8px;>
						<div id=ongoingproject class=divitem>-</div>
						Projek
					</div>
				</div>
			`,
			onadded(){
				this.fillData();
			},
			async fillData(){
				const userStatistic = (await app.doglas.do(['database','users',`${userId||app.userData.uid}/public/statistics`,'get'])).val()||{};
				this.findall('.divitem').forEach(div=>{
					div.innerHTML = userStatistic[div.id]||0;
				})
			}
		})
	},
	bigImgPreview(url){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				background:rgba(0, 0, 0, 0.4);
				position:absolute;
				top:0;left:0;
				display:flex;
				align-items:center;
				justify-content:center;
				z-index:1;
			`,
			innerHTML:`
				<div class="innerBox smartHeight" style="
					background:white;
					display:flex;
					flex-direction:column;
					position:relative;
				">
					<div style="
						display:flex;
						padding:10px;
						justify-content:space-between;
						border-bottom:1px solid gainsboro;
						align-items:center;
						font-weight:bold;
					">
						<div>Preview File</div>
						<div style=cursor:pointer; id=closethis>
							<img src=./more/media/close.png style="
								width:16;
								height:16;
							">
						</div>
					</div>
					<div style="
						padding:10px;
						display:flex;
						height:100%;
						overflow:auto;
					">
						<img src=${url} style="
							width:100%;
							height:100%;
							object-fit:cover;
						" id=theimgcontent>
					</div>
					<div id=resizebutton style="
						padding:10px;
						border-radius:50%;
						background:white;
						position:absolute;
						bottom:20px;
						right:20px;
						cursor:pointer;
						border:1px solid gainsboro;
					">
						<img src=./more/media/resize.png style="
							width:24;
							height:24;
						">
					</div>
				</div>
			`,
			imgState:0,
			stateList:['cover','contain','fill'],
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()};
				this.find('#resizebutton').onclick = ()=>{this.resize()};
				this.img = this.find('#theimgcontent');
			},
			resize(){
				this.imgState += 1;
				if(this.imgState == this.stateList.length)this.imgState=0;
				this.img.style.objectFit = this.stateList[this.imgState];
			}
		})
	},
	needMoreLogin(){
		return makeElement('div',{
			style:`
				position:absolute;
				top:0;left:0;
				width:100%;height:100%;
				background:rgba(0, 0, 0, 0.25);
				display:flex;
				align-items:flex-start;
				justify-content:center;
				z-index:1;
			`,
			innerHTML:`
				<div style="
					background: white;
					border-radius: 20px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 20px;
					margin-top:10%;
				">
					<div style="
						text-align: center;
						height: 200px;
						display: flex;
						flex-direction: column;
						gap: 20px;
						justify-content: center;
					">
						<div style=font-weight:bold;>
							Error!
						</div>
						<div>Oops, Sesi anda telah berakhir. Silahkan login kembali!</div>
					</div>
					<div style="
						padding: 10px;
						background: deepskyblue;
						color: white;
						font-weight: bold;
						border-radius: 20px;
						width: 50px;
						cursor:pointer;
					" id=loginbutton>
						Login
					</div>
				</div>
			`,
			onadded(){
				this.find('#loginbutton').onclick = ()=>{
					view.content.getIn(()=>{},()=>{
						location.reload();
					},true);
					this.remove();
				}
			}			
		})
	},
	finishedProjectInfo(data){
		return makeElement('div',{
			style:`
				width:100%;
				height:100%;
				position:absolute;
				display:flex;
				align-items:center;
				justify-content:center;
				background:rgba(0, 0, 0, 0.4);
				z-index:1;
				top:0;
				left:0;
			`,
			innerHTML:`
				<div class=innerBox
				style="
					background:white;
					display:flex;
					height:80%;
					flex-direction:column;
					border-radius:10px;
				"
				>
					<div style="
						display:flex;
						align-items:center;
						justify-content:space-between;
						padding:10px;
					">
						<div style=color:black;font-weight:bold;>
							Informasi Projek ${data.bidId}
						</div>
						<div id=closethis style=cursor:pointer;background:deepskyblue;border-radius:50%;>
							<img src=./more/media/whiteclose.png style=width:32;height:32>
						</div>
					</div>
					<div style="
						padding:20px;
						height:100%;
						overflow:auto;
					">
						<div style="
							display:flex;
							justify-content:space-between;
							padding:10px 0;
							border-bottom:1px solid gainsboro;
							margin-bottom:5px;
							align-items:center;
						">
							<div>Hapus</div>
							<div style="
								padding:10px;
								background:deepskyblue;
								color:white;
								border-radius:10px;
								cursor:pointer;
							" id=deleteData class=thisbutton>
								<img src=./more/media/whitedelete.png style="
									width:24;
									height:24;
								">
							</div>
						</div>
						<div style="
							display:flex;
							justify-content:space-between;
							padding:10px 0;
							border-bottom:1px solid gainsboro;
							margin-bottom:5px;
							align-items:center;
						">
							<div>Rating (OwnerOnly)</div>
							${data.owner===app.userData.uid && !data.rating?`<div style="
								padding:10px;
								background:deepskyblue;
								color:white;
								border-radius:10px;
								cursor:pointer;
							" id=giveRating class=thisbutton>Beri Rating</div>`:`<div>${data.rating||'-'} / 10</div>`}
						</div>
						<div style="
							display:flex;
							justify-content:space-between;
							padding:10px 0;
							border-bottom:1px solid gainsboro;
							margin-bottom:5px;
							align-items:center;
							${data.ownerMessage?`flex-direction:column;gap:10px;align-items:flex-start;`:''}
						">
							<div>Pesan Owner</div>
							${data.owner===app.userData.uid && !data.ownerMessage?`<div style="
								padding:10px;
								background:deepskyblue;
								color:white;
								border-radius:10px;
								cursor:pointer;
							" id=ownerMessage class=thisbutton>Tulis Pesan</div>`:`<div>${data.ownerMessage||'-'}</div>`}
						</div>
						<div style="
							display:flex;
							justify-content:space-between;
							padding:10px 0;
							border-bottom:1px solid gainsboro;
							margin-bottom:5px;
							align-items:center;
							${data.bidderMessage?`flex-direction:column;gap:10px;align-items:flex-start;`:''}
						">
							<div>Pesan Bidder</div>
							${data.bidderProfileId===app.userData.uid && !data.bidderMessage?`<div style="
								padding:10px;
								background:deepskyblue;
								color:white;
								border-radius:10px;
								cursor:pointer;
							" id=bidderMessage class=thisbutton>Tulis Pesan</div>`:`<div>${data.bidderMessage||'-'}</div>`}
						</div>
						<div style="
							display:flex;
							justify-content:space-between;
							padding:10px 0;
							border-bottom:1px solid gainsboro;
							margin-bottom:5px;
							align-items:center;
						">
							<div>Pesan Admin</div>
							<div>-</div>
						</div>
						<div style="
							display:flex;
							justify-content:space-between;
							padding:10px 0;
							border-bottom:1px solid gainsboro;
							margin-bottom:5px;
						">
							<div>Publish</div>
							<div>${SmartTime(data.time)}</div>
						</div>
						<div style="
						display:flex;
						justify-content:space-between;
						padding:10px 0;
						border-bottom:1px solid gainsboro;
						">
							<div>Selesai</div>
							<div>${SmartTime(data.finishTime)}</div>
						</div>
						<div style="
						display:flex;
						justify-content:space-between;
						padding:10px 0;
						border-bottom:1px solid gainsboro;
						">
							<div>Owner</div>
							<div>${data.ownerUsername}</div>
						</div>
						<div style="
						display:flex;
						justify-content:space-between;
						padding:10px 0;
						border-bottom:1px solid gainsboro;
						">
							<div>Bidder</div>
							<div>${data.bidder}</div>
						</div>
						<div style="
						display:flex;
						justify-content:space-between;
						padding:10px 0;
						border-bottom:1px solid gainsboro;
						">
							<div>Admin</div>
							<div>${data.admin}</div>
						</div>
						<div style="
						display:flex;
						justify-content:space-between;
						padding:10px 0;
						border-bottom:1px solid gainsboro;
						">
							<div>Fee</div>
							<div>Rp ${getPrice(data.fee)}</div>
						</div>
						<div style="
						display:flex;
						justify-content:space-between;
						padding:10px 0;
						border-bottom:1px solid gainsboro;
						">
							<div>Tipe</div>
							<div>${data.type}</div>
						</div>
						<div style="
						padding:10px 0;
						border-bottom:1px solid gainsboro;
						display:flex;
						flex-direction:column;
						gap:10px;
						">
							<div>Judul</div>
							<div>${data.title}</div>
						</div>
						<div style="
							padding:10px 0;
							display:flex;
							flex-direction:column;
							gap:10px;
						">
							<div>Deskripsi</div>
							<div>${data.description}</div>
						</div>
					</div>
				</div>
			`,
			onadded(){
				this.find('#closethis').onclick = ()=>{
					this.remove();
				}
				//adding button event.
				this.findall('.thisbutton').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			ownerMessage(){
				view.main.addChild(view.ownerMessage(data,()=>{this.loadnew()}));
			},
			bidderMessage(){
				view.main.addChild(view.bidderMessage(data,()=>{this.loadnew()}));
			},
			giveRating(){
				view.main.addChild(view.ratingProject(data,()=>{this.loadnew()}));
			},
			async deleteData(){
				console.log('wanna delete',data);
				view.main.addChild(view.openLoading());
				await app.doglas.do(['database','users',`${app.userData.uid}/onFinishedProjects/${data.OnGoingRoomId}`,'remove']);
				view.main.saveRemove('#openLoading');
				this.loadnew();
			},
			loadnew(){
				view.content.openMyproject([],'Finished',true);
				this.remove();
			}
		})
	},
	passwordHelper(){
		return makeElement('div',{
			style:`
				background:rgba(0, 0, 0, 0.25);
				width:100%;
				height:100%;
				top:0;left:0;
				position:absolute;
				display:flex;
				align-items:center;
				justify-content:center;
				z-index:1;
			`,
			innerHTML:`
				<div class=innerBox style="
					padding:20px;
					background:white;
					border-radius:10px;
					display:flex;
					flex-direction:column;
					gap:15px;z-index:1;
					position:relative;
				">
					<div style="
						display:flex;
						justify-content:space-between;
						align-items:center;
					">
						<div style=font-weight:bold>Password Helper</div>
						<div style=padding:8px;background:deepskyblue;border-radius:50%;cursor:pointer; id=closethis>
							<img src=./more/media/whiteclose.png style="width:16;height:16;">
						</div>
					</div>
					<div>
						<div>Masukan Email Anda</div>
						<div>
							<input id=email placeholder="Masukan Email Anda!">
						</div>
					</div>
					<div id=send style="
						padding:10px;
						border-radius:20px;
						color:white;
						background:deepskyblue;
						text-align:center;cursor:pointer;
					">Kirim</div>
				</div>
			`,
			onadded(){
				this.find('#closethis').onclick = ()=>{this.remove()};
				this.find('#send').onclick = async()=>{
					const email = this.find('#email').value;
					if(email.length===0)return forceRecheck(view.main,'Error! Tolong isi email anda dengan benar!');
					this.showLoading();
					await app.doglas.auth.sendPasswordResetEmail(email);
					this.removeLoading();
				}
			},
			showLoading(){
				this.find('.innerBox').addChild(makeElement('div',{
					id:'loadingpanel',
					style:`
						position:absolute;
						width:100%;
						left:0;top:0;
						background:white;
						display:flex;
						align-items:center;
						justify-content:center;
						height:100%;z-index:1;
						border-radius:10px;
					`,
					innerHTML:`
						<img src=./more/media/Loading_icon.gif style="
							width:100px;height:100px;object-fit:contain;
						">
					`
				}))
			},
			removeLoading(){
				forceRecheck(view.main,'Segera cek email anda untuk info lebih lanjut!');
				this.remove();
			}
		})
	},
	saldoPage(data){
		return makeElement('div',{
			style:`
				width:100%;
				height:80%;
				display:flex;
				align-items:center;
				flex-direction:column;
				justify-content:center;
				gap:20px;
			`,
		innerHTML:`
				<div style="font-weight:bold">Total Saldo</div>
				<div style="font-size:32;">Rp ${data}</div>
				<div style=margin-top:20px;>
					<div style="
						background:deepskyblue;
						color:white;
						padding:10px;
						border-radius:10px;
						cursor:pointer;font-weight:bold;
					">
						Request Pencairan
					</div>
				</div>
			`
		})
	},
	bidderMessage(data,loadnew){
		return makeElement('div',{
			style:`
				background:RGB(0,0,0,.25);
				width:100%;
				height:100%;
				top:0;
				left:0;
				z-index:1;
				position:absolute;
				display:flex;
				align-items:center;
				justify-content:center;
			`,
			innerHTML:`
				<div class=innerBox style="
					background:white;
					border-radius:10px;
					padding:20px;
					display:flex;
					flex-direction:column;
					gap:20px;
					position:relative;
				">
					<div style="
						display:flex;
						justify-content:space-between;
						align-items:center;
					">
						<div style=font-weight:bold>Buat Pesan Bidder</div>
						<div style=padding:8px;background:deepskyblue;border-radius:50%;cursor:pointer; id=closethis>
							<img src=./more/media/whiteclose.png style="width:16;height:16;">
						</div>
					</div>
					<div>
						<textarea placeholder="Tulis Pesan Disini..." style="width:100%;height:200px;"></textarea>
					</div>
					<div style="
						padding:10px;
						background:deepskyblue;
						border-radius:20px;
						text-align:center;
						font-weight:bold;
						color:white;
						cursor:pointer;
					" id=save>
						Simpan
					</div>
				</div>
			`,
			onadded(){
				this.find('#closethis').onclick = ()=>{
					this.remove();
				}
				this.find('#save').onclick = ()=>{
					this.save();
				}
			},
			async save(){
				const msg = this.find('textarea').value;
				if(msg.length===0)return forceRecheck(view.main,'Tolong isi pesan dengan benar!');
				this.showLoading();
				//save for my self.
				await app.doglas.do(['database','users',`${data.bidderProfileId}/onFinishedProjects/${data.OnGoingRoomId}/bidderMessage`,'set',msg]);
				//save for my owner.
				await app.doglas.do(['database','users',`${data.owner}/onFinishedProjects/${data.OnGoingRoomId}/bidderMessage`,'set',msg]);
				//handle owner testimony.
				await app.doglas.do(['database'])
				//save for my admin.
				await app.doglas.do(['database','admin',`${data.admin}/OnFinishedProjects/${data.OnGoingRoomId}/bidderMessage`,'set',msg]);
				this.unloading();
			},
			showLoading(){
				this.find('.innerBox').addChild(makeElement('div',{
					id:'loadingpanel',
					style:`
						position:absolute;
						width:100%;
						left:0;top:0;
						background:white;
						display:flex;
						align-items:center;
						justify-content:center;
						height:100%;z-index:1;
						border-radius:10px;
					`,
					innerHTML:`
						<img src=./more/media/Loading_icon.gif style="
							width:100px;height:100px;object-fit:contain;
						">
					`
				}))
			},
			unloading(){
				forceRecheck(view.main,'Berhasil Menyimpan Pesan Anda!');
				loadnew();
				this.remove();
			}
		})
	},
	ownerMessage(data,loadnew){
		return makeElement('div',{
			style:`
				background:RGB(0,0,0,.25);
				width:100%;
				height:100%;
				top:0;
				left:0;
				z-index:1;
				position:absolute;
				display:flex;
				align-items:center;
				justify-content:center;
			`,
			innerHTML:`
				<div class=innerBox style="
					background:white;
					border-radius:10px;
					padding:20px;
					display:flex;
					flex-direction:column;
					gap:20px;
					position:relative;
				">
					<div style="
						display:flex;
						justify-content:space-between;
						align-items:center;
					">
						<div style=font-weight:bold>Buat Pesan Owner</div>
						<div style=padding:8px;background:deepskyblue;border-radius:50%;cursor:pointer; id=closethis>
							<img src=./more/media/whiteclose.png style="width:16;height:16;">
						</div>
					</div>
					<div>
						<textarea placeholder="Tulis Pesan Disini..." style="width:100%;height:200px;"></textarea>
					</div>
					<div style="
						padding:10px;
						background:deepskyblue;
						border-radius:20px;
						text-align:center;
						font-weight:bold;
						color:white;
						cursor:pointer;
					" id=save>
						Simpan
					</div>
				</div>
			`,
			onadded(){
				this.find('#closethis').onclick = ()=>{
					this.remove();
				}
				this.find('#save').onclick = ()=>{
					this.save();
				}
			},
			async save(){
				const msg = this.find('textarea').value;
				if(msg.length===0)return forceRecheck(view.main,'Tolong isi pesan dengan benar!');
				this.showLoading();
				//save for my self.
				await app.doglas.do(['database','users',`${data.bidderProfileId}/onFinishedProjects/${data.OnGoingRoomId}/ownerMessage`,'set',msg]);
				//save for my owner.
				await app.doglas.do(['database','users',`${data.owner}/onFinishedProjects/${data.OnGoingRoomId}/ownerMessage`,'set',msg]);
				//save for my admin.
				await app.doglas.do(['database','admin',`${data.admin}/OnFinishedProjects/${data.OnGoingRoomId}/ownerMessage`,'set',msg]);
				this.unloading();
			},
			showLoading(){
				this.find('.innerBox').addChild(makeElement('div',{
					id:'loadingpanel',
					style:`
						position:absolute;
						width:100%;
						left:0;top:0;
						background:white;
						display:flex;
						align-items:center;
						justify-content:center;
						height:100%;z-index:1;
						border-radius:10px;
					`,
					innerHTML:`
						<img src=./more/media/Loading_icon.gif style="
							width:100px;height:100px;object-fit:contain;
						">
					`
				}))
			},
			unloading(){
				forceRecheck(view.main,'Berhasil Menyimpan Pesan Anda!');
				loadnew();
				this.remove();
			}
		})
	},
	ratingProject(data,loadnew){
		return makeElement('div',{
			style:`
				background:RGB(0,0,0,.25);
				width:100%;
				height:100%;
				top:0;
				left:0;
				z-index:1;
				position:absolute;
				display:flex;
				align-items:center;
				justify-content:center;
			`,
			innerHTML:`
				<div class=innerBox style="
					background:white;
					border-radius:10px;
					padding:20px;
					display:flex;
					flex-direction:column;
					gap:20px;
					position:relative;
				">
					<div style="
						display:flex;
						justify-content:space-between;
						align-items:center;
					">
						<div style=font-weight:bold>Rating Projek</div>
						<div style=padding:8px;background:deepskyblue;border-radius:50%;cursor:pointer; id=closethis>
							<img src=./more/media/whiteclose.png style="width:16;height:16;">
						</div>
					</div>
					<div>
						<input type=number value=10 max=10 min=1 style=margin-right:10px;width:64px;> / 10
					</div>
					<div style="
						padding:10px;
						background:deepskyblue;
						border-radius:20px;
						text-align:center;
						font-weight:bold;
						color:white;
						cursor:pointer;
					" id=save>
						Simpan
					</div>
				</div>
			`,
			onadded(){
				this.find('#closethis').onclick = ()=>{
					this.remove();
				}
				this.find('#save').onclick = ()=>{
					this.save();
				}
			},
			async save(){
				const msg = this.find('input').value;
				if(msg.length===0 || msg < 1 || msg > 10)return forceRecheck(view.main,'Tolong isi nilai dengan benar!');
				this.showLoading();
				//save for my self.
				await app.doglas.do(['database','users',`${data.bidderProfileId}/onFinishedProjects/${data.OnGoingRoomId}/rating`,'set',msg]);
				//save for my owner.
				await app.doglas.do(['database','users',`${data.owner}/onFinishedProjects/${data.OnGoingRoomId}/rating`,'set',msg]);
				//save for my admin.
				await app.doglas.do(['database','admin',`${data.admin}/OnFinishedProjects/${data.OnGoingRoomId}/rating`,'set',msg]);
				this.unloading();
			},
			showLoading(){
				this.find('.innerBox').addChild(makeElement('div',{
					id:'loadingpanel',
					style:`
						position:absolute;
						width:100%;
						left:0;top:0;
						background:white;
						display:flex;
						align-items:center;
						justify-content:center;
						height:100%;z-index:1;
						border-radius:10px;
					`,
					innerHTML:`
						<img src=./more/media/Loading_icon.gif style="
							width:100px;height:100px;object-fit:contain;
						">
					`
				}))
			},
			unloading(){
				forceRecheck(view.main,'Berhasil Menyimpan Rating Anda!');
				loadnew();
				this.remove();
			}
		})
	},
	webInfo(){
		const height = innerHeight;
		return makeElement('div',{
			style:`
				background:white;
				width:100%;
				height:100%;
				top:0;left:0;
				display:flex;
				align-items:flex-start;
				justify-content:center;
				position:absolute;
				z-index:1;
				overflow:auto;
			`,
			innerHTML:`
				<div style="
					background:white;
					padding:20px;
					position:relative;
					height:auto;
					display:flex;
					flex-direction:column;
				" class=innerBox>
					<div style="
						display:flex;
						justify-content:space-between;
						align-items:center;
						position:sticky;
						top:0;
						padding:20px;
						background:white;
					">
						<div style=font-weight:bold>Pasarin.id Info</div>
						<div style=padding:8px;background:deepskyblue;border-radius:50%;cursor:pointer; id=closethis>
							<img src=./more/media/whiteclose.png style="width:16;height:16;">
						</div>
					</div>
					<div>
						<div style="
							display:flex;
							justify-content:center;
							align-items:flex-start;
							gap:20px;
							flex-direction:column;
							height:${height*.5};
							padding-bottom:20px;
						" class=item>
							<div style="
								font-size: 24px;
    						font-weight: bold;
							">
								Apa itu Pasarin?
							</div>
							<div style=font-size:13px;>
								${app.webinfo.what}
							</div>
						</div>
						<div style="
							display:flex;
							justify-content:center;
							align-items:flex-start;
							gap:20px;
							flex-direction:column;
							height:${height};
							padding-bottom:30px;
						" class=item>
							<div style="
								font-size: 24px;
    						font-weight: bold;
							">
								Tujuan Utama Pasarin
							</div>
							<div style=font-size:13px;>
								${app.webinfo.goal}	
							</div>
						</div>
						<div style="
							display:flex;
							justify-content:center;
							align-items:center;
							gap:20px;
							flex-direction:column;
							height:${height};
							padding-bottom:30px;
						" class=item>
							<div style="
								font-size: 24px;
    						font-weight: bold;
							">
								Moto Pasarin
							</div>
							<div>
								"${app.webinfo.motto}"
							</div>
						</div>
						<div style="
							display:flex;
							justify-content:center;
							align-items:flex-start;
							gap:20px;
							flex-direction:column;
							height:${height};
							padding-bottom:30px;
						" class=item>
							<div style="
								font-size: 24px;
    						font-weight: bold;
							">
								Cara Kerja Pasarin
							</div>
							<div style=font-size:13px;>
								${app.webinfo.workingway}
							</div>
						</div>
						<div style="
							display:flex;
							justify-content:center;
							align-items:center;
							gap:50px;
							height:${height};
							padding-bottom:30px;
						" class=item>
							<div style:100%;>
								<div style="
									width:150px;
									height:150px;
									border-radius:50%;
								"
								>
									<img src=./more/media/ceo.jpg style="
										width:100%;
										height:100%;
										object-fit:cover;
										border-radius:50%;
									">
								</div>
							</div>
							<div>
								<div style=font-weight:bold;font-size:24px;>CoFounder and CEO</div>
								<div>Hafizh Zikrie Hamidi, Hafizh.</div>
								<div>
									@hafizh_zh
								</div>
							</div>
						</div>
						<div style="
							display:flex;
							justify-content:center;
							align-items:center;
							gap:50px;
							height:${height};
							padding-bottom:30px;
						" class=item>
							<div style:100%;>
								<div style="
									width:150px;
									height:150px;
									border-radius:50%;
								"
								>
									<img src=./more/media/gemaprofile.png style="
										width:100%;
										height:100%;
										object-fit:cover;
										border-radius:50%;
									">
								</div>
							</div>
							<div>
								<div style=font-weight:bold;font-size:24px;>Founder and CTO</div>
								<div>Rahmat Agem Pratama, Gema.</div>
								<div>
									@gemasajaa
								</div>
							</div>
						</div>
					</div>
				</div>
			`,
			view:0,
			onadded(){
				this.items = this.findall('.item');
				this.find('#closethis').onclick = ()=>{
					this.remove();
				}
				//this.viewHandle();
			},
			viewHandle(){
				this.findall('#controller div').forEach(button=>{
					button.onclick = ()=>{
						this[button.id]();
					}
				})
			},
			up(){
				if(this.view===0)return;
				this.view -= 1;
				this.items[this.view].scrollIntoView({behavior:"smooth"});
			},
			down(){
				if(this.view===this.items.length-1)return;
				this.view += 1;
				this.items[this.view].scrollIntoView({behavior:"smooth"});
			}
		})
	}
}







