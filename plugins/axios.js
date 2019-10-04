export default function ({ $axios, redirect, $store }) {
  // $axios.onRequest(config => {
  //   console.log('Making request to ' + config.url)
  // })

  $axios.onError(error => {
      console.log(error);
      console.log('here');
       const code = parseInt(error.response && error.response.status)
       console.log(code);
      if (code === 400) {
        redirect('/400')
      }else if(code == 401){
        alert('You have been logged out!');
        redirect('/login');
        $store.dispatch('auth/logout');
        alert('Unable to authorize request. Please trying siging in.')
    }
  })
}