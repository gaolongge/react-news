import React,{Component} from 'react'
import Home from '../home.js'
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
			  <div className='top-menu-bar'>
				<div className='top-menu-bar-list'>
				  {
				   this.state.routeData.map((item,index) => {
					   return <a key={item} href={item}>热点</a>
				   })
				  }
				</div>
				<span className='more-btn'>+</span>
			  </div>
				 <Home />
			  <div>
			  </div>
			</React.Fragment>
		)
	}
}
export default HeadTabBar