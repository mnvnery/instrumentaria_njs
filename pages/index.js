import Head from 'next/head'
import Image from 'next/image'
import { request } from "../lib/datocms"
import { HOME_QUERY, SOUNDS_QUERY, SOCIALS_QUERY } from '../lib/queries'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export async function getStaticProps() {
  const data = await request({
      query: HOME_QUERY,
  })

  const sounds = await request({
      query: SOUNDS_QUERY,
  })

  const socials = await request({
      query: SOCIALS_QUERY,
  })


  return {
      props: {
      data: data.home,
      sounds: sounds.home.sons, 
      socials: socials.social
      },
  }
}

export default function Home({data, sounds, socials}) {
  const images = data.imagensBackground.map((imagem) => imagem.url)
  const [currentImageIndex, setCurrentImageIndex] = useState()
  const changeImage = () => {
    const randomNumber = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomNumber);
  }
  useEffect(() => changeImage(), [])
  return (
    <>
      <Header sounds={sounds} socials={socials}/>
      <Link href='/projetos'><Image id='bgImage' src={images[currentImageIndex]} alt="Background" layout='fill' objectFit='cover'/></Link>
    </>
  )
}


