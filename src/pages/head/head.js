import React,{Component} from 'react'
class Head extends Component {
	// constructor(...arg) {
	// 	super(...arg)
	// }
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
