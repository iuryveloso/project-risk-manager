import { IconeAlerta } from "@components/icons";

interface ModalSairProps {
    modal?: string
    mostrarModal: () => void
    logout: () => Promise<void>
}

export default function ModalSair(props: ModalSairProps) {
    return (
        <div className={`${props.modal} fixed z-10 inset-0 overflow-y-auto`} >
            <div className={`
                flex items-end justify-center min-h-screen 
                pt-4 px-4 pb-20 text-center sm:block sm:p-0
            `}>
                <div className={`fixed inset-0 bg-slate-400 bg-opacity-75 transition-opacity`} />

                <span className={`inline-block align-middle h-screen`}>&#8203;</span>

                <div className={`
                    inline-block align-bottom bg-white rounded-lg text-left 
                    overflow-hidden shadow-xl transform transition-all 
                    sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
                `}>
                    <div className={`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-slate-900`}>
                        <div className={`sm:flex sm:items-start`}>
                            <div className={`mx-auto flex-shrink-0 flex items-center justify-center 
                                h-12 w-12 rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10
                            `}>
                                {IconeAlerta('text-slate-100')}
                            </div>
                            <div className={`mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left`}>
                                <h3 className={`text-lg leading-6 font-medium text-slate-900 dark:text-slate-200`}>
                                    Sair do Sistema
                                </h3>
                                <div className={`mt-2`}>
                                    <p className={`text-sm text-slate-500 dark:text-slate-300`}>
                                        Tem certeza que deseja sair?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-slate-800`}>
                        <button onClick={props.logout} className={`
                            w-full inline-flex justify-center rounded-md border border-transparent 
                            shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white 
                            hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm
                            dark:bg-red-700 dark:text-slate-200 dark:hover:bg-red-800
                        `}>
                            Sair
                        </button>
                        <button onClick={props.mostrarModal} className={`
                            mt-3 w-full inline-flex justify-center rounded-md border border-slate-300
                            shadow-sm px-4 py-2 mb-4 md:mb-0 bg-white text-base font-medium text-slate-700 
                            hover:bg-slate-100 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                            dark:bg-slate-600 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-200
                        `}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}