const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const categories = document.getElementsByClassName('category');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('on');
  sideMenu.classList.toggle('on');
});

// let prevOnCategory;

for (const category of categories) {
  category.addEventListener('click', (e) => {
    const textHeight = category.querySelector('.text').clientHeight;
    const subCategoriesHeight = category.querySelector('.sub-categories').clientHeight;

    if (category.classList.contains('on')) {
      category.classList.remove('on');
      category.style.height = textHeight + 'px';
      return;
    }

    // if (prevOnCategory) {
    //   prevOnCategory.classList.remove('on');
    //   prevOnCategory.style.height = prevOnCategory.querySelector('.text').clientHeight + 'px';
    // }

    category.classList.add('on');
    category.style.height = category.clientHeight + subCategoriesHeight + 'px';
    // prevOnCategory = category;
    return;
  });
};