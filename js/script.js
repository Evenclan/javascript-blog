{'use strict';

const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

/* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        if(clickedElement !==activeLink) activeLink.classList.remove('active');
    }

/* [DONE] add class 'active' to the clicked link */

        clickedElement.classList.toggle('active');

/* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

/* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    console.log(articleSelector); // ID artykułu

/* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    console.log(targetArticle); // Cały artykuł

/* add class 'active' to the correct article */

    targetArticle.classList.toggle('active');
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

    const optArticleSelector = '.post';
    const optTitleSelector = '.post-title';
    const optTitleListSelector = '.titles';

    function generateTitleLinks() {


    /* Remove contents of titleList */

    titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = ''

    console.log(titleList);
    


    /* for each article */

        /* get the article id */

        /* fint the title element */

        /* get the title from the title element */

        /* create HTML of the link */

        /* insert link into titleList */

    }

    generateTitleLinks ();



}