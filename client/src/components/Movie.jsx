import { useState } from "react"
import { AddMovieFavoriteIcon, AddMovieFavoriteIconClic } from "../assets/Icons"
import { URL_MOVIES_POSTER } from "../constants"
import { useMovieContext } from "../context/MovieContext"

export function Movie({ movie }) {

  const img_url = (movie.img_url == null) ? 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg' : `${URL_MOVIES_POSTER + movie.img_url}`

  const [favorite, setFavorite] = useState(false)
  const {createSeeMovie} = useMovieContext()

  const handleClick = async () => {
    const res = await createSeeMovie({
      "state":"no visto",
      "movie":{
          "title":movie.title,
          "year":movie.year,
          "img_url":movie.img_url,
          "sinopsis":movie.sinopsis,
          "genero":"Animacion",
      }
    })
    if(res != null && res.status === 201) {
      setFavorite(true)
    }

  }

  return (
    
    <li className='w-full rounded-b-lg duration-300 shadow-movie flex flex-col' >
      <div className='w-full relative'>
        <img src={img_url} alt="image the la movie" className='w-full max-h-[50vh] h-full bg-cover' />
        <div className='-top-2 -left-2 absolute bg-black p-2 rounded-r-full' >
          {
            (!favorite) ? <AddMovieFavoriteIcon className='text-3xl cursor-pointer text-white hover:text-4xl duration-500' onClick={handleClick}/> : <AddMovieFavoriteIconClic className='text-3xl cursor-pointer text-white'/>
          }
        </div>
      </div>
      <article className='px-4 text-white py-2 flex flex-col gap-3'>
        <section className='flex justify-center text-center text-xl'>
          <p>{movie.title}</p>
        </section>
        <section className='flex flex-col gap-2'>
          <ul className="flex justify-center gap-3 flex-wrap">
            {movie.genero.map((genero, index) => (
                <li key={index} className="py-1 px-2 bg-violet-700 rounded-lg">
                  {genero}
                </li>
            ))
            }
          </ul>
        </section>
        <section className='flex justify-between mb-2'>
          <span>Fecha lanzamiento:</span>
          <p>{(movie.year)}</p>
        </section>
      </article>
    </li>
  )
}


export default Movie