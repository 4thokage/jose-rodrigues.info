import { Component, For } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState';

import banano from '../assets/icons/banano.svg';
import nano from '../assets/icons/nano.svg';
import ethereum from '../assets/icons/ethereum.svg';

const wallet_icons: { [key: string]: string } = {
  banano,
  nano,
  ethereum,
};

const Home: Component<{}> = () => {
  const [t] = useI18n();

  useRouteReadyState();

  return (
    <div class="dark:bg-solid-gray flex flex-col md:pt-8">
      <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10">
        <section class="border-2 m-5 lg:m-0 border-gray-200 flex rounded-lg defer">
          {t('home.intro')}
        </section>
      </div>
      <div class="lg:my-2 px-0 lg:px-12 container flex flex-col lg:space-y-10 md:pt-10 bg-blocks-one bg-contain bg-no-repeat bg-left-top">
        <section class="grid sm:grid-cols-2 lg:grid-cols-4 m-5 lg:m-0 space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg">
          <For each={t('home.wallets')}>
            {(wallet: { icon: string; label: string; description: string }) => (
              <div class="px-8 py-4 mt-4 md:py-10 border-b border-0 md:border-r lg:border-b-0 lg:ml-4 lg:mt-0 last:border-none">
                <img class="w-12 mb-5" src={wallet_icons[wallet.icon]} alt={wallet.label} />
                <p class="text-base break-all">{wallet.description}</p>
              </div>
            )}
          </For>
        </section>
      </div>
    </div>
  );
};

export default Home;
