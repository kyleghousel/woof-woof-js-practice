document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar')
  const dogInfo = document.querySelector('#dog-info')
  const dogFilter = document.querySelector('#good-dog-filter')
  let isFilterActive = false

  dogFilter.addEventListener('click', () => {
    isFilterActive = !isFilterActive
    dogFilter.textContent = `Filter good dogs: ${isFilterActive ? 'ON' : 'OFF'}`
    getPups()
  })

  const getPups = () => {
    fetch('http://localhost:3000/pups')
      .then(res => res.json())
      .then(dogs => {
        dogBar.innerHTML = ''
        dogs.forEach(dog => {
          if (!isFilterActive || dog.isGoodDog) {
            const span = document.createElement('span')
            span.textContent = dog.name
            dogBar.appendChild(span)

            span.addEventListener('click', () => {
              dogInfo.innerHTML = ''
              const dogImg = document.createElement('img')
              dogImg.src = dog.image
              const dogName = document.createElement('h2')
              dogName.textContent = dog.name
              const dogStatusBtn = document.createElement('button')
              dogStatusBtn.textContent = dog.isGoodDog ? "Good dog!" : "Bad dog!"
              dogStatusBtn.id = 'dog-status-btn'

              dogInfo.append(dogImg, dogName, dogStatusBtn)

              dogStatusBtn.addEventListener('click', () => {
                updateIsGoodDog(dog, dogStatusBtn)
              })
            })
          }
        })
      })
  }

  const updateIsGoodDog = (dog, button) => {
    const newDogStatus = !dog.isGoodDog

    return fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: newDogStatus
      })
    })
      .then(res => res.json())
      .then(patchedDog => {
        dog.isGoodDog = patchedDog.isGoodDog
        button.textContent = dog.isGoodDog ? "Good dog!" : "Bad dog!"
      })
  }

  getPups()
})
