import Image from 'next/image'
import { request } from "../lib/datocms"
import { BIO_QUERY } from '../lib/queries'

export async function getStaticProps() {

    const data = await request({
        query: BIO_QUERY,
    })


    return {
        props: {
        data: data.bio,
        },
    }
}

export default function Bio({data}) {

    return (
        <>
            <div className="md:flex min-h-screen">
                <div className="pl-24 md:pl-24 pt-16  md:py-5 2xl:py-10 text-sm md:border-r pr-14 md:pr-16 bg-black w-full md:w-2/5 2xl:w-2/6 z-10 md:shadow-lg md:shadow-white">
                    <p className="text-xl md:text-sm 2xl:text-base mb-10 3xl:text-2xl">Biografia</p>
                    <div className="2xl:text-lg 2xl:leading-snug 3xl:text-2xl 3xl:leading-tight" dangerouslySetInnerHTML={{__html: data.bio}} />
                </div>
                <div className="pl-24 md:pl-0 pr-10 md:pr-0 my-10 md:my-0 md:w-3/5 2xl:w-4/6">
                    <div className='relative w-full h-full'>
                        <Image src={data.imagem.url} alt="" objectFit='cover' layout='fill' />
                    </div>
                </div>
            </div>
        </>
    )
}
