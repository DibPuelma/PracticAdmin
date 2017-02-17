module.exports = {
  getColor: (avg) => {
    if(avg < 2)
      return 'red'
    else if (avg < 3)
      return 'orange'
    else if (avg < 4)
      return 'yellow'
    else if (avg < 5)
      return 'green'
    return 'gold'
  }
}
