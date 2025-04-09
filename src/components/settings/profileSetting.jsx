import React from 'react'
import ImageUpload from '../imageUpload/ImageUpload'
import Topbar from '../topbar/Topbar'

export default function ProfileSetting() {
  return (
    <>
      <title>Profile Settings</title>

      <Topbar />
      <div>
          <h1>Загрузить аватар</h1>
          <ImageUpload />
          {/* {console.log(selectedImage)} */}
      </div>
    </>
  )
}
