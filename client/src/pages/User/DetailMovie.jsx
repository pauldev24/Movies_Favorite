import { useParams } from 'react-router-dom'
import { useMovieContext } from '../../context/MovieContext'
import { useEffect, useState } from 'react'
import { ErrorRequest } from '../../components/Notifications'
import CardDetailMovie from '../../components/CardDetailMovie'
import { Loading } from '../../components/Utils'


function DetailMovie() {
  
  const { getMovie, errors, loading } = useMovieContext()
  const [movie, setMovie] = useState(null)
  const params = useParams()

  useEffect(() => {
    async function loadMovie() {
      if (params.id) {
        const newMovie =  await getMovie(params.id)
        setMovie(newMovie)
      }
    }
    loadMovie()
  }, [])

  return (
    <div className="relative px-2 py-10">
        {
          errors && <ErrorRequest errors={errors}/>
        }
        {
          (loading) ? <Loading /> : movie &&
            <main className='px-2 py-10'>
                <CardDetailMovie movie={movie}/>
            </main>
        }    
    </div>
  )
}

export default DetailMovie