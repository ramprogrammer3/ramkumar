import React from 'react'

const Tr = ({text1,text2}) => {
  return (
    <tr>
      <td className='text-sm font-semibold' > {text1} </td>
      <td className='text-sm'> {text2} </td>
    </tr>
  )
}

export default Tr
