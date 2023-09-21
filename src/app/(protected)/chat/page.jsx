"use client"

export default function Chat() {
  const [messages,setMessages] = useState([])
  const [state,setState] = useState([])
  return (
    <div className="p-5 bg-blue-100 flex flex-col h-[92vh] gap-7">
      <div className="flex items-center gap-2 max-w-3xl">
        <div className="bg-blue-200 p-3 rounded-md self-start">Hello I am James I am a frontEnd developer here to help you with your problems, Hello I am James I am a frontEnd developer here to help you with your problems</div>
        <img
          src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
          className="rounded-full"
          style={{ height: 40, width: 40 }}
          alt=""
          loading="lazy"
          />
        </div>
      <div className="flex items-center gap-2 self-end max-w-3xl">
        <img
          src="https://tecdn.b-cdn.net/img/new/avatars/3.jpg"
          className="rounded-full"
          style={{ height: 40, width: 40 }}
          alt=""
          loading="lazy"
          />
        <div className="rounded-md bg-gray-100 p-3">Ello Me name Tosiba , I ma selage tomas wana to pole se ni la alle topani ma . ola mi ha tose eahtsadfsd</div>
      </div>
      <div className="absolute bottom-7 w-[96vw] rounded-md p-3 flex items-center gap-3 bg-blue-200">
        <input
          type="text"
          className=" block min-h-[auto] rounded-md text-black px-3 py-[0.5rem] outline-1 outline-blue-400 flex-1"
          placeholder="Type to Chat ..." />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        </button>
      </div>

    </div>
  )
}
