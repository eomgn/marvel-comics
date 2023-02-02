const timesTamp = '1674488640'
const apiKey = '97ca36a397efc5cd69965fff70af46d8'
const md5 = 'be7fe39c7e6aa82c15bb665fcc60d9f2'

const modal = document.querySelector('.modal')
const cards = document.querySelector('.cards')
const $modalAside = document.querySelector('.modal__body__aside')

/* variables modal - start */
const $modalImage = document.querySelector('.modal__body-img img')
const $modalTitle = document.querySelector('.modal__body-details--info h3')
const $modalCreators = document.querySelector('.modal_body_info_creators')
const $modalCharacters = document.querySelector('.modal_body_info_characters')
const $modalDescription = document.querySelector('.modal_body_info_description')
const $modalPags = document.querySelector('.modal_body_info_pags')
const $modalAtt = document.querySelector('.modal_body_info_att')
const $modalShopp = document.querySelector('.modal__buttons--shopp')
const $closeModal = document.querySelector('.modal__buttons--closeModal')
/* variables modal - end */

$closeModal.addEventListener('click', closeModal)
$modalShopp.addEventListener('click', shopp)

fetch(
  `http://gateway.marvel.com/v1/public/comics?ts=${timesTamp}&apikey=${apiKey}&hash=${md5}`
)
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    json.data.results.forEach((item) => {
      const img = item.thumbnail.path + '.' + item.thumbnail.extension
      const title = item.title
      const creators = item.creators.items.map((e) => e.name)
      const characters = item.characters.items.map((e) => e.name)
      const description = item.description
      const pags = item.pageCount
      const att = item.modified.slice(0, 10)

      const card = document.createElement('div')
      card.className = 'card__item'

      const cardImg = document.createElement('img')
      cardImg.src = img

      const cardTitle = document.createElement('h3')
      cardTitle.textContent = title

      card.addEventListener('click', () => {
        modalDetails(img, title, creators, characters, description, pags, att)
      })

      card.append(cardImg)
      card.append(cardTitle)
      cards.append(card)
    })
  })

function showModal() {
  modal.classList.add('visible')

  modal.style.opacity = '0'
  setTimeout(() => {
    modal.style.opacity = '1'
  })

  verifyDetails()
}

function closeModal() {
  modal.classList.remove('visible')
}

function shopp() {
  Swal.fire({
    width: '80rem',
    icon: 'success',
    title: 'Congratulations',
    text: 'Finished using from my aplication, thank you',
    footer:
      '<a href="https://www.linkedin.com/in/eomgn/" target="_blank style="color: #000">Has feedback?</a>',
    color: '#000',
    confirmButtonColor: '#0f0'
  })
}

/*-----------*/

function verifyDetails() {
  $modalCreators.textContent == ''
    ? ($modalCreators.textContent = 'Not there data')
    : ''
  $modalCharacters.textContent == ''
    ? ($modalCharacters.textContent = 'Not there data')
    : ''
  $modalDescription.textContent == ''
    ? ($modalDescription.textContent = 'Not there data')
    : ''
  $modalPags.textContent == ''
    ? ($modalPags.textContent = 'Not there data')
    : ''
  $modalAtt.textContent == '' ? ($modalAtt.textContent = 'Not there data') : ''
}

function modalDetails(
  image,
  title,
  creators,
  characters,
  description,
  pags,
  att
) {
  $modalImage.src = image

  $modalTitle.textContent = title

  $modalCreators.innerHTML = creators

  $modalCharacters.innerHTML = characters

  $modalDescription.textContent = description

  $modalPags.textContent = pags

  $modalAtt.textContent = new Date(`${att}`).getFullYear()

  showModal()
}
