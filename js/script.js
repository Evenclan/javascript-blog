{
    'use strict';

    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
            // if (clickedElement !== activeLink) activeLink.classList.toggle('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);

        /* add class 'active' to the correct article */
        targetArticle.classList.add('active');
    };

    const optArticleSelector = '.post';
    const optTitleSelector = '.post-title';
    const optTitleListSelector = '.titles';
    let html = '';

    function generateTitleLinks() {


        /* Remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        /* for each article */

        const articles = document.querySelectorAll(optArticleSelector);

        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* get the title from the title element */

            /* create HTML of the link */
            const linkHTML = `<li><a href='#${articleId}'><span>${articleTitle}</span></a></li>`;

            /* insert link into titleList  */
            html = html + linkHTML;
        }
        //  titleList.innerHTML = titleList.insertAdjacentHTML('beforebegin', linkHTML) + linkHTML
        titleList.innerHTML = html;

        console.log(titleList.innerHTML);

        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();
}
