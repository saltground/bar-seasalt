document.addEventListener('DOMContentLoaded', async () => {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return; // menu.html以外では実行しない

    try {
        const response = await fetch('./data/menu.json');
        if (!response.ok) throw new Error('Menu data could not be loaded');
        const menuCategories = await response.json();

        // 既存の内容をクリア
        menuContainer.innerHTML = '';

        menuCategories.forEach((categoryBlock, catIndex) => {
            // カテゴリごとのラッパーを作成
            const categoryWrapper = document.createElement('div');
            categoryWrapper.className = `category-section fade-in-up delay-${(catIndex % 3) + 1}`;
            categoryWrapper.style.marginBottom = '5rem';
            
            // カテゴリ見出し
            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'category-title';
            categoryTitle.style.color = 'var(--accent-blue)';
            categoryTitle.style.fontSize = '1.8rem';
            categoryTitle.style.borderBottom = '1px solid var(--border-color)';
            categoryTitle.style.paddingBottom = '0.5rem';
            categoryTitle.style.marginBottom = '1rem';
            categoryTitle.textContent = categoryBlock.category;
            categoryWrapper.appendChild(categoryTitle);

            // カテゴリの説明文（設定されている場合のみ）
            if (categoryBlock.description) {
                const categoryDesc = document.createElement('p');
                categoryDesc.className = 'category-desc';
                categoryDesc.style.color = 'var(--text-muted)';
                categoryDesc.style.marginBottom = '2.5rem';
                categoryDesc.style.fontSize = '0.95rem';
                categoryDesc.style.letterSpacing = '0.05em';
                categoryDesc.textContent = categoryBlock.description;
                categoryWrapper.appendChild(categoryDesc);
            }

            // アイテムのリスト作成
            const ul = document.createElement('ul');
            ul.className = 'menu-list';
            
            categoryBlock.items.forEach(item => {
                const li = document.createElement('li');
                li.className = `menu-item`;
                
                li.innerHTML = `
                    <div class="menu-caption">
                        <h4 class="menu-name">${item.name}</h4>
                        <p class="menu-ingredients">${item.ingredients}</p>
                        <p class="menu-desc">${item.description}</p>
                    </div>
                `;
                ul.appendChild(li);
            });

            categoryWrapper.appendChild(ul);
            menuContainer.appendChild(categoryWrapper);
        });
    } catch (error) {
        console.error(error);
        menuContainer.innerHTML = '<p class="error-text" style="color: var(--accent-color);">メニューの読み込みに失敗しました。</p>';
    }
});
