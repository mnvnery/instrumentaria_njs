import Head from 'next/head'
import Image from 'next/image'
import { request } from "../lib/datocms"
import { HOME_QUERY } from '../lib/queries'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export async function getStaticProps() {

  const data = await request({
      query: HOME_QUERY,
  })


  return {
      props: {
      data: data.home,
      },
  }
}

export default function Home({data}) {
  const images = data.imagensBackground.map((imagem) => imagem.url)
  const [currentImageIndex, setCurrentImageIndex] = useState()
  const changeImage = () => {
    const randomNumber = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomNumber);
  }
  useEffect(() => changeImage(), [])
  return (
    <>
      <Link href='/projetos'><Image id='bgImage' src={images[currentImageIndex]} alt="Background" layout='fill' objectFit='cover'/></Link>
    </>
  )
}


