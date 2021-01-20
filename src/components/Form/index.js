import { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import * as actions from '../../actions';
import Category from '../Category';
import AddCategory from '../Category/AddCategory';
import { removeMoneyDots } from '../../helper';
import '../../style/style.css';

const API = `http://localhost:5000`;

class Form extends Component {
  constructor () {
    super();
    this.state = {
      description : '',
      amount: '',
      format: '',
      category: '',
    };
    this._onChangeInputDescription = this._onChangeInputDescription.bind(this);
    this._onChangeInputAmount = this._onChangeInputAmount.bind(this);
    this._onChangeSelectCategory = this._onChangeSelectCategory.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  };

  componentDidMount() {
    const getPathName = window.location.pathname;
    const format = getPathName.replace("/", "");
    this.setState({ format });
  }

  _onChangeInputDescription(e) {
    this.setState({ description: e.target.value });
  };

  _onChangeInputAmount(e) {
    const amount = removeMoneyDots(e.target.value);
    this.setState({ amount });
  };

  _onChangeSelectCategory(e) {
    this.setState({ category: e.target.value });
  };

  _onSubmit = async(e) => {
    e.preventDefault();

    const data = {
      description: this.state.description,
      amount: this.state.amount,
      category: this.state.category,
    };
    
    const format = this.state.format;
    
    const POST = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data })
    };

    const GET = {
      method: 'GET',
    };

    await this.props.add(API, format, POST);
    await this.props.get(API, format, GET);
    
    this.setState({
      description: '',
      amount: ''
    });
  };

  render() {
    return (
      <div>
        <AddCategory />
        <form className="form-wrapper" onSubmit={this._onSubmit}>
          <Category />
          <div className="form-description">
            <input type="description" className="form-description-input" placeholder="Masukan Description" onChange={this._onChangeInputDescription} value={this.state.description} />
          </div>
          <div className="form-amount">
            <div className="form-amount-title">
              Amount
            </div>
            <span className="textbox">
              Rp.
              <NumberFormat className="form-amount-input" onChange={this._onChangeInputAmount} value={this.state.amount} thousandSeparator={true} placeholder='Masukan Amount' />
            </span>
          </div>
          <button className="form-btn-simpan">
            Simpan
          </button>
        </form>
      </div>
    )
  };
};

function mapStateToProps({ balances }) {
  return { balances }
};

const mapDispatchToProps = {
  add: actions.add,
  get: actions.get
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);