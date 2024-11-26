document.addEventListener('DOMContentLoaded', () => {
    const frontImageInput = document.getElementById('frontImage');
    const backImageInput = document.getElementById('backImage');
    const textInput = document.getElementById('textInput');
    const previewCanvas = document.getElementById('previewCanvas');
    const downloadButton = document.getElementById('downloadButton');
    const ctx = previewCanvas.getContext('2d');
    
    let frontImage = new Image();
    let backImage = new Image();
    let currentX = 0, currentY = 0, scale = 1, rotation = 0;

    
    previewCanvas.width = 600; 
    previewCanvas.height = 400;

    function drawPreview() {
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        ctx.save();
        ctx.translate(previewCanvas.width / 2, previewCanvas.height / 2);
        ctx.scale(scale, scale);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-previewCanvas.width / 2, -previewCanvas.height / 2);

        
        if (frontImage.src) {
            ctx.drawImage(frontImage, currentX, currentY, previewCanvas.width / 2, previewCanvas.height);
        }
       
        if (backImage.src) {
            ctx.drawImage(backImage, previewCanvas.width / 2 + currentX, currentY, previewCanvas.width / 2, previewCanvas.height);
        }

        
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(textInput.value, previewCanvas.width / 2, previewCanvas.height / 2);
        
        ctx.restore();
    }

    frontImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            frontImage.src = URL.createObjectURL(file);
            frontImage.onload = drawPreview;
        }
    });

    backImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            backImage.src = URL.createObjectURL(file);
            backImage.onload = drawPreview;
        }
    });

    textInput.addEventListener('input', drawPreview);

    document.getElementById('moveUp').addEventListener('click', () => { currentY -= 10; drawPreview(); });
    document.getElementById('moveDown').addEventListener('click', () => { currentY += 10; drawPreview(); });
    document.getElementById('moveLeft').addEventListener('click', () => { currentX -= 10; drawPreview(); });
    document.getElementById('moveRight').addEventListener('click', () => { currentX += 10; drawPreview(); });
    document.getElementById('zoomIn').addEventListener('click', () => { scale += 0.1; drawPreview(); });
    document.getElementById('zoomOut').addEventListener('click', () => { scale = Math.max(0.1, scale - 0.1); drawPreview(); });
    document.getElementById('rotate').addEventListener('click', () => { rotation += 15; drawPreview(); });

    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'notebook_cover.png';
        link.href = previewCanvas.toDataURL('image/png');
        link.click();
    });

    document.getElementById('generateButton').addEventListener('click', drawPreview);
});
