import { Component, createResource, For } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState';

const fetchProjects = async () =>
  (
    await fetch(
      'https://gist.githubusercontent.com/4thokage/c98926ab1d0d7c363bbb293f4c714cdd/raw/5951e1b481bda446483abe265e4904667beee10d/projects.json',
    )
  ).json();

const ProjectPanel: Component<{
  title: string;
  example: string;
  assets: Record<string, string>;
}> = ({ title, assets, example }) => {
  const [t] = useI18n();
  const slug = title.replaceAll(' ', '_').toLowerCase();

  return (
    <div class="shadow-md">
      <div class="p-5 border-b">{t(`media.resources.${slug}`, {}, title)}</div>
      <div class={`py-8 h-56 flex px-10 items-center justify-center`}>
        <img src={example} alt={title} />
      </div>
      <div class="border-b border-t grid grid-cols-2 text-sm text-solid">
        {Object.entries(assets).map(([name, path]) => (
          <a
            class="flex p-3 justify-center border-r transition hover:opacity-50"
            download={path.split('/').pop()}
            href={path}
          >
            <span class="sr-only">View {name}</span> {name}
          </a>
        ))}
      </div>
    </div>
  );
};

const Projects: Component = () => {
  const [t] = useI18n();

  const [projects] = createResource(fetchProjects);

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
              <For each={projects()}>
                {(props: { title: string; example: string; assets: Record<string, string> }) => (
                  <ProjectPanel {...props} />
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
