{
  ('use strict');

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      // activeLink.classList.remove('active');
      if (clickedElement !== activeLink) activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.toggle('active');

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article');

    for (let activeArticle of activeArticles) {
      if (
        articleSelector === '#' + activeArticle.id &&
        clickedElement.classList.contains('active')
      )
        activeArticle.classList.add('active');
      else activeArticle.classList.remove('active');
    }
  };

  function generateTitleLinks() {
    const optArticleSelector = '.post';
    const optTitleSelector = '.post-title';
    const optTitleListSelector = '.titles';
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';

    /* Remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = `<li><a href='#${articleId}'><span>${articleTitle}</span></a></li>`;

      /* insert link into titleList  */
      html = html + linkHTML;
    }
    //  titleList.innerHTML = titleList.insertAdjacentHTML('beforebegin', linkHTML) + linkHTML
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

}
