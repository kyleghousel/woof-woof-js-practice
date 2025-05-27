document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar')
  const dogInfo = document.querySelector('#dog-info')
  const dogFilter = document.querySelector('#good-dog-filter')
  let isFilterActive = false


  fetch('http://localhost:3000/pups', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
    })
    .then(res => res.json())
    .then(dogs => {
      dogs.forEach(dog => {
        const span = document.createElement('span')
        span.textContent = dog.name

        dogFilter.addEventListener('click', () => {
          dogFilter.textContent = "Filter good dogs: ON"
          isFilterActive = true
        })

        if (isFilterActive) {
          if (dog.isGoodDog) {
            dogBar.appendChild(span)
          }
        } else {
           dogBar.appendChild(span)
        }

        span.addEventListener('click', () => {
          dogInfo.innerHTML = ''
          const dogImg = document.createElement('img')
          dogImg.setAttribute('src', dog.image)
          const dogName = document.createElement('h2')
          dogName.textContent = dog.name
          dogInfo.appendChild(dogImg)
          dogInfo.appendChild(dogName)
          const dogStatusBtn = document.createElement('button')
          dogStatusBtn.textContent = dog.isGoodDog
          dogStatusBtn.setAttribute('id', 'dog-status-btn')
          dogInfo.appendChild(dogStatusBtn)

          dogStatusBtn.addEventListener('click', () => {
            updateIsGoodDog(dog.id, dog.isGoodDog)
            dogStatusBtn.textContent = dog.isGoodDog
          })
        })
      })
    })

  const updateIsGoodDog = (id, currentDogStatus, button) => {
    const toggleDogStatus = !currentDogStatus

    return fetch(`http://localhost:3000/pups/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: toggleDogStatus
      })
    })
      .then(res => res.json())
      .then(patchedDog => {
        const patchBtn = document.querySelector('#dog-status-btn')
        patchBtn.textContent = patchedDog.isGoodDog
      })
  }

})
