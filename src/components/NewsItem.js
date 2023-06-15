import React, { Component } from "react";

export class NewsItem extends Component {
    
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
        
      <div>
        <div className="card my-2" style={{border: "2px solid black"}}>
          <img src={!imageUrl?"https://c.ndtvimg.com/2023-06/53rrda94_ayodhya-ram-temple_625x300_12_June_23.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} target = "_blank" className="btn btn-dark">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
