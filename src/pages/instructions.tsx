import Layout from '@components/template/Layout'
import { faker } from '@faker-js/faker'

export default function Instructions() {
  return (
    <Layout
      page={'Instruções'}
      title={'Instruções do Sistema'}
      subtitle={'Visualize e entenda o funcionamento do sistema'}
    >
      <div
        className={`
            w-full
            flex-grow
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
      >
        <div className={'mb-3'}>
          <h3 className={'font-bold text-xl text-center'}>Projetos</h3>
          <div className={'flex flex-col text-lg'}>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
          </div>
        </div>
        <div className={'mb-3'}>
          <h3 className={'font-bold text-xl text-center'}>Riscos</h3>
          <div className={'flex flex-col text-lg'}>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
          </div>
        </div>
        <div className={'mb-3'}>
          <h3 className={'font-bold text-xl text-center'}>Tarefas</h3>
          <div className={'flex flex-col text-lg'}>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
          </div>
        </div>
        <div className={'mb-3'}>
          <h3 className={'font-bold text-xl text-center'}>Ações dos Riscos</h3>
          <div className={'flex flex-col text-lg'}>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
            <div className={'mb-2'}>{faker.lorem.paragraph()}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
