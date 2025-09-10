     let currentSlide = 0;
        const totalSlides = 6; // Cambia esto si agregas o quitas slides

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function updateCarousel() {
            const track = document.getElementById('carouselTrack');
            const translateX = -currentSlide * 100;
            track.style.transform = `translateX(${translateX}%)`;
            track.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
        }

        // Auto-advance carousel
        setInterval(nextSlide, 4000);

        document.addEventListener('DOMContentLoaded', function() {
            const carouselContainer = document.querySelector('.carousel-container');
            carouselContainer.style.position = 'relative';
            updateCarousel(); // Asegura que el carrusel inicie bien
        });

        // Modal functions
        function openPhoto(emoji, title, gradient, filename) {
            currentPhotoData = { emoji, title, gradient, filename };
            const modal = document.getElementById('photoModal');
            const modalContent = document.getElementById('modalContent');
            
            modalContent.innerHTML = `
                <div class="aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center" style="width: 500px; height: 500px;">
                    <div class="text-center">
                        <div class="text-8xl mb-4">${emoji}</div>
                        <p class="text-2xl font-serif text-gray-700">${title}</p>
                        <p class="text-sm text-gray-500 mt-2">Casamiento Ale & Andre</p>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById('photoModal');
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            currentPhotoData = null;
        }

        function downloadPhoto() {
            if (!currentPhotoData) return;
            
            // Crear un canvas para generar la imagen
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1000;
            canvas.height = 1000;
            
            // Crear gradiente diagonal
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            const colors = getGradientColors(currentPhotoData.gradient);
            gradient.addColorStop(0, colors.from);
            gradient.addColorStop(1, colors.to);
            
            // Dibujar fondo con gradiente
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Agregar bordes redondeados simulados con sombra
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 10;
            
            // Dibujar emoji grande
            ctx.font = 'bold 280px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#1f2937';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
            ctx.shadowBlur = 5;
            ctx.fillText(currentPhotoData.emoji, canvas.width/2, canvas.height/2 - 80);
            
            // Reset shadow para texto
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            
            // Dibujar título principal
            ctx.font = 'bold 48px "Playfair Display", serif';
            ctx.fillStyle = '#374151';
            ctx.fillText(currentPhotoData.title, canvas.width/2, canvas.height/2 + 120);
            
            // Dibujar línea decorativa
            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(canvas.width/2 - 100, canvas.height/2 + 160);
            ctx.lineTo(canvas.width/2 + 100, canvas.height/2 + 160);
            ctx.stroke();
            
            // Dibujar subtítulo
            ctx.font = '32px "Inter", sans-serif';
            ctx.fillStyle = '#6b7280';
            ctx.fillText('Casamiento Ale & Andre', canvas.width/2, canvas.height/2 + 200);
            
            // Dibujar fecha
            ctx.font = '24px "Inter", sans-serif';
            ctx.fillStyle = '#9ca3af';
            ctx.fillText('6 de septiembre 2025', canvas.width/2, canvas.height/2 + 240);
            
            // Agregar corazón decorativo
            ctx.font = '32px Arial';
            ctx.fillStyle = '#d4af37';
            ctx.fillText('♥', canvas.width/2, canvas.height/2 + 280);
            
            // Convertir canvas a blob y descargar
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `casamiento-ale-andre-${currentPhotoData.filename}.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 'image/png', 1.0);
        }

        function getGradientColors(gradientClass) {
            const colorMap = {
                'from-yellow-200 to-orange-200': { from: '#fef3c7', to: '#fed7aa' },
                'from-pink-200 to-rose-200': { from: '#fce7f3', to: '#fecdd3' },
                'from-purple-200 to-indigo-200': { from: '#e9d5ff', to: '#c7d2fe' },
                'from-green-200 to-teal-200': { from: '#dcfce7', to: '#ccfbf1' },
                'from-gray-100 to-gray-200': { from: '#f3f4f6', to: '#e5e7eb' },
                'from-blue-100 to-blue-200': { from: '#dbeafe', to: '#bfdbfe' },
                'from-rose-100 to-pink-200': { from: '#ffe4e6', to: '#fce7f3' },
                'from-yellow-100 to-amber-200': { from: '#fef3c7', to: '#fde68a' },
                'from-amber-100 to-orange-200': { from: '#fef3c7', to: '#fed7aa' },
                'from-purple-100 to-violet-200': { from: '#f3e8ff', to: '#ddd6fe' },
                'from-teal-100 to-cyan-200': { from: '#ccfbf1', to: '#a5f3fc' },
                'from-lime-200 to-green-200': { from: '#d9f99d', to: '#dcfce7' },
                'from-cyan-200 to-blue-200': { from: '#a5f3fc', to: '#bfdbfe' },
                'from-fuchsia-200 to-pink-200': { from: '#f5d0fe', to: '#fce7f3' },
                'from-orange-200 to-red-200': { from: '#fed7aa', to: '#fecaca' },
                'from-emerald-200 to-green-200': { from: '#a7f3d0', to: '#dcfce7' },
                'from-violet-200 to-purple-200': { from: '#ddd6fe', to: '#e9d5ff' },
                'from-amber-200 to-yellow-200': { from: '#fde68a', to: '#fef3c7' },
                'from-sky-200 to-blue-200': { from: '#bae6fd', to: '#bfdbfe' }
            };
            return colorMap[gradientClass] || { from: '#f3f4f6', to: '#e5e7eb' };
        }

        // Cerrar modal con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Modal para mostrar imagen real y descargarla
        function openPhotoImg(imgUrl, title) {
            const modal = document.getElementById('photoModal');
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="flex flex-col items-center">
                    <img src="${imgUrl}" alt="${title}" class="max-h-[70vh] rounded-xl shadow-xl mb-4"/>
                    <p class="text-xl font-serif text-gray-200 mb-2">${title}</p>
                </div>
            `;
            // Botón de descarga
            const modalFooter = modalContent.parentElement.querySelector('.flex.justify-center');
            if (modalFooter) {
                modalFooter.innerHTML = `
                    <a href="${imgUrl}" download class="gold-accent text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span>Descargar</span>
                    </a>
                    <button onclick="closeModal()" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
                        Cerrar
                    </button>
                `;
            }
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
        document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    // Opcional: cerrar menú al hacer click en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});