import React,{Component} from 'react';
import HeadTabBar from './pages/head/headTabBar.js';
class Layout extends Component {
	// constructor(arg) {
	// 	super(arg)
	// }
	render() {
		return (
			<div className='layout-wrap'>
			  <HeadTabBar />
			</div>
		)
	}
	
}
export default Layout;

