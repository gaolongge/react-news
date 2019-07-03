import React,{Component} from 'react'
class Head extends Component {
	// constructor(...arg) {
	// 	super(...arg)
	// }
	componentWillMount() {
		// https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A145DDD1ECB69A3&cp=5D1C36299A131E1&min_behot_time=0&_signature=g5nzoAAA3pJG.KstXzEPKYOZ87&i=
		
		fetch('/cfm/api/sys/user/getUserModuleList',{method:'POST'}).then(response  => {
			console.log(response,'2222')
			return response.json()
		}).then(response  => {
			console.log(response ,'22223333')
		})
	}
	render() {
		return (
			<React.Fragment>
			  <div className='head-wrap'>
			    <div className='head-con-left'></div>
					<div className='head-con-cen'>
						<i></i>
						<span></span>
					</div>
					<div className='head-con-right'></div>
			  </div>
			</React.Fragment>
		)
	}
}
export default Head
