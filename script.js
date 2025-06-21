const form = document.getElementById('app-form');
        const resultContainer = document.getElementById('result-container');
        const outputCode = document.getElementById('output-code');
        const copyBtn = document.getElementById('copy-btn');
        const sizeInput = document.getElementById('size');
        const nameInput = document.getElementById('name');
        const versionInput = document.getElementById('version');
        const iconInput = document.getElementById('icon');
        const reloadBtn = document.getElementById('reload-btn');

        document.getElementById('added').valueAsDate = new Date();

        versionInput.addEventListener('blur', function() {
            let value = this.value.trim();
            if (value) {
                value = value.replace(/ /g, '.');
                if (!value.toLowerCase().startsWith('v')) {
                    value = 'v' + value;
                }
                this.value = value;
            }
        });

        nameInput.addEventListener('blur', function() {
            const appLibrary = {
                'fb': { name: 'Facebook', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png' },
                'sdrk': { name: 'Shadowrocket', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d1/37/1d/d1371d3f-81b1-96ea-d335-e88199bb96b8/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg' },
                'ig': { name: 'Instagram', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHP2W0X8Bj9Wwou8Y5Iv2q_Aa-nME9SMwEAA&s' },
                'spt': { name: 'Spotify', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png' },
                'yt': { name: 'Youtube', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png' },
                'mess': { name: 'Messenger', icon: 'https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/481110451_1048405227313977_5297689486950086789_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Znshp0jTrIwQ7kNvwFR041U&_nc_oc=Adn8BrqdTfd0t9PvWcVzefyhm5BfIQXv3sI9Eecdp912-DKzritQSFXLWqDtTLLrZIK3EqmpeK4behNA-1Xou94Q&_nc_zt=23&_nc_ht=scontent.fhan3-4.fna&_nc_gid=NxB9ma41hqgbHAm7py1SjA&oh=00_AfO0ZHFODo5pKdk-eyflrgv3BRnawkfuXX4OSyFqp7K-DA&oe=685ABA65' },
                'se': { name: 'SnapEdit', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/93/a5/cd/93a5cd19-eafe-9f92-3d58-c06800e0673c/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg' },
                'scl': { name: 'SoundCloud', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/37/ea/fa/37eafabd-3bd8-0d17-3b37-9dce13924079/AppIcon-0-0-1x_U007epad-0-0-85-220.png/512x512bb.jpg' },
                'tele': { name: 'Telegram', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/15/f9/a4/15f9a4ec-71a6-732a-65ef-89dd9b69b8cf/AppIconLLC-0-0-1x_U007emarketing-0-8-0-0-85-220.png/512x512bb.jpg' },
                'tt': { name: 'TikTok', icon: 'https://chillproduction.vn/wp-content/uploads/2023/02/tiktok-app-icon-logo-0F5AD7AE01-seeklogo.com_-2-300x300.png' },
                'ff': { name: 'Free Fire', icon: 'https://play-lh.googleusercontent.com/sKh_B4ZLfu0jzqx9z98b2APe2rxDb8dIW-QqFHyS3cpzDK2Qq8tAbRAz3rXzOFtdAw' },
                'lq': { name: 'Liên Quân Mobile', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Vfiuv6gyx_Ww4VuMJb66ne2cKzZ6PuW8Tw&s' },
                'pubg': { name: 'PUBG Mobile', icon: 'https://play-lh.googleusercontent.com/E_bwpvmFEiRGW4G9VnTIpoJ4XM-3udz3Jm2cDBVsavyu4pT12x2hNLI1ucWoS2KaQIoA' }
            };
            
            const value = this.value.trim();
            const lowerCaseValue = value.toLowerCase();
            let matchFound = false;

            const appInfoByAbbr = appLibrary[lowerCaseValue];
            if (appInfoByAbbr) {
                this.value = appInfoByAbbr.name;
                iconInput.value = appInfoByAbbr.icon;
                matchFound = true;
            } else {
                for (const key in appLibrary) {
                    const appInfoByName = appLibrary[key];
                    if (appInfoByName.name.toLowerCase() === lowerCaseValue) {
                        this.value = appInfoByName.name; 
                        iconInput.value = appInfoByName.icon;
                        matchFound = true;
                        break;
                    }
                }
            }

            if (!matchFound) {
                const currentIcon = iconInput.value.trim();
                const libraryIcons = Object.values(appLibrary).map(app => app.icon);
                if (currentIcon && libraryIcons.includes(currentIcon)) {
                    iconInput.value = '';
                }
            }
        });

        sizeInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && /^\d+(\.\d+)?$/.test(value)) {
                const numericValue = parseFloat(value);
                if (numericValue >= 1000) {
                    const gbValue = parseFloat((numericValue / 1000).toFixed(1));
                    this.value = gbValue + ' GB';
                } else {
                    this.value = numericValue + ' MB';
                }
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            const addedDate = new Date(data.added).toISOString().split('T')[0];

            const escapeAttr = (str) => str.replace(/"/g, '&quot;');

            const generatedHtml = 
`<div class="app-item" 
data-category="${escapeAttr(data.category)}" 
data-id="${escapeAttr(data.id)}" 
data-name="${escapeAttr(data.name)}" 
data-version="${escapeAttr(data.version)}" 
data-size="${escapeAttr(data.size)}" 
data-added="${addedDate}" 
data-icon="${escapeAttr(data['icon'])}" 
data-description="${escapeAttr(data.description)}" 
data-download-link="${escapeAttr(data['download-link'])}"></div>`;
            
            outputCode.textContent = generatedHtml;
            resultContainer.style.display = 'block';
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        });
        
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(outputCode.textContent).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Đã sao chép!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy"></i> Sao chép';
                }, 2000);
            });
        });

        reloadBtn.addEventListener('click', function() {
            location.reload();
        });