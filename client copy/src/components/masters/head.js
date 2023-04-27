import NextHead from "next/head"

export default function Head ({title, description}){
    return(
        <NextHead>
        <title>{title} | BeatConnect</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
    )
}