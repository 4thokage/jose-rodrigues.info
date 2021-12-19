import { Component, For } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState';

const About: Component<{}> = () => {
  const [t] = useI18n();

  useRouteReadyState();

  return (
    <div class="dark:bg-solid-gray flex flex-col md:pt-8">
      <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10">
        <section class="border-2 m-5 lg:m-0 border-gray-200 text-black flex rounded-lg defer">
          <ul class="flex flex-col md:flex-row justify-center w-full">
            <For each={t('about.jobs')}>
              {(job: { label: string; detail: string; link: string }) => {
                const d = (
                  <>
                    <strong class="font-semibold mr-1">{job.label}</strong>
                    <span class="block text-sm">{job.detail}</span>
                  </>
                );
                return (
                  <li
                    class="transition border-gray-100 border-r"
                    classList={{
                      'hover:bg-solid-dark': !!job.link,
                      'hover:text-white': !!job.link,
                    }}
                  >
                    {job.link ? (
                      <a
                        target="_blank"
                        rel="noopener"
                        href={job.link}
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
      </div>
    </div>
  );
};

export default About;
