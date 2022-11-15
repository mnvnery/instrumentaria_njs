import Image from 'next/image'
import Header from '../components/Header'
import { request } from "../lib/datocms"
import { SOUNDS_QUERY } from '../lib/queries'

export async function getStaticProps() {

    const sounds = await request({
        query: SOUNDS_QUERY,
    })

    return {
        props: {
        sounds: sounds.home.sons
        },
    }
}
export default function Contactos({sounds}) {

    return (
        <>
        <Header sounds={sounds}/>
        <div className="pl-20 pt-28 pr-5 md:pt-0 md:h-screen w-full flex items-center justify-center">
            <form className="space-y-5 max-w-4xl 2xl:w-[45%] 2xl:text-xl">
                <div className="flex space-x-5">
                    <input type="text" id="fname" name="firstname" placeholder="primeiro nome" className="bg-transparent w-1/2 border p-2 text-sm 2xl:text-xl 2xl:p-5" />
                    <input type="text" id="lname" name="lastname" placeholder="apelido" className="bg-transparent w-1/2 border p-2 text-sm 2xl:text-xl 2xl:p-5" />
                </div>
                <input type="text" id="email" name="email" placeholder="email" className="w-full bg-transparent border p-2 text-sm 2xl:text-xl 2xl:p-5" />
                <textarea id="subject" name="subject" placeholder="mensagem" className="w-full bg-transparent border p-2 text-sm h-60 2xl:h-80 2xl:text-xl 2xl:p-5"></textarea>
                <input type="submit" value="Submit" className="border py-3 px-6 2xl:py-4 hover:bg-white hover:text-black" />
            </form>
        </div>
        </>
    )
}
