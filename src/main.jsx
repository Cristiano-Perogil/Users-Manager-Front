import ReactDOM from 'react-dom/client';
import store from './Store/store';
import { Provider } from 'react-redux';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
