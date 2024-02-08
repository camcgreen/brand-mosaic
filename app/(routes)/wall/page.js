'use client'
import { db } from '@/app/firebaseConfig'
import { collection } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Mosaic() {
  const [images, setImages] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'photos'), (snapshot) => {
      const imagesTmp = []
      snapshot.forEach((doc) => {
        imagesTmp.push(doc.data().img)
      })
      setImages(imagesTmp)
    })
    return () => unsubscribe()
  }, [])
  return (
    <main>
      <h1>Images</h1>
      <ul>
        {images.map((img, i) => {
          return (
            <li key={i}>
              <img
                src={img}
                alt={`Image ${i}`}
                className='aspect-square object-cover w-32'
              />
            </li>
          )
        })}
      </ul>
    </main>
  )
}
