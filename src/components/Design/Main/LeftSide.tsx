export default function LeftSide({ children } : { children?: any }) {
  return (
    <div className="w-full h-full flex items-center">
        <div>
          { children }
        </div>
    </div>
  )
}
