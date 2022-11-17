function scroll(direction, titleCat){
    if (direction === "right"){
        document.getElementById(titleCat).scrollBy({top: 0, left:800, behavior: 'smooth'});
    }
    else {
        document.getElementById(titleCat).scrollBy({top: 0, left:-800, behavior: 'smooth'});
    }
}

async function getTitleData(titleCat){

    let posterBaseUrl = "https://image.tmdb.org/t/p/w500"; 
    let posterFullUrl; 
    let title; 
    let overview;
    let api_url; 
    let div; 
    let img; 

    if (titleCat === "popular_movies"){ 
        api_url = "https://api.themoviedb.org/3/trending/all/day?api_key=55b9a3c310cb204d6335a3076f8ae53b";

    }
    else if (titleCat === "iconic_movies"){
        api_url = "https://api.themoviedb.org/3/movie/top_rated?api_key=55b9a3c310cb204d6335a3076f8ae53b&language=en-US&page=1"; 
    }
    else {
        api_url = "https://api.themoviedb.org/3/discover/movie?api_key=55b9a3c310cb204d6335a3076f8ae53b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"; 

    }

    const response = await fetch(api_url);  
    const data = await response.json();

    for (let x = 0; x < data["results"].length; x++){

        posterFullUrl = posterBaseUrl + data["results"][x]["poster_path"];

        title = data["results"][x]["title"];
        if (title == null) title = data["results"][x]["name"];

        overview = data["results"][x]["overview"]; 
        div = document.createElement("div");
        div.className = "titles"; 
        div.id = `${title}`;
        document.getElementById(titleCat).appendChild(div); 

        img = document.createElement("img");
        img.setAttribute("src", posterFullUrl);
        img.setAttribute("alt", title);
        div.appendChild(img);
    }
}


