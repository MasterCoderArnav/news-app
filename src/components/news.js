import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class news extends Component {
  articles = [];
  constructor() {
    super();
    console.log("Hello I am a constructor from news component");
    this.state = {
      articles: this.articles,
      loading: false,
    };
  }
  render() {
    return (
      <div className="row">
        {this.state.articles.map((element) => {
          return (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={
                  element.description ? element.description.slice(0, 88) : ""
                }
                imageUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          );
        })}
      </div>
    );
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=4d26820f6418423a92b1dfbafbb7bdd2";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });
  }
}
export default news;
