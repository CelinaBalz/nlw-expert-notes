import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'


export function NewNoteCard() {
    return (
      <Dialog.Root>
        <Dialog.Trigger className='rounded-md flex flex-col gap-3 text-left bg-slate-700 p-5 space-y-6 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none'>
              <span className='text-sm font-medium text-slate-200'>
                Adicionar nota
              </span>
              <p className='text-sm leading-6 text-slate-400'>
                Grave uma nota em áudio que será convertida para texto automaticamente.
              </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50'></Dialog.Overlay>
                <Dialog.Content className='fixed left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[600px] w-full bg-slate-700 rounded-md flex flex-col outline-none'>
                  <Dialog.DialogClose className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                    <X className='size-5'/>
                  </Dialog.DialogClose>

                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className='text-sm font-medium text-slate-300'>
                          Adicionar nota
                        </span> 
                        <p className='text-sm leading-6 text-slate-400'>
                          Comece <button className='font-medium text-lime-400 hover:underline'> gravando uma nota </button> em áudio ou se preferir <button className=' hover:underline font-medium text-lime-400'> utilize apenas texto.</button>
                        </p>                    
                    </div>

                    <button 
                    type="button"
                     className='group w-full  bg-lime-400 py-4 text-center text-sm text-lime-950 font-bold hover:bg-lime-500   outline-none'>
                        Salvar nota
                    </button>
                </Dialog.Content>
            </Dialog.Portal>

      </Dialog.Root>
    )
}