
export function Spacers({manyTimes}: {manyTimes: number}){
  let i = 0;
  return (
    <>
      {[...Array(manyTimes)].map(() => {i++; return <div key={i}></div>})}
    </>
  )
}
