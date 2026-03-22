document.addEventListener('DOMContentLoaded', async () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const globalNav = document.getElementById('global-nav');

    if (menuToggle && globalNav) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('is-active');
            globalNav.classList.toggle('is-active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        // リンククリック時にメニューを自動で閉じる
        const navLinks = globalNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                globalNav.classList.remove('is-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. config.jsonからの動的リンク設定
    try {
        const response = await fetch('./data/config.json');
        if (!response.ok) throw new Error('Config load failed');
        const config = await response.json();

        // home_to_menu_link の設定値でリンク先を上書き
        if (config.home_to_menu_link) {
            const dynamicLinks = document.querySelectorAll('.dynamic-menu-link');
            dynamicLinks.forEach(link => {
                link.setAttribute('href', config.home_to_menu_link);
            });
        }
    } catch (error) {
        console.warn('Config not found or error parsing. Fallback to default links.', error);
    }

    // 3. Current Year for footer
    const yearElem = document.getElementById('current-year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
});
