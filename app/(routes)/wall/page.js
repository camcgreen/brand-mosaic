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
        imagesTmp.push(doc.data().img)
        imagesTmp.push(doc.data().img)
        imagesTmp.push(doc.data().img)
        imagesTmp.push(doc.data().img)
        imagesTmp.push(doc.data().img)
        imagesTmp.push(doc.data().img)
        imagesTmp.push(doc.data().img)
      })
      setImages(imagesTmp)
    })
    return () => unsubscribe()
  }, [])
  return (
    <div className='h-screen-sm flex justify-center items-center'>
      <header className='absolute left-0 top-0 p-8'>
        <img src='/images/logo.svg' alt='Logo' className='w-12 aspect-square' />
      </header>
      <main>
        <ul className='grid grid-cols-12 mb-10'>
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
        <h1 className='text-4xl font-medium text-center'>
          FACES OF <span className='font-extralight'>BRAND</span>
        </h1>
      </main>
    </div>
  )
}
