'use client'
import { db } from '@/app/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
import { Camera, CameraElement } from 'react-use-camera'

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

  const handleCapture = async () => {
    const imageData = await cameraRef.current?.capture({ width: 512 }) // Camera view will pause after capture
    addPhotoToFirestore(imageData.url)
    // imageData.url is a base64 string that can also be used as src for an <img/> tag
    // imageData.blob is a blob string to send to your server

    // NOTES:
    // (i) Use `cameraRef.current?.capture({ mirror: true });` to flip the captured image (will be enabled by default on front camera)
    // (ii) Use `cameraRef.current?.capture({ width: 512 });` to capture image in 512px width (height will be auto calculated)
    // (iii) Use `cameraRef.current?.capture({ height: 512 });` to capture image in 512px height (width will be auto calculated)
    // (iv) If width or height is not specified, your captured image will be of the same size as the camera resolution
  }

  const handleClear = () => {
    cameraRef.current?.clear() // Discards the captured photo and resumes the camera view
  }

  return (
    <div>
      <Camera
        ref={cameraRef}
        className='your-classes-here'
        style={{ width: 200, height: 200 }}
        errorLayout={<div>Oops!</div>}
        onReady={() => console.log('Camera is now visible to the user')}
        onError={(e) => console.error("Camera couldn't load :(")}
      />

      {/* Add your own UI here... */}
      <button onClick={handleCapture}>Capture</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  )
}
