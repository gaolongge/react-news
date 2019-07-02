import React,{Component} from 'react'
import Home from '../home.js'
import Head from './head.js'
import HeadTabBarList from './headTabBarList.js'

class HeadTabBar extends Component {
	constructor(props) {
		super(props)
		this.state ={
			routeData: [
				1,2,3,4,5,6,7,8,9,10
			]
		}
	}
	render() {
		return (
			<React.Fragment >
			  <div className='content-wrap'>
			    <Home>
						<Head />
						<HeadTabBarList />
					</Home>
			  </div>
			</React.Fragment>
		)
	}
}
export default HeadTabBar