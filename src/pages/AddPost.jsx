import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="py-10 bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
  <Container>
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <PostForm />
    </div>
  </Container>
</div>

  )
}

export default AddPost