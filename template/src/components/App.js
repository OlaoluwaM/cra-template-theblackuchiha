import themeObj from '../context/theme';
import Loading from '../general-components/Loading';

import { ThemeProvider } from 'styled-components';
import { Suspense, lazy, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import {
  ExitFeature,
  MotionConfig,
  GesturesFeature,
  AnimationFeature,
  AnimateLayoutFeature,
} from 'framer-motion';

export default function App() {
  const location = useLocation();
  const [applicationTheme, setTheme] = useState('dark');

  return (
    <ThemeProvider theme={themeObj}>
      <MotionConfig
        features={[AnimateLayoutFeature, AnimationFeature, ExitFeature, GesturesFeature]}>
        <>
          <Suspense fallback={<Loading fullscreen={true} />}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/">
                <div>Hello World 👋</div>
              </Route>
            </Switch>
          </Suspense>
        </>
      </MotionConfig>
    </ThemeProvider>
  );
}
