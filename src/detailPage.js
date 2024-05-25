import React, { Component } from 'react';

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: this.props.match.params.id, // Accessing ProductID from URL parameters
            product: null,
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        const { productID } = this.state;
        // const { productId } = this.props.match.params.id;

        // Fetch product details using productID
        fetch(`http://localhost:8080/api/products/${productID}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ product: data, loading: false });
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
                this.setState({ error, loading: false });
            });
    }

    render() {
        const { product, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error loading product details.</div>;
        }

        return (
            <div>
                {/* Render product details */}
                <h2>{product.ProductName}</h2>
                <p>Price: {product.Price}</p>
                {/* Render other product details as needed */}
            </div>
        );
    }
}

export default DetailPage;
