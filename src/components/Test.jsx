import React from 'react'
import { useState } from 'react'

function Test() {
    const [items, setItems] = useState([
        { id: 1, text: 'hello world' },
        { id:2 , text: 'call me by name'}
    ])
    const updateText = (id, newText) => {
        setItems(prev =>
            prev.map(item => 
                item.id === id ? {...item, text: newText} : item
            ))
    }
  return (
      <div>
          {items.map(item => (
              <div key={item.id}>
                  <input
                      value={item.text}
                      onChange={(e) => updateText(item.id, e.target.value)}
                  />
              </div>
          ))}
    </div>
  )
}

export default Test