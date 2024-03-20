'use client'

import { db } from '@/app/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
import { Camera } from 'react-use-camera'

async function addPhotoToFirestore(img) {
  try {
    const docRef = await addDoc(collection(db, 'photos'), {
      img: img,
    })
    console.log('Document written with ID: ', docRef.id)
    return true
  } catch (error) {
    console.error('Error adding document ', error)
    return false
  }
}

export default function Home() {
  const cameraRef = useRef(null)
  const [countdown, setCountdown] = useState(4)
  const [capturedImg, setCapturedImg] = useState(null)
  const [showOverlay, setShowOverlay] = useState(false)

  const handleCameraCapture = async () => {
    const imageData = await cameraRef.current?.capture({ width: 512 })
    setCapturedImg(imageData.url)
  }

  const handleCameraClear = () => {
    cameraRef.current?.clear()
  }

  const handleCountdown = () => {
    setCountdown(3)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          handleCameraCapture()
          return 0
        } else {
          return prev - 1
        }
      })
    }, 1000)
  }

  const handleSave = async () => {
    await addPhotoToFirestore(capturedImg) // img as base64 string
    setShowOverlay(true)
  }

  const handleReset = () => {
    handleCameraClear()
    setCountdown(4)
    setCapturedImg(null)
    setShowOverlay(false)
  }

  return (
    <>
      <header className='absolute left-0 top-0 p-4'>
        <img src='/images/logo.svg' alt='Logo' className='w-6 aspect-square' />
      </header>
      <main className='p-12 py-20 h-screen-sm flex flex-col justify-between'>
        <section className='h-16'>
          <h1 className='text-3xl font-medium text-center'>
            STRIKE A<br />
            <span className='font-extralight'>POSE</span>
          </h1>
        </section>
        <section className='w-full aspect-square bg-gray-400 flex flex-col justify-center'>
          <Camera
            ref={cameraRef}
            className='w-full h-full rounded-lg'
            errorLayout={<div>Oops!</div>}
            onReady={() => console.log('Camera is now visible to the user')}
            onError={(e) => console.error("Camera couldn't load :(")}
          />
        </section>
        <section className='h-12 flex justify-center align-center'>
          {countdown ? (
            <button
              onClick={handleCountdown}
              className='h-full aspect-square border border-black rounded-[1000px] flex justify-center items-center transition-all'
              style={{ backgroundColor: countdown < 4 ? 'white' : 'black' }}
            >
              {countdown < 4 ? (
                <span className='text-xl text-center'>
                  {Math.max(countdown, 0)}
                </span>
              ) : (
                <img
                  src='/images/camera.svg'
                  alt='Take photo'
                  className='w-6 aspect-square'
                />
              )}
            </button>
          ) : (
            <div className='flex'>
              <button
                className='h-full px-6 mr-4 border border-black rounded-[1000px] text-white bg-black flex justify-center items-center transition-all'
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className='h-full px-6 border border-black rounded-[1000px] flex justify-center items-center transition-all'
                onClick={handleReset}
              >
                Retake
              </button>
            </div>
          )}
        </section>
        <div
          className='fixed left-0 top-0 z-10 w-screen h-screen-sm bg-black/90 transition-all flex flex-col justify-center text-white items-center text-center'
          style={{
            opacity: showOverlay ? 1 : 0,
            pointerEvents: showOverlay ? 'all' : 'none',
          }}
          id='overlay'
        >
          <h2 className='max-w-80 mb-4'>
            You’ve been added to the mosaic on the main screen!
          </h2>
          <button
            className='py-2 px-6 border border-white rounded-[1000px] flex justify-center items-center transition-all'
            onClick={handleReset}
          >
            Okay
          </button>
        </div>
      </main>
    </>
  )
}
