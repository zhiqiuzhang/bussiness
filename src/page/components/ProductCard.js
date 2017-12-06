import React,{Component} from "react";
import PropTypes from "prop-types";
import {Card} from "antd";
import {Link} from "react-router-dom";

class ProductCard extends Component {
	static propTypes={
		product: PropTypes.object.isRequired,
	}
	render(){
		const {
			name, description, price, images, _id
		}=this.props.product;

		return (
			<Card bodyStyle={{ padding: 2, currsor: "pointer",marginBottom: 5 }}>
            <Link to={"/product/"+_id}>
            	<div className="custom-image" style={{width: "300px", height: "300px",margin: "0 auto"}}>
            		<img alt="example" width="100%" height="100%" src={images[0]}/>
            	</div>
            	<div className="custom-card" style={{width: "300px", height: "80px",margin: "10px auto",textAlign: "center"}}>
            		<h3>{name}</h3>
            		<p>{description}</p>
            		<p className="price">￥ ：{price}</p>
            	
            	</div>	

            </Link>				


			</Card>
			)


	}
	

}
export default ProductCard;