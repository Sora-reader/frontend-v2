import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'next/router';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done(false);
});
