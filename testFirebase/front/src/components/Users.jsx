import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import Button from '@mui/material/Button'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  async function randomImage() {
    const response = await fetch('https://source.unsplash.com/random')
    return response.url
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:40397/api/User')
      const data = await response.json()

      const userData = await Promise.all(
        data.map(async (user) => {
          const randomImageUrl = await randomImage()
          return {
            id: user.id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            document: user.document,
            mail: user.mail,
            city: user.city,
            dateRegister: user.dateRegister,
            image: randomImageUrl
          }
        })
      )

      setUsers((prevUsers) =>
        page === 1 ? userData : [...prevUsers, ...userData]
      )
      setLoading(false)
    }
    fetchData()
  }, [page])

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  if (loading) {
    return <h1>Cargando...</h1>
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '13px' }}>
        {users.map((user) => (
          <Card
            key={user.id}
            sx={{
              maxWidth: 280,
              border: '1px solid grey',
              position: 'relative'
            }}
          >
            <CardActionArea>
              <CardMedia
                component='img'
                height='200'
                image={user.image}
                alt={user.name}
                style={{ objectFit: 'cover', width: '100%', height: '200px' }}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {user.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {user.dateRegister}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {user.phoneNumber}
                </Typography>
              </CardContent>
            </CardActionArea>
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
}

export default Users
