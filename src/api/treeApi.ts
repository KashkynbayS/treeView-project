import axios from 'axios';

const treeService = axios.create({
  baseURL: 'https://64b4c8450efb99d862694609.mockapi.io/tree',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getItems() {
    return treeService.get('/items');
  }
};
