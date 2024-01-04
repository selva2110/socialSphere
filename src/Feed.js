import React from 'react'
import{ Post } from './Post'

export const Feed = ({post}) => {
  return (
    <>
    {post.map((post)=>(
        <Post key={post.id} post={post} />
    ))}
    </>
  )
}

