import React, { Component } from 'react';

class DetailPage extends Component {
    constructor() {
        super();
        this.state = {
            product: null,
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:8080/api/products/${id}`)
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
                <h2>Product Details</h2>
                {product ? (
                    <div>
                        <h3>{product.ProductName}</h3>
                        <p>Price: ${product.Price}</p>
                        {product.Image ? (
                            <img
                                src={URL.createObjectURL(new Blob([new Uint8Array(product.Image.data)], { type: 'image/jpeg' }))}
                                alt={product.ProductName}
                                style={{ width: '300px', height: 'auto' }}
                            />
                        ) : (
                            <span>Image not available</span>
                        )}
                    </div>
                ) : (
                    <p>Product not found.</p>
                )}
            </div>
        );
    }
}

export default DetailPage;
