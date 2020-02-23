('use strict');

{
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorsListSelector = '.authors.list';

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
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

  function generateTitleLinks(customSelector = '') {
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    let html = '';

    /*[DONE] Remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /*[DONE] for each article */

    for (let article of articles) {
      /*[DONE] get the article id */
      const articleId = article.getAttribute('id');

      /*[DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /*[DONE] create HTML of the link */
      const linkHTML = `<li><a href='#${articleId}'><span>${articleTitle}</span></a></li>`;

      /*[DONE] insert link into titleList  */
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

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999
    };

    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    const classValue = optCloudClassPrefix + classNumber;
    return classValue;
  }

  function generateTags() {
    /*[NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /*[DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /*[DONE] START LOOP: for every article: */
    for (let article of articles) {
      /*[DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /*[DONE] make html variable with empty string */
      let html = '';

      /*[DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /*[DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /*[DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /*[DONE] generate HTML of the link */
        const linkHTML = `<li><a href='#tag-${tag}'>${tag}\u00A0</a></li>`;

        /*[DONE] add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in AllTags */
        if (!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /*[DONE] END LOOP: for each tag */
      }

      /*[DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /*[DONE] END LOOP: for every article: */
    }

    /*[NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);

    /*[NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /*[NEW] START LOOP: for each tag in allTAgs: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */

      // allTagsHTML += `<li><a href='#tag-${tag}'>${tag}\u00A0(${allTags[tag]})</a></li>`;
      allTagsHTML += `<li><a class="${calculateTagClass(
        allTags[tag],
        tagsParams
      )}" href='#tag-${tag}'>${tag}\u00A0(${allTags[tag]})</a></li>`;
    }

    console.log(allTagsHTML);

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
      /* remove class active */
      activeTagLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const equalTags = document.querySelectorAll('a[href="' + href + '"]');
    // (`a[href="'${href}'"]`);

    /* START LOOP: for each found tag link */
    for (let equalTag of equalTags) {
      /* add class active */
      equalTag.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const equalTags = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let equalTag of equalTags) {
      /* add tagClickHandler as event listener for that link */
      equalTag.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors() {
    let allAuthors = {};
    /* Find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      let html = '';

      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);
      const linkHTML = `<a href='#author-${articleAuthor}'>${articleAuthor}</a>`;
      html = html + linkHTML;

      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      authorWrapper.innerHTML = html;
    }

    const authorList = document.querySelector(optAuthorsListSelector);

    const authorParams = calculateTagsParams(allAuthors);

    let allAuthorsHTML = '';

    // for (let articleAuthor in allAuthors) {
    //   allAuthorsHTML += `<li><a class="${calculateTagClass(
    //     allAuthors[articleAuthor],
    //     authorParams
    //   )}" href='#tag-${articleAuthor}'>${articleAuthor}\u00A0(${
    //     allAuthors[articleAuthor]
    //   })</a></li>`;

    // }

    for (let articleAuthor in allAuthors) {
      allAuthorsHTML += `<li><a class="${calculateTagClass(
        allAuthors[articleAuthor],
        authorParams
      )}" href='#author-${articleAuthor}'>${articleAuthor}\u00A0(${
        allAuthors[articleAuthor]
      })</a></li>`;
    }

    console.log(allAuthorsHTML);
    authorList.innerHTML = allAuthorsHTML;
  }

  generateAuthors();

  function authorClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    /*clickedElement.classList.add('active'); */

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all authors with class active */
    const activeAuthorLinks = document.querySelectorAll(
      'a.active[href^="#author-"]'
    );

    /* START LOOP: for each active author link */
    for (let activeAuthorLink of activeAuthorLinks) {
      /* remove class active */
      activeAuthorLink.classList.remove('active');
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const sameAuthors = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found author link */
    for (let sameAuthor of sameAuthors) {
      /* add class active */
      sameAuthor.classList.add('active');
    }
    /* execute function "generateTitleLinks" with author selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    const sameAuthors = document.querySelectorAll('a[href^="#author-"]');

    for (let sameAuthor of sameAuthors) {
      sameAuthor.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors();
}
