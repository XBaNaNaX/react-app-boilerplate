const people = [
    { name: 'Nader', age: 36 },
    { name: 'Amanda', age: 24 },
    { name: 'Jason', age: 44 }
  ]
const unit = [
    { name: 'Bottle', order: 1},
    { name: 'Box', order: 2},
    { name: 'Can', order: 3}
  ]   

  module.exports = {
    getPeoples: function() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(people)
        }, 3000)
      })
    },
    getUnits: function() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(unit)
        }, 3000)
      })
    }
  }