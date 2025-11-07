// src/Components/Category.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://cctvshoppee.onrender.com/api/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again later.');
      setLoading(false);
    }
  };

  // Build /category/:slug-or-name path
  const toCategoryPath = (cat) =>
    `/category/${encodeURIComponent(cat.slug || cat.name)}`;

  const categorySliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>{error}</div>;

  return (
    <div>
      <section className="tp-product-category pt-60 pb-15">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <Slider {...categorySliderSettings}>
                {categories.map((category, index) => (
                  <div className="tp-product-category-item text-center mb-40" key={index}>
                    <div className="tp-product-category-thumb fix">
                      <Link to={toCategoryPath(category)}>
                        <img
                          src={`https://cctvshoppee.onrender.com${category.image}`}
                          alt={category.name}
                          width={130}
                        />
                      </Link>
                    </div>
                    <div className="tp-product-category-content">
                      <h3 className="tp-product-category-title">
                        <Link to={toCategoryPath(category)}>
                          {category.name}
                        </Link>
                      </h3>
                      <p>{category.productCount || 0} Product</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Category;
