export default function ChatBubble({ from = 'agent', children }) {
  const isAgent = from === 'agent'
  return (
    <div className={`flex animate-fade-up ${isAgent ? 'justify-start' : 'justify-end'}`}>
      <div
        className={
          isAgent
            ? 'max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-paper px-4 py-3 text-[15px] leading-relaxed text-ink'
            : 'max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-3 text-[15px] leading-relaxed text-paper'
        }
      >
        {children}
      </div>
    </div>
  )
}
