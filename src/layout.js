import React,{Component} from 'react';
import Head from './pages/head/head.js';
import HeadTabBar from './pages/head/headTabBar.js';
class Layout extends Component {
	// constructor(arg) {
	// 	super(arg)
	// }
	render() {
		return (
			<div className='layout-wrap'>
			  <Head />
			  <HeadTabBar />
			</div>
		)
	}
	
}
export default Layout;

