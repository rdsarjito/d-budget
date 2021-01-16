import { Component } from 'react';
import Form from '../../components/Form';
import List from '../List';
import TotalInflow from '../../components/TotalInflow';

class Income extends Component {
  render() {
    return (
      <main>
        <Form />
        <List />
        <TotalInflow />
      </main>
    );
  };
};

export default Income;