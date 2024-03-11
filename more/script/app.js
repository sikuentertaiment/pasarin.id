const app = {
	webinfo:{
		workingway:`
			Pasarin bekerja dengan cara mempertemukan pekerja dan pemilik pekerjaan melalui platform online yang aman dan terpercaya. Pekerja dapat membuat profil dan mengunggah portofolio mereka, sementara pemilik pekerjaan dapat mempublikasikan proyek dan mencari pekerja yang cocok. Pasarin memungkinkan mereka untuk berinteraksi, bernegosiasi, dan melakukan transaksi secara online, dengan sistem pembayaran yang aman dan terjamin. Dengan demikian, Pasarin memudahkan proses perekrutan pekerjaan dan penawaran jasa secara efisien dan transparan bagi kedua belah pihak.
		`,
		motto:`
			Menghubungkan Bakat, Memberdayakan Kesuksesan
		`,
		goal:`
			Tujuan Pasarin adalah menjadi platform marketplace yang terpercaya dan inovatif bagi pekerja dan pemilik pekerjaan untuk menjalankan transaksi secara online. Kami berkomitmen untuk menyediakan lingkungan yang aman, transparan, dan efisien di mana pekerja dapat menemukan pekerjaan yang sesuai dengan keahlian mereka, sementara pemilik pekerjaan dapat dengan mudah menemukan pekerja yang berkualitas
		`,
		what:`
			Pasarin adalah sebuah web marketplace yang inovatif, mirip dengan platform freelancer atau Fiverr, yang bertindak sebagai perantara antara pekerja dan pemilik pekerjaan untuk melakukan transaksi secara online. Dengan Pasarin, Anda dapat dengan mudah menemukan pekerja yang sesuai dengan kebutuhan Anda atau menawarkan jasa Anda kepada pemilik pekerjaan yang membutuhkannya. Selain itu, Pasarin juga menyediakan fitur "sell product" yang memungkinkan pengguna untuk menjual produk digital mereka. Ini memberikan kesempatan bagi individu untuk memonetisasi keterampilan dan pengetahuan mereka dengan menjual produk digital seperti e-book, template, kursus online, dan banyak lagi. Dengan antarmuka yang intuitif dan sistem pembayaran yang aman, Pasarin memastikan pengalaman transaksi yang lancar dan transparan bagi kedua belah pihak. Apakah Anda mencari pekerjaan atau ingin menjual produk digital Anda, Pasarin adalah tempat yang tepat untuk menjembatani kesenjangan antara pekerja dan pemilik pekerjaan dalam lingkungan daring yang aman dan terpercaya.
		`
	},
	noProfilePng:'./more/media/user.png',
	init(){
		this.doglas.init();
		this.ls.init();
		//view init.
		view.init();
		//flextoshowsa init.
		if(!this.flextoshowsa.init())return this.err();
	},
	userData:{},
	validDataChecker(x){
		const now = getTime();
		if(now>x.exp)return false;
		return true;
	},
	getInfoLogin(){
		if(this.userData.uid)return true;
		return false;
		const databefore = this.ls.get();
		if(databefore && this.validDataChecker(databefore)){
			this.userData = databefore;
			return true;
		}
		return false;
	},
	flextoshowsa:{
		init(){
			//if(!firebase || !navigator.onLine)return false;
			
			return true;
		}
	},
	doglas:{
		data:{
			apiKey: "AIzaSyDtBX4yOJ3b3sz4vyTXLmMttpOVHi3j2gk",
			authDomain: "thesimpsonsportal-ef851.firebaseapp.com",
			projectId: "thesimpsonsportal-ef851",
			storageBucket: "thesimpsonsportal-ef851.appspot.com",
			databaseURL:'https://thesimpsonsportal-ef851-default-rtdb.asia-southeast1.firebasedatabase.app',
			messagingSenderId: "226743571848",
			appId: "1:226743571848:web:51c5c3984409ef5c00163d"
		},
		init(){
			this.app = this.doglas.initializeApp(this.data);
			this.auth = this.doglas.auth(this.app);
		},
		doglas:firebase,
		do(args){ //[db/orsomething,parentchild,child,get/orupdate,datapass].
			return this.doglas[args[0]]().ref(`${args[1]}/${args[2]}`)[args[3]](args[4]);
		},
		save(args){
			return this.doglas.storage().ref().child(args[0]).put(args[1],args[2]);
		},
		get(refId){
			return this.doglas.database().ref(refId);
		}
	},
	err(){
		view.main.clear();
		forceRecheck(view.main,'Error, Youre OFF! Please Check Back Your Internet Connection!',true);
	},
	checkAdminLogin(datauser,toRemove){
		this.doglas.auth.signInWithEmailAndPassword(datauser.userEmail,datauser.userPass).then(async(data)=>{
			Object.assign(data,(await app.doglas.do(['database','admin',`${data.user.uid}/public`,'get'])).val()||{});
			forceRecheck(view.main,`Selamat Datang Kembali! ${data.username}`);
			this.saveDataLogin(data);
			//handle callback if theres one.
			if(toRemove.after)toRemove.after();
			toRemove.remove();
		}).catch(err=>{
			forceRecheck(view.main,'Login Gagal! Mohon periksa kembali Email Dan Password Anda!');
		})
	},
	checkLogin(datauser,toRemove){
		this.doglas.auth.signInWithEmailAndPassword(datauser.userEmail,datauser.userPass).then(async(data)=>{
			Object.assign(data,(await app.doglas.do(['database','users',`${data.user.uid}/public`,'get'])).val()||{});
			forceRecheck(view.main,`Selamat Datang Kembali! ${data.username}`);
			this.saveDataLogin(data);
			//handle callback if theres one.
			if(toRemove.after)toRemove.after();
			this.startLoginTimeOut(data.exp);
			toRemove.remove();
		}).catch(err=>{
			forceRecheck(view.main,'Login Gagal! Mohon periksa kembali Email Dan Password Anda!');
		})
	},
	startLoginTimeOut(exptime){
		const leftTime = exptime - getTime();
		console.log('The login data will exp on', leftTime);

		setTimeout(()=>{
			view.main.addChild(view.needMoreLogin());
		},leftTime);
	},
	checkPass(datauser,data){
		if(datauser.userPass === data.password)return true;
		return false;
	},
	saveDataLogin(datatosave){
		datatosave.exp = getTimePlus(600000);
		this.ls.put(datatosave);
		delete datatosave.password;
		this.userData = datatosave;
	},
	ls:{
		init(){
			this.id = 'simpsonsportal';
		},
		put(data){
			localStorage.setItem(this.id,JSON.stringify(data));
		},
		get(){
			return JSON.parse(localStorage.getItem(this.id));
		},
		remove(){
			localStorage.removeItem(this.id);
		}
	},
	listener:{
		listens:{},status:{},
		add(param,paramagain,callback){
			//activing the listener.
			app.doglas.get(param).on('value',callback);
			this.listens[paramagain] = param;
			this.status[paramagain] = 'On';
			this.autoRemove(paramagain);
		},
		remove(param){
			app.doglas.get(this.listens[param]).off('value');
			this.status[param] = 'Off';
		},
		autoRemove(param){
			for(let i in this.status){
				if(this.status[i]==='On' && i!==param){
					this.remove(i);
				}
			}
		}
	}
}
app.init();