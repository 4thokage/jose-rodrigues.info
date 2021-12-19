import { Component, For } from 'solid-js';
import viewCode from '../assets/icons/view-code.svg';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState';

const projects = [
  {
    title: 'This.',
    background: 'bg-white',
    example: '/img/logo/jose-rodrigues.info.png',
    assets: {
      source: 'https://github.com/4thokage/jose-rodrigues.info',
      live: 'https://jose-rodrigues.info',
    },
  },
  {
    title: 'Zen1t Music Library',
    background: 'bg-solid-gray',
    example: '/img/logo/zen1t.ml.png',
    assets: {
      source: 'https://github.com/4thokage/zen1t.ml',
      live: 'https://zen1t.ml',
    },
  },
  {
    title: 'Conistack',
    background: 'bg-white',
    example: '/img/logo/conistack.png',
    assets: {
      source: 'https://github.com/4thokage/conistack',
      live: 'https://conistack.zen1t.tk',
    },
  },

];

const ProjectPanel: Component<{
  title: string;
  example: string;
  assets: Record<string, string>;
  background: string;
}> = ({ title, assets, example, background }) => {
  const [t] = useI18n();
  const slug = title.replaceAll(' ', '_').toLowerCase();
  return (
    <div class="shadow-md">
      <div class="p-5 border-b">{t(`media.resources.${slug}`, {}, title)}</div>
      <div class={`py-8 h-56 flex px-10 items-center justify-center ${background}`}>
        <img src={example} alt={title} />
      </div>
      <div class="border-b border-t grid grid-cols-2 text-sm text-solid">
        {Object.entries(assets).map(([name, path]) => (
          <a
            class="flex p-3 justify-center border-r transition hover:opacity-50"
            download={path.split('/').pop()}
            href={path}
          >
            <span class="sr-only">View {name}</span>
            <img class="w-2 mr-4" alt="Magnifying glass" src={viewCode} /> {name}
          </a>
        ))}
      </div>
    </div>
  );
};

const Projects: Component = () => {
  const [t] = useI18n();

  useRouteReadyState();

  return (
    <div class="flex flex-col">
      <div class="my-10 pt-5 pb-10 px-3 lg:px-12 container">
        <div class="mb-10 md:grid md:grid-cols-6 gap-10">
          <div class="col-span-2">
            <div class="mb-8">{t('media.description')}</div>
          </div>
          <div class="col-span-4 col-end-7 mt-9 md:mt-0">
            <div class="lg:grid lg:grid-cols-2 gap-4 space-y-5 md:space-y-0">
              <For each={projects}>{(props) => <ProjectPanel {...props} />}</For>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
