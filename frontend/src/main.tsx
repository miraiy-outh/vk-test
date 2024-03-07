import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@vkontakte/vkui/dist/vkui.css';
import { Provider } from 'react-redux';
import { store } from './services/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
