# wly-keyboard
### 引入 	在父组件中使用说明
``` html
<wly-keyboard ref="keyboard" :pnum="pnum" @getnum_="getnum" @ongetnum_="ongetnum" />
```
``` js
	/** 
	 * pnum:初始化值
	 */
	//打开弹窗
	openfun() {
		this.$refs.keyboard.openfun()
	},
	// 关闭弹窗
	closefun() {
		this.$refs.keyboard.closefun()
	},
	//点击确定获取返回值
	getnum(e) {
		
	},
	//数字变化时
	ongetnum(e) {
		
	},

```
### 组件中说明

``` js
	/** 组件常用参数说明
	 * ongetnum_ -> 绑定方法 数字变化
	 * getnum_   -> 绑定方法 点击确认
	 */ 

		props: {
			leng: { //输入长度
				type: [String, Number],
				default:'6'
			},
			pass:{ // 是否开启密码模式
				type: Boolean,
				default:false
			},
			pnum: { //初始化数量
				type: [String, Number],
				default: '0'
			},
			
			decimal:{ // 保存几位小数
				type: [String, Number],
				default:0
			},
		},
```