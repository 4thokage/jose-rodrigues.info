import { Component } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState';

const Home: Component<{}> = () => {
  const [t] = useI18n();

  let worldData;

  useRouteReadyState();

  return (
    <div class="dark:bg-solid-gray flex flex-col md:pt-8">
      <div class="lg:my-2 px-0 lg:px-12 container flex flex-col lg:space-y-10 md:pt-10 bg-blocks-one bg-contain bg-no-repeat bg-left-top">
        <p>{t('home.intro')}</p>
        <p> {t('home.intro2')}</p>
        <p> {t('home.intro3')}</p>
        <svg
          ref={worldData}
          class="bg-solid-gray h-500"
          style={{
            height: 500, //width: "100%"
            width: 900,
            marginRight: '0px',
            marginLeft: '0px',
          }}
        ></svg>
      </div>
    </div>
  );
};

export default Home;
