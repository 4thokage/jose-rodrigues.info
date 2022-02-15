import { Component, For } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState';
import { createResource } from 'solid-js';

import banano from '../assets/icons/banano.svg';
import nano from '../assets/icons/nano.svg';
import ethereum from '../assets/icons/ethereum.svg';

const fetchJobs = async () =>
  (
    await fetch(
      'https://gist.githubusercontent.com/4thokage/b710233cc4e9b65b1227a1f376a655cf/raw/6433a0bd5854bae98588bd768186b11cf0eb28ad/jobs.json',
    )
  ).json();

const wallet_icons: { [key: string]: string } = {
  banano,
  nano,
  ethereum,
};

const About: Component<{}> = () => {
  const [t] = useI18n();

  const [jobs] = createResource(fetchJobs);

  useRouteReadyState();

  return (
    <div class="dark:bg-solid-gray flex flex-col md:pt-8">
      <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10">
        <section class="border-2 m-5 lg:m-0 border-gray-200 text-black flex rounded-lg defer">
          <ul class="flex flex-col md:flex-row justify-center w-full">
            <span>{jobs.loading && 'Loading...'}</span>
            <For each={jobs()}>
              {(job: {
                company: string;
                startDate: string;
                endDate: string;
                description: string[];
              }) => {
                const d = (
                  <>
                    <div>
                      <a class="font-semibold mr-1" href={job.company}>
                        {job.startDate}
                      </a>

                      <span class="block text-sm">{job.endDate}</span>
                      <br />
                      <br />
                      <ul>
                        <For each={job.description}>
                          {(j) => (
                            <div>
                              <li class="text-center dark:text-white">{j}</li>
                              <br />
                            </div>
                          )}
                        </For>
                      </ul>
                    </div>
                  </>
                );
                return (
                  <li
                    class="transition border-gray-100 border-r"
                    classList={{
                      'hover:bg-solid-dark': !!job.company,
                      'hover:text-white': !!job.company,
                    }}
                  >
                    {job.company ? (
                      <a
                        target="_blank"
                        rel="noopener"
                        href={job.company}
                        class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5"
                      >
                        {d}
                      </a>
                    ) : (
                      <div class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5">
                        {d}
                      </div>
                    )}
                  </li>
                );
              }}
            </For>
          </ul>
        </section>
        <div class="py-3"></div>
        <section class="grid sm:grid-cols-2 lg:grid-cols-4 m-5 lg:m-0 space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg">
          <For each={t('home.wallets')}>
            {(strength: { icon: string; label: string; description: string }) => (
              <div class="px-8 py-4 mt-4 md:py-10 border-b border-0 md:border-r lg:border-b-0 lg:ml-4 lg:mt-0 last:border-none">
                <img
                  class="w-12 mb-5 dark:brightness-150"
                  src={wallet_icons[strength.icon]}
                  alt={strength.label}
                />
                <h3 class="text-xl mb-2 font-semibold">{strength.label}</h3>
                <p class="text-base break-all">{strength.description}</p>
              </div>
            )}
          </For>
        </section>
      </div>
    </div>
  );
};

export default About;
