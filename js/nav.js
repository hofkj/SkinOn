function toggleMenu(){

    const navToggleDiv = document.getElementsByClassName("nav-toggle")[0];
    // const navTogleDiv = document.getElementsByIdName("nav-toggle");
    const navListUl = document.getElementsByClassName("nav-list")[0];
    const  toggleI = navToggleDiv.getElementsByTagName("i")[0];
    
        navToggleDiv.onclick = (event) => {
            navListUl.classList.toggle("show-menu");

            toggleI.classList.toggle("bi-list");
            toggleI.classList.toggle("bi-x-lg");

        
    
        }
    }
    toggleMenu();