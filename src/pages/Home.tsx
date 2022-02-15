import { Component } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState';
import * as d3 from 'd3';

const Home: Component<{}> = () => {
  const [t] = useI18n();

  const svg = d3.select('svg');
  console.log(svg);

  useRouteReadyState();

  return (
    <div class="flex flex-col">
      <div class="my-10 pt-5 pb-10 px-3 lg:px-12 container">
        <div class="mb-10 md:grid md:grid-cols-6 gap-10">
          <div class="col-span-2">
            <div class="mb-8">{t('home.intro')}</div>
            {t('home.metro-example')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
