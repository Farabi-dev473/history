const users = [
    {
        id: 1,
        name: 'Al Farabi',
    },
    {
        id: 2,
        name: 'Arif'
    },
    {
        id: 3,
        name: 'Piyas'
    },
    {
        id: 4,
        name: 'Masud'
    }
]

const findUserByIdOrReturnNull = (id) = {
     users.find((user) => user.id === id)
}