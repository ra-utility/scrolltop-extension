window.onload = () => {
    const $topBtn = document.getElementById('topBtn')
    const $select = document.getElementById('select')

    $topBtn.addEventListener('click', ()=>{
        console.log(11111)
    })

    $select.addEventListener('change', ()=>{
        console.log($select.value)
    })
}