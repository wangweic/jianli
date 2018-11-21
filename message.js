! function() {
	var view = document.querySelector('section#liuyan');

	var model = {
		init: function() {

			var APP_ID = '64qdo5oY7ueNlQjVY9P63Phd-gzGzoHsz';
			var APP_KEY = 'elO340fNCqnUyr2o3HCgI0YP';

			AV.init({
				appId: APP_ID,
				appKey: APP_KEY
			});

		},
		fetch: function() {
			var query = new AV.Query('message');
			query.select(['content', 'dates', 'spanname']);
			return query.find();
		},
		save: function(spanname, content) {

			//创建表
			var TestObject = AV.Object.extend('message');

			//在表中创建一行数据
			var testObject = new TestObject();
			//保存

			if(content === '') {
				alert('请输入内容');
				return false;
			}

			if(spanname === '') {
				alert('请输入昵称');
				return false;
			}

			return testObject.save({
				content: content,
				spanname: spanname,
				dates: getFormatDate()
			})
		}

	}

	var controller = {
		view: null,
		model: null,
		init: function(view, model) {
			this.view = view;
			this.messageform = document.querySelector("#messageForm");
			this.model = model;
			this.model.init();
			this.bindEvents();
			this.loadmessage();

		},
		loadmessage: function() {
			//查询数据
			this.model.fetch().then(function(todo) {
				let new_arr = todo.map((item) => item.attributes);
				//messgae-list
				new_arr.forEach((item) => {
					let li = document.createElement('li');
					let span = document.createElement('span');
					let spana = document.createElement('span');
					let spanname = document.createElement('span');

					span.innerText = item.dates;
					spana.innerText = item.content;
					spanname.innerText = item.spanname;
					li.className = 'clearfix';

					li.append(spanname);
					li.append(spana);
					li.append(span);
					this.messageform = document.querySelector(".messgae-list");
					li.append = span;

					this.messageform.append(li);
				})
			});
		},
		bindEvents: function() {
			var that = this;
			this.messageform.addEventListener('submit', function(e) {
				e.preventDefault();
				that.savemessage();
			})
		},
		savemessage: function() {
			let content = this.messageform.querySelector('textarea[name=content]').value;
			let spanname = this.messageform.querySelector('#user').value;
			this.model.save(spanname, content).then(function(obj) {

				let li = document.createElement('li');
				let span = document.createElement('span');
				let spana = document.createElement('span');
				let spanname = document.createElement('span');

				let content = obj.attributes;

				span.innerText = content.dates;
				spana.innerText = content.content;
				spanname.innerText = content.spanname;
				li.className = 'clearfix';

				li.append(spanname);
				li.append(spana);
				li.append(span);
				this.messageform = document.querySelector(".messgae-list");
				li.append = span;

				this.messageform.append(li);
				document.querySelector('#textarea').value = "";
			})
		}
	}

	controller.init(view, model);
}.call();

function getFormatDate() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentDate = date.getFullYear() + "-" + month + "-" + strDate +
		" " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	return currentDate;
}