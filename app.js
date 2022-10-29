document.getElementById('content-container').onmousemove = e => {
    for (const card of document.querySelectorAll('.color-container')) {
        const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

        card.style.setProperty('--x', `${ x }px`);
        card.style.setProperty('--y', `${ y }px`);
    }
}

function createColorCards(colors, id) {
    for (let i = 0; i < colors.length; i++) {
        const element = colors[i];
        var raw_card = `
        <div class="color-container">
            <div class="card-content"></div>
            <div class="card-border"></div>
            <div class="color-field"></div>
            <div class="color-code">#${element.name}</div>
        </div>`
        document.getElementById(id).innerHTML += raw_card;
    }
    return true;
}

window.addEventListener('load', () => {
    fetch('data/colors.json')
        .then(response => response.json())
        .then((data) => {
            const cat = data.categorys;
            for (let i = 0; i < cat.length; i++) {
                const element = cat[i];
                document.getElementById('content-container').innerHTML += `<div class="category-container ${cat[i].inline ? "half":"full"} ${cat[i].row ? "flex-row":"flex-column"}" id="category-${i}"><div class="category-title">${element.name}</div>`
                createColorCards(element.colors, ("category-" + i))            
            }
        })
        .then(() => {
            document.querySelectorAll('.color-container').forEach(element => {
                var color = element.children[3].innerHTML;
                element.children[2].style.setProperty('--color', color);
                element.children[3].style.setProperty('--color', color);
            });
        })
        .then(() => {
            document.querySelectorAll('.color-container').forEach(element => {
                element.addEventListener('click', () => {
                    var color = element.children[3].innerHTML;
                    navigator.clipboard.writeText(color);
            
                    //create notifitation div
                    var notification = document.createElement('div');
                    notification.classList.add('notification');
                    notification.innerHTML = 'Copied to clipboard!';
                    document.body.appendChild(notification);
                    notification.style.opacity = 1;
                    setTimeout(() => {
                        notification.style.opacity = 0;
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 1000);
                    }, 1000);
                });
            });
        });
})


//TODO
//right click on group -> menu to copy root css variable