import { Component } from 'react';
import { Link } from 'react-router-dom';

class Addcategory extends Component {
  render() {
    return (
      <Link className="button-add-category" to={`/${'Category'}`}>
        <div className="wrapper-button-add-category">
          <img src='http://101.50.0.139:5000/images/add.png' alt='' />
          <div className="add-category-title">Category</div>
        </div>
      </Link>
    );
  };
};

export default Addcategory;