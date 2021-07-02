const btn = document.querySelector("button")
const text = document.querySelector(".text")

const recognition = createRecogniton()
let listening = false;

btn.addEventListener("click", e =>{
    if(!recognition) return;

    console.log(listening)
    listening ? recognition.stop() : recognition.start()

    btn.innerHTML = listening ? "Aperte para falar" : "Parar de escutar"

    btn.classList.toggle("bg-purple-200")
    btn.classList.toggle("text-red-500")
})

function createRecogniton(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null

    if(!recognition){
        text.innerHTML = "Speech Recognition is not found!"
        return null
    }

    recognition.lang = "pt_BR"
    recognition.onstart = () => listening = true
    recognition.onend = () => listening = false
    recognition.onerror = e => console.log("error", e)
    recognition.onresult = e => text.innerHTML = e.results[0][0].transcript

    return recognition

}