'use client'
import { db } from '@/app/firebaseConfig'
import { collection } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Mosaic() {
  const [grid, setGrid] = useState(Array(12 * 5).fill(null))
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'photos'), (snapshot) => {
      const imagesTmp = []
      snapshot.forEach((doc) => {
        imagesTmp.push(doc.data().img)
        imagesTmp.push(doc.data().img)
        imagesTmp.push(doc.data().img)
        imagesTmp.push(doc.data().img)
      })
      const gridTmp = Array(12 * 5).fill(null)
      imagesTmp.forEach((img) => {
        let pos
        do {
          pos = Math.floor(Math.random() * gridTmp.length)
        } while (gridTmp[pos] !== null)
        gridTmp[pos] = img
      })
      setGrid(gridTmp)
      setLoaded(true)
    })
    return () => unsubscribe()
  }, [])
  return (
    <div className='h-screen-sm flex justify-center items-center'>
      <header className='absolute left-0 top-0 p-8'>
        <img src='/images/logo.svg' alt='Logo' className='w-12 aspect-square' />
      </header>
      <main className='relative'>
        {loaded ? (
          <>
            <img
              src='/images/bg.jpg'
              alt='Background'
              className='absolute left-0 top-0 w-full object-cover'
              style={{ height: 640, filter: 'brightness(80%)' }}
            />
            <ul
              className='grid grid-cols-12 mb-10 relative'
              style={{ opacity: 1, mixBlendMode: 'overlay' }}
            >
              {grid.map((img, i) => {
                return (
                  <li key={i}>
                    {img ? (
                      <img
                        src={img}
                        alt={`Image ${i}`}
                        className='aspect-square object-cover w-32'
                      />
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </>
        ) : null}
        <h1 className='text-4xl font-medium text-center'>
          FACES OF <span className='font-extralight'>BRAND</span>
        </h1>
      </main>
    </div>
  )
}
