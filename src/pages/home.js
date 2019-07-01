import React,{Component} from 'react'
import ReactPullLoad, { STATS } from "react-pullload";
import "react-pullload/dist/ReactPullLoad.css";
let cData = [
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803178_1200x1000_0.jpg'},
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803179_1200x1000_0.jpg'},
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803181_1200x1000_0.jpg'},
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803182_1200x1000_0.jpg'},
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803183_1200x1000_0.jpg'},
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803178_1200x1000_0.jpg'},
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803179_1200x1000_0.jpg'},
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803181_1200x1000_0.jpg'},
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803182_1200x1000_0.jpg'},
    {name:1,value:'http://img1.gtimg.com/15/1580/158031/15803183_1200x1000_0.jpg'},
]
let loadMoreLimitNum = 10
class Home extends Component {
    constructor() {
        super();
        this.state = {
          hasMore: true,
          data: cData,
          action: STATS.init,
          index: loadMoreLimitNum //loading more test time limit
        };
      }
    
      handleAction = action => {
        console.info(action, this.state.action, action === this.state.action);
        //new action must do not equel to old action
        if (action === this.state.action) {
          return false;
        }
    
        if (action === STATS.refreshing) {
          //刷新
          this.handRefreshing();
        } else if (action === STATS.loading) {
          //加载更多
          this.handLoadMore();
        } else {
          //DO NOT modify below code
          this.setState({
            action: action
          });
        }
      };
    
      handRefreshing = () => {
        if (STATS.refreshing === this.state.action) {
          return false;
        }
    
        setTimeout(() => {
          //refreshing complete
          this.setState({
            data: cData,
            hasMore: true,
            action: STATS.refreshed,
            index: loadMoreLimitNum
          });
        }, 3000);
    
        this.setState({
          action: STATS.refreshing
        });
      };
    
      handLoadMore = () => {
        if (STATS.loading === this.state.action) {
          return false;
        }
        //无更多内容则不执行后面逻辑
        if (!this.state.hasMore) {
          return;
        }
    
        setTimeout(() => {
          if (this.state.index === 0) {
            this.setState({
              action: STATS.reset,
              hasMore: false
            });
          } else {
            this.setState({
              data: [...this.state.data, cData[0], cData[0]],
              action: STATS.reset,
              index: this.state.index - 1
            });
          }
        }, 3000);
    
        this.setState({
          action: STATS.loading
        });
      };
    
      render() {
        const { data, hasMore } = this.state;
        return (
          <React.Fragment>
            <ReactPullLoad
              downEnough={150}
              action={this.state.action}
              handleAction={this.handleAction}
              hasMore={hasMore}
							downEnough = {50}
              style={{ paddingTop: 0 }}
              distanceBottom={1000}
            >
              <ul className="test-ul">
                {/* <button onClick={this.handRefreshing}>refreshing</button>
                <button onClick={this.handLoadMore}>loading more</button> */}
                {data.map((str, index) => {
                  return (
                    <li key={index}>
                      <img src={str.value} alt="" />
                    </li>
                  );
                })}
              </ul>
            </ReactPullLoad>
          </React.Fragment>
        );
      }
}
export default Home