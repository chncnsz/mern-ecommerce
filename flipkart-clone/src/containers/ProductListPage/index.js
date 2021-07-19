import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import Layout from '../../components/Layout';
import './style.css';

const ProductListPage = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    });

    return (
        <Layout>
            <div className="card">
                <div className="cardHeader">
                    <div>Samsung Mobile under 10k</div>
                    <button>Hepsini gör</button>
                </div>
                <div>
                    <div className="productContainer">
                        <div className="productImgContainer">
                            <img src="http://localhost:2000/public/productPicture-galaxy-m32-b096vd213d-samsung-original-imag4pfhntgqfhtq.jpeg" />
                        </div>
                        <div>
                            <div>Samsung 4gb phone</div>
                            <div>
                                <span>4.3</span>
                                <span>3345</span>
                            </div>
                            <div>5000</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};


export default ProductListPage;