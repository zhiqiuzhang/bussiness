import React, {Component} from "react";
import {Carousel, Row, Col} from "antd";
import api from "../service/api";
import ProductCard from "./components/ProductCard";
import "../css/home.css"
const imgs =[
    {
    	img:"imgs/q1.jpg",
    },
    {
    	img:"imgs/q2.jpg"
    },
    {
    	img:"imgs/q3.jpg"
    },
    {
    	img:"imgs/q4.jpg"
    }
]

class Home extends Component{
  state = {
    allProducts: []
  }
  getProducts() {
    api.getProducts().then((res) => {
      if (res.OK) {
        this.setState({allProducts: res.docs});
      }
    })
  }
  componentWillMount() {
    this.getProducts();
  }
	render(){
		console.log("Props:",this.props);
		return(
          <div className="home">
          	   <Carousel autoplay>
		        {
		        	imgs.map((img,i) =>{
		        		return (
                           <div key={i}>
                           	 <img src={img.img} alt="图片" style={{height: 500,width: "100%",margin:"auto",border: "none"}}/>
                           </div>
		        		)
		        	})
		        }
		      </Carousel>
          <div className="product">
         <Row gutter={10}>
          {
           this.state.allProducts.map((product, i) => (
          <Col span={12} key={i}>
          <ProductCard key={i} product={product}/>
          </Col>
        ))
       }
      </Row>
      </div>
          </div>
		)
	}
}

export default Home;