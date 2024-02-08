'use client'
import { db } from '@/app/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
import { Camera, CameraElement } from 'react-use-camera'

// async function addDataToFirestore(name, email, message) {
//   try {
//     const docRef = await addDoc(collection(db, 'messages'), {
//       name: name,
//       email: email,
//       message: message,
//     })
//     console.log('Document written with ID: ', docRef.id)
//     return true
//   } catch (error) {
//     console.error('Error adding document ', error)
//     return false
//   }
// }

export default function Home() {
  const cameraRef = useRef(null)

  const handleCapture = async () => {
    const imageData = await cameraRef.current?.capture() // Camera view will pause after capture
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
        onReady={() => console.log('Camera is now visibile to the user')}
        onError={(e) => console.error("Camera couldn't load :(")}
      />

      {/* Add your own UI here... */}
      <button onClick={handleCapture}>Capture</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  )

  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [message, setMessage] = useState('')

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const added = await addDataToFirestore(name, email, message)
  //   if (added) {
  //     setName('')
  //     setEmail('')
  //     setMessage('')
  //     alert('Data added to Firestore Database')
  //   }
  // }

  // return (
  //   <main className='flex min-h-screen flex-col items-center justify-between p-24'>
  //     <h1 className='text-5xl font-bold m-10'>
  //       Add Data to Firestore Database
  //     </h1>
  //     <form
  //       onSubmit={handleSubmit}
  //       className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'
  //     >
  //       <div className='mb-4'>
  //         <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
  //           Name:
  //         </label>
  //         <input
  //           type='text'
  //           id='name'
  //           className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //         />
  //         <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
  //           Email:
  //         </label>
  //         <input
  //           type='email'
  //           id='email'
  //           className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //         <label
  //           htmlFor='message'
  //           className='block text-gray-700 font-bold mb-2'
  //         >
  //           Message:
  //         </label>
  //         <textarea
  //           rows={5}
  //           id='message'
  //           className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
  //           value={message}
  //           onChange={(e) => setMessage(e.target.value)}
  //         />
  //       </div>
  //       <div className='text-center'>
  //         <button
  //           type='submit'
  //           className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'
  //         >
  //           Submit
  //         </button>
  //       </div>
  //     </form>
  //   </main>
  // )
}
