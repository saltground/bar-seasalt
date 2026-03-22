document.addEventListener('DOMContentLoaded', async () => {
    const menuContainer = document.getElementById('menu-list');
    if (!menuContainer) return; // menu.html以外では実行しない

    try {
        const response = await fetch('./data/menu.json');
        if (!response.ok) throw new Error('Menu data could not be loaded');
        const menus = await response.json();

        // メニュー一覧をクリア
        menuContainer.innerHTML = '';

        menus.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = `menu-item fade-in-up delay-${(index % 3) + 1}`;
            
            li.innerHTML = `
                <div class="menu-caption">
                    <h3 class="menu-name">${item.name}</h3>
                    <p class="menu-ingredients">${item.ingredients}</p>
                    <p class="menu-desc">${item.description}</p>
                </div>
            `;
            menuContainer.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        menuContainer.innerHTML = '<p class="error-text" style="color: var(--accent-color);">メニューの読み込みに失敗しました。</p>';
    }
});
