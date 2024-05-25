import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import Avatar from '@mui/material/Avatar'
import { red, green } from '@mui/material/colors'
import Button from '@mui/material/Button'

function DataApi() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const charactersData = data.results.map((character) => {
          return {
            id: character.id,
            name: character.name,
            gender: character.gender == 'Male' ? 'Hombre' : 'Mujer',
            status: character.status,
            image: character.image
          }
        })
        setCharacters((prevCharacters) => {
          if (page === 1) {
            return charactersData
          } else {
            return [...prevCharacters, ...charactersData]
          }
        })
        setLoading(false)
      })
  }, [page])

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  if (!loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '13px' }}>
          {characters.map((character) => (
            <Card
              key={character.id}
              sx={{
                maxWidth: 280,
                border: '1px solid grey',
                position: 'relative'
              }}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='auto'
                  image={character.image}
                  alt={character.name}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {character.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {character.gender}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Avatar
                sx={{
                  bgcolor: character.status === 'Alive' ? green[500] : red[500],
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%'
                }}
                aria-label={character.status}
              >
                {character.status === 'Alive' ? (
                  <FavoriteBorderIcon sx={{ color: 'black' }} />
                ) : (
                  <SentimentVeryDissatisfiedIcon sx={{ color: 'black' }} />
                )}
              </Avatar>
            </Card>
          ))}
        </div>
        <Button
          variant='contained'
          onClick={handleLoadMore}
          style={{ marginTop: '20px' }}
        >
          Cargar Más
        </Button>
      </div>
    )
  } else {
    return <h1>Cargando...</h1>
  }
}

export default DataApi
