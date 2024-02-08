import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({onNoteCreated}: NewNoteCardProps) {
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [isRecording, setIsRecording] = useState(false)
    const [content, setContent] = useState('')
    
    function handleStartEditor() {
      setShouldShowOnboarding(false)
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
      setContent(event.target.value)

      if (event.target.value === '') {
        setShouldShowOnboarding(true)
      }
    }

    function handleSaveNote(event: FormEvent){
      event.preventDefault()

      if (content === ''){
        return
      }

      onNoteCreated(content)

      setContent('')
      setShouldShowOnboarding(true)

      toast.success('Nota criada com sucesso')
    }

    function handleStartRecording(){

      const insSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
        || 'webkitSpeechRecognition' in window

        if (!insSpeechRecognitionAPIAvailable) {
          alert('Infelizmente seu navegador não suporta a API de gravação!')
          return
        }

        setIsRecording(true)
        setShouldShowOnboarding(false)

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

        const speechRecognition  = new SpeechRecognitionAPI()

        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true 
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true

        speechRecognition.onresult = (event) => {
          const transcription = Array.from(event.results).reduce((text, result) => {
            return text.concat(result[0].transcript) 
          }, '')

          setContent(transcription)
        }

        speechRecognition.onerror = (event) => {
          console.error(event)
        }
    }

    function handleStopRecording(){
      setIsRecording(false)

      if (speechRecognition != null) {
        speechRecognition.stop() 
    }
  }

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
                  <form action=''  className='flex-1 flex flex-col' >
                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className='text-sm font-medium text-slate-300'>
                          Adicionar nota
                        </span> 

                        {shouldShowOnboarding ? (  
                          <p className='text-sm leading-6 text-slate-400'>
                          Comece 
                            <button 
                              onClick={handleStartRecording}
                              type="button"

                              className='font-medium text-lime-400 hover:underline'>
                              gravando uma nota </button> em áudio ou se preferir
                            <button 
                              onClick={handleStartEditor}
                                                      type="button"

                              className=' hover:underline font-medium text-lime-400'>
                              utilize apenas texto.
                            </button>
                          </p>
                        ) : (
                          <textarea 
                          className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'                          
                            autoFocus
                            onChange={handleContentChanged}
                            value={content}
                          />
                        )}        
                    </div>
                    {isRecording ? (
                      <button 
                      onClick={handleStopRecording}
                        type="button"
                        className='flex items-center justify-center gap-2 group w-full  bg-slate-900 py-4 text-center text-sm text-slate-300 font-bold hover:text-slate-100   outline-none'>
                          <div className='size-3 rounded-full animate-pulse bg-red-500'></div>
                          Gravando! (clique p/ interromper)
                      </button>
                    ) : (
                      <button 
                      onClick={handleSaveNote}
                        type="button"
                        className='group w-full  bg-lime-400 py-4 text-center text-sm text-lime-950 font-bold hover:bg-lime-500   outline-none'>
                          Salvar nota
                      </button>
                    )}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>

      </Dialog.Root>
    )
}