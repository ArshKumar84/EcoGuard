// pages/_app.js
import '../app/globals.css';
// assuming you have a Layout component
import { useRouter } from 'next/router';


import store from '../store/store'; 
import { Provider } from 'react-redux';


  
  // Change this to the actual path of your login page





  function MyApp({ Component, pageProps }) {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }




 // Adjust the path to where your store is located







export default MyApp;
